import React, { useEffect, useState } from "react";
import {
    createGoogleMeetEvent,
    initGoogleClient,
    signIn,
    isSignedIn,
} from "../../services/meet";
import {
    Button,
    Form,
    Input,
    DatePicker,
    Divider,
    ConfigProvider,
    Space,
} from "antd";
import "./styles.css";
import viVN from "antd/lib/locale/vi_VN";

export default function MeetPage() {
    const [signedIn, setSignedIn] = useState(false);

    const [event, setEvent] = useState({});

    const handleCreateEvent = async () => {
        console.log("Creating Google Meet event...");
        // const event = {
        //     summary: "Google Meet Test Event",
        //     description: "A test event with Google Meet link",
        //     start: "2024-05-23T10:00:00-07:00",
        //     end: "2024-05-23T11:00:00-07:00",
        // };

        // try {
        //     const response = await createGoogleMeetEvent(event);
        //     console.log("Event created:", response);
        // } catch (error) {
        //     console.error("Error creating event:", error);
        // }
    };

    const handleSignIn = () => {
        signIn().then(() => {
            setSignedIn(isSignedIn());
        });
    };

    const handleFinish = async (event) => {
        for (let key in event) {
            event[key] = event[key] ?? "";
        }
        console.log(event);

        try {
            const response = await createGoogleMeetEvent(event);
            console.log("Event created:", response);
        } catch (error) {
            console.error("Error creating event:", error);
        }
    };

    useEffect(() => {
        initGoogleClient();
    }, []);

    return (
        <div>
            <h1>Meet Page</h1>
            <div>
                {!signedIn && <button onClick={handleSignIn}>Sign In</button>}
            </div>
            <div>
                <ConfigProvider locale={viVN}>
                    <Form onFinish={handleFinish}>
                        <Form.Item
                            name="summary"
                            label="Tên sự kiện"
                            required
                            rules={[
                                {
                                    type: "string",
                                    min: 10,
                                },
                            ]}
                        >
                            <Input placeholder="vd: gọi vốn cho ý tưởng" />
                        </Form.Item>
                        <Form.Item
                            name="description"
                            label="Mô tả"
                            rules={[
                                {
                                    type: "string",
                                    min: 10,
                                },
                            ]}
                        >
                            <Input placeholder="vd: mô tả cho sự kiện gọi vốn" />
                        </Form.Item>
                        <Form.Item
                            name="start"
                            label="Ngày giờ bắt đầu"
                            required
                        >
                            <DatePicker
                                disabledDate={(current) => current < new Date()}
                                name="start"
                                showNow
                                format="YYYY-MM-DD HH:mm"
                                showTime={{
                                    format: "HH:mm",
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="end"
                            label="Ngày giờ kết thúc"
                            required
                        >
                            <DatePicker
                                disabledDate={(current) => current < new Date()}
                                name="end"
                                format="YYYY-MM-DD HH:mm"
                                showTime={{
                                    format: "HH:mm",
                                }}
                                showNow
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </ConfigProvider>
            </div>
        </div>
    );
}
