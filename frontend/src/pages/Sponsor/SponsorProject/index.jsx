import React, { useEffect, useState } from "react"
import styles from "./styles.module.scss"
import { Carousel, Button } from "antd"
import { useNavigate } from "react-router-dom"
import SponsorProjectCard from "../../../components/SponsorProject/SponsorProjectCard"

const contentStyle = {
  margin: 0,
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
}

const SponsorProject = () => {
  const navigate = useNavigate()
  const [projects, setProjects] = useState(192321)
  const [projectName, setProjectName] = useState("Tên dự án")
  const [projectDescription, setProjectDescription] = useState("")
  const [projectCreator, setProjectCreator] = useState("Nguyễn Ngọc")

  const onSearch = (value, _e, info) => console.log(info?.source, value)

  const onChange = (currentSlide) => {
    console.log(currentSlide)
  }

  const numberWithComma = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  const getRandomPlaceholder = (index) => {
    return `https://picsum.photos/300/150?random=${index}`
  }
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div style={{
          display: "flex",
          flexDirection: "row",
        }}>
          <h1
            style={{
              color: "#ff8c00",
            }}
          >
            Dự Án Sáng Tạo về Năng Lượng Xanh: "Mạng Lưới Năng Lượng Tái Tạo Cộng
            Đồng (Community Renewable Energy Network - CREN)"
          </h1>
          <Button type="primary" style={{ marginTop: 20, height: 50 }} onClick={() => navigate('edit')}>
            Thêm gói tài trợ
          </Button>
        </div>

        <img
          className={styles.image}
          src="https://vista.gov.vn/vn-uploads/news/2022_08/31-8-2022/0.jpg"
          alt="Project Image"
        />
        <p style={{ fontSize: "1.5rem" }}>
          <strong>Tác giả: {projectCreator}</strong>
          <div style={{ marginTop: 20 }}>
            <h2>Tính cấp thiết</h2>
            <br />
            Sự phát triển nhanh chóng của công nghiệp và đô thị hóa đã làm tăng
            nhu cầu năng lượng trên toàn thế giới. Điều này dẫn đến sự phụ thuộc
            quá mức vào các nguồn năng lượng hóa thạch, gây ra nhiều vấn đề
            nghiêm trọng như: biến đổi khí hậu, ô nhiễm không khí, cạn kiệt tài
            nguyên. Trước tình hình này, việc chuyển đổi sang các nguồn năng
            lượng tái tạo là cấp thiết để đảm bảo sự phát triển bền vững và bảo
            vệ môi trường.
          </div>
          <div style={{ marginTop: 20 }}>
            <h2>Hướng giải quyết</h2>
            <br />
            Lắp đặt các hệ thống năng lượng tái tạo:
            <li>
              Năng lượng mặt trời: Lắp đặt các tấm pin mặt trời trên mái nhà của
              các hộ gia đình, trường học, và các tòa nhà công cộng.{" "}
            </li>
            <li>
              Năng lượng gió: Xây dựng các trạm gió nhỏ ở các khu vực có điều
              kiện gió tốt.
            </li>
            <li>
              Năng lượng nước: Xây dựng các nhà máy thủy điện nhỏ ở các con sông
              nhỏ.
            </li>
          </div>
          <div style={{ marginTop: 20 }}>
            Xây dựng cơ sở hạ tầng lưu trữ và phân phối:
            <li>
              Pin lưu trữ: Sử dụng các hệ thống pin lưu trữ để tích trữ năng
              lượng dư thừa từ các nguồn tái tạo, đảm bảo cung cấp điện liên tục
              và ổn định.
            </li>
            <li>
              Mạng lưới thông minh (Smart Grid): Triển khai hệ thống lưới điện
              thông minh để quản lý và phân phối năng lượng một cách hiệu quả,
              tối ưu hóa việc sử dụng năng lượng tái tạo.
            </li>
          </div>
        </p>
      </div>
      <SponsorProjectCard
        img={
          "https://1office.vn/wp-content/uploads/2023/04/FNvBU9QVUAAlFnK-1024x683.jpg"
        }
        title={"Gói tài trợ tiêu chuẩn"}
        price={"500,000 VNĐ"}
        description={`Hãy trở thành một trong những người đầu tiên trải nghiệm dịch vụ của chúng tôi. 
        Chúng tôi cam kết sẽ mang lại trải nghiệm tốt nhất cho bạn.`}
      />

      <SponsorProjectCard
        img={
          "https://1office.vn/wp-content/uploads/2023/04/FNvBU9QVUAAlFnK-1024x683.jpg"
        }
        title={"Gói tài trợ vàng"}
        price={"1,000,000 VNĐ"}
        description={`Hãy trở thành một trong những người đầu tiên trải nghiệm dịch vụ của chúng tôi. 
        Chúng tôi cam kết sẽ mang lại trải nghiệm tốt nhất cho bạn.`}
      />
    </div>
  )
}

export default SponsorProject
