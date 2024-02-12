import React from 'react'

export default function ContestFooter() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#9a9a9a',
        fontSize: '3rem',
        padding: '0 78px',
        color: '#fff',
        height: 214,
        fontFamily: 'Michroma, sans-serif'
      }}
    >
      <div>
        WorIdea
      </div>
      <div
        style={{
          fontSize: '2rem',
          textDecoration: 'underline',
        }}
      >
        Partner
      </div>
    </div>
  )
}
