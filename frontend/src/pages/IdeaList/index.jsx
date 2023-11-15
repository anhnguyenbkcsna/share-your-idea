import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Space, Dropdown, Typography, Input } from 'antd'
import styles from './styles.module.scss'
import { deployedAPI } from '../../utils/form.constants'
import IdeaListComponent from '../../components/IdeaListComponent'
import { DownOutlined } from '@ant-design/icons'

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
  const [fetchIdeas, setFetchIdeas] = useState([])
  const [sortIndex, setSortIndex] = useState(0)

  const handleSearch = (value) => {
    let res = []
    res = fetchIdeas.forEach((item) => {
      item.name.toLowerCase().indexOf(value.toLowerCase()) != -1 ? res.push(item) : null
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
      let response = await axios
        .get(`${deployedAPI}/idea`)
        .then((res) => res.data)
      setFetchIdeas(response.data)
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
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <Input.Search
          placeholder="Find your idea"
          onChange={handleSearch}
          style={{
            width: 200,
          }}
        />
        <Button onClick={handleSort}>
          {sortTypes[sortIndex].name}
        </Button>
      </div>
      <IdeaListComponent fetchIdeas={fetchIdeas} />
    </div>
  )
}
export default InnovatorIdea
