import React from "react"
import styles from "./styles.module.scss"
import { Button } from "antd"

const DonateHomePage = () => {
  const onSearch = (value, _e, info) => console.log(info?.source, value)

  return (
    <div className={styles.container}>
      <div className={styles.headerBanner}>
        <h1 className={styles.slogan}>Chung tay góp sức, tạo dựng tương lai!</h1>
        <div className={styles.btnContainer}>
          <Button type="primary" className={styles.primaryBtn}>Tài trợ dự án</Button>
          <Button type="default" className={styles.btn}>Kêu gọi tài trợ</Button>
        </div>
        <i>Nền tảng kêu gọi tài trợ cho các dự án dành cho cá nhân và các tổ chức</i>
        {/* <img src="https://via.placeholder.com/150" alt="Banner" /> */}
        <div className={styles.statistics}>
          <div className={styles.elementCard}>
            <h1>2131</h1>
            <h3>dự án được tài trợ</h3>
          </div>
          <div className={styles.elementCard}>
            <>
              <h1>293,939 tỷ VNĐ </h1>
              <h3>tổng tài trợ</h3>
            </>
          </div>
          <div className={styles.elementCard}>
            <h1>123,123</h1>
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

export default DonateHomePage