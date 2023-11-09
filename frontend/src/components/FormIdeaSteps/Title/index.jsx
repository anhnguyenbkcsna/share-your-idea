import { Typography, Progress } from 'antd'
import React from 'react'
import styles from './styles.module.scss'
import { useSelector } from 'react-redux'

const FormSlogan = (props) => {
  const {sloganList} = props
  const percentage = useSelector(state => state.percentage)
  const twoColors = {
    '0%': '#108ee9',
    '100%': '#87d068',
  }
  return (
    <div className={styles.title}>
      <div>
        {sloganList.map((slogan, idx) => (
          <Typography.Title
            key={idx}
            level={2}
            style={{ marginBottom: '50px' }}>
            {slogan ? slogan : 'This is Slogan'}
          </Typography.Title>
        ))}
      </div>
      <div className={styles.percentage}>
        <Progress type="circle" percent={percentage.value} strokeColor={twoColors} />
        {/* <img height={120} src='https://about.swip.world/wp-content/uploads/2020/05/img5.png' alt='slogan' /> */}
      </div>
    </div>
  )
}

export default FormSlogan
