import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import { AuthProvider } from '../hooks/auth'
import { useDomain } from '../hooks/domain'

// Layouts
import PrivateLayout from '../layout/Private'
import PublicLayout from '../layout/Public'

// Pages
import HomePage from './Home'
import LoginPage from './Login'
import CreateProfileForm from './Profile'
import ErrorBoundary from './Error'
import Faq from './FAQ'
// import UnauthorizedPage from './Error/E403'

// Innovation
import CreateIdeaFormPage from './InnovationIdea/IdeaForm'
import MatchIdea from './InnovationIdea/MatchIdea'
import InnovatorIdea from './InnovationIdea/IdeaList'
import IdeaDescriptionPage from './InnovationIdea/IdeaDescription'
import CompanyRequirementFormPage from './InnovationIdea/CompanyRequirement'

// Contest
import { default as ContestHomePage } from './Contest/Home'
import { default as CreateContestPage } from './Contest/CreateContest'
import { default as ContestPublicLayout } from '../layout/Contest/Public'
import ContestInfo from './Contest/Info'
import SubmittedIdeasPage from './Contest/SubmittedIdeas'
import ContestIdeaDetailPage from './Contest/IdeaDetail'
import { SubmitIdeaPage } from './Contest/SubmitIdea'

// Donation
import SponsorHomePage from './Sponsor/SponsorHomePage'
import SponsorPublicLayout from '../layout/Sponsor/Public'
import SponsorList from './Sponsor/SponsorList'
import SponsorProject from './Sponsor/SponsorProject'
import SponsorEditor from './Sponsor/SponsorEditor'

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
        {/* <Route path="submitted-ideas" Component={SubmittedIdeasPage} /> */}
        {/* <Route path="submitted-ideas/:id" Component={ContestIdeaDetailPage} /> */}
        {/* <Route path=":contestId/submitted-ideas" Component={SubmittedIdeasPage} /> */}
        <Route path=":contestId/ideas/:id" Component={ContestIdeaDetailPage} />
        <Route path=":contestId" Component={ContestInfo} />
        <Route path=":contestId/submit" Component={SubmitIdeaPage} />
      </Route>

      <Route path="sponsor" Component={PublicLayout}>
        <Route index Component={SponsorHomePage} />
        <Route path="projects" Component={SponsorList} />
        <Route path="projects/:id" Component={SponsorProject} />
        <Route path="projects/:id/edit" Component={SponsorEditor} />
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
