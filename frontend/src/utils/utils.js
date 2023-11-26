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
  for (let key in data) {
    if(typeof data[key] === 'object' && data[key] !== 'null') {
      dataForm.append(key, JSON.stringify(data[key]))
    }
    else
      dataForm.append(key, data[key])
  }
  return dataForm
}