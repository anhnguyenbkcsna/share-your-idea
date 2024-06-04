import React, { useState, useEffect } from "react"
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons"
import { Avatar, Checkbox, List, Space, Radio } from "antd"
import { NavLink } from "react-router-dom"
import styles from "./styles.module.scss"
const rmvQuote = (str) => {
  return str && str.split('"').join("")
}

const MyIdeaList = (props) => {
  const { fetchIdeas, submissions, setSubmissions } = props
  const [ideaId, setIdeaId] = useState('')

  const handleSetSubmission = (ideaId) => {
    console.log(ideaId)
    setSubmissions(ideaId)
  }

  const onChange = (e) => {
    console.log('radio checked', e.target.value)
    setIdeaId(e.target.value)
  }

  return (
    <Radio.Group onChange={onChange} value={ideaId} style={{ width: '100%' }}>
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
                <Radio value={item.id} onClick={() => handleSetSubmission(item.id)}/>
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
    </Radio.Group>
  )
}
export default MyIdeaList