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
import MatchIdea from './MatchIdea'
import ErrorBoundary from './Error'
import InnovatorIdea from './IdeaList'
import IdeaDescriptionPage from './IdeaDescription'
import CompanyRequirementFormPage from './CompanyRequirement'
import Faq from './FAQ'

export const getRouter = () => {
  const browserRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<AuthProvider />} errorElement={<ErrorBoundary />}>
        <Route path="/" Component={PublicLayout}>
          <Route index Component={HomePage} />
        </Route>
        <Route path="login" Component={LoginPage} />
        <Route path='profile' Component={PublicLayout} >
          <Route index Component={CreateProfileForm} />
        </Route>
        <Route path="innovator" Component={PrivateLayout}>
          <Route index Component={InnovatorIdea} />
          <Route path='idea' Component={CreateIdeaFormPage} />
          {/* <Route path='profile' Component={CreateProfileForm} /> */}
        </Route>
        <Route path="company" Component={PrivateLayout}>
          <Route index Component={CompanyRequirementFormPage} />
          {/* <Route path='profile' Component={CreateProfileForm} /> */}
        </Route>
        <Route path="match-idea" Component={PrivateLayout}>
          <Route index Component={MatchIdea} />
        </Route>
        <Route path="idea" Component={PrivateLayout}>
          <Route path=':ideaId' Component={IdeaDescriptionPage} />
        </Route>
        <Route path="faq" Component={PrivateLayout} >
          <Route index Component={Faq} />
        </Route>
      </Route>
    ))

  return browserRouter
}

// export const routerMatching = {
//   'innovator/idea/create': CreateIdeaFormPage,
//   'innovator/idea'
// }
