import React, { useEffect } from 'react'
import styles from './styles.module.scss'
import ContestEventCard from '../../../components/Contest/EventCard'
import { useNavigate } from 'react-router-dom'
import { getContestList } from '../../../api/contest'
import { ModalBox } from '../Components/modalBox'
import { userRole } from '../../../utils/profile.constants'
import { localStorageConstant, userRoles } from '../../../utils/global.constants'
// import contestBackground from '../../../assets/contest-bg.jpg'

export default function HomePage() {
  const navigate = useNavigate()
  const [contestList, setContestList] = React.useState([])
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const handleCreateEventClick = () => {
    if (localStorage.getItem(localStorageConstant.ROLE) === userRoles.COMPANY)
    {
      navigate('new')
    }
    else
    {
      setIsModalOpen(true)
    }
  }

  useEffect(() => {
    getContestList().then(res => setContestList(res))
  }, [])

  return (
    <>
      <div className={styles.contestHomeContainer}>
        <div className={styles.contestHomeBg} />
        <h1
          style={{
            color: '#FF7510',
            fontSize: '6rem',
            height: 160,
            lineHeight: '160px',
            fontFamily: 'Michroma, sans-serif'
          }}
        >
          INNOVATION COMPETITION
        </h1>
        <div
          style={{
            fontSize: '3rem',
            marginBottom: 10
          }}
        >
          WANNA HOST A STARTUP IDEA COMPETITION?
        </div>
        <div
          style={{
            fontSize: '2rem',
          }}
        >
          GET EVERYTHING TO LAUNCH AN EVENT READY!
        </div>
        <button
          className={styles.createEventButton}
          onClick={handleCreateEventClick}
        >
          CREATE NEW EVENT
        </button>
        <ModalBox
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          handleOk={() => navigate('/login')}
        />
      </div>

      <div className={styles.contestEventContainer}>
        <h1
          id='contest-heading'
          style={{
            color: '#FF7510',
            fontSize: '5rem',
            fontFamily: 'Michroma, sans-serif'
          }}
        >
          Highlight
        </h1>
        <div className={styles.contestEventCardList}>
          {contestList?.map((contestItem, index) => (
            <ContestEventCard
              key={index}
              contest={contestItem}
            />
          ))}
        </div>
      </div>
    </>
  )
}
