import React, { useState, useEffect } from 'react'
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons'
import { Avatar, Checkbox, List, Space } from 'antd'
import { NavLink } from 'react-router-dom'
import styles from './styles.module.scss'
import { getAllUsers } from '../../api/user'

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
        pageSize: 3,
      }}
      dataSource={fetchIdeas}
      renderItem={(item) => (
        <List.Item
          className={styles.item}
          key={item.title}
        >
          <List.Item.Meta
            avatar={<Avatar src={item.avatar} />}
            title={
              <NavLink to = {`/idea/${item._id.$oid}`} >
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
