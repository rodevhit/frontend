import axios from "../axios";
import { useEffect, useState } from "react";
import AttributeList from "./AttributeList";
import { Form, Row, Col, Button } from 'react-bootstrap';

const Attribute = () => {
    const [isPending, setIsPending] = useState(true);
    const [listErrorMessage, setListErrorMessage] = useState(null);
    const [formErrorMessage, setFormErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [attributeList, setAttributeList] = useState(null);
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, ...{ [e.target.name]: e.target.value } })
    }

    const submitAttr = (e) => {
        e.preventDefault()
        const { attrName, attrValue } = formData;
        const sendData = { attrName, attrValue };
        axios.post(`${process.env.REACT_APP_API_BASE_URL}app/createAttribute`, sendData)
        .then(({ data }) => {
            const newAttr = {
                attribute_id: data.newAttrData.attribute_id,
                attribute_name: data.newAttrData.attribute_name,
                attribute_value: data.newAttrData.attribute_value
            }
            setAttributeList([...attributeList, newAttr]);
            setSuccessMessage(data.message);
            setTimeout(() => {
                setSuccessMessage(null);
                setFormData({})
            }, 3000);
        }).catch(err => {
            console.log(err);
            setFormErrorMessage(err.message);
        });
    }


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}app/attributeList`)
            .then(data => {
                setAttributeList(data?.data?.attrList?.rows);
                setIsPending(false);
            }).catch(err => {
                console.log(err);
                setListErrorMessage(err.message);
            })
    }, []);



    return (
        <div className="container">
            <div className="add-attribute">
                <h2>Create Attribute</h2>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Attribute Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter attribute name" name="attrName" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Attribute Value</Form.Label>
                            <Form.Control type="text" placeholder="Enter attribute value" name="attrValue" onChange={handleChange} />
                        </Form.Group>
                    </Row>
                    <Button size="sm" variant="primary" type="submit" onClick={submitAttr} >
                        Submit
                    </Button>
                    {successMessage && <div className="text-success">{successMessage}</div>}
                    {formErrorMessage && <div className="text-danger">{formErrorMessage}</div>}
                </Form>
            </div>
            <div className="attribute-list">
                <h2>Attributes</h2>
                {listErrorMessage && <div className="text-danger">{listErrorMessage}</div>}
                {isPending && <div>Loading...</div>}
                {attributeList && <AttributeList attrList={attributeList} />}
            </div>
        </div>
    );
}

export default Attribute;