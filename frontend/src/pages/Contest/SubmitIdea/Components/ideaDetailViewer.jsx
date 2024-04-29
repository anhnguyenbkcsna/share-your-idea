import React, { useEffect } from 'react'
import { parseJsonString } from '../../../../utils/utils'
import styles from '../styles.module.scss'


// This component is used to display the details of the idea submitted by the user
export function IdeaDetailViewer({ idea }) {
  useEffect(() => {
    console.log(idea)
  }, [idea])

  return (
    <div className={styles.ideaDetailViewer}>
      <h2>{parseJsonString(idea.name)}</h2>
      <div>
        {/* {{}.dictionary()} */}
      </div>
    </div>
  )
}
