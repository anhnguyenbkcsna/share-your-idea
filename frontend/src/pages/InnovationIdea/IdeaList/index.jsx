import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Input } from 'antd'
import styles from './styles.module.scss'
import { deployedAPI } from '../../../utils/form.constants'
import IdeaListComponent from '../../../components/IdeaListComponent'
import { useNavigate } from 'react-router-dom'
import { getAllIdeas } from '../../../api/idea'

const sortTypes = [
  {
    name: 'Sort',
    value: 'none',
  },
  {
    name: 'Most viewed',
    value: 'views',
  },
  {
    name: 'Most voted',
    value: 'averageVote',
  }
]

const InnovatorIdea = () => {
  const navigate = useNavigate()
  const [fetchIdeas, setFetchIdeas] = useState([])
  const [sortIndex, setSortIndex] = useState(0)

  const handleSearch = (value) => {
    let res = []
    res = fetchIdeas.forEach((item) => {
      item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 ? res.push(item) : null
    })
    console.log(res)
    setFetchIdeas(res)
  }

  const handleSort = () => {
    setSortIndex(sortIndex + 1)
    if (sortIndex === sortTypes.length - 1) {
      setSortIndex(0)
    }
  }

  useEffect(() => {
    const fetchIdea = async () => {
      let ideas = await getAllIdeas()
      console.log('>> ideas', ideas)
      setFetchIdeas(ideas)
    }
    fetchIdea()
  }, [])

  useEffect(() => {
    if (sortTypes[sortIndex].value === 'views') {
      let sorted = fetchIdeas.sort((a, b) => {
        return b.views - a.views
      })
      setFetchIdeas(sorted)
    }
    else if (sortTypes[sortIndex].value === 'averageVote') {
      let sorted = fetchIdeas.sort((a, b) => {
        return b.averageVote - a.averageVote
      })
      setFetchIdeas(sorted)
    }
  }, [sortIndex])

  return (
    <div className={styles.container}>
      <h1>Ý tưởng của tôi</h1>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        {/* <Button onClick={handleSort} style={{
          minWidth: 150
        }}>
          {sortTypes[sortIndex].name}
        </Button> */}
        <Button type='primary' onClick={() => navigate('/innovator/idea')} style={{
          minWidth: 150
        }}>
          Tạo ý tưởng
        </Button>
      </div>
      <IdeaListComponent fetchIdeas={fetchIdeas} />
    </div>
  )
}
export default InnovatorIdea
