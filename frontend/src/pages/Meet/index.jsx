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
import viVN  from "antd/lib/locale/vi_VN";

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

    useEffect(() => {
        initGoogleClient();
    }, []);

    return (
        <div>
            <h1>Meet Page</h1>
            <div>
                {signedIn ? (
                    <button onClick={handleCreateEvent}>
                        Create Google Meet Event
                    </button>
                ) : (
                    <button onClick={handleSignIn}>Sign In</button>
                )}
            </div>
            <div>
                <Form>
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
                        <Input placeholder="vd: gọi vốn cho ý tưởng" />
                    </Form.Item>
                    {/* <Form.Item name="start" label="Ngày giờ bắt đầu" required>
                        <DatePicker name="start" showTime showNow />
                    </Form.Item>
                    <Form.Item name="end" label="Ngày giờ kết thúc" required>
                        <DatePicker name="end" showTime />
                    </Form.Item> */}
                    <ConfigProvider locale={viVN}>
                        <Form.Item
                            name="start"
                            label="Ngày giờ bắt đầu"
                            required
                        >
                            <DatePicker.RangePicker showTime />
                        </Form.Item>
                    </ConfigProvider>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
