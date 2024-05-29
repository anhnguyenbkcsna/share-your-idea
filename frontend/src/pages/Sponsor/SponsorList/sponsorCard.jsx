import React, { useState, useEffect } from "react"
import styles from "./styles.module.scss"
import { useNavigate } from "react-router-dom"
import { getSponsorEventById } from "../../../api/sponsor"
import { Button } from "antd"

const SponsorCard = ({ index, sponsorId }) => {
  const navigate = useNavigate()
  const [sponsorProject, setSponsorProject] = useState()

  const getRandomPlaceholder = (index) => {
    return `https://picsum.photos/300/150?random=${index}`
  }

  const handleNavigateToProject = (sponsorId) => {
    navigate(`/sponsor/projects/${sponsorId}`)
  }

  useEffect(() => {
    getSponsorEventById(sponsorId).then((res) => {
      setSponsorProject(res.data.data)
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
          {sponsorProject?.name}
        </h1>
      </div>
      <div className={styles.projectDescription}>
        <p>
          <i>{sponsorProject?.description}</i>
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
        onClick={() => handleNavigateToProject(sponsorId)}
      >
        Xem chi tiết
      </Button>
    </div>
  )
}

export default SponsorCard
