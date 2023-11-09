import { labelValueGenerate } from './utils'

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

export const localStorageStepFormat = (stepCount) => {
  return `step${stepCount}.data`
}

const professionalList = [
  'Children',
  'Student',
  'White-collar worker',
  'Blue-collar worker',
  'The elderly',
  'The disabled',
  'For everyone',
]
const standoutReasonList = [
  'affordable',
  'novel',
  'eco-friendly',
  'technology-based',
  'productive',
  'effective',
  'fast',
  'promising',
  'problem-solving',
]

export const customerJobs = labelValueGenerate(professionalList)
export const standoutReasons = labelValueGenerate(standoutReasonList)

export const gooleTokenInfo =
  'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token='

export const industries = {
  'Technology and Information Technology': [
    'Software Development and IT Services',
    'Electronics and Hardware Manufacturing',
    'Computer Hardware and Software',
    'Internet Services and E-commerce',
    'Artificial Intelligence and Machine Learning',
    'Cybersecurity',
    'Telecommunications',
  ],
  'Healthcare and Pharmaceutical': [
    'Pharmaceuticals and Biotechnology',
    'Healthcare Services and Hospitals',
    'Medical Devices and Equipment',
    'Health and Wellness',
  ],
  'Energy and Utilities': [
    'Renewable Energy',
    'Oil and Gas',
    'Power Generation and Distribution',
    'Utilities and Energy Services',
  ],
  'Manufacturing and Industrial': [
    'Automotive and Transportation',
    'Aerospace and Defense',
    'Chemicals and Materials',
    'Heavy Machinery and Equipment',
    'Consumer Goods and Retail',
  ],
  'Financial Services': [
    'Banking and Finance',
    'Insurance',
    'Investment and Asset Management',
    'Fintech and Payment Solutions',
  ],
  'Media and Entertainment': [
    'Broadcasting and Media Production',
    'Publishing and Print Media',
    'Film and Television',
    'Music and Streaming',
    'Gaming and Esports',
  ],
  'Professional Services': [
    'Consulting and Advisory',
    'Legal Services',
    'Market Research',
    'Human Resources and Talent Management',
  ],
  'Environmental and Sustainability': [
    'Clean Energy and Renewable Resources',
    'Waste Management and Recycling',
    'Environmental Services',
  ],

  'Travel and Hospitality': [
    'Travel and Tourism',
    'Hospitality and Accommodation',
    'Aviation and Airlines',
  ],
  'Retail and Consumer Services': [
    'Fashion and Apparel',
    'Food and Beverage',
    'Luxury Goods',
    'E-commerce and Online Retail',
    'Home and Lifestyle',
  ],
  'Education and EdTech': [
    'Education and Training Services',
    'E-learning and Online Education',
    'Education Technology (EdTech)',
  ],

  'Real Estate and Construction': [
    'Real Estate Development',
    'Property Management',
    'Construction and Engineering',
  ],
  'Art and Culture': [
    'Art Galleries and Museums',
    'Cultural Events and Festivals',
  ],
  'Transportation and Logistics': [
    'Logistics and Supply Chain',
    'Shipping and Freight',
    'Transportation Services',
  ],
  'Social Impact and Non-profit': [
    'Social Enterprises and Impact Investing',
    'Non-profit Organizations and Foundations',
  ],
}

export const companyIndustries = [
  'Software',
  'Hardware',
  'Telecommunications',
  'Healthcare',
  'Financial Services',
  'Retail',
  'Automotive',
  'Energy',
  'Manufacturing',
  'Consumer Goods',
  'Entertainment and Media',
  'Aerospace and Defense',
  'Transportation and Logistics',
  'Real Estate',
  'Hospitality and Tourism',
  'Education',
  'Professional Services',
  'Agriculture',
  'Pharmaceuticals',
  'Construction',
  'Insurance',
  'E-commerce',
  'Software as a Service',
  'Gaming',
  'Clean Energy',
  'Biotechnology',
  'Chemicals',
  'Fashion and Apparel',
  'Consulting',
  'Health and Wellness',
  'Social Media',
  'Artificial Intelligence (AI)',
  'Cryptocurrency and Blockchain',
  'Food and Beverage',
  'Pharmaceuticals and Healthcare Services',
  'Environmental Services',
  'Media and Advertising',
  'Aerospace',
  'Legal Services',
  'Venture Capital and Private Equity',
  'Mining and Metals',
  'Travel and Tourism',
  'Renewable Energy',
  'Supply Chain and Logistics',
  'Waste Management',
  'Entertainment and Live Events',
  'Market Research',
  'Forestry and Timber',
  'Defense and Security',
  'Intellectual Property',
  'Gaming and Esports',
  'Social Impact and Sustainability',
  'Robotics and Automation',
  'Insurance Technology (Insurtech)',
  'Space Exploration and Technology',
  'Education Technology (EdTech)',
  'Sports and Fitness',
  'Luxury Goods',
  'Augmented Reality (AR) and Virtual Reality (VR)',
  'Home Automation and Smart Devices',
  'Advertising Technology (AdTech)',
  'Financial Technology (FinTech)',
  'Human Resources and Talent Management',
  'Internet of Things (IoT)',
  'Nanotechnology',
  'Art and Culture',
  '3D Printing',
  'Clean Tech and Environmental Sustainability',
  'Precision Agriculture',
  'Biometrics and Identity Verification',
  'Aerospace Services',
  'Music and Streaming',
  'Legal Technology (LegalTech)',
  'Precision Medicine',
  'Workplace Collaboration and Communication',
  'Impact Investing',
  'Urban Mobility',
  'Cybersecurity',
  'Personal Finance and Wealth Management',
  'Artificial General Intelligence (AGI)',
]

export const teamDescription = [
  'Only me',
  '<5 members',
  '<10 members',
  '<20 members',
  'Start-up Company with less than 50 members',
  'Research Constitution with less than 30 members',
  'Over 50 members',
]

export const currentDevStage = [
  'Idea concept which has not been implemented',
  'Prototyped solution which has been implemented and tested in development environment',
  'Solution which has been tested in small scale of less than 1.000 users (alpha version)',
  'Solution needs more adjustments (beta version)',
  'Commercialied Solution could release at small scale less than 10.000 users',
]
