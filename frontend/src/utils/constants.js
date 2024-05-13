import { title } from "process"

export const labelValueGenerate = (strList) => {
  return strList.map((item) => {
    return {
      label: item,
      value: item,
    }
  })
}

export const gender = [
  {
    label: 'Nam',
    value: 'Male',
  },
  {
    label: 'Nữ',
    value: 'Female',
  },
  {
    label: 'Khác',
    value: 'Others',
  },
  {
    label: 'Tất cả',
    value: 'Global',
  },
]

export const residential = [
  {
    label: 'Việt Nam',
    value: 'Vietnam',
  },
  {
    label: 'Châu Á',
    value: 'Asia',
  },
  {
    label: 'Châu Âu',
    value: 'Europe',
  },
  {
    label: 'Châu Phi',
    value: 'Africa',
  },
  {
    label: 'Châu Úc',
    value: 'Australia',
  },
  {
    label: 'Châu Mỹ',
    value: 'Americas',
  },
  {
    label: 'Thành phố lớn', //big city
    value: 'Metropolis',
  },
  {
    label: 'Trung tâm thành phố',
    value: 'Downtown',
  },
  {
    label: 'Nông thôn',
    value: 'Countryside',
  },
  {
    label: 'Vùng dân tộc thiểu số',
    value: 'Minority Area',
  },
]

export const domains = [
  {
    label: 'Khoa học',
    value: 'Science',
  },
  {
    label: 'Sức khoẻ',
    value: 'Healthcare',
  },
  {
    label: 'Làm đẹp',
    value: 'Beauty',
  },
  {
    label: 'Doanh nghiệp',
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
    title: 'Tổng quan ý tưởng',
    // icon: <UserOutlined />,
  },
  {
    title: 'Đối tượng khách hàng',
    // icon: <SolutionOutlined />,
  },
  {
    title: 'Đề xuất giá trị ',
    // icon: <LoadingOutlined />,
  },
  {
    title: 'Hoàn tất',
    // icon: <SmileOutlined />,
  },
]

export const companyRequirementStep = [
  {
    title: 'Yêu cầu'
  }
]

export const localStorageStepFormat = (stepCount) => {
  return `step${stepCount}.data`
}

const professionalList = [
  'Trẻ em',
  'Học sinh, sinh viên',
  'Doanh nghiệp',
  'Người tiêu dùng',
  'Người khuyết tật',
  'Người già',
  'Mọi người'
]
const standoutReasonList = [
  'Nhanh',
  'Hiệu quả',
  'Mới lạ',
  'Hữu ích',
  'Tiết kiệm',
  'Dễ dàng',
  'An toàn',
  'Khả thi',
  'Bền vững',
  'Tối ưu tốt',
  'Ứng dụng cao'
]

export const professionals = labelValueGenerate(professionalList)
export const standoutReasons = labelValueGenerate(standoutReasonList)
