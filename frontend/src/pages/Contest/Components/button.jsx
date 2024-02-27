import React from 'react'
import styles from '../styles.module.scss'

export function OrangeBasicButton({onClick = ()=>{}, style = {}, text = '', children}) {
  return (
    <div
      style={{
        ...style
      }}
      className={styles.orangeBasicButton}
      onClick={onClick}
    >
      {text || children}
    </div>
  )
}
