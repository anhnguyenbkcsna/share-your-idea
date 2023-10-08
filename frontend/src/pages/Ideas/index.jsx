import React from "react";
import IdeaCard from "../../components/IdeaCard";
import { Row, Col } from "antd";

const IdeaPage = () => {
    return (
        <div>
            <Row>
                <Col span={6}>
                    <IdeaCard />
                </Col>
                <Col span={6}>
                    <IdeaCard />
                </Col>
                <Col span={6}>
                    <IdeaCard />
                </Col>
                <Col span={6}>
                    <IdeaCard />
                </Col>
                <Col span={6}>
                    <IdeaCard />
                </Col>
                <Col span={6}>
                    <IdeaCard />
                </Col>
                <Col span={6}>
                    <IdeaCard />
                </Col>

            </Row>
        </div>
    )
}

export default IdeaPage;