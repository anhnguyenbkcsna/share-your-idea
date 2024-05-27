import React from 'react'
import styles from './styles.module.scss'
import { Button, List } from 'antd'
import { RightOutlined } from '@ant-design/icons'

const SponsorProjectCard = (props) => {
  const getRandomPlaceholder = (index) => {
    return `https://picsum.photos/300/150?random=${index}`
  }
  const data = [
    'Sở hữu cổ phần của dự án',
    'Thoả thuận chia sẻ lợi nhuận từ dự án',
    'Ưu đãi độc quyền: Nhận giảm giá, vật phẩm phiên bản giới hạn hoặc đặc quyền độc quyền liên quan đến dự án.',
    'Cơ hội thử nghiệm beta: Tham gia vào các chương trình thử nghiệm beta để cung cấp phản hồi và tác động đến việc phát triển sản phẩm.',
    'Cơ hội cố vấn: Cố vấn cho những người sáng tạo dự án, chia sẻ kiến thức và kinh nghiệm của bạn để giúp họ thành công.',
  ]

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img
          className={styles.image}
          src={props.img ? props.img : getRandomPlaceholder(props.index)}
          alt='Project Image'
        />
        <h2>{props.title}</h2>
        <h3>{props.price}</h3>
        <p>{props.description}</p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '1rem',
          }}
        >
          {/* <Button type='default' className={styles.btn}>
            Chi tiết
          </Button> */}
          <Button type='primary' className={styles.primaryBtn}>
            Tài trợ
          </Button>
        </div>
      </div>
      <div className={styles.detail}>
        <h2>Chi tiết gói tài trợ</h2>
        <List
          size='large'
          bordered
          dataSource={data}
          renderItem={(item) => <List.Item><RightOutlined /> {item}</List.Item>}
        />
      </div>
    </div>
  )
}

export default SponsorProjectCard
