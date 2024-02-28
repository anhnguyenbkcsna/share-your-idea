import React from 'react'
import styles from './styles.module.scss'

export default function ContestCommentInput({
  placeholder = 'Nhập bình luận của bạn',
  style = {},
  value = '',
  onChange = () => { }
}) {
  return (
    <textarea
      className={styles.commentInput}
      style={{
        ...style
      }}
      placeholder={placeholder}
      // value={value}
      // onChange={onChange}
    />
  )
}
