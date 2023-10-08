export const labelValueGenerate = (strList) => {
  return strList.map(item => {
    return {
      label: item,
      value: item
    }
  })
}

export const gender = [
  {
    label: 'Male',
    value: 'Male',
  },
  {
    label: 'Female',
    value: 'Female',
  },
  {
    label: 'Others',
    value: 'Others',
  },
  {
    label: 'Global',
    value: 'Global',
  },
]

export const residential = [
  {
    label: 'Vietnam',
    value: 'Vietnam',
  },
  {
    label: 'Asia',
    value: 'Asia',
  },
  {
    label: 'Europe',
    value: 'Europe',
  },
  {
    label: 'Africa',
    value: 'Africa',
  },
  {
    label: 'Australia',
    value: 'Australia',
  },
  {
    label: 'Americas',
    value: 'Americas',
  },
  {
    label: 'Metropolis', //big city
    value: 'Metropolis',
  },
  {
    label: 'Downtown',
    value: 'Downtown',
  },
  {
    label: 'Countryside',
    value: 'Countryside',
  },
  {
    label: 'Minority Area',
    value: 'Minority Area',
  },
]


export const domains = [
  {
    label: 'Science',
    value: 'Science',
  },
  {
    label: 'Healthcare',
    value: 'Healthcare',
  },
  {
    label: 'Beauty',
    value: 'Beauty',
  },
  {
    label: 'Business',
    value: 'Business',
  },
  {
    label: 'Marketing',
    value: 'Marketing',
  },
  {
    label: 'Eco-Bio',
    value: 'Eco-Bio',
  },
]

export const competitors = [
  {
    label: 'Facebook',
    value: 'Facebook',
  },
  {
    'label': 'Google',
    'value': 'Google',
  }
]

export const targets = [
  {
    label: 'Children',
    value: 'Children',
  },
  {
    label: 'Student',
    value: 'Student',
  },
  {
    label: 'Teenager',
    value: 'Teenager',
  },
  {
    label: 'White-collar worker',
    value: 'White-collar worker',
  },
  {
    label: 'Blue-collar worker',
    value: 'Blue-collar worker',
  },
  {
    label: 'The elderly',
    value: 'The elderly',
  },
  {
    label: 'The disabled',
    value: 'The disabled',
  },
  {
    label: 'For everyone',
    value: 'For everyone',
  },
]

export const userFormStepItem = [
  {
    title: 'Idea Overview',
    // icon: <UserOutlined />,
  },
  {
    title: 'Customer Segments',
    // icon: <SolutionOutlined />,
  },
  {
    title: 'Value Propositions',
    // icon: <LoadingOutlined />,
  },
  {
    title: 'Done',
    // icon: <SmileOutlined />,
  },
]

export const sponsorFormStepItem = [
  {
    title: 'Business specification',
    // icon: <UserOutlined />,
  },
  {
    title: 'Problems',
    // icon: <SolutionOutlined />,
  },
  {
    title: 'Competitors',
    // icon: <LoadingOutlined />,
  },
  {
    title: 'Done',
    // icon: <SmileOutlined />,
  },
]

export const localStorageStepFormat = (stepCount) => {
  return `step${stepCount}.data`
}

const professionalList = ['Children', 'Student', 'White-collar worker', 'Blue-collar worker', 'The elderly', 'The disabled', 'For everyone']
const standoutReasonList = ['affordable', 'novel', 'eco-friendly', 'technology-based', 'productive', 'effective', 'fast', 'promising', 'problem-solving']

export const professionals = labelValueGenerate(professionalList)
export const standoutReasons = labelValueGenerate(standoutReasonList)

