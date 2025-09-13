function GenderField() {
  return (
    <div style={{ width: '120px', flexShrink: 0 }}>
      <label 
        htmlFor="student-gender" 
        style={{ 
          display: 'block',
          fontSize: '12px', 
          fontWeight: '500', 
          color: '#ffffff',
          marginBottom: '6px'
        }}
      >
        Gender
      </label>
      <select
        id="student-gender"
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
          cursor: 'pointer',
          transition: 'border-color 0.2s ease'
        }}
        onFocus={(e) => {
          e.target.style.borderColor = '#555555'
        }}
        onBlur={(e) => {
          e.target.style.borderColor = '#404040'
        }}
      >
        <option value="" style={{ backgroundColor: '#3a3a3a', color: '#a0a0a0' }}>
          Select
        </option>
        <option value="Male" style={{ backgroundColor: '#3a3a3a', color: '#ffffff' }}>
          Male
        </option>
        <option value="Female" style={{ backgroundColor: '#3a3a3a', color: '#ffffff' }}>
          Female
        </option>
      </select>
    </div>
  )
}

export default GenderField