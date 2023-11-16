import React, { useEffect, useState } from 'react'
import FormCustomerSegment from '../../components/FormIdeaSteps/CustomerSegment'
import FormValuePropositions from '../../components/FormIdeaSteps/ValuePropositions'
import FormDone from '../../components/FormIdeaSteps/Done'
import FormOverview from '../../components/FormIdeaSteps/Overview'
import { companyRequirementStep, localStorageStepFormat, userFormStepItem } from '../../utils/form.constants'
import FormProgress from '../../components/FormProgress/progress'
import CusCard from '../../components/CusCard'
import { createNewIdea } from '../../api/idea'
import { Navigate } from 'react-router-dom'
import { createRequirement } from '../../api/requirement'
import RequirementForm from '../../components/FormIdeaSteps/Requirement'

const CompanyRequirementFormPage = () => {

  // useEffect(() => {
  //   const curStep = localStorage.getItem('currentStep')
  //     ? localStorage.getItem('currentStep')
  //     : 0
  //   console.log('curStep', parseInt(curStep))
  //   setCurrentStep(parseInt(curStep))
  // }, [])

  const onFormFinish = (formObj) => {
    createRequirement(formObj).then(res => {
      <Navigate to='/home' />
    })
  }

  return (
    <CusCard>
      <FormProgress
        onFormFinish={onFormFinish}
        slogans={['Welcome to the world of ideas', 'Let\'s match your requirement!']}
        formSource={[RequirementForm]}
        dataSteps={companyRequirementStep}
      />
    </CusCard>
  )
}

export default CompanyRequirementFormPage
