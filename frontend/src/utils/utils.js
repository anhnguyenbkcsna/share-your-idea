export const labelValueGenerate = (strList) => {
  return strList.map((item) => {
    return {
      label: item,
      value: item,
    }
  })
}

export const createFormData = (data) => {
  let dataForm = new FormData()
  for (let key in data)
  {
    if (typeof data[key] === 'object' && data[key] !== 'null')
    {
      dataForm.append(key, JSON.stringify(data[key]))
    }
    else
    { dataForm.append(key, data[key]) }
  }
  return dataForm
}

export const isSubdomainExist = (subdomain) => {
  return window?.location?.host?.split('.')[0] === subdomain
}


export const formatDate = (date) => {
  const d = new Date(typeof date === 'string' ? date : date.$date)
  const dateInString = d.toLocaleDateString('vi-VN', {
    timeZone: 'UTC', year: 'numeric', month: '2-digit', day: '2-digit'
  })
  return dateInString
}
