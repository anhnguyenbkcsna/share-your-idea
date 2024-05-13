import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { Carousel, Button } from 'antd'
import SponsorProjectCard from '../../../components/SponsorProject/SponsorProjectCard'

const contentStyle = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
}

const SponsorProject = () => {
  const [projects, setProjects] = useState(192321)
  const [projectName, setProjectName] = useState('Tên dự án')
  const [projectDescription, setProjectDescription] = useState('Mô tả ngắn')
  const [projectCreator, setProjectCreator] = useState()
  const [projectTimeLeft, setProjectTimeLeft] = useState(13)
  const [projectPercentage, setProjectPercentage] = useState(66)

  const onSearch = (value, _e, info) => console.log(info?.source, value)
  
  const onChange = (currentSlide) => {
    console.log(currentSlide)
  }

  const numberWithComma = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }

  const getRandomPlaceholder = (index) => {
    return `https://picsum.photos/300/150?random=${index}`
  }
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Send UNCW Club Triathlon to Nationals!</h1>
        <img className={styles.image} src='https://picsum.photos/1000/500?random=1' alt='Project Image' />
        <p>
          <strong>Creator: Maria</strong> {projectCreator}
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum commodi sunt quidem eos, ratione at veritatis consequuntur. 
            Dicta voluptate debitis, eligendi porro corrupti quidem molestiae distinctio laudantium esse libero inventore.
          </p>
        </p>
      </div>
      <SponsorProjectCard 
        img={'https://picsum.photos/300/200?random=1'}
        title={'Gói tài trợ tiêu chuẩn'}
        price={'500,000 VNĐ'}
        description={`Hãy trở thành một trong những người đầu tiên trải nghiệm dịch vụ của chúng tôi. 
        Chúng tôi cam kết sẽ mang lại trải nghiệm tốt nhất cho bạn.`}
      />

      <SponsorProjectCard 
        img={'https://picsum.photos/300/200?random=2'}
        title={'Gói tài trợ vàng'}
        price={'1,000,000 VNĐ'}
        description={`Hãy trở thành một trong những người đầu tiên trải nghiệm dịch vụ của chúng tôi. 
        Chúng tôi cam kết sẽ mang lại trải nghiệm tốt nhất cho bạn.`}
      />
    </div>
  )
}

export default SponsorProject
