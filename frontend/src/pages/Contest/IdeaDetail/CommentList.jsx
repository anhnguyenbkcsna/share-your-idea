import React from 'react'
import { Avatar, List, Space, ConfigProvider, theme, Pagination } from 'antd'
import ContestCommentCard from './CommentCard'
import styles from './styles.module.scss'

export default function ContestCommentList({ data }) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Pagination: {
            fontSize: '1.7rem',
            paddingXXS: 0,
            itemSize: 40  ,
          }
        }
      }}
    >
      <List
        className={styles.comments}
        itemLayout="vertical"
        size="large"
        pagination={{
          pageSize: 5,
          style: {
            width: '80%',
            fontWeight: 'bold'
          },
          align: 'center',
          showSizeChanger: false,
        }}
        dataSource={data}
        renderItem={(item, idx) => (
          <List.Item
            key={idx}
            style={{
              border: 'none',
              padding: 0
            }}
          >
            <List.Item.Meta />
            <ContestCommentCard />
          </List.Item>
        )}
      />
    </ConfigProvider>
  )
}
