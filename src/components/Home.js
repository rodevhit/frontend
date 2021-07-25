import axios from "../axios";
import { useEffect, useState } from "react";
import DynamicField from "./DynamicField";

const Home = () => {
    const [attributes, setAttributes] = useState(null)
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}app/attributeList`)
        .then(data => {
            console.log(data);
            setAttributes(data?.data?.attrList?.rows);
        })
    }, [])

    return (
        <div className="container">
            <div className="home">
                {attributes && <DynamicField attributes={attributes} />}
            </div>
        </div>
    );
}

export default Home;