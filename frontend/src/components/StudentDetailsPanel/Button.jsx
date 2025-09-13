import { useState } from 'react'

function GenerateReportButton({ formData }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const isFormValid = () => {
    return (
      formData.name.trim() !== '' &&
      formData.gender !== '' &&
      formData.positiveAttributes.length > 0
    )
  }

  const handleGenerateReport = async () => {
    if (!isFormValid()) {
      setError('Please fill in all required fields')
      return
    }

    setLoading(true)
    setError('')

    try {
      const payload = {
        name: formData.name.trim(),
        gender: formData.gender,
        positive_attributes: formData.positiveAttributes
      }

      const response = await fetch('/api/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      console.log('Report generated:', result)
      
      // TODO: Handle successful response (e.g., pass to parent component)
      
    } catch (error) {
      console.error('Failed to generate report:', error)
      setError('Failed to generate report. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ 
      padding: '16px 24px', 
      borderTop: '1px solid #404040',
      backgroundColor: '#2a2a2a',
      flexShrink: 0
    }}>
      <button
        onClick={handleGenerateReport}
        disabled={loading || !isFormValid()}
        style={{
          width: '100%',
          padding: '12px 16px',
          backgroundColor: (!isFormValid() || loading) ? '#404040' : '#4a5568',
          border: '1px solid #404040',
          borderRadius: '8px',
          color: (!isFormValid() || loading) ? '#666666' : '#ffffff',
          fontSize: '14px',
          fontWeight: '500',
          cursor: (!isFormValid() || loading) ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}
        onMouseEnter={(e) => {
          if (isFormValid() && !loading) {
            e.target.style.backgroundColor = '#5a6578'
          }
        }}
        onMouseLeave={(e) => {
          if (isFormValid() && !loading) {
            e.target.style.backgroundColor = '#4a5568'
          }
        }}
      >
        {loading ? (
          <>
            <div style={{
              width: '16px',
              height: '16px',
              border: '2px solid #666666',
              borderTop: '2px solid #ffffff',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
            Generating Report...
          </>
        ) : (
          <>
            <span style={{ fontSize: '16px' }}>📄</span>
            Generate Report
          </>
        )}
      </button>
      
      {error && (
        <div style={{
          marginTop: '8px',
          padding: '8px 12px',
          backgroundColor: '#4a2828',
          border: '1px solid #804040',
          borderRadius: '4px',
          color: '#ff6b6b',
          fontSize: '12px',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default GenerateReportButton