function NameField() {
  return (
    <div style={{ flex: 1, minWidth: '200px' }}>
      <label 
        htmlFor="student-name" 
        style={{ 
          display: 'block',
          fontSize: '12px', 
          fontWeight: '500', 
          color: '#ffffff',
          marginBottom: '6px'
        }}
      >
        Student Name
      </label>
      <input
        id="student-name"
        type="text"
        placeholder="Enter student's full name"
        style={{
          width: '100%',
          padding: '10px 12px',
          backgroundColor: '#3a3a3a',
          border: '1px solid #404040',
          borderRadius: '6px',
          color: '#ffffff',
          fontSize: '14px',
          outline: 'none',
          boxSizing: 'border-box',
          transition: 'border-color 0.2s ease'
        }}
        onFocus={(e) => {
          e.target.style.borderColor = '#555555'
        }}
        onBlur={(e) => {
          e.target.style.borderColor = '#404040'
        }}
      />
    </div>
  )
}

export default NameField