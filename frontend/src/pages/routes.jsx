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
import ContestIdeaDetailPage from './Contest/IdeaDetail'
import { useDomain } from '../hooks/domain'
import { SubmitIdeaPage } from './Contest/SubmitIdea'

import DonateHomePage from './Donate/DonateHomePage'
import DonatePublicLayout from '../layout/Donate/Public'
import DonateList from './Donate/DonateList'
import DonateProject from './Donate/DonateProject'

export const getRouter = () => {
  const { subDomain } = useDomain()

  // let routes = []
  // if (subDomain === 'contest')
  // {
  //   routes = (
  //     <Route path='/'>
  //       <Route path="/" Component={ContestPublicLayout}>
  //         <Route index Component={ContestHomePage} />
  //         <Route path='new' Component={CreateContestPage} />
  //         <Route path="submitted-ideas" Component={SubmittedIdeasPage} />
  //         <Route path="submitted-ideas/:id" Component={ContestIdeaDetailPage} />
  //         <Route path=":contestId" Component={ContestInfo} />
  //       </Route>
  //       <Route path="/">
  //         <Route path="login" Component={LoginPage} />
  //       </Route>
  //     </Route>
  //   )
  // }
  // else
  // {
  //   routes = (
  //     <Route path="/">
  //       <Route path="/" Component={PublicLayout}>
  //         <Route index Component={HomePage} />
  //       </Route>
  //       <Route path="login" Component={LoginPage} />
  //       <Route path='profile' Component={PublicLayout} >
  //         <Route index Component={CreateProfileForm} />
  //       </Route>
  //       <Route path="innovator" Component={PrivateLayout}>
  //         <Route index Component={InnovatorIdea} />
  //         <Route path='idea' Component={CreateIdeaFormPage} />
  //         {/* <Route path='profile' Component={CreateProfileForm} /> */}
  //       </Route>
  //       <Route path="company" Component={PrivateLayout}>
  //         <Route index Component={CompanyRequirementFormPage} />
  //         {/* <Route path='profile' Component={CreateProfileForm} /> */}
  //       </Route>
  //       <Route path="match-idea" Component={PrivateLayout}>
  //         <Route index Component={MatchIdea} />
  //       </Route>
  //       <Route path="idea" Component={PrivateLayout}>
  //         <Route path=':ideaId' Component={IdeaDescriptionPage} />
  //       </Route>
  //       <Route path="faq" Component={PrivateLayout} >
  //         <Route index Component={Faq} />
  //       </Route>
  //     </Route>
  //   )
  // }

  const routes = (
    <Route path="/">
      <Route path="contest" Component={ContestPublicLayout}>
        <Route index Component={ContestHomePage} />
        <Route path='new' Component={CreateContestPage} />
        <Route path="submitted-ideas" Component={SubmittedIdeasPage} />
        <Route path="submitted-ideas/:id" Component={ContestIdeaDetailPage} />
        <Route path=":contestId" Component={ContestInfo} />
        <Route path=":contestId/submit" Component={SubmitIdeaPage} />
      </Route>

      <Route path="donate" Component={DonatePublicLayout}>
        <Route index Component={DonateHomePage} />
        <Route path="projects" Component={DonateList} />
        <Route path="projects/:id" Component={DonateProject} />
      </Route>

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
  )

  const browserRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<AuthProvider />} errorElement={<ErrorBoundary />}>
        {routes}
      </Route>
    ))

  return browserRouter
}

// export const routerMatching = {
//   'innovator/idea/create': CreateIdeaFormPage,
//   'innovator/idea'
// }
