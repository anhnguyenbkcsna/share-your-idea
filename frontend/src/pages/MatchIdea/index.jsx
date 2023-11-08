import React, { useState } from 'react'
import IdeaCard from '../../components/IdeaCard'
import OwlCarousel from 'react-owl-carousel'
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.css'

const ideas = [
  {
    title: 'Idea 1',
    percentage: 67,
    averageVote: 4.3,
    views: '3.6k',
    src: 'https://bizflyportal.mediacdn.vn/thumb_wm/1000,100/bizflyportal/images/inn16276486529991.jpg',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry 1',
    tag: ['tag1', 'tag2', 'tag3'],
  },
  {
    title: 'Idea 2',
    percentage: 67,
    averageVote: 4.3,
    views: '3.6k',
    src: 'https://bizflyportal.mediacdn.vn/thumb_wm/1000,100/bizflyportal/images/inn16276486529991.jpg',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry 1',
    tag: ['tag1', 'tag2', 'tag3'],
  },
  {
    title: 'Idea 3',
    percentage: 67,
    averageVote: 4.3,
    views: '3.6k',
    src: 'https://bizflyportal.mediacdn.vn/thumb_wm/1000,100/bizflyportal/images/inn16276486529991.jpg',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. 1',
    tag: ['tag1', 'tag2', 'tag3'],
  },
  {
    title: 'Idea 4',
    percentage: 67,
    averageVote: 4.3,
    views: '3.6k',
    src: 'https://bizflyportal.mediacdn.vn/thumb_wm/1000,100/bizflyportal/images/inn16276486529991.jpg',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. 1',
    tag: ['tag1', 'tag2', 'tag3'],
  },
  {
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
  const [active, setActive] = useState(3)
  const onChange = (currentSlide) => {
    console.log(currentSlide)
  }

  return (
    <>
      <OwlCarousel
        className='owl-theme'
        loop margin={50} center lazyLoad dots smartSpeed={450}
      >
        {ideas.map((idea, index) => (
          <IdeaCard 
            id={index} 
            className='item'
            title={idea.title}
            percentage={idea.percentage}
            averageVote={idea.averageVote}
            views={idea.views}
            src={idea.src}
            description={idea.description}
            tag={idea.tag}
          />
        ))}
      </OwlCarousel>
    </>
  )
}
export default MatchIdea
