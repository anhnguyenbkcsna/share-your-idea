import React from 'react'
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons'
import { Avatar, List, Space } from 'antd'
import styles from './styles.module.scss'

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
)

const IdeaListComponent = (props) => {
  const { fetchIdeas } = props

  return (
    <List
      className={styles.list}
      itemLayout='vertical'
      size='large'
      pagination={{
        onChange: (page) => {
          console.log(page)
        },
        pageSize: 3,
      }}
      dataSource={fetchIdeas}
      // footer={
      //   <div>
      //     <b>ant design</b> footer part
      //   </div>
      // }
      renderItem={(item) => (
        <List.Item
          className={styles.item}
          key={item.title}
          actions={[
            <IconText
              icon={StarOutlined}
              text='4.3'
              key='list-vertical-star-o'
            />,
            <IconText
              icon={LikeOutlined}
              text='156'
              key='list-vertical-like-o'
            />,
            <IconText
              icon={MessageOutlined}
              text='2'
              key='list-vertical-message'
            />,
          ]}
          extra={
            <img
              width={272}
              alt='logo'
              src='https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'
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
  )
}
export default IdeaListComponent
