import React from 'react'
import './App.css'
import { ConfigProvider, theme } from 'antd'
import { RouterProvider, useLocation } from 'react-router-dom'
import { getRouter } from './pages/routes'
import { useState, useEffect } from 'react'

import store from './redux/store'
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: '#f69d3c',
            borderRadius: 2,
            fontFamily: 'Nunito Sans',

            // Alias Token
            // colorBgContainer: '#f5efe6',
            colorBgContainer: '#ffffff',
          },
        }}
      >
        <RouterProvider router={getRouter()} />
      </ConfigProvider>
    </Provider>
  )
}

export default App
