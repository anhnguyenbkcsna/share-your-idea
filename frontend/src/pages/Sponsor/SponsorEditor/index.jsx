import React, { useEffect, useState } from 'react'
import { Form } from 'antd'

import { userSponsorFormStepItem } from '../../../utils/form.constants'
import { editIdea } from '../../../api/idea'
// Components
import FormProgress from '../../../components/FormProgress/progress'
import CusCard from '../../../components/CusCard'
import FormOverview from '../../../components/FormIdeaSteps/Overview'
import FormCustomerSegment from '../../../components/FormIdeaSteps/CustomerSegment'
import FormValuePropositions from '../../../components/FormIdeaSteps/ValuePropositions'
import FormDone from '../../../components/FormIdeaSteps/Done'
import SponsorPackage from '../../../components/FormIdeaSteps/SponsorPackage'
import axios from 'axios'
import { sponsorProjectEndpoint } from '../../../utils/api.constants'


const SponsorEditor = () => {
  // Get project ID from URL
  const [id, setId] = useState(window.location.href.split('/')[5])
  const onFormFinish = (formObj) => {
    editIdea(formObj).then(res => {
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
    })
  }

  // Fetch project data from API with project ID
  useEffect(() => {
    const fetcheSponsorProjectByID = async () => {
      const project = await axios.get(`${sponsorProjectEndpoint}${id}`)
        .then((res) => {
          console.log("Fetch Sponsor Project By ID: ", res)
          return res.data.data
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
        slogans={['We are helping you', 'Your idea is awesome']}
        // formSource={[FormOverview, FormCustomerSegment, FormValuePropositions, SponsorPackage]}
        formSource={[FormOverview, FormCustomerSegment, FormValuePropositions, SponsorPackage]}
        dataSteps={userSponsorFormStepItem}
        edit={false}
      />
    </CusCard>
  )
}

export default SponsorEditor
