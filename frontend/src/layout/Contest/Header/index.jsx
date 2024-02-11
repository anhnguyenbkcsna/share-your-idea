import React from 'react'

export default function ContestHeader() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        // background: 'rgba(0, 0, 0, 0.86)',
        background: '#000',
        fontSize: '1.5em',
        padding: '0 78px',
        color: '#fff',
        height: 94,
        fontFamily: 'Michroma, sans-serif'
      }}
    >
      <div>
        WorIdea
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          textDecoration: 'underline',
        }}
      >
        <div style={{marginRight: 56}}>Contact</div>
        <div style={{marginRight: 56}}>Events</div>
        <div>About us</div>
      </div>
      <div>
        Sign In
      </div>
    </div>
  )
}
