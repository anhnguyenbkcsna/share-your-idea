import { Typography } from 'antd'
import React from 'react'
import styles from './styles.module.scss'

const FormSlogan = (props) => {
  const {sloganList} = props
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
      <div style={{}}>
        <img height={120} src='https://about.swip.world/wp-content/uploads/2020/05/img5.png' alt='slogan' />
      </div>
    </div>
  )
}

export default FormSlogan
