import React, { useEffect, useState } from 'react'
import { Button, Form } from 'antd'

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
import { createNewSponsorEvent } from '../../../api/sponsor'

const SponsorEditor = () => {
  const navigate = useNavigate()
  const [ideaId, setIdeaId] = useState(window.location.href.split('/')[5])
  const [submit, setSubmit] = useState(false)
  const [idea, setIdea] = useState({})

  // const onFormFinish = (formObj) => {
  //   const formData = new FormData()
  //   for (let key in formObj)
  //   {
  //     formData.append(key, formObj[key])
  //   }
  //   formData.append('idea_id', ideaId)
  //   for (var pair of formData.entries()) {
  //     console.log(pair[0]+ ', ' + pair[1])
  //   }
    
  //   createNewSponsorEvent(formData).then(res => {
  //     console.log('Create New Sponsor Event: ', res)
  //     window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })
  // }

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
          res = res.data.data
          console.log('Fetch Sponsor Project By ID: ', res)
          setIdea(res)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    fetcheSponsorProjectByID()
  }, [])

  return (
    <CusCard>
      <h1 style={{ color: '#f08080'}}>{idea?.name}</h1>
      
      <SponsorPackage submit={submit} />
      <Button
        style={{
          backgroundColor: '#f08080',
        }}
        htmlType='submit'
        type={submit ? 'primary' : 'default'}
        onClick={() => setSubmit(!submit)}
      >
        Gửi
      </Button>
    </CusCard>
  )
}

export default SponsorEditor
