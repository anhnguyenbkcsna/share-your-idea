export const labelValueGenerate = (strList) => {
  return strList.map((item) => {
    return {
      label: item,
      value: item,
    }
  })
}
