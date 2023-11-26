import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { createContext, useContext, useMemo } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { isUserAuthorized } from '../api/google'
import { localStorageConstant, userRoles } from '../utils/global.constants'
import { userRole } from '../utils/profile.constants'
import { validateGoogleResponse } from '../utils/validate'

const AuthContext = createContext()
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    const apiToken = localStorage.getItem(localStorageConstant.API_TOKEN)
    isUserAuthorized(apiToken).then((authorized) => {
      if (authorized === true) {
        setUser({
          name: localStorage.getItem(localStorageConstant.NAME),
          email: localStorage.getItem(localStorageConstant.EMAIL),
          role: localStorage.getItem(localStorageConstant.ROLE)
        })
        console.log('AuthProvider', authorized)
      } else {
        localStorage.clear()
        setUser(null)
      }
    })
  }, [])

  // call this function when you want to authenticate the user
  // Check if first time (from BE => create profile)
  const login = async (data) => {
    setUser(data)
    console.log('>> Login', data)
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
