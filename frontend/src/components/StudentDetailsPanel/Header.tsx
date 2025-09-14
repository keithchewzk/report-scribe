import React from 'react'

const StudentDetailsHeader: React.FC = () => {
  return (
    <div style={{
      padding: '16px 24px',
      borderBottom: '1px solid #404040',
      backgroundColor: '#2a2a2a',
      flexShrink: 0
    }}>
      <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '500', color: '#ffffff' }}>
        Student Details
      </h2>
      <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#a0a0a0' }}>
        Fill in the student information to generate a personalized report
      </p>
    </div>
  )
}

export default StudentDetailsHeader