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
import CompanyRequirementList from './InnovationIdea/CompanyRequirement/requirementList'

// Contest
import { default as ContestHomePage } from './Contest/Home'
import { default as CreateContestPage } from './Contest/CreateContest'
import { default as ContestPublicLayout } from '../layout/Contest/Public'
import ContestInfo from './Contest/Info'
import SubmittedIdeasPage from './Contest/SubmittedIdeas'
import ContestIdeaDetailPage from './Contest/IdeaDetail'
import SubmitIdeaPage from './Contest/SubmitIdea'
import MarkPage from './Contest/IdeaDetail/markPage'

// Donation
import SponsorHomePage from './Sponsor/SponsorHomePage'
import SponsorPublicLayout from '../layout/Sponsor/Public'
import SponsorList from './Sponsor/SponsorList'
import SponsorProject from './Sponsor/SponsorProject'
import SponsorEditor from './Sponsor/SponsorEditor'
import EmailPage from './Email'
import MeetPage from './Meet'

export const getRouter = () => {

  const routes = (
    <Route path='/'>
      <Route path='contest' Component={PublicLayout}>
        <Route index Component={ContestHomePage} />
        <Route path='new' Component={CreateContestPage} />
        {/* <Route path='submitted-ideas' Component={SubmittedIdeasPage} /> */}
        {/* <Route path='submitted-ideas/:id' Component={ContestIdeaDetailPage} /> */}
        {/* <Route path=':contestId/submitted-ideas' Component={SubmittedIdeasPage} /> */}
        <Route path=':contestId' Component={ContestInfo} />
        <Route path=':contestId/ideas/:id' Component={ContestIdeaDetailPage} />
        <Route path=':contestId/submit' Component={SubmitIdeaPage} />
        <Route path=':contestId/ideas/:id/mark' Component={MarkPage} />
      </Route>

      <Route path='sponsor' Component={PublicLayout}>
        <Route index Component={SponsorHomePage} />
        <Route path='projects' Component={SponsorList} />
        <Route path='projects/:id' Component={SponsorProject} />
        <Route path='projects/:id/edit' Component={SponsorEditor} />
      </Route>

      <Route path='/' Component={PublicLayout}>
        <Route index Component={HomePage} />
        <Route path='email' Component={EmailPage} />
      </Route>
      <Route path='login' Component={LoginPage} />
      <Route path='profile' Component={PublicLayout} >
        <Route index Component={CreateProfileForm} />
      </Route>
      <Route path='innovator' Component={PublicLayout}>
        <Route index Component={InnovatorIdea} />
        <Route path='idea' Component={CreateIdeaFormPage} />
        {/* <Route path='profile' Component={CreateProfileForm} /> */}
      </Route>
      <Route path='company' Component={PublicLayout}>
        <Route index Component={CompanyRequirementFormPage} />
        <Route path='requirement' Component={CompanyRequirementList} />
      </Route>
      <Route path='match-idea' Component={PublicLayout}>
        <Route index Component={MatchIdea} />
      </Route>
      <Route path='idea' Component={PublicLayout}>
        <Route path=':ideaId' Component={IdeaDescriptionPage} />
        <Route path=':ideaId/edit' Component={CreateIdeaFormPage} />
        
      </Route>
      <Route path='faq' Component={PrivateLayout} >
        <Route index Component={Faq} />
      </Route>
      <Route path='sponsor/create-meet' Component={PublicLayout} >
        <Route index Component={MeetPage} />
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
