import React, { useState, useEffect } from "react"
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons"
import { Avatar, Checkbox, List, Space } from "antd"
import { NavLink } from "react-router-dom"
import styles from "./styles.module.scss"
const rmvQuote = (str) => {
  return str && str.split('"').join("")
}

const MyIdeaList = (props) => {
  const { fetchIdeas, submissions, setSubmissions } = props

  const handleSetSubmission = (ideaId) => {
    console.log(ideaId)
    setSubmissions([...submissions, ideaId])
  }

  return (
    <List
      className={styles.list}
      itemLayout="vertical"
      size="large"
      pagination={{
        pageSize: 3,
      }}
      dataSource={fetchIdeas}
      renderItem={(item) => (
        <List.Item className={styles.item} key={item.title}
          extra={
            <Space> 
              <Checkbox onClick={() => handleSetSubmission(item.id)}/>
            </Space>
          }
        >
          <List.Item.Meta
            avatar={<Avatar src={item.avatar} />}
            title={
              <NavLink to={`/idea/${item.id}`}>{rmvQuote(item.name)}</NavLink>
            }
            description={rmvQuote(item.slogan)}
          />
          <div className={styles.description}>{rmvQuote(item.content)}</div>
        </List.Item>
      )}
    />
  )
}
export default MyIdeaList