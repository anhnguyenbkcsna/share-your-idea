import React from "react"
import { Outlet } from "react-router-dom"
import { Layout } from "antd"
const { Content } = Layout
import "./styles.css"


import DonateHeader from "../Header"
import DonateFooter from "../Footer"

const DonatePublicLayout = (props) => {
  return (
    <div>
      <ul className="background">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <DonateHeader />
      <div style={{
        height: '50px',
      }}>
      </div>
      <Content>
        <Outlet />
      </Content>
      <div style={{
        height: '15vh',
      }}>
      </div>
      <DonateFooter />
    </div>
  )
}

export default DonatePublicLayout
