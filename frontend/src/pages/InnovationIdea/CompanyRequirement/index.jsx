import React, { useEffect, useState } from 'react'
import { companyRequirementStep } from '../../../utils/constants'
import FormProgress from '../../../components/FormProgress/progress'
import CusCard from '../../../components/CusCard'
import { createNewIdea } from '../../../api/idea'
import { Navigate, useNavigate } from 'react-router-dom'
import { createRequirement } from '../../../api/requirement'
import RequirementForm from '../../../components/FormIdeaSteps/Requirement'

const CompanyRequirementFormPage = () => {
  const navigate = useNavigate()

  const onFormFinish = (formObj) => {
    createRequirement(formObj).then((res) => {
      console.log('>> res', res)
      navigate('/match-idea')
    })
  }

  return (
    <CusCard>
      <FormProgress
        onFormFinish={onFormFinish}
        slogans={['Doanh nghiệp muốn tìm kiếm ý tưởng sáng tạo', 'Hãy nhập yêu cầu của bạn!']}
        formSource={[RequirementForm]}
        dataSteps={companyRequirementStep}
      />
    </CusCard>
  )
}

export default CompanyRequirementFormPage
