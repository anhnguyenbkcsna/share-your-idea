import React, { useEffect, useState } from "react"
import styles from "./styles.module.scss"
import { Input } from "antd"
import { useNavigate } from "react-router-dom"
const { Search } = Input

const SponsorList = () => {
  const navigate = useNavigate()
  const [projects, setProjects] = useState(192321)
  const [projectName, setProjectName] = useState("Tên dự án")
  const [projectDescription, setProjectDescription] = useState("Mô tả ngắn")
  const [projectCreator, setProjectCreator] = useState()
  const [projectTimeLeft, setProjectTimeLeft] = useState(13)
  const [projectPercentage, setProjectPercentage] = useState(66)

  const onSearch = (value, _e, info) => console.log(info?.source, value)
  const numberWithComma = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  const getRandomPlaceholder = (index) => {
    return `https://picsum.photos/300/150?random=${index}`
  }

  const handleNavigateToProject = (projectId) => {
    console.log("Navigate to project", projectId)
    navigate(`${projectId}`)
  }

  useEffect(() => {
    const getRandomName = async () => {
      const response = await fetch("https://randomuser.me/api")
      const data = await response.json()
      setProjectCreator(data.results[0].name.first) 
    }
  }, [])
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Sponsor Home Page</h1>
        <Search
          placeholder="Tìm kiếm dự án"
          onSearch={onSearch}
          style={{
            width: 200,
          }}
        />
      </div>
      <div className={styles.content}>
        <h2>Có {numberWithComma(projects)} dự án đang kêu gọi</h2>
      </div>
      <div className={styles.projectList}>
        {Array.from({ length: 50 }).map((_, index) => (
          <div key={index} className={styles.projectCard} onClick={() => handleNavigateToProject(index)}>
            <div className={styles.projectImage}>
              <img src={getRandomPlaceholder(index)} alt="Project" />
            </div>
            <div className={styles.projectInfo}>
              <h1>{projectName} {index}</h1>
            </div>
            <div className={styles.projectDescription}>
              <p><i>{projectDescription}</i></p>
            </div>
            <div className={styles.projectFooter}>
              <div className={styles.projectFooterLeft}>
                <h3>{projectCreator}</h3>
              </div>
              <div className={styles.projectFooterRight}>
                <h3>Thời gian còn lại: {projectTimeLeft} ngày</h3>  
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

  )
}

export default SponsorList