import React, { useState } from "react";
import { Button, Layout, Menu } from "antd";
import {
    HomeOutlined,
    UserOutlined,
    SettingOutlined,
} from '@ant-design/icons';

import Logo from "../../assets/logo.png"
import { Header } from "antd/es/layout/layout";

const Navbar = () => {
    const username = useState("");
    return (
        <Layout>
            <Header style={{ display: 'flex', justifyContent: 'space-between' }}>
                
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<HomeOutlined />}>Home</Menu.Item>
                    <Menu.Item key="2" icon={<UserOutlined />}>Profile</Menu.Item>
                    <Menu.Item key="3" icon={<SettingOutlined />}>Settings</Menu.Item>
                </Menu>
                {/* <div className="logo" style={{color: "#fff"}}>
                    <img src={Logo} alt="logo" />
                    <h3>Logo</h3>
                </div> */}
                {username === "" ? (
                    <div class="loggedIn">
                        <div class="avatar">
                            <img src="" alt="userLogo" />
                        </div>

                        <div class="username">
                            <h3>{username}</h3>
                        <div />

                        <Button type="primary">Logout</Button>
                    </div>
                    </div>
                ) : (
                    <div class="loginSignup">
                        <Button type="primary" style={{marginLeft: "10px"}}>Login</Button>
                        <Button type="primary" style={{marginLeft: "10px"}}>Signup</Button>
                    </div>
                )}  
            </Header>
        </Layout>
    )
}

export default Navbar;