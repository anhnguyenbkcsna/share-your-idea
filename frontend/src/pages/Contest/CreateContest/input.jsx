import React from 'react'

export function ContestInput({ label, setFunc = ()=>{}, width = '80%', style = {}}) {
  return (
    <div
      style={{
        ...style
      }}
    >
      <label
        style={{
          fontSize: '1.7rem',
        }}
      >{label}</label><br />
      <input
        type="text"
        onChange={e => setFunc(e.target.value)}
        style={{
          outline: 'none',
          background: 'transparent',
          border: '1px solid #fff',
          fontSize: '1.7rem',
          marginTop: 10,
          marginBottom: 40,
          padding: '10px 12px',
          color: '#fff',
          fontFamily: 'inherit',
          width: width
        }}
      />
    </div>
  )
}
