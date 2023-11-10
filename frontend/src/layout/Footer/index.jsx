import React from 'react'
import styles from './styles.module.scss'
import logosvg from '../../assets/Worldea.svg'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div>
          <h3
            style={{width: '70%'}}>
            WorIdea là một nền tảng động giúp thu hẹp khoảng cách giữa các nhà sáng tạo tiềm năng với
            các nhà tài trợ. Sứ mệnh của chúng tôi là thúc đẩy sự đổi mới, thúc đẩy phát triển
            kinh tế, và giải quyết những vấn đề phức tạp bằng cách kết nối các nhà sáng tạo 
            với sự hỗ trợ tài chính và chiến lược từ phía các nhà tài trợ.
            
            {/* WorIdea is a dynamic platform that bridges the gap between visionary
            innovators and forward-thinking sponsors. Our mission is to foster innovation,
            drive economic growth, and solve complex challenges by connecting creative thinkers
            with the financial and strategic support they need. */}
          </h3>
        </div>
        <div>
          <h3>Về chúng tôi</h3>
          <ul>
            <li>Nhà sáng tạo</li>
            <li>Đối tác</li>
            <li>Sứ mệnh</li>
          </ul>
        </div>
        <div>
          <h3>Nhà tài trợ</h3>
          <ul>
            <li>Blogs</li>
            <li>Kết nối</li>
            <li>Tìm kiếm hỗ trợ</li>
          </ul>
        </div>
        <div style={{margin: 'auto'}}>
          <img src={logosvg} alt="logo"/>
        </div>
      </div>
    </footer>
  )
}

export default Footer
