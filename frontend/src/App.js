import React from 'react'
import './App.css'
import { ConfigProvider } from 'antd'
import { RouterProvider } from 'react-router-dom'
import { getRouter } from './pages/routes'

import store from './redux/store'
import { Provider } from 'react-redux'

function App() {
  // if (process.env.NODE_ENV) {
  //   console.log(process.env.NODE_ENV)
  // }
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
            colorBgContainer: '#f5efe6',
          },
        }}
      >
        <RouterProvider router={getRouter()} />
      </ConfigProvider>
    </Provider>
  )
}

export default App
