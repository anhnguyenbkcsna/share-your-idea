import React, { useState } from 'react'
import styles from './styles.module.scss'
import { Button, Modal } from 'antd'

export const ModalBox = ({ isModalOpen, setIsModalOpen, handleOk = () => { }, handleCancel = () => { } }) => {
  // const showModal = () => {
  //   setIsModalOpen(true)
  // }
  const _handleOk = () => {
    handleOk()
    setIsModalOpen(false)
  }
  const _handleCancel = () => {
    handleCancel()
    setIsModalOpen(false)
  }
  return (
    <>
      <Modal
        title="Không thể tạo sự kiện"
        open={isModalOpen}
        onOk={_handleOk}
        onCancel={_handleCancel}
        okText="Đăng nhập"
        cancelText="Hủy"
      >
        Bạn cần đăng nhập với tư cách là doanh nghiệp để tạo sự kiện
      </Modal>
    </>
  )
}
