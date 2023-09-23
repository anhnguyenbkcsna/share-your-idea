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

const professionalList = ['Children', 'Student', 'White-collar worker', 'Blue-collar worker', 'The elderly', 'The disabled', 'For everyone']
const standoutReasonList = ['affordable', 'novel', 'eco-friendly', 'technology-based', 'productive', 'effective', 'fast', 'promising', 'problem-solving']
export const professionals = labelValueGenerate(professionalList)
export const standoutReasons = labelValueGenerate(standoutReasonList)

