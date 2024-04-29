import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { createContext, useContext, useMemo } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { isAuthenticated } from '../api/auth'
import { cookiesConstant, localStorageConstant, userRoles } from '../utils/global.constants'
import { userRole } from '../utils/profile.constants'

const AuthContext = createContext()
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const getUser = async () => {
    let returnDat = null

    // check role hien tai va role trong localStorage
    await isAuthenticated().then(({ authenticated, data }) => {
      if (authenticated === true) {
        returnDat = {
          name: data.name,
          email: data.email,
          role: data.role
        }
      } else
      {
        returnDat = null
        localStorage.clear()
      }
    })

    setUser(returnDat)
    return returnDat
  }

  useEffect(() => {
    getUser()
  }, [])


  // call this function when you want to authenticate the user
  // Check if first time (from BE => create profile)
  const login = async (data) => {
    setUser(data)
    console.log('>> Login', data)
    // localStorage.setItem('user', data.clientId)
    navigate(-1) // back
  }

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null)
    localStorage.clear()
    navigate('/', { replace: true }) // replace instead of adding on route stack
  }

  const value = useMemo(
    () => ({
      user,
      getUser,
      login,
      logout
    }),
    [user]
  )

  return <AuthContext.Provider value={value}>
    <Outlet />
  </AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
