import React from 'react'
import { companyRequirementStep } from '../../utils/form.constants'
import FormProgress from '../../components/FormProgress/progress'
import CusCard from '../../components/CusCard'
import { Navigate } from 'react-router-dom'
import { createRequirement } from '../../api/requirement'
import RequirementForm from '../../components/FormIdeaSteps/Requirement'

const CompanyRequirementFormPage = () => {
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
