import { Form, Row, Col, Button, Modal } from 'react-bootstrap';
import { useEffect, useState } from "react";
import axios from "../axios";

const EditAttribute = ({modalStat, attrData, setAttrModalStat, setAttrData}) => {
    const [formErrorMessage, setFormErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleNameChange = (e) => {
        setAttrData({
            attribute_id: attrData?.attribute_id,
            attribute_value: attrData?.attribute_value,
            attribute_name: e.target.value,
        })
    }
    
    const handleValueChange = (e) => {
        setAttrData({
            attribute_id: attrData?.attribute_id,
            attribute_value: e.target.value,
            attribute_name: attrData?.attribute_name,
        })
    }

    const handleClose = () => {
        setAttrModalStat(false);
    };

    const submitAttrUpdate = (e) => {
        e.preventDefault();
        const finalData = {
            attrId: attrData?.attribute_id,
            attrValue: attrData?.attribute_value,
            attrName: attrData?.attribute_name,
        }
        const { attrId, attrName, attrValue } = finalData;
        const sendData = { attrId, attrName, attrValue };

        axios.patch(`${process.env.REACT_APP_API_BASE_URL}app/updateAttribute`, sendData)
            .then(({ data }) => {
                setSuccessMessage(data.message);
                setTimeout(() => {
                    setSuccessMessage(null);
                    setAttrModalStat(false);
                }, 3000);
            }).catch(err => {
                console.log(err);
                setFormErrorMessage(err.message);
            });
    }
    return (
        <Modal show={modalStat} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Attribute</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Attribute Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter attribute name" name="attrName" onChange={handleNameChange} value={attrData?.attribute_name}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Attribute Value</Form.Label>
                            <Form.Control type="text" placeholder="Enter attribute value" name="attrValue" onChange={handleValueChange} value={attrData?.attribute_value} />
                        </Form.Group>
                    </Row>
                    <Button size="sm" variant="primary" type="submit" onClick={submitAttrUpdate} >
                        Submit
                    </Button>
                    {successMessage && <div className="text-success">{successMessage}</div>}
                    {formErrorMessage && <div className="text-danger">{formErrorMessage}</div>}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditAttribute;