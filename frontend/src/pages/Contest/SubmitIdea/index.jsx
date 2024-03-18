import React, { useEffect } from 'react'
import styles from './styles.module.scss'
import { getIdeaOfCurrentUser } from '../../../api/idea'


export function SubmitIdeaPage() {
  useEffect(() => {
    getIdeaOfCurrentUser()
  }, [])

  return (
    <div className={styles.container}>
      <h1 className={styles.heading1}>
        Ý tưởng của bạn
      </h1>
    </div>
  )
}
