import React from 'react'

export default function ContestFooter() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#9a9a9a',
        fontSize: '2.5em',
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
          fontSize: '1.5rem',
          textDecoration: 'underline',
        }}
      >
        Partner
      </div>
    </div>
  )
}
