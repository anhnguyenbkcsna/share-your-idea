import React, { useState } from 'react'
import { Card, Typography, Progress, Tooltip, Rate, Tag, Anchor, Button } from 'antd'
import { EyeOutlined, StarOutlined, HeartOutlined, StarFilled, HeartFilled } from '@ant-design/icons'
import styles from './styles.module.scss'
import { NavLink } from 'react-router-dom'

const IdeaCard = (props) => {
  const { idea } = props
  const tags = ['red', 'green', 'blue', 'geekblue', 'purple']
  const [voted, setVoted] = useState(0) // load from database
  const [isFavourite, setIsFavourite] = useState(false) // load from database
  return (
    <NavLink to = {`${idea._id}`} >
      <Card className={styles.card}
        cover={
          <img
            alt='example'
            src={idea.src}
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
              <Typography.Title level={2}>
                {idea.title}
              </Typography.Title>
            </a>
            <Tooltip title='Complete percentage'>
              <Progress type="circle" percent={idea.percentage} size='small' />
            </Tooltip>
          </div>
          <Typography.Paragraph style={{color: 'black'}}>{idea.description}
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
