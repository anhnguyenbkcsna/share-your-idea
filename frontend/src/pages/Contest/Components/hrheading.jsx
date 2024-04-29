import React from 'react'
import styles from './styles.module.scss'

export function HrHeading({ title = '', line = true, style = {} }) {
  return (
    <div className={styles.lineHeading} style={{ ...style }}>
      {line && <hr />}
      <h1>{title}</h1>
    </div>
  )
}
