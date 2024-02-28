import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import { AuthProvider } from '../hooks/auth'
import PrivateLayout from '../layout/Private'
import PublicLayout from '../layout/Public'
// import UnauthorizedPage from './Error/E403'
import CreateIdeaFormPage from './IdeaForm'
import HomePage from './Home'
import LoginPage from './Login'
import CreateProfileForm from './Profile'
import MatchIdea from './MatchIdea'
import ErrorBoundary from './Error'
import InnovatorIdea from './IdeaList'
import IdeaDescriptionPage from './IdeaDescription'
import CompanyRequirementFormPage from './CompanyRequirement'

import { default as ContestHomePage } from './Contest/Home'
import { default as CreateContestPage } from './Contest/CreateContest'
import { default as ContestPublicLayout } from '../layout/Contest/Public'
import ContestInfo from './Contest/Info'
import Faq from './FAQ'
import SubmittedIdeasPage from './Contest/SubmittedIdeas'
import { isSubdomainExist } from '../utils/utils'
import ContestIdeaDetailPage from './Contest/IdeaDetail'


export const getRouter = () => {
  const browserRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<AuthProvider />} errorElement={<ErrorBoundary />}>
        {/* Contest subdomain */}
        {
          isSubdomainExist('contest') && (
            <Route path="/" Component={ContestPublicLayout}>
              <Route index Component={ContestHomePage} />
              <Route path='new' Component={CreateContestPage} />
              <Route path=":contestId" Component={ContestInfo} />
              <Route path="submitted-ideas" Component={SubmittedIdeasPage} />
              <Route path="submitted-ideas/:id" Component={ContestIdeaDetailPage} />
            </Route>
          )
        }

        {/* Default */}
        <Route path="/" criteria={{ host: '' }}>
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
        {/* <Route path="contest" Component={ContestPublicLayout}>
          <Route index Component={ContestHomePage} />
        </Route> */}
        {/* <Route path="contest" Component={ContestPublicLayout}>
          <Route path=":contestId" Component={ContestInfo} />
        </Route> */}
      </Route>
    ))

  return browserRouter
}

// export const routerMatching = {
//   'innovator/idea/create': CreateIdeaFormPage,
//   'innovator/idea'
// }
