import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Input } from 'antd'
import styles from './styles.module.scss'
import { deployedAPI } from '../../../utils/form.constants'
import IdeaListComponent from '../../../components/IdeaListComponent'
import { useNavigate } from 'react-router-dom'
import { getAllIdeas, getIdeaOfCurrentUser } from '../../../api/idea'
import { localStorageConstant } from '../../../utils/global.constants'

const InnovatorIdea = () => {
  const navigate = useNavigate()
  const [fetchIdeas, setFetchIdeas] = useState([])

  useEffect(() => {
    const fetchIdea = async () => {
      // let ideas = await getAllIdeas()
      // console.log('>> ideas', ideas)
      // setFetchIdeas(ideas)
      await axios.get(`${deployedAPI}/accounts/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem(localStorageConstant.ACCESS_TOKEN)}`,
        },
      }).then((res) => {
        console.log('>> users', res.data.data)
        res.data.data.map((user) => {
          if (user.email === localStorage.getItem(localStorageConstant.EMAIL)) {
            console.log('>> user', user.id)
            getIdeaOfCurrentUser(user.id).then((res) => {
              console.log('>> ideas', res)
              setFetchIdeas(res)
            })
          }
        })
      })
    }
    fetchIdea()
    // const fetchIdea = async () => {
    //   let ideas = await getIdeaOfCurrentUser()
    //   console.log('>> ideas', ideas)
    //   setFetchIdeas(ideas)
    // }
    // fetchIdea()
  }, [])

  return (
    <div className={styles.container}>
      <h1>Ý tưởng của tôi</h1>
      <div style={{display: 'flex', justifyContent: 'flex-end', margin: 0}}>
        <Button type='primary' onClick={() => navigate('/innovator/idea')} style={{
          minWidth: 150,
          height: 50,
          borderRadius: 10,
          fontSize: '1.7rem',
          backgroundColor: '#ffde78',
          color: 'black',
        }}>
          Tạo ý tưởng
        </Button>
      </div>
      <IdeaListComponent fetchIdeas={fetchIdeas} />
    </div>
  )
}
export default InnovatorIdea
