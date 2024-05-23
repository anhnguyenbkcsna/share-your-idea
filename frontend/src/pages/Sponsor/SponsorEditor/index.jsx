import React, { useEffect, useState } from 'react'
import { Form } from 'antd'

import { userSponsorFormStepItem } from '../../../utils/form.constants'
import { editIdea } from '../../../api/idea'
import { useNavigate } from 'react-router-dom'
// Components
import FormProgress from '../../../components/FormProgress/progress'
import CusCard from '../../../components/CusCard'
import SponsorPackage from '../../../components/FormIdeaSteps/SponsorPackage'
import axios from 'axios'
import { ideaEndpoint, sponsorEventEndpoint, sponsorProjectEndpoint } from '../../../utils/api.constants'
import { localStorageConstant } from '../../../utils/global.constants'
import { createNewPackage } from '../../../api/sponsor'

const SponsorEditor = () => {
  const navigate = useNavigate()
  const [ideaId, setIdeaId] = useState(window.location.href.split('/')[5])

  const onFormFinish = (formObj) => {
    const formData = new FormData()
    for (let key in formObj)
    {
      formData.append(key, formObj[key])
    }
    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1])
    }
    
    createNewPackage(formData).then(res => {
      console.log('Create New Package: ', res)
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
    })
    .catch((err) => {
      console.log(err)
    })
  }

  // Fetch project data from API with project ID
  useEffect(() => {
    const fetcheSponsorProjectByID = async () => {
      await axios.get(`${ideaEndpoint}${ideaId}/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem(localStorageConstant.ACCESS_TOKEN)}`,
        },
      })
        .then((res) => {
          console.log('Fetch Sponsor Project By ID: ', res)
          return res
        })
        .catch((err) => {
          console.log(err)
        })
    }
    fetcheSponsorProjectByID()
  }, [])

  return (
    <CusCard>
      <FormProgress
        onFormFinish={onFormFinish}
        slogans={['Gói tài trợ cho dự án']}
        // formSource={[FormOverview, FormCustomerSegment, FormValuePropositions, SponsorPackage]}
        formSource={[SponsorPackage]}
        dataSteps={userSponsorFormStepItem}
        edit={false}
      />
    </CusCard>
  )
}

export default SponsorEditor
