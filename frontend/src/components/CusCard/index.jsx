import React from 'react'

const CusCard = (props) => {
  const {style = null,...other} = props
  const cardStyle = {
    minHeight: '100vh',
    margin: '50px auto',
    padding: '50px',
    width: '80%',
    maxWidth: '1000px',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '2px 2px 10px gray',
    background: 'white',
  }
  return (
    <div {...other} style={ style ? {...cardStyle, ...style} : cardStyle}>{props.children}</div>
  )
}

export default CusCard
