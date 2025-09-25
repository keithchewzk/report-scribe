import React from 'react'
import { FormFieldProps } from '../../../types'

interface InstructionsFieldProps extends FormFieldProps {
  value: string
  onChange: (value: string) => void
}

const InstructionsField: React.FC<InstructionsFieldProps> = ({ value, onChange }) => {
  return (
    <div style={{ marginBottom: '24px' }}>
      <label
        style={{
          display: 'block',
          fontSize: '12px',
          fontWeight: '500',
          color: '#ffffff',
          marginBottom: '6px'
        }}
      >
        Additional Instructions
      </label>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g., Report should be under 100 words, Focus on math skills, Use simple language..."
        style={{
          width: '100%',
          height: '120px',
          padding: '12px',
          backgroundColor: '#3a3a3a',
          border: '1px solid #404040',
          borderRadius: '6px',
          color: '#ffffff',
          fontSize: '14px',
          outline: 'none',
          resize: 'vertical',
          fontFamily: 'inherit',
          lineHeight: '1.5',
          boxSizing: 'border-box'
        }}
        onFocus={(e) => {
          (e.target as HTMLTextAreaElement).style.borderColor = '#555555'
        }}
        onBlur={(e) => {
          (e.target as HTMLTextAreaElement).style.borderColor = '#404040'
        }}
      />

      <div style={{
        marginTop: '6px',
        fontSize: '11px',
        color: '#a0a0a0',
        fontStyle: 'italic'
      }}>
        Optional: Add specific instructions for the report generation
      </div>
    </div>
  )
}

export default InstructionsField