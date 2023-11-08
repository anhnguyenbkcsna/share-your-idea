import { labelValueGenerate } from './utils'

export const userRole = [
  {
    label: 'Innovator',
    value: 'Innovator',
  },
  {
    label: 'Company/Sponsor',
    value: 'Company',
  },
]

const occupations = [
  'Healthcare and Medicine',
  'Education and Teaching',
  'Information Technology and Computer Science',
  'Business and Finance',
  'Legal and Law Enforcement',
  'Engineering and Construction',
  'Arts and Entertainment',
  'Customer Service and Sales',
  'Manufacturing and Production',
  'Transportation and Logistics',
  'Social Services and Nonprofit',
  'Agriculture and Farming',
  'Government and Public Administration',
  'Environmental and Sustainability',
  'Culinary and Food Service',
  'Retail and Wholesale Trade',
]

export const occupationGroups = labelValueGenerate(occupations)

export const organization = ['Self-employed or Freelance', 'Student']

// export const
