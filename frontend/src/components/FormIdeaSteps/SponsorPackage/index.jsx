import React, { useState } from "react"
import styles from './styles.module.scss'
import PackageCard from "./packageCard"
import { Button } from "antd"

const SponsorPackage = () => {
  const [numberOfPackage, setNumberOfPackage] = useState(1)
  return (
    <>
      <Button type="primary" className={styles.addPackageBtn} onClick={() => setNumberOfPackage(numberOfPackage + 1)}>
        Thêm gói tài trợ
      </Button>
      
      <div className={styles.packageContainer}>
        {[...Array(numberOfPackage)].map((_, index) => (
          <PackageCard key={index} />
        ))}
      </div>
    </>
  )
}
export default SponsorPackage
