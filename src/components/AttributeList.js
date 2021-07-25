import { Table, Button } from 'react-bootstrap';
import { useState } from "react";
import EditAttribute from './EditAttribute';
import axios from "../axios";

const AttributeList = ({ attrList }) => {
    const [formErrorMessage, setFormErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const [show, toggleModal] = useState(false);
    const [currAttr, setCurrAttr] = useState();

    const handleEdit = (attrData) => {
        toggleModal(true);
        setCurrAttr(attrData)
    }

    const handleDelete = (attrData) => {
        console.log(attrData?.attribute_id);
        const attId = attrData?.attribute_id;
        const sendData = { attrId: attId };
        if(window.confirm('Delete the attribute?')){
            axios.patch(`${process.env.REACT_APP_API_BASE_URL}app/removeAttribute`, sendData)
            .then(({ data }) => {
                attrList.splice(attrList.findIndex(attr => attr.attribute_id === attId) , 1)
                setSuccessMessage(data.message);
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000);
            }).catch(err => {
                console.log(err);
                setFormErrorMessage(err.message);
            });
        };
    }
    return (
        <>
            <Table size="sm" striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Attribute Name</th>
                        <th>Attribute value</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {attrList && attrList.map(attr => {
                        return (
                            <tr key={attr.attribute_id}>
                                <td>{attr.attribute_id}</td>
                                <td>{attr.attribute_name}</td>
                                <td>{attr.attribute_value}</td>
                                <td>
                                    <Button size="sm" variant="info" onClick={() => handleEdit(attr)}>Edit</Button>{' '}
                                    <Button size="sm" variant="danger" onClick={() => handleDelete(attr)}>Delete</Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            {successMessage && <div className="text-success">{successMessage}</div>}
            {formErrorMessage && <div className="text-danger">{formErrorMessage}</div>}
            <EditAttribute
                modalStat={show}
                setAttrModalStat={toggleModal}
                attrData={currAttr}
                setAttrData={setCurrAttr}
            />
        </>
    );
}

export default AttributeList;