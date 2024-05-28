import React, { useEffect, useState } from "react"
import styles from "./styles.module.scss"
import { Button, Modal } from "antd"
import { Link, useNavigate } from "react-router-dom"
import MyIdeaList from "../../Contest/Info/myIdeaList"
import { getAllIdeas } from "../../../api/idea"

const SponsorHomePage = () => {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [fetchIdeas, setFetchIdeas] = useState([])
  const [yourSubmit, setYourSubmit] = useState()
  
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleOk = () => {
    setIsModalOpen(false)
    navigate(`/sponsor/projects/${yourSubmit}/edit`)
  }

  useEffect(() => {
    getAllIdeas().then((res) => {
      setFetchIdeas(res)
    })
  }, [])

  return (
    <div className={styles.container}>
      <Modal 
        title="Nộp ý tưởng" 
        open={isModalOpen} 
        onOk={handleOk} 
        onCancel={handleCancel}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            Chọn
          </Button>,
        ]}
        width={800}
      >
        { fetchIdeas.length > 0 ? 
          <MyIdeaList fetchIdeas={fetchIdeas} submissions={yourSubmit} setSubmissions={setYourSubmit} />
          : <Button type="primary" onClick={() => navigate('/innovator/idea')}
              style={{ width: 200 }}
          >
            Thêm ý tưởng
          </Button>
        }
      </Modal>
      <div className={styles.headerBanner}>
        <h1 className={styles.slogan}>Chung tay góp sức, tạo dựng tương lai!</h1>
        <div className={styles.btnContainer}>
          <Button type="primary" className={styles.primaryBtn}>
            <Link to="projects">
              Tài trợ dự án
            </Link>
          </Button>
          <Button type="default" className={styles.btn} onClick={() => setIsModalOpen(!isModalOpen)}>
            Kêu gọi tài trợ
          </Button>
        </div>
        <i>Nền tảng kêu gọi tài trợ cho các dự án dành cho cá nhân và các tổ chức</i>
        {/* <img src="https://via.placeholder.com/150" alt="Banner" /> */}
        <div className={styles.statistics}>
          <div className={styles.elementCard}>
            <h1>24</h1>
            <h3>dự án được tài trợ</h3>
          </div>
          <div className={styles.elementCard}>
            <>
              <h1>39 triệu VNĐ </h1>
              <h3>tổng tài trợ</h3>
            </>
          </div>
          <div className={styles.elementCard}>
            <h1>76</h1>
            <h3>người tài trợ</h3>
          </div>
        </div>
      </div>
      {/* <div style={{
        height: '80vh',
      }}>

      </div> */}
    </div>
  )
}

export default SponsorHomePage