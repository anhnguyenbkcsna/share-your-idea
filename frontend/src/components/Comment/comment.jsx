import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { Avatar } from 'antd'
import axios from 'axios'
import { deployedAPI } from '../../utils/form.constants'
import { UserOutlined, LikeOutlined, DislikeOutlined, LikeFilled, DislikeFilled } from '@ant-design/icons'

const Comment = ({ comment }) => {
  const [authorName, setAuthorName] = useState('Anonymous')
  const [isLike, setIsLike] = useState(false)
  const [isDislike, setIsDislike] = useState(false)

  const handleLike = () => {
    setIsLike(!isLike)
    setIsDislike(false)
  }

  const handleDislike = () => {
    setIsDislike(!isDislike)
    setIsLike(false)
  }

  useEffect(() => {
    const fetchAuthor = async () => {
      let response = await axios
        .get(`${deployedAPI}/accounts/`)
        .then((res) => res.data)

      // Set author name with author id
      response.data.forEach((item) => {
        if (item.id === comment.id) {
          setAuthorName(item.name)
        }
      })
    }
    fetchAuthor()
  }, [])

  return (
    <div>
      <div className={styles.comment}>
        <Avatar size='large' src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        <div className={styles.commentContent}>
          <div className={styles.commentHeader}>
            <div className={styles.commentAuthor}>
              {authorName}
            </div>
            <div className={styles.commentDate}>
              {comment.date}
            </div>
          </div>
          <div className={styles.commentBody}>
            {comment.content}
          </div>
          <div className={styles.commentFooter}>
            <div style={{ marginRight: '1rem' }} onClick={handleLike}>
              {isLike ? <LikeFilled /> : <LikeOutlined />} {comment.like}
            </div>
            <div style={{ marginRight: '1rem' }} onClick={handleDislike}>
              {isDislike ? <DislikeFilled /> : <DislikeOutlined />} {comment.dislike}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Comment
