import React from "react";
import FormComponent from "../../components/FormComponent";
import { Space } from "antd";
import Navbar from "../../components/Navbar";

const FormPage = () => {
    return (
        <>
            <Navbar />
            <Space direction="horizontal" style={{width: '100%', justifyContent: 'center'}}> 
                <FormComponent />
            </Space>
        </>
    )
}

export default FormPage;