import { UserOutlined , TeamOutlined, LineChartOutlined, MailOutlined, ApartmentOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import React from 'react'
import { NavLink, useParams } from 'react-router-dom'
import styles from './styles.module.scss'
import CusCard from '../../components/CusCard'
import { Button, Col, Grid, List, Row, Space, Tag } from 'antd'
import { useEffect } from 'react'
import { useState } from 'react'
import { companyIndustries, currentDevStage, teamDescription } from '../../utils/form.constants'

const desc = {
  id: '5',
  name: 'OrganicScan Activating-Multimedia Filtering-based',
  slogan: 'A rapid device for detecting chemicals in our food',
  percentage: 67,
  averageVote: 4.3,
  // views: '3.6k',
  src: 'https://bizflyportal.mediacdn.vn/thumb_wm/1000,100/bizflyportal/images/inn16276486529991.jpg',
  description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. 1',
  domain: [companyIndustries[2], companyIndustries[10], companyIndustries[0]],
  tag: ['affordable', 'unique', 'attainable'],
  currentDev: currentDevStage[2],
  summary: 'Since 2020, the organic food market has bloomed, driven by a surge in demand for \
  sustainable products and consumer consciousness about what they eat. \
  However, a hurdle remains: the lack of a rapid and reliable technology to aid stakeholders \
  across the agricultural value chain in quickly verifying the authenticity \
  of organic produce or conducting pesticide residue tests simply because the existing solutions \
  are time-consuming, costly, and not reliable.\
  This challenge exposes consumers to potential chemical consumption, adulteration, distrust, and \
  opacity in the organic food market while also bearing \
  adverse environmental implications. \
  OrganicScan provides rapid results in a handheld device that \
  can be used by farmers in the field to retailers also integrated with a mobile App \
  to allow users to store their data and serves as a hub for organic certification \
  bodies, retailers, and consumers to verify the authenticity of organic product and promote sustainable agriculture.',
  author: {
    name: 'Nguyen Doan Phuong Nghi',
    email: 'nghi.nguyen@gmail.com',
    team: teamDescription[2]
  },
}

const iconKey = {
  name: <UserOutlined />,
  email: <MailOutlined />,
  'current development stage': <LineChartOutlined/>,
  team: <TeamOutlined/>
}

const iconGenerated = () => {

}

const IdeaDescriptionPage = () => {
  let params = useParams()
  const [idea, setIdea] = useState(desc)

  useEffect(() => {
    //loadIdea
  },[])

  const dataSourceGenerate = (ideaObj) => {
    let {author} = ideaObj
    author['current development stage'] = ideaObj.currentDev
    let res = []
    for (const [key, value] of Object.entries(author)) {
      res.push({
        title: key,
        content: value
      })
    }
    console.log('res', res)
    return res
  }

  const {ideaId} = params
  return (
    <div>
      <section className={classNames(styles.bg)}>
        <div className={classNames('w-90', styles.description)}>
          {idea.name} - {idea.slogan} <br />
          {idea.domain.map((item, idx) => (<Tag key={idx} color={'cyan'}>{item}</Tag>))}
        </div>
        <div className={classNames(styles['bg-circle'])}/>
      </section>

      <CusCard>
        <Row gutter={[8,8]}>
          <Col span={8}>
            <h1 className={styles.slogan}>{idea.name}</h1>
            {idea.tag.map((item, idx) => (<Tag key={idx} color={'orange'}>{item}</Tag>))}
            <List
              style={{marginTop: '50px'}}
              itemLayout="vertical"
              size="large"
              dataSource={dataSourceGenerate(idea)}
              renderItem={(item) => (
                <List.Item
                  key={item.title}
                  style={{marginBottom: '5px'}}
                >
                  <List.Item.Meta avatar={iconKey[item.title]} title={item.title} description={item.content} />
                </List.Item>)}
            />
            <Button type='primary'>Contact</Button>
          </Col>
          <Col span={16} className={styles.decor}>
            <h1>{idea.slogan}</h1>
            <h1 className={styles.title}>Idea Pitch</h1>
            <h3 style={{lineHeight: 2}}>{idea.summary}</h3>
            <Row gutter={[8,8]}>
              <Col span={12}><h2 className={styles.title}>Customer Segment</h2></Col>
              <Col span={12}><h2 className={styles.title}>Value Propositions</h2></Col>
            </Row>
          </Col>
        </Row>
      </CusCard>
    </div>
  )
}

export default IdeaDescriptionPage
