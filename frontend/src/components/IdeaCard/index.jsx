import React, { useEffect, useState } from 'react'
import { Card, Typography, Progress, Tooltip, Rate, Tag, Anchor, Button } from 'antd'
import { EyeOutlined, StarOutlined, HeartOutlined, StarFilled, HeartFilled } from '@ant-design/icons'
import styles from './styles.module.scss'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'

const defaultImage = 'https://bizflyportal.mediacdn.vn/thumb_wm/1000,100/bizflyportal/images/inn16276486529991.jpg'

const IdeaCard = (props) => {
  const { idea } = props
  const tags = ['red', 'green', 'blue', 'geekblue', 'purple']
  const [imageSrc, setImageSrc] = useState(defaultImage)
  const [voted, setVoted] = useState(0) // load from database
  const [isFavourite, setIsFavourite] = useState(false) // load from database

  useEffect(() => {
    // const fetchImage = async () => {
    //   let response = await fetch(idea.src)
    //   let data = await response.blob()
    //   let metadata = {
    //     type: 'image/jpeg'
    //   }
    //   let file = new File([data], 'image.jpg', metadata)
    //   let url = URL.createObjectURL(file)
    //   setImageSrc(url)
    // }
    // fetchImage()
    idea.src ? setImageSrc(idea.src) : null
  }, [])

  return (
    <NavLink to = {`${idea._id.$oid}`} >
      <Card className={styles.card}
        cover={
          <img
            alt='example'
            src={imageSrc}
          />
        }
        actions={[
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <EyeOutlined style={{fontSize: '3em'}}/>
            <p style={{margin: '0'}}>{idea.views}</p>
          </div>,

          <Tooltip color='white' style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
            title={
              <Rate defaultValue={4} onChange={(e) => setVoted(e)}/>
            }
          >
            {voted != 0 ?
              <>
                <StarFilled style={{fontSize: '3em'}}/>
                <p style={{margin: '0'}}>{voted}</p>
              </>
              : <>
                <StarOutlined style={{fontSize: '3em'}}/>
                <p style={{margin: '0'}}>{idea.averageVote}</p>
              </>
            }
          </Tooltip>,

          <div className='favourite' onClick={() => setIsFavourite(!isFavourite)}>
            {isFavourite ? <HeartFilled style={{fontSize: '3em'}} /> : <HeartOutlined style={{fontSize: '3em'}} />}
            <p style={{margin: '0'}}>Add to favourite</p>
          </div>

        ]}
      >
        <div className="content" style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <a href='#' className={styles.link}>
              <Typography.Title level={4} className={styles.title}>
                {idea.name}
              </Typography.Title>
            </a>
            <Tooltip title='Complete percentage'>
              <Progress type="circle" percent={idea.ageRange[1]} size='small' />
            </Tooltip>
          </div>
          <Typography.Paragraph className={styles.description}>{idea.solution}
          </Typography.Paragraph>
          <div className={styles.tags}>
            <Tag color={tags[0]}>TAG</Tag>
          </div>

          {/* <div>
            {idea.tags.map((tag, index) => (
              <Tag color={tags[index]}>{tag}</Tag>
            ))}
          </div> */}
        </div>
      </Card>
    </NavLink>

  )
}

export default IdeaCard
