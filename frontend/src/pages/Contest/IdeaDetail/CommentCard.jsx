import React from 'react'
import styles from './styles.module.scss'

export default function ContestCommentCard({
  comment = {},
  style = {}
}) {
  return (
    <div
      className={styles.comment}
      style={{
        ...style
      }}
    >
      <div
        className={styles.commentAvtWrapper}
        style={{
          width: 40,
          height: 40,
          flexShrink: 0
        }}
      >
        <img
          src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s'}
          alt="avatar"
        />
      </div>
      <div className={styles.right}>
        <div className={styles.name}>
          le ngoc hai
        </div>
        <div className={styles.content}>
          y tuong hay
          y tuong hay
          y tuong hay
          y tuong hay
          y tuong hay
          y tuong hay
          y tuong hay
          y tuong hay
          y tuong hay
          y tuong hayy tuong hay
          y tuong hay
          y tuong hay
          y tuong hay
          y tuong hayy tuong hay
          y tuong hay
          y tuong hay
          y tuong hay
          y tuong hayy tuong hay
          y tuong hay
          y tuong hay
          y tuong hay
          y tuong hayy tuong hay
          y tuong hay
          y tuong hay
          y tuong hay
          y tuong hayy tuong hay
          y tuong hay
          y tuong hay
          y tuong hay
          y tuong hayy tuong hay
          y tuong hay
          y tuong hay
          y tuong hay
          y tuong hayy tuong hay
          y tuong hay
          y tuong hay
          y tuong hay
          y tuong hayy tuong hay
          y tuong hay
          y tuong hay
          y tuong hay
          y tuong hayy tuong hay
          y tuong hay
          y tuong hay
          y tuong hay
          y tuong hay
        </div>
      </div>
    </div>
  )
}
