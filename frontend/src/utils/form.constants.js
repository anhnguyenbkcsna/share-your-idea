import { deployedAPI } from './api.constants'

export { deployedAPI }
// export const deployedAPI = 'https://share-your-idea.onrender.com'
export const  labelValueGenerate = (strList) => {
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
    label: 'Toàn cầu',
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
    label: 'Châu Âu',
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
    label: 'Đô thị', //big city
    value: 'Metropolis',
  },
  {
    label: 'Ngoại ô',
    value: 'Downtown',
  },
  {
    label: 'Nông thôn',
    value: 'Countryside',
  },
  {
    label: 'Khu vực hẻo lánh',
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
    label: 'Sắc đẹp',
    value: 'Beauty',
  },
  {
    label: 'Kinh doanh',
    value: 'Business',
  },
  {
    label: 'Marketing',
    value: 'Marketing',
  },
  {
    label: 'Công nghệ',
    value: 'Eco-Bio',
  },
]

export const userFormStepItem = [
  {
    title: 'Khái quát ý tưởng',
    // icon: <UserOutlined />,
  },
  {
    title: 'Đối tượng khách hàng',
    // icon: <SolutionOutlined />,
  },
  {
    title: 'Giá trị đem lại',
    // icon: <LoadingOutlined />,
  },
  {
    title: 'Hoàn tất',
    // icon: <SmileOutlined />,
  },
]
export const userSponsorFormStepItem = [
  {
    title: 'Gói tài trợ',
    // icon: <SmileOutlined />,
  },
]
export const companyRequirementStep = [
  {
    title: 'Yêu cầu từ doanh nghiệp',
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

export const customerJobs = labelValueGenerate(professionalList)
export const standoutReasons = labelValueGenerate(standoutReasonList)

export const gooleTokenInfo =
  'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token='

export const industries = {
  'Nông nghiệp và Thực phẩm': [
    'Khoa học Nông nghiệp',
    'Kinh doanh Nông nghiệp',
    'Khoa học Thực phẩm',
    'Khoa học Chăn nuôi',
  ],
  'Công nghệ và Công nghiệp': [
    'Công nghệ Sinh học',
    'Công nghệ Thông tin',
    'Công nghệ Môi trường',
    'Công nghệ Vật liệu',
    'Công nghệ Năng lượng',
    'Công nghệ Hóa học',
    'Công nghệ Cơ khí',
    'Công nghệ Điện tử',
    'Công nghệ Vũ trụ',
    'Công nghệ Hạt nhân',
    'Công nghệ Điện tử',
  ],
  'Y tế và Dược phẩm': [
    'Dược phẩm và Công nghệ Sinh học',
    'Dịch vụ Y tế',
    'Thiết bị Y tế',
    'Sức khỏe và Làm đẹp',
  ],
  'Năng lượng và Tiện ích': [
    'Năng lượng tái tạo',
    'Dầu khí',
    'Phân phối và Phát điện',
  ],
  'Sản xuất và Công nghiệp': [
    'Ô tô và Vận tải',
    'Hàng không và Hàng không vũ trụ',
    'Hóa chất và Vật liệu',
  ],
  'Giao dịch tài chính': [
    'Ngân hàng và Tài chính',
    'Bảo hiểm',
    'Quản lý tài sản',
  ],
  'Truyền thông và Giải trí': [
    'Truyền thông và Truyền hình',
    'Xuất bản và In ấn',
    'Phim và Truyền hình',
    'Âm nhạc và Phát trực tuyến',
    'Trò chơi điện tử và Esports',
  ],
  'Logistics và Vận tải': [
    'Logistics và Chuỗi cung ứng',
    'Vận tải và Dịch vụ Logistics',
  ],
  'Giáo dục': [
    'Giáo dục và Đào tạo',
    'Giáo dục trực tuyến',
    'Công nghệ Giáo dục',
  ],
  'Khách sạn và Du lịch': [
    'Quản lý khách sạn',
    'Du lịch và Dịch vụ du lịch',
    'Nghệ thuật ẩm thực',
    'Tổ chức sự kiện'
  ],
  'Sản xuất': [
    'Sản xuất',
    'Quản lý sản xuất',
    'Quản lý chất thải',
  ],
  'Tâm lý': [
    'Tâm lý học',
    'Tâm lý học trực tuyến',
    'Tâm lý học và Tâm lý học học đường',
  ]
}
export const companyIndustries = [
  'Phần mềm (Software)',
  'Thiết bị phần cứng và IoT',
  'Viễn thông (Telecommunications)',
  'Chăm sóc sức khỏe (Healthcare)',
  'Dịch vụ tài chính và Quản lí tài chính cá nhân (Financial Services)',
  'Kinh doanh buôn bán (Sales)',
  'Ô tô (Automotive)',
  'Năng lượng (Energy)',
  'Sản xuất (Manufacturing)',
  'Hàng tiêu dùng (Consumer Goods)',
  'Giải trí và truyền thông (Entertainment and Media)',
  'Hàng không và Quốc phòng (Aerospace and Defense)',
  'Vận tải và Logistics (Transportation and Logistics)',
  'Bất động sản (Real Estate)',
  'Lưu trú và Du lịch (Hospitality and Tourism)',
  'Giáo dục (Education)',
  'Dịch vụ chuyên nghiệp (Professional Services)',
  'Nông nghiệp (Agriculture)',
  'Dược phẩm (Pharmaceuticals)',
  'Xây dựng (Construction)',
  'Bảo hiểm (Insurance)',
  'Thương mại điện tử (E-commerce)',
  'Trò chơi điện tử và Esports (Gaming)',
  'Năng lượng sạch (Clean Energy)',
  'Công nghệ Sinh học (Biotechnology)',
  'Hóa chất (Chemicals)',
  'Thời trang và May mặc (Fashion and Apparel)',
  'Tư vấn (Consulting)',
  'Sức khỏe và Làm đẹp (Health and Wellness)',
  'Mạng xã hội (Social Media)',
  'Trí tuệ nhân tạo (Artificial Intelligence - AI)',
  'Tiền mã hóa và Blockchain (Cryptocurrency and Blockchain)',
  'Thực phẩm và Đồ uống (Food and Beverage)',
  'Dược phẩm và Dịch vụ chăm sóc sức khỏe (Pharmaceuticals and Healthcare Services)',
  'Dịch vụ Môi trường (Environmental Services)',
  'Truyền thông và Quảng cáo (Media and Advertising)',
  'Dịch vụ Luật sư (Legal Services)',
  'Khai thác mỏ và Kim loại (Mining and Metals)',
  'Năng lượng tái tạo (Renewable Energy)',
  'Chuỗi cung ứng và Logistics (Supply Chain and Logistics)',
  'Quản lý chất thải (Waste Management)',
  'Giải trí và Sự kiện trực tiếp (Entertainment and Live Events)',
  'Nghiên cứu thị trường (Market Research)',
  'Lâm nghiệp và Gỗ (Forestry and Timber)',
  'Quốc phòng và An ninh (Defense and Security)',
  'Sở hữu trí tuệ (Intellectual Property)',
  'Tác động xã hội và Bền vững (Social Impact and Sustainability)',
  'Robotics và Tự động hóa (Robotics and Automation)',
  'Công nghệ bảo hiểm (Insurance Technology)',
  'Công nghệ vũ trụ và Hàng không vũ trụ',
  'Công nghệ giáo dục (Education Technology - EdTech)',
  'Thể thao và Thể dục (Sports and Fitness)',
  'Thực tế tăng cường (Augmented Reality - AR) và Thực tế ảo (Virtual Reality - VR)',
  'Tự động hóa nhà và Thiết bị thông minh (Home Automation and Smart Devices)',
  'Công nghệ quảng cáo (Advertising Technology - AdTech)',
  'Công nghệ tài chính (Financial Technology - FinTech)',
  'Nhân sự và Quản lý tài năng (Human Resources and Talent Management)',
  'Nghệ thuật và Văn hóa (Art and Culture)',
  'Công nghệ sạch và Bền vững môi trường (Clean Tech and Environmental Sustainability)',
  'Nông nghiệp (Agriculture)',
  'Sinh trắc học và Xác minh danh tính (Biometrics and Identity Verification)',
  'Âm nhạc và Phát trực tuyến (Music and Streaming)',
  'Công nghệ pháp lý (Legal Technology - LegalTech)',
  'Hợp tác và Giao tiếp trong nơi làm việc (Workplace Collaboration and Communication)',
  'Đầu tư',
  'Giao thông thông minh',
  'Bảo mật mạng (Cybersecurity)',
  'Trí tuệ nhân tạo tổng quát (Artificial General Intelligence - AGI)',
]

export const teamDescription = [
  'Cá nhân',
  '<5 thành viên',
  '<10 thành viên',
  '<20 thành viên',
  'Công ty khởi nghiệp quy mô 50 thành viên',
  'Nhóm nghiên cứu quy mô 30 thành viên',
  'Trên 50 thành viên',
]

export const currentDevStage = [
  '[Ý tưởng] Ý tưởng chưa được thực hiện',
  '[Hiện thực] Ý tưởng đang được hiện thực và thử nghiệm trong môi trường phát triển',
  '[Alpha] Ý tưởng đang được thử nghiệm trong môi trường thực tế nhưng chưa hoàn thiện',
  '[Beta] Ý tưởng đã hoàn thiện và cần một số chỉnh sửa nhỏ',
  '[Hoàn thiện] Ý tưởng đã có thể đưa ra thị trường và hoạt động tốt',
]

export const sponsorBenefits = [
  'Logo và tên công ty được hiển thị trên các tài liệu quảng cáo, trang web và các ấn phẩm của dự án.',
  'Được giới thiệu tại các sự kiện của dự án.',
  'Cơ hội tiếp cận với các nhà đầu tư và khách hàng tiềm năng.',
  'Tăng nhận thức về thương hiệu và uy tín của công ty.',
  'Được hưởng lợi từ các ưu đãi về thuế.Tài trợ bằng sản phẩm hoặc dịch vụ',
  'Sản phẩm hoặc dịch vụ của nhà tài trợ được sử dụng trong dự án.',
  'Logo và tên công ty được hiển thị trên sản phẩm hoặc dịch vụ của dự án.',
  'Cơ hội quảng bá sản phẩm hoặc dịch vụ của nhà tài trợ cho đối tượng mục tiêu.',
  'Tăng nhận thức về thương hiệu và uy tín của công ty.',
  'Xây dựng mối quan hệ với các khách hàng tiềm năng.Tài trợ bằng chuyên môn',
  'Nhà tài trợ cung cấp chuyên môn của mình cho dự án.',
  'Được ghi nhận vì sự đóng góp của mình cho dự án.',
  'Tăng nhận thức về thương hiệu và uy tín của công ty.',
  'Xây dựng mối quan hệ với các nhà lãnh đạo trong ngành.',
  'Thu hút nhân tài mới.Tài trợ truyền thông.',
  'Logo và tên công ty được hiển thị trong các tài liệu quảng cáo của dự án.',
  'Được giới thiệu trong các bài báo, bài đăng trên blog và các phương tiện truyền thông xã hội về dự án.',
  'Cơ hội tiếp cận với đối tượng mục tiêu của nhà tài trợ.',
  'Tăng nhận thức về thương hiệu và uy tín của công ty.',
  'Xây dựng mối quan hệ với các nhà báo và những người có ảnh hưởng.'
]

export const sponsorBenefitsOptions = labelValueGenerate(sponsorBenefits)