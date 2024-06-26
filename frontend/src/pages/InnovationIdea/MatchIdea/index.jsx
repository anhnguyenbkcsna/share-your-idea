import React, { useState, useEffect } from 'react'
import IdeaCard from '../../../components/IdeaCard'
import OwlCarousel from 'react-owl-carousel'
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.css'
import CusCard from '../../../components/CusCard'
import axios from 'axios'

import { deployedAPI } from '../../../utils/api.constants'
import { getAllIdeas } from '../../../api/idea'
import { localStorageConstant } from '../../../utils/global.constants'

const ideas = [
  {
    id: '1',
    title: 'Idea 1',
    percentage: 67,
    averageVote: 4.3,
    views: '3.6k',
    src: 'https://bizflyportal.mediacdn.vn/thumb_wm/1000,100/bizflyportal/images/inn16276486529991.jpg',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry 1',
    tag: ['tag1', 'tag2', 'tag3'],
  },
  {
    id: '2',
    title: 'Idea 2',
    percentage: 67,
    averageVote: 4.3,
    views: '3.6k',
    src: 'https://bizflyportal.mediacdn.vn/thumb_wm/1000,100/bizflyportal/images/inn16276486529991.jpg',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry 1',
    tag: ['tag1', 'tag2', 'tag3'],
  },
  {
    id: '3',
    title: 'Idea 3',
    percentage: 67,
    averageVote: 4.3,
    views: '3.6k',
    src: 'https://bizflyportal.mediacdn.vn/thumb_wm/1000,100/bizflyportal/images/inn16276486529991.jpg',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. 1',
    tag: ['tag1', 'tag2', 'tag3'],
  },
  {
    id: '4',
    title: 'Idea 4',
    percentage: 67,
    averageVote: 4.3,
    views: '3.6k',
    src: 'https://bizflyportal.mediacdn.vn/thumb_wm/1000,100/bizflyportal/images/inn16276486529991.jpg',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. 1',
    tag: ['tag1', 'tag2', 'tag3'],
  },
  {
    id: '5',
    title: 'Idea 5',
    percentage: 67,
    averageVote: 4.3,
    views: '3.6k',
    src: 'https://bizflyportal.mediacdn.vn/thumb_wm/1000,100/bizflyportal/images/inn16276486529991.jpg',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. 1',
    tag: ['tag1', 'tag2', 'tag3'],
  },
]

const MatchIdea = () => {
  const [fetchIdeas, setFetchIdeas] = useState([])
  const [fetchReq, setFetchReq] = useState()
  const [reqIndex, setReqIndex] = useState(window.location.href.split('/').pop())

  useEffect(() => {
    // const fetchIdea = async () => {
    //   const allIdeas = await getAllIdeas()
    //   setFetchIdeas(allIdeas)
    // }
    // fetchIdea()
    const fetchRequirement = async () => {
      let requirement = await axios.get(`${deployedAPI}/requirements/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(localStorageConstant.ACCESS_TOKEN)}`,
        }
      }).then((res) => res = res.data.data)
      setFetchReq(requirement[reqIndex])
      console.log('>> requirement', requirement[reqIndex])
    }

    fetchRequirement()
  }, [])
  useEffect(() => {
    const getTopK = async () => {
      await axios.post(`${deployedAPI}/ideas/topk/`, fetchReq, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(localStorageConstant.ACCESS_TOKEN)}`,
        }
    }).then((res) => {
      console.log('>> topk', res.data.data)
      setFetchIdeas(res.data.data)
    }).catch((err) => {
      console.log('>> err', err)
    })}
    getTopK()
  }, [fetchReq])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      maxWidth: '80%',
      margin: '0 auto',
    }}>
      <h1 style={{
        color: '#ffba66'
      }}>
        Danh sách ý tưởng phù hợp với yêu cầu
      </h1>
      <h3>
        {/* Yêu cầu của bạn: Lorem Ipsum is simply dummy text of the printing and typesetting industry.  */}
      </h3>
      <OwlCarousel
        className='owl-theme'
        loop margin={15} lazyLoad dots smartSpeed={450} style={{zIndex: 0}}
      >
        {fetchIdeas?.map((idea, index) => (
          <IdeaCard
            key={index}
            className='item'
            idea={idea}
          />
        ))}
      </OwlCarousel>
    </div>
  )
}
export default MatchIdea
