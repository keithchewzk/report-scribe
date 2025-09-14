import React from 'react'

const Refinement: React.FC = () => {
  return (
    <div style={{
      flex: 1,
      overflowY: 'auto',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      backgroundColor: '#1e1e1e'
    }}>
      <div style={{
        height: '300px',
        backgroundColor: '#3a3a3a',
        border: '2px dashed #404040',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '16px',
        color: '#a0a0a0'
      }}>
        Report Refinement Components Will Go Here
      </div>
    </div>
  )
}

export default Refinement