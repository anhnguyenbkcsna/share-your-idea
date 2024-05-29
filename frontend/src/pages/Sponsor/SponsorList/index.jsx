import React, { useEffect, useState } from "react"
import styles from "./styles.module.scss"
import { Button, Input } from "antd"
import { useNavigate } from "react-router-dom"
import { Pagination } from "antd"
import { sponsorProjectEndpoint } from "../../../utils/api.constants"
import axios from "axios"
import { getAllPackage } from "../../../api/sponsor"
import SponsorCard from "./sponsorCard"
const { Search } = Input

const SponsorList = () => {
  const navigate = useNavigate()
  const [projectList, setProjectList] = useState([])
  const [projects, setProjects] = useState(0)


  // SEARCHING ????
  const onSearch = (value, _e, info) => {
    console.log(info?.source, value)

    let projectId = info
    navigate(`${projectId}`)
  }
  const numberWithComma = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }

  const handleNavigateToProject = (projectId) => {
    console.log("Navigate to project", projectId)
    navigate(`${projectId}`)
  }

  useEffect(() => {
    // const getRandomName = async () => {
    //   const response = await fetch("https://randomuser.me/api")
    //   const data = await response.json()
    //   setProjectCreator(data.results[0].name.first)
    // }
    getAllPackage().then((res) => {
      console.log('All Package', res)
      setProjectList(res.data.data)
      setProjects(res.data.data.length)
    }).catch((err) => {
      console.log('Error', err)
    })
  }, [])
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Kêu gọi tài trợ cho ý tưởng sáng tạo</h1>
        {/* <Search
          placeholder="Tìm kiếm dự án"
          onSearch={onSearch}
          style={{
            width: 400,
          }}
        /> */}
      </div>
      <div className={styles.content}>
        <h2>Có <span style={{ fontWeight: 'bold', color: '#f08080', fontSize: '3rem'}}>{projects}</span> dự án đang kêu gọi</h2>
      </div>
      <div className={styles.projectList}>
        {projectList.map((project, index) => (
          <SponsorCard
            key={index}
            index={index}
            sponsorId={project.id}
          />
        ))}
      </div>
      <Pagination defaultCurrent={1} total={50} />;
    </div>
  )
}

export default SponsorList
