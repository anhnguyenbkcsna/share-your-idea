import React from 'react'
import styles from './styles.module.scss'

export function OrangeBasicButton({onClick = ()=>{}, style = {}}) {
  return (
    <div
      className={styles.orangeBasicButton}
      style={{
        ...style
      }}
      onClick={onClick}
    >
      Create
    </div>
  )
}
