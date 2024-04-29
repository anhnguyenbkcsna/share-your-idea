import React, { useEffect } from 'react'
import styles from './styles.module.scss'
import { getIdeaOfCurrentUser } from '../../../api/idea'
import { HrHeading } from '../Components/hrheading'
import { IdeaDetailViewer } from './Components/ideaDetailViewer'
import { IdeaListItem } from './Components/ideaListItem'
import { ConfigProvider, List, theme } from 'antd'


export function SubmitIdeaPage() {
  const [ideas, setIdeas] = React.useState([])
  const [selectedIdea, setSelectedIdea] = React.useState({})

  useEffect(() => {
    getIdeaOfCurrentUser().then(res => {
      setIdeas(Array(6).fill(res[0]))
    })
  }, [])

  const onSelectIdeaClick = (idea, idx) => {
    setSelectedIdea({ ...idea })
  }

  useEffect(() => {
    console.log(selectedIdea)
  }, [selectedIdea])

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <HrHeading title="Ý tưởng của bạn" line={false} />
        <ConfigProvider
          theme={{
            algorithm: theme.darkAlgorithm,
            components: {
              Pagination: {
                fontFamily: 'Play',
                fontSize: '1.7rem',
                paddingXXS: 0,
                itemSize: 40,
              }
            }
          }}
        >
          <List
            className={styles.comments}
            itemLayout="vertical"
            size="large"
            pagination={{
              pageSize: 5,
              style: {
                width: '80%',
                fontWeight: 'bold'
              },
              align: 'center',
              showSizeChanger: false,
            }}
            dataSource={ideas}
            renderItem={(idea, idx) => (
              <List.Item
                key={idx}
                style={{
                  border: 'none',
                  fontFamily: 'Play',
                  padding: 0
                }}
              >
                <IdeaListItem
                  idea={idea}
                  onClick={() => onSelectIdeaClick(idea, idx)}
                />
                <List.Item.Meta />
              </List.Item>
            )}
          />
        </ConfigProvider>
      </div>
      <div className={styles.right}>
        <HrHeading title="Ý tưởng đã chọn" line={false} />
        <IdeaDetailViewer idea={selectedIdea} />
      </div>
    </div>
  )
}
