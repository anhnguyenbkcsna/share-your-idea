import React, { useState } from 'react'
import IdeaCard from '../../components/IdeaCard'
import OwlCarousel from 'react-owl-carousel'
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.css'


const MatchIdea = () => {
  const cards = [0, 1, 2, 3, 4, 5]
  const [active, setActive] = useState(3)
  const onChange = (currentSlide) => {
    console.log(currentSlide)
  }

  return (
    <>
      <OwlCarousel
        className='owl-theme'
        loop margin={50} center lazyLoad dots smartSpeed={450}
        onchanged={() => setActive(active + 1)}
      >
        {cards.map((index) => (
          <IdeaCard className='item' id={index} />
        ))}
      </OwlCarousel>
    </>
  )
}
export default MatchIdea
