import React, { useEffect } from 'react'
import styles from './styles.module.scss'
import { useNavigate } from 'react-router-dom'
import { OrangeBasicButton } from '../Components/button'
import ContestStatusLabel from '../Components/label'
import ContestIdeaCard from './ContestIdeaCard'
import { Carousel } from 'antd'
import { PrevArrow, NextArrow } from './Arrow'
// import contestBackground from '../../../assets/contest-bg.jpg'

export default function SubmittedIdeasPage() {
  const navigate = useNavigate()
  const NUM_OF_IDEAS_PER_CAROUSEL_ITEM = 8
  const [status, setStatus] = React.useState('opening')
  const [organizer, setOrganizer] = React.useState('GDSC HCMC')
  const [ideas, setIdeas] = React.useState([
    {
      ideaImgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      title: 'babel-preset-react-app is part of the create-react-app project, which is not maintianed anymore',
      field: 'babel-preset-react-app is part of the create-react-app project, of the create-react-app project, ',
      innovatorAvtUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      innovatorName: 'Le Ngoc Minh Thu'
    },
    {
      ideaImgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      title: 'abc',
      field: 'abc',
      innovatorAvtUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      innovatorName: 'Le Ngoc Minh Thu'
    },
    {
      ideaImgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      title: 'abc',
      field: 'abc',
      innovatorAvtUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      innovatorName: 'Le Ngoc Minh Thu'
    },
    {
      ideaImgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      title: 'abc',
      field: 'abc',
      innovatorAvtUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      innovatorName: 'Le Ngoc Minh Thu'
    },
    {
      ideaImgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      title: 'abc',
      field: 'abc',
      innovatorAvtUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      innovatorName: 'Le Ngoc Minh Thu'
    },
    {
      ideaImgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      title: 'abc',
      field: 'abc',
      innovatorAvtUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      innovatorName: 'Le Ngoc Minh Thu'
    },
    {
      ideaImgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      title: 'abc',
      field: 'abc',
      innovatorAvtUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      innovatorName: 'Le Ngoc Minh Thu'
    },
    {
      ideaImgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      title: 'abc',
      field: 'abc',
      innovatorAvtUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      innovatorName: 'Le Ngoc Minh Thuasdfasdf'
    },
    {
      ideaImgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      title: 'abc',
      field: 'abc',
      innovatorAvtUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      innovatorName: 'Le Ngoc Minh Thu'
    },
    {
      ideaImgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      title: 'abc',
      field: 'abc',
      innovatorAvtUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      innovatorName: 'Le Ngoc Minh Thu'
    },
    {
      ideaImgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      title: 'abc',
      field: 'abc',
      innovatorAvtUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      innovatorName: 'Le Ngoc Minh Thu'
    },
    {
      ideaImgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      title: 'abc',
      field: 'abc',
      innovatorAvtUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      innovatorName: 'Le Ngoc Minh Thu'
    },
    {
      ideaImgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      title: 'abc',
      field: 'abc',
      innovatorAvtUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      innovatorName: 'Le Ngoc Minh Thu'
    },
    {
      ideaImgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      title: 'abc',
      field: 'abc',
      innovatorAvtUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      innovatorName: 'Le Ngoc Minh Thu'
    },
    {
      ideaImgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      title: 'abc',
      field: 'abc',
      innovatorAvtUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      innovatorName: 'Le Ngoc Minh Thu'
    },
    {
      ideaImgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      title: 'abc',
      field: 'abc',
      innovatorAvtUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      innovatorName: 'Le Ngoc Minh Thu'
    },
    {
      ideaImgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      title: 'abc',
      field: 'abc',
      innovatorAvtUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      innovatorName: 'Le Ngoc Minh Thu'
    },
    {
      ideaImgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      title: 'abc',
      field: 'abc',
      innovatorAvtUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      innovatorName: 'Le Ngoc Minh Thu'
    },
    {
      ideaImgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      title: 'abc',
      field: 'abc',
      innovatorAvtUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      innovatorName: 'Le Ngoc Minh Thu'
    },
    {
      ideaImgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      title: 'abc',
      field: 'abc',
      innovatorAvtUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      innovatorName: 'Le Ngoc Minh Thu'
    },
    {
      ideaImgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      title: 'abc',
      field: 'abc',
      innovatorAvtUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      innovatorName: 'Le Ngoc Minh Thu'
    },
    {
      ideaImgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      title: 'abc',
      field: 'abc',
      innovatorAvtUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      innovatorName: 'Le Ngoc Minh Thu'
    },
    {
      ideaImgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      title: 'abc',
      field: 'abc',
      innovatorAvtUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      innovatorName: 'Le Ngoc Minh Thu'
    },
    {
      ideaImgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      title: 'abc',
      field: 'abc',
      innovatorAvtUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      innovatorName: 'Le Ngoc Minh Thu'
    },
    {
      ideaImgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      title: 'abc',
      field: 'abc',
      innovatorAvtUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      innovatorName: 'Le Ngoc Minh Thu'
    },
    {
      ideaImgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      title: 'abc',
      field: 'abc',
      innovatorAvtUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      innovatorName: 'Le Ngoc Minh Thu'
    },
    {
      ideaImgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      title: 'abc',
      field: 'abc',
      innovatorAvtUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      innovatorName: 'Le Ngoc Minh Thu'
    },
    {
      ideaImgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      title: 'abc',
      field: 'abc',
      innovatorAvtUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      innovatorName: 'Le Ngoc Minh Thu'
    },
    {
      ideaImgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      title: 'abc',
      field: 'abc',
      innovatorAvtUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      innovatorName: 'Le Ngoc Minh Thu'
    },
    {
      ideaImgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      title: 'abc',
      field: 'abc',
      innovatorAvtUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      innovatorName: 'Le Ngoc Minh Thu'
    },
    {
      ideaImgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      title: 'abc',
      field: 'abc',
      innovatorAvtUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      innovatorName: 'Le Ngoc Minh Thu'
    },
    {
      ideaImgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      title: 'abc',
      field: 'abc',
      innovatorAvtUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      innovatorName: 'Le Ngoc Minh Thu'
    },
    {
      ideaImgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      title: 'abc',
      field: 'abc',
      innovatorAvtUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      innovatorName: 'Le Ngoc Minh Thu'
    },
    {
      ideaImgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      title: 'abc',
      field: 'abc',
      innovatorAvtUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      innovatorName: 'Le Ngoc Minh Thu'
    },
    {
      ideaImgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      title: 'abc',
      field: 'abc',
      innovatorAvtUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYscfUBUbqwGd_DHVhG-ZjCOD7MUpxp4uhNe7toUg4ug&s',
      innovatorName: 'Le Ngoc Minh Thu'
    },
  ])
  const [ideasToShow, setIdeasToShow] = React.useState([])


  const getCarouselItems = (ideaSubList, carouselItemIdx) => {
    if (ideaSubList.length < NUM_OF_IDEAS_PER_CAROUSEL_ITEM)
    {
      for (let i = ideaSubList.length; i < NUM_OF_IDEAS_PER_CAROUSEL_ITEM; i++)
      {
        ideaSubList.push(null) // to create dummy cards
      }
    }

    return (
      <div className={styles.carouselItemContainIdeasWrapper} key={carouselItemIdx}>
        <div className={styles.ideasWrapper}>
          {
            ideaSubList.map((idea, index) => (
              <ContestIdeaCard idea={idea} key={index} />
            ))
          }
        </div>
      </div>
    )
  }

  useEffect(() => {
    const tmp = []
    for (let i = 0; i < ideas.length; i++)
    {
      if (i === 0)
      {
        continue
      }
      else if (i % NUM_OF_IDEAS_PER_CAROUSEL_ITEM === 0)
      {
        tmp.push(getCarouselItems(ideas.slice(i - NUM_OF_IDEAS_PER_CAROUSEL_ITEM, i), i))
      }
      else if (i === ideas.length - 1)
      {
        tmp.push(getCarouselItems(ideas.slice(i - i % NUM_OF_IDEAS_PER_CAROUSEL_ITEM), i))
      }
    }
    setIdeasToShow([...tmp])
  }, [ideas])

  return (
    <div className={styles.container}>
      <div
        className={styles.top}
      >
        <div>
          <OrangeBasicButton
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: 46
            }}
          >
            NỘP Ý TƯỞNG <span style={{ fontSize: '6rem', paddingLeft: 10, paddingBottom: 6 }}>+</span>
          </OrangeBasicButton>
        </div>
        <div className={styles.rightWrapper}>
          <ContestStatusLabel title={status} />
          <div className={styles.organizer}>
            {organizer}
          </div>
        </div>
      </div>

      <Carousel autoplay arrows prevArrow={<PrevArrow />} nextArrow={<NextArrow />}>
        {ideasToShow}
      </Carousel>
    </div>
  )
}
