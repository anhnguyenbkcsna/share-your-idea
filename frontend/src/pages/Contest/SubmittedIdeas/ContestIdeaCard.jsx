import styles from './styles.module.scss'
import genericStyles from '../styles.module.scss'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function ContestIdeaCard({ bg, idea }) {
  // when idea is null, return a dummy card to fill the space
  const navigate = useNavigate()

  const WIDTH_OF_CARD = 280
  if (!idea)
  {
    return (
      <div
        className='dummy'
        style={{ width: WIDTH_OF_CARD, height: 0, background: 'transparent' }}
      />
    )
  }

  const handleOnClick = () => {
    navigate(`ideas/${idea.id}`)
  }

  const { ideaImgUrl, title, field, innovatorAvtUrl, innovatorName } = idea
  return (
    <div
      style={{ width: WIDTH_OF_CARD }}
      className={styles.contestIdeaCard}
      onClick={handleOnClick}
    >
      <img
        alt='contest'
        style={{ 
          width: '100%',
          height: 'auto',
        }}
        src={bg}
      />
      <div className={styles.cardInfo}>
        <div className={styles.cardHeading}>
          {title}
        </div>
        <div className={styles.field}>
          {field}
        </div>
        <div style={{ flex: 1 }} />
        <div className={genericStyles.authorLine}>
          <div className={genericStyles.authorAvtWrapper}>
            <img
              className={genericStyles.avt}
              alt='contest-innovator'
              src={innovatorAvtUrl}
            />
          </div>
          <div className={genericStyles.authorName}>
            {innovatorName}
          </div>
        </div>
      </div>
    </div>
  )
}
