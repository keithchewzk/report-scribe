import React, { useState } from 'react'
import { GenerateReportResponse } from '../../services/reportService'

interface RefinementProps {
  reportData: GenerateReportResponse | null
  onRefineReport?: (refinementText: string, currentReport: string) => Promise<void>
  loading?: boolean
  error?: string
}

const Refinement: React.FC<RefinementProps> = ({ reportData, onRefineReport, loading = false, error = '' }) => {
  const [refinementInput, setRefinementInput] = useState<string>('')

  const handleRefineReport = async (): Promise<void> => {
    if (!refinementInput.trim() || !reportData?.report || !onRefineReport) return

    try {
      await onRefineReport(refinementInput.trim(), reportData.report)
      // Clear input after successful refinement
      setRefinementInput('')
    } catch (error) {
      // Error handling is managed by the useReport hook
      console.error('Refinement failed:', error)
    }
  }

  return (
    <div style={{
      flex: '0 0 25%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#1e1e1e',
      borderTop: '1px solid #404040'
    }}>
      {/* Show disabled state when no report exists */}
      {!reportData || !reportData.success ? (
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#2a2a2a',
          margin: '16px 24px',
          border: '2px dashed #404040',
          borderRadius: '8px',
          fontSize: '16px',
          color: '#a0a0a0',
          textAlign: 'center'
        }}>
          Generate a report first to enable refinement
        </div>
      ) : (
        <div style={{ padding: '16px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <div style={{ marginBottom: '16px', flexShrink: 0 }}>
            <h3 style={{
              margin: 0,
              fontSize: '16px',
              fontWeight: '500',
              color: '#ffffff'
            }}>
              Refine Report
            </h3>
            <p style={{
              margin: '4px 0 0 0',
              fontSize: '14px',
              color: '#a0a0a0'
            }}>
              Add instructions to improve the generated report
            </p>
          </div>

          {/* Refinement Input */}
          <div style={{ marginBottom: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <textarea
              value={refinementInput}
              onChange={(e) => setRefinementInput(e.target.value)}
              placeholder="e.g., Make it shorter, Add more detail about math skills, Use simpler language..."
              disabled={loading}
              style={{
                width: '100%',
                flex: 1,
                minHeight: '80px',
                padding: '12px',
                backgroundColor: loading ? '#2a2a2a' : '#3a3a3a',
                border: '1px solid #404040',
                borderRadius: '6px',
                color: loading ? '#666666' : '#ffffff',
                fontSize: '14px',
                outline: 'none',
                resize: 'none',
                fontFamily: 'inherit',
                lineHeight: '1.5',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                if (!loading) {
                  (e.target as HTMLTextAreaElement).style.borderColor = '#555555'
                }
              }}
              onBlur={(e) => {
                (e.target as HTMLTextAreaElement).style.borderColor = '#404040'
              }}
            />
          </div>

          {/* Refine Button */}
          <div style={{ flexShrink: 0 }}>
            <button
              onClick={handleRefineReport}
              disabled={loading || !refinementInput.trim()}
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: (!refinementInput.trim() || loading) ? '#404040' : '#4a5568',
                border: '1px solid #404040',
                borderRadius: '8px',
                color: (!refinementInput.trim() || loading) ? '#666666' : '#ffffff',
                fontSize: '14px',
                fontWeight: '500',
                cursor: (!refinementInput.trim() || loading) ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                if (refinementInput.trim() && !loading) {
                  (e.target as HTMLButtonElement).style.backgroundColor = '#5a6578'
                }
              }}
              onMouseLeave={(e) => {
                if (refinementInput.trim() && !loading) {
                  (e.target as HTMLButtonElement).style.backgroundColor = '#4a5568'
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
                  Refining Report...
                </>
              ) : (
                <>
                  <span style={{ fontSize: '16px' }}>✨</span>
                  Refine Report
                </>
              )}
            </button>

            {/* Error Message */}
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
          </div>
        </div>
      )}

      {/* CSS Animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default Refinement