import React from "react"
import { Form } from "antd"

import { userSponsorFormStepItem } from "../../../utils/form.constants"
import { editIdea } from "../../../api/idea"
// Components
import FormProgress from "../../../components/FormProgress/progress"
import CusCard from "../../../components/CusCard"
import FormOverview from "../../../components/FormIdeaSteps/Overview"
import FormCustomerSegment from "../../../components/FormIdeaSteps/CustomerSegment"
import FormValuePropositions from "../../../components/FormIdeaSteps/ValuePropositions"
import FormDone from "../../../components/FormIdeaSteps/Done"
import SponsorPackage from "../../../components/FormIdeaSteps/SponsorPackage"


const SponsorEditor = () => {
  const onFormFinish = (formObj) => {
    editIdea(formObj).then(res => {
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
    })
  }

  return (
    <CusCard>
      <FormProgress
        onFormFinish={onFormFinish}
        slogans={['We are helping you', 'Your idea is awesome']}
        // formSource={[FormOverview, FormCustomerSegment, FormValuePropositions, SponsorPackage]}
        formSource={[SponsorPackage, FormCustomerSegment, FormValuePropositions, SponsorPackage]}
        dataSteps={userSponsorFormStepItem}
        edit={false}
      />
    </CusCard>
  )
}

export default SponsorEditor
