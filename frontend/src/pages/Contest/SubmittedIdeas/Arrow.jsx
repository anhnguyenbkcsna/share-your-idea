import React from 'react'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import styles from './styles.module.scss'


export const PrevArrow = props => {
  const { style, onClick } = props
  return (
    <div
      className={styles.arrow}
      style={{
        ...style,
        left: '-5%'
      }}
      onClick={onClick}
    >
      <LeftOutlined className={styles.arrowIcon} />
    </div>
  )
}

export const NextArrow = props => {
  const { style, onClick } = props
  return (
    <div
      className={styles.arrow}
      style={{
        ...style,
        right: '-5%'
      }}
      onClick={onClick}
    >
      <RightOutlined className={styles.arrowIcon} />
    </div>
  )
}

