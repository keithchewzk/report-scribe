function Report() {
  return (
    <div style={{ 
      padding: '16px 24px', 
      borderBottom: '1px solid #404040',
      backgroundColor: '#2a2a2a',
      flexShrink: 0
    }}>
      <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '500', color: '#ffffff' }}>
        Generated Report
      </h2>
      <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#a0a0a0' }}>
        Review and refine your student report
      </p>
      
      {/* Report Display Content */}
      <div style={{ 
        marginTop: '16px',
        height: '400px', 
        backgroundColor: '#3a3a3a', 
        border: '2px dashed #404040',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '16px',
        color: '#a0a0a0'
      }}>
        Generated Report Display Will Go Here
      </div>
    </div>
  )
}

export default Report