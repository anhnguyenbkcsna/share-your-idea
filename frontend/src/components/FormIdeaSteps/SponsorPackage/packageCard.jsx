import React, { useState, useEffect } from "react"
import styles from "./styles.module.scss"
import { Form, Input, Collapse, message, Select } from "antd"
import { on } from "process"
import { useNavigate } from "react-router-dom"
import { createNewSponsorEvent, createSponsorPackage } from "../../../api/sponsor"
import { sponsorBenefits, sponsorBenefitsOptions } from "../../../utils/form.constants"
import { labelValueGenerate } from "../../../utils/global.constants"
const { TextArea } = Input

const PackageCard = ({ id, submit }) => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [ideaId, setIdeaId] = useState(window.location.href.split("/")[5])

  useEffect(() => {
    if (submit) {
      // Log form data
      let formData = form.getFieldsValue()
      formData.idea_id = ideaId

      console.log("<< Form data:", formData)
      createNewSponsorEvent(formData).then((res) => {
        message.success("Tạo gói tài trợ thành công")
        setTimeout(() => {
          navigate(`/sponsor/projects/${ideaId}/`)
        }, 1000)
      }
    ).catch((err) => {
      console.log("<< Error creating event:", err)
    })
    }
  }, [submit])

  return (
    <Form form={form} layout="vertical">
      <Collapse defaultActiveKey={["1"]}>
        <Collapse.Panel header="Gói tài trợ" key="1">
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Hãy nhập mô tả còn thiếu" }]}
            label="Tên gói tài trợ"
          >
            <TextArea placeholder="Gói tài trợ vàng" />
          </Form.Item>

          <Form.Item
            name="description"
            rules={[{ required: true, message: "Hãy nhập mô tả còn thiếu" }]}
            label="Mô tả gói tài trợ"
          >
            <TextArea rows={3} placeholder="Gói hỗ trợ nhà phát triển xây dựng..." />
          </Form.Item>

          <Form.Item
            name="value"
            rules={[{ required: true, message: "Hãy nhập mô tả còn thiếu" }]}
            label="Giá trị gói tài trợ"
          >
            <TextArea rows={3} placeholder="10.000$" />
          </Form.Item>
          <Form.Item
            name="benefits"
            rules={[{ required: true, message: "Hãy nhập mô tả còn thiếu" }]}
            label="Lợi ích gói tài trợ"
          >
            <Select
              mode="tags"
              options={sponsorBenefitsOptions}
              placeholder=" Gói tài trợ vàng sẽ giúp bạn tiếp cận với 1000 khách hàng tiềm năng.
            Bạn sẽ được quảng cáo trên trang chủ của chúng tôi và được giới thiệu trong các sự kiện quan trọng.
            Bạn sẽ nhận được 10% doanh thu từ việc quảng cáo trên trang web của chúng tôi.
            Bạn sẽ được hỗ trợ về mặt kỹ thuật và tư vấn pháp lý miễn phí."
            />
          </Form.Item>
        </Collapse.Panel>
      </Collapse>
    </Form>
  )
}

export default PackageCard
