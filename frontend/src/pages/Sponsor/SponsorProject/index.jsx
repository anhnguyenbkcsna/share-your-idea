import React, { useEffect, useState } from "react"
import styles from "./styles.module.scss"
import { Carousel, Button } from "antd"
import { useNavigate } from "react-router-dom"
import SponsorProjectCard from "../../../components/SponsorProject/SponsorProjectCard"
import { getSponsorEventById, getSponsorPackageBySponsorId } from "../../../api/sponsor"
import { getIdeaById } from "../../../api/idea"

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
  const [sponsorId, setSponsorId] = useState(window.location.href.split("/")[5])
  const [idea, setIdea] = useState({})
  const [sponsorPackage, setSponsorPackage] = useState([])

  const getRandomPlaceholder = (index) => {
    return `https://picsum.photos/500/400?random=${index}`
  }

  useEffect(() => {
    getSponsorEventById(sponsorId).then((res) => {
      res = res.data.data
      console.log(">> getSponsorEventById :", res)
      setSponsorPackage([res])

      getIdeaById(res.idea_id).then((res) => {
        console.log(">> getIdeaById :", res)
        setIdea(res)
      })
    }).catch((err) => {
      console.log("Error", err)
    })

    // // Get sponsor package by sponsorId
    // getSponsorPackageBySponsorId(sponsorId).then((res) => {
    //   console.log(">> getSponsorPackageBySponsorId :", res.data.data.packages)
    //   setSponsorPackage(res.data.data.packages)

    // })
    // .catch((err) => {
    //   console.log("Error", err)
    // })
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '6fr 1fr',
        }}>
          <h1
            style={{
              color: "#f08080",
            }}
          >
            {idea?.name}
          </h1>
          <Button type="primary" style={{ marginTop: 20, height: 50, backgroundColor: '#f08080' }} onClick={() => navigate('edit')}>
            Thêm gói tài trợ
          </Button>
        </div>

        <img
          className={styles.image}
          // src="https://vista.gov.vn/vn-uploads/news/2022_08/31-8-2022/0.jpg"
          src={getRandomPlaceholder(sponsorId)}
          alt="Project Image"
        />
        <p style={{ fontSize: "1.5rem" }}>
          <div style={{ marginTop: 20 }}>
            <h2>Tính cấp thiết</h2>
            <br />
            {idea?.problem}
          </div>
          <div style={{ marginTop: 20 }}>
            <h2>Hướng giải quyết</h2>
            <br />
            {idea?.solution}
          </div>
          <div style={{ marginTop: 20 }}>
            <h2>Các sản phẩm/ứng dụng tương tự</h2>
            <br />
            {idea?.apps}
          </div>
          <div style={{ marginTop: 20 }}>
            <h2>Điểm nổi bật</h2>
            <br />
            {idea?.outstand}
          </div>
        </p>
      </div>
      {sponsorPackage?.map((item, index) => {
        item = item.packages
        return (
          <>
            {console.log(">> SponsorPackage: ", item)}
            <SponsorProjectCard
              img="https://1office.vn/wp-content/uploads/2023/04/FNvBU9QVUAAlFnK-1024x683.jpg"
              title={item[0].name}
              description={item[0].description}
              price={item[0].value}
              benefits={item[0].benefits}
            />
          </>

        )
      })}
      {/* <SponsorProjectCard
        img={
          "https://1office.vn/wp-content/uploads/2023/04/FNvBU9QVUAAlFnK-1024x683.jpg"
        }
        title={"Gói tài trợ vàng"}
        price={"1,000,000 VNĐ"}
        description={`Hãy trở thành một trong những người đầu tiên trải nghiệm dịch vụ của chúng tôi. 
        Chúng tôi cam kết sẽ mang lại trải nghiệm tốt nhất cho bạn.`}
      /> */}
    </div>
  )
}

export default SponsorProject
