import React, { useEffect } from 'react'
import { parseJsonString } from '../../../../utils/utils'
import styles from '../styles.module.scss'


// This component is used to display the details of the idea submitted by the user
export function IdeaListItem({ idea, onClick = () => { } }) {
  const { name, solution, problem } = idea

  return (
    <div className={styles.ideaListItem} onClick={onClick}>
      <div className={styles.title}><b>{parseJsonString(name)}</b></div>
      <div className={styles.line} style={{ margin: '6px 0' }}>
        <span className={styles.label}>Vấn đề: </span>
        {parseJsonString(problem)}
      </div>
      <div className={styles.line}>
        <span className={styles.label}>Giải pháp: </span>
        {parseJsonString(solution)}
      </div>
    </div>
  )
}
