import React from 'react'
import styles from './styles.module.scss'

export function OrangeBasicButton({onClick = ()=>{}, style = {}, text = ''}) {
  return (
    <div
      className={styles.orangeBasicButton}
      style={{
        ...style
      }}
      onClick={onClick}
    >
      {text}
    </div>
  )
}
