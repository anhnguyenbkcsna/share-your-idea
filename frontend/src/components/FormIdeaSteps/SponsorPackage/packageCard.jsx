import React from "react"
import styles from "./styles.module.scss"
import { Form, Input, Collapse } from "antd"
const { TextArea } = Input

const PackageCard = (props) => {
  return (
    <Collapse defaultActiveKey={["1"]}>
      <Collapse.Panel header="Gói tài trợ" key="1">
        <Form.Item
          name="packageName"
          rules={[{ required: true, message: "Hãy nhập mô tả còn thiếu" }]}
          label="Tên gói tài trợ"
        >
          <TextArea placeholder="Gói tài trợ vàng" />
        </Form.Item>

        <Form.Item
          name="packageValue"
          rules={[{ required: true, message: "Hãy nhập mô tả còn thiếu" }]}
          label="Giá trị gói tài trợ"
        >
          <TextArea rows={3} placeholder="10.000$" />
        </Form.Item>
        <Form.Item
          name="packageBenefits"
          rules={[{ required: true, message: "Hãy nhập mô tả còn thiếu" }]}
          label="Lợi ích gói tài trợ"
        >
          <TextArea
            rows={5}
            placeholder=" Gói tài trợ vàng sẽ giúp bạn tiếp cận với 1000 khách hàng tiềm năng.
          Bạn sẽ được quảng cáo trên trang chủ của chúng tôi và được giới thiệu trong các sự kiện quan trọng.
          Bạn sẽ nhận được 10% doanh thu từ việc quảng cáo trên trang web của chúng tôi.
          Bạn sẽ được hỗ trợ về mặt kỹ thuật và tư vấn pháp lý miễn phí."
          />
        </Form.Item>
      </Collapse.Panel>
    </Collapse>
  )
}

export default PackageCard
