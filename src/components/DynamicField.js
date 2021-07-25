import { Form, Row, Col, Button } from 'react-bootstrap';
import { useEffect, useState } from "react";
import axios from "../axios";

const DynamicField = ({ attributes }) => {
    const [formErrorMessage, setFormErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fieldValue, setFieldValue] = useState(null);
    const [fieldName, setFieldName] = useState(null);

    const attributeList = attributes.reduce((acc, attr) => {
        acc[attr.attribute_name] = attr.attribute_value;
        return acc
    }, {});
    console.log(attributeList);
    const handleDynamicForm = (e) => {
        if(e.target.files){
            setSelectedFile(e.target.files[0])
        }
        setFieldValue(e.target.value);
        setFieldName(e.target.name);
    }
    const submitForm = (e) => {
        e.preventDefault()
        console.log('clicked');
        if(fieldValue == '' || fieldName == ''){
            setFormErrorMessage('The field must have name and value attributes.');
            return;
        }

        const formData = new FormData();
        if(selectedFile){
            formData.append(
                "mediaFile",
                selectedFile,
                selectedFile.name
            );

        }else{
            formData.append('fieldName', fieldValue);
        }

        axios.post(`${process.env.REACT_APP_API_BASE_URL}app/submitDynamicData`, formData)
        .then(({ data }) => {
            setSuccessMessage(data.message);
            setTimeout(() => {
                setFieldValue('');
                setSelectedFile('');
                setSuccessMessage(null);
            }, 3000);
        }).catch(err => {
            console.log(err);
            setFormErrorMessage(err.message);
        });
    }
    return (
        <div className="container">
            <h3>Form with dynamic attributes</h3>
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Control {...attributeList} onChange={handleDynamicForm}/>
                    </Form.Group>
                </Row>
                <Button size="sm" variant="primary" type="submit" onClick={submitForm} >
                    Submit
                </Button>
                {successMessage && <div className="text-success">{successMessage}</div>}
                {formErrorMessage && <div className="text-danger">{formErrorMessage}</div>}
            </Form>
        </div>
    );
}

export default DynamicField;