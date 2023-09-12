import React from "react";
import Form from "../../components/Form";
import { Space } from "antd";

const FormPage = () => {
    return (
        <>
            <h1>pages/Form</h1>
            <Space direction="horizontal" style={{width: '100%', justifyContent: 'center'}}> 
                <Form />
            </Space>
        </>
    )
}

export default FormPage;