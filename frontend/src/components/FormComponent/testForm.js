import { PlusOutlined } from "@ant-design/icons";
import React from "react";
import {
	Form,
	Button,
	Input,
	Slider,
	Upload,
} from "antd";

const normFile = (e) => {
	if (Array.isArray(e)) {
		console.log('>>>>>>  e?.fileList', e?.fileList)
		return e;
	}
	return e?.fileList;
};

const TestForm = (props) => {
	const { setFileList } = props
	const uploadFiles = async (upload) => {
		const { file, fileList } = upload
		setFileList(fileList)
		console.log('>>>>>> file', fileList)
	}
	return (
		<Form
			labelCol={{ span: 4 }}
			wrapperCol={{ span: 14 }}
			layout="horizontal"
			style={{
				minWidth: 600,
				padding: "20px",
			}}
		>
			<Form.Item label="Project name">
				<Input />
			</Form.Item>

			<Form.Item label="Field">
				<Input />
			</Form.Item>

			<Form.Item label="Project slogan">
				<Input />
			</Form.Item>

			<Form.Item label="Description">
				<Input aria-rowcount={4} />
			</Form.Item>

			<Form.Item label="Slider">
				<Slider range step={1} defaultValue={[20, 50]} />
			</Form.Item>

			<Form.Item
				label="Upload"
				valuePropName="fileList"
				getValueFromEvent={normFile}
			>
				<Upload listType="picture-card" onChange={(e) => uploadFiles(e)}>
					<div>
						<PlusOutlined />
						<div style={{ marginTop: 8 }}>Upload</div>
					</div>
				</Upload>
			</Form.Item>
		</Form>
	);
};

export default TestForm;
