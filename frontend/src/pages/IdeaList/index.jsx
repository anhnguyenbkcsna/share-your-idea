import React, { useState, useEffect } from "react"
import axios from "axios"
import { deployedAPI } from "../../utils/form.constants"
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons"
import { Avatar, List, Space } from "antd"
import styles from "./styles.module.scss"

const data = Array.from({
  length: 23,
}).map((_, i) => ({
  href: "https://ant.design",
  title: `ant design part ${i}`,
  avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
  description:
    "Ant Design, a design language for background applications, is refined by Ant UED Team.",
  content:
    "We supply a series of design principles, practical patterns and high quality",
}))
const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
)

const InnovatorIdea = () => {
  const [fetchIdeas, setFetchIdeas] = useState([])

  useEffect(() => {
    const fetchIdea = async () => {
      let response = await axios
        .get(`${deployedAPI}/idea`)
        .then((res) => res.data)
      console.log(response.data)
      setFetchIdeas(response.data)
    }
    fetchIdea()
  }, [])
  console.log(">>>> fetchIdea", fetchIdeas)	
  
  return (
    <div className={styles.container}>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page)
          },
          pageSize: 3,
        }}
        dataSource={fetchIdeas}
        footer={
          <div>
            <b>ant design</b> footer part
          </div>
        }
        renderItem={(item) => (
          <List.Item
            key={item.title}
            actions={[
              <IconText
                icon={StarOutlined}
                text="156"
                key="list-vertical-star-o"
              />,
              <IconText
                icon={LikeOutlined}
                text="156"
                key="list-vertical-like-o"
              />,
              <IconText
                icon={MessageOutlined}
                text="2"
                key="list-vertical-message"
              />,
            ]}
            extra={
              <img
                width={272}
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a href={item.href}>{item.name}</a>}
              description={item.slogan}
            />
            <div className={styles.description}>
              {item.problem}
            </div>
          </List.Item>
        )}
      />
    </div>
  )
}
export default InnovatorIdea
