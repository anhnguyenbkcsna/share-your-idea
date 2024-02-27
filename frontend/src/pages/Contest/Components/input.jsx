import React from 'react'

export function ContestInput({
  label,
  setFunc = () => {},
  width = '80%',
  style = {},
  fieldName,
  type = 'text',
}) {
  const handleOnChange = (e) => {
    setFunc((prev) => ({ ...prev, [fieldName]: e.target.value }))
  }

  return (
    <div
      style={{
        ...style,
      }}
    >
      <label
        style={{
          fontSize: '1.7rem',
        }}
      >
        {label}
      </label>
      <br />
      <input
        type={type}
        onChange={handleOnChange}
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
          width: width,
        }}
      />
    </div>
  )
}
