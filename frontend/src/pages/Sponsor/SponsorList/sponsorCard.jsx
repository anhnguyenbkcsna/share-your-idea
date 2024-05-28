import React, { useEffect } from "react"
import styles from "./styles.module.scss"
import { useNavigate } from "react-router-dom"
import { getPackageById } from "../../../api/sponsor"
import { Button } from "antd"

const SponsorCard = ({ index, projectId }) => {
  const navigate = useNavigate()

  const getRandomPlaceholder = (index) => {
    return `https://picsum.photos/300/150?random=${index}`
  }

  useEffect(() => {
    console.log("Sponsor ID", projectId)
    getPackageById(projectId).then((res) => {
      console.log(">> getPackageById:", res)
    }).catch((err) => {
      console.log("Error", err)
    })
  }, []) 

  return (
    <div
      key={index}
      className={styles.projectCard}
    >
      <div className={styles.projectImage}>
        <img src={getRandomPlaceholder(index)} alt="Project" />
      </div>
      <div className={styles.projectInfo}>
        <h1>
          {/* {projectName} {index} */}
        </h1>
      </div>
      <div className={styles.projectDescription}>
        <p>
          {/* <i>{projectDescription}</i> */}
        </p>
      </div>
      <div className={styles.projectFooter}>
        <div className={styles.projectFooterLeft}>
          {/* <h3>{projectCreator}</h3> */}
        </div>
      </div>
      <Button
        type="primary"
        style={{
          width: "50%",
          borderRadius: 5,
          backgroundColor: "#f08080",
        }}
      >
        Xem chi tiết
      </Button>
    </div>
  )
}

export default SponsorCard
