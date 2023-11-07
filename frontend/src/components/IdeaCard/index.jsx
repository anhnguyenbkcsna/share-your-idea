import React, { useState } from 'react'
import { Card, Typography, Progress, Tooltip, Rate, Tag } from 'antd'
import { EyeOutlined, StarOutlined, HeartOutlined, StarFilled, HeartFilled } from '@ant-design/icons'

const IdeaCard = (props) => {
  const [voted, setVoted] = useState(0)
  const [isFavourite, setIsFavourite] = useState(false)
  return (
    <Card
      style={{
        width: 400,
      }}
      cover={
        <img
          alt='example'
          src='https://bizflyportal.mediacdn.vn/thumb_wm/1000,100/bizflyportal/images/inn16276486529991.jpg'
        />
      }
      actions={[
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <EyeOutlined style={{fontSize: '3em'}}/>
          <p style={{margin: '0'}}>3.6k</p>
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
              <p style={{margin: '0'}}>4.3</p>
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
          <Typography.Title level={2}>Idea Name</Typography.Title>
          <Tooltip title='Complete percentage'>
            <Progress type="circle" percent={75} size='small' />
          </Tooltip>
        </div>
        <Typography.Paragraph style={{color: 'black'}}>
          Lorem ipsum dolor sit amet consectetur adipisici
          Lorem ipsum dolor sit amet consectetur adipisici
          Lorem ipsum dolor sit amet consectetur adipisici
          Lorem ipsum dolor sit amet consectetur adipisici
        </Typography.Paragraph>
        <div>
          <Tag color="magenta">magenta</Tag>
        </div>
      </div>

    </Card>
  )
}

export default IdeaCard