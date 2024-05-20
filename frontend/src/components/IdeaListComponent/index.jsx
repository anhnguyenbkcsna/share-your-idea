import React, { useState, useEffect } from 'react'
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons'
import { Avatar, List, Space } from 'antd'
import { NavLink } from 'react-router-dom'
import styles from './styles.module.scss'
import { getAllUsers } from '../../api/user'

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
)

const rmvQuote = (str) => {
  return str && str.split('\"').join('')
}

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
        >
          <List.Item.Meta
            avatar={<Avatar src={item.avatar} />}
            title={
              <NavLink to = {`/idea/${item.id}`} >
                {rmvQuote(item.name)}
              </NavLink>
            }
            description={rmvQuote(item.slogan)}
          />
          <div className={styles.description}>
            {rmvQuote(item.content)}
          </div>
        </List.Item>
      )}
    />
  )
}
export default IdeaListComponent
