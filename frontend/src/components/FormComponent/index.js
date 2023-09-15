import React, { useState } from "react";
import { Typography } from "antd";
import { Button, message, Steps } from "antd";
import TestForm from "./testForm";
import {
	Form,
	Input,
	Slider,
	Upload,
} from "antd";

const steps = [
    {
        title: "First",
        content: "Overview",
    },
    {
        title: "Second",
        content: "Customer Segments",
    },
    {
        title: "Third",
        content: "Value Position",
    },
    {
        title: "Last",
        content: "Furthur Information",
    },
];

const FormComponent = () => {
    const [current, setCurrent] = useState(0);
    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };
    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));

    return (
        <div class="formContainer">
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{
                    minWidth: 1000,
                    border: "1px solid #ccc",
                    borderRadius: "5%",
                    padding: "20px",
                }}
            >
                <Typography.Title level={3}>
                    
                </Typography.Title>
                <Steps current={current} items={items} />
                
                <Typography.Title level={3}>
                    {steps[current].content}
                </Typography.Title>
                
                {/* Content */}
                {current === 0 && 
                    <TestForm />
                }
                {current === 1 && 
                    <TestForm/>
                }
                {current === 2 && 
                    <TestForm/>
                }
                {current === 3 && 
                    <TestForm/>
                }
                
                <div style={{ marginTop: 24 }}>
                    {current > 0 && (
                        <Button style={{ margin: "0 8px" }} onClick={() => prev()} >
                            Previous
                        </Button>
                    )}
                    {current < steps.length - 1 && (
                        <Button type="primary" onClick={() => next()}>
                        Next
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button type="primary" onClick={() => message.success("Processing complete!")} >
                            Done
                        </Button>
                    )}
                </div>
            </Form>
        </div>
    );
};

export default FormComponent;
