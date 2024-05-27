import React, { useState } from "react"
import styles from './styles.module.scss'
import PackageCard from "./packageCard"
import { Button } from "antd"
import { PlusCircleOutlined } from "@ant-design/icons"

const SponsorPackage = () => {
  const [numberOfPackage, setNumberOfPackage] = useState(1)
  return (
    <>
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
      }}>
        <Button type="primary" onClick={() => setNumberOfPackage(numberOfPackage + 1)}
          style={{
            height: 50,
            marginBottom: 20,
            borderRadius: 10,
          }}
        >
          <PlusCircleOutlined />
          Thêm gói tài trợ
        </Button>
      </div>
      <div className={styles.packageContainer}>
        {[...Array(numberOfPackage)].map((_, index) => (
          <PackageCard key={index} />
        ))}
      </div>
    </>
  )
}
export default SponsorPackage
