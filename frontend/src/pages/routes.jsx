import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import { AuthProvider} from '../hooks/auth'
import PrivateLayout from '../layout/Private'
import PublicLayout from '../layout/Public'
import UnauthorizedPage from './Error/E403'
import CreateIdeaFormPage from './IdeaForm'
import HomePage from './Home'
import LoginPage from './Login'
import CreateProfileForm from './Profile'
import ErrorBoundary from './Error'
import IdeaMatchingPage from './Matching'

export const getRouter = () => {
  const browserRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<AuthProvider />} errorElement={<ErrorBoundary />}>
        <Route path="/" Component={PublicLayout}>
          <Route index Component={HomePage} />
        </Route>
        <Route path="login" Component={LoginPage} />
        <Route path='profile' Component={PrivateLayout} >
          <Route index Component={CreateProfileForm} />
        </Route>
        <Route path="innovator" Component={PrivateLayout}>
          <Route index Component={CreateIdeaFormPage} />
          <Route path='idea' Component={CreateIdeaFormPage} />
          {/* <Route path='profile' Component={CreateProfileForm} /> */}
        </Route>
        <Route path="company" Component={PrivateLayout}>
          <Route index Component={CreateIdeaFormPage} />
          <Route path='matching' Component={IdeaMatchingPage} />
        </Route>
      </Route>
    ))

  // console.log('browserRouter', browserRouter.routes)

  return browserRouter
}

