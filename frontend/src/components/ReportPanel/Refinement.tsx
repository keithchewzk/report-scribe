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

  // Show placeholder when no report exists
  if (!reportData || !reportData.success) {
    return (
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1e1e1e'
      }}>
        <div style={{
          height: '200px',
          backgroundColor: '#3a3a3a',
          border: '2px dashed #404040',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px',
          color: '#a0a0a0',
          textAlign: 'center',
          padding: '24px'
        }}>
          Generate a report first to enable refinement
        </div>
      </div>
    )
  }

  return (
    <div style={{
      flex: 1,
      overflowY: 'auto',
      padding: '24px',
      backgroundColor: '#1e1e1e'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '16px' }}>
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
      <div style={{ marginBottom: '16px' }}>
        <textarea
          value={refinementInput}
          onChange={(e) => setRefinementInput(e.target.value)}
          placeholder="e.g., Make it shorter, Add more detail about math skills, Use simpler language..."
          disabled={loading}
          style={{
            width: '100%',
            height: '80px',
            padding: '12px',
            backgroundColor: loading ? '#2a2a2a' : '#3a3a3a',
            border: '1px solid #404040',
            borderRadius: '6px',
            color: loading ? '#666666' : '#ffffff',
            fontSize: '14px',
            outline: 'none',
            resize: 'vertical',
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