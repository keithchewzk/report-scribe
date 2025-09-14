import React, { useState } from 'react'
import { MultiSelectFieldProps } from '../../../types'

interface PositiveAttributesFieldProps extends MultiSelectFieldProps {
  value: string[]
  onChange: (value: string[]) => void
}

const PositiveAttributesField: React.FC<PositiveAttributesFieldProps> = ({ value: selectedAttributes, onChange }) => {
  const predefinedAttributes = [
    "Shows enthusiasm for learning",
    "Demonstrates strong leadership skills",
    "Displays initiative in projects",
    "Exhibits excellent teamwork",
    "Shows creativity in problem-solving",
    "Demonstrates responsibility and reliability",
    "Displays respectful behavior towards others",
    "Shows curiosity and asks thoughtful questions",
    "Exhibits strong communication skills",
    "Demonstrates perseverance through challenges"
  ]

  const [availableAttributes, setAvailableAttributes] = useState<string[]>(predefinedAttributes)
  const [customInput, setCustomInput] = useState<string>('')

  const toggleAttribute = (attribute: string): void => {
    const newSelected = selectedAttributes.includes(attribute)
      ? selectedAttributes.filter(attr => attr !== attribute)
      : [...selectedAttributes, attribute]

    onChange(newSelected)
  }

  const addCustomAttribute = (): void => {
    const trimmedInput = customInput.trim()
    if (trimmedInput && !availableAttributes.includes(trimmedInput)) {
      setAvailableAttributes(prev => [...prev, trimmedInput])
      const newSelected = [...selectedAttributes, trimmedInput]
      onChange(newSelected)
      setCustomInput('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      addCustomAttribute()
    }
  }

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
        Positive Attributes
      </label>

      <div style={{
        backgroundColor: '#3a3a3a',
        border: '1px solid #404040',
        borderRadius: '6px',
        height: '300px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Scrollable Attributes List */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '12px'
        }}>
          {availableAttributes.map((attribute, index) => {
            const isSelected = selectedAttributes.includes(attribute)
            return (
              <div
                key={index}
                onClick={() => toggleAttribute(attribute)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px 12px',
                  marginBottom: '4px',
                  backgroundColor: isSelected ? '#4a5568' : 'transparent',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                  fontSize: '14px',
                  color: '#ffffff'
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    (e.currentTarget as HTMLDivElement).style.backgroundColor = '#404040'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    (e.currentTarget as HTMLDivElement).style.backgroundColor = 'transparent'
                  }
                }}
              >
                <div style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid #404040',
                  borderRadius: '3px',
                  marginRight: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: isSelected ? '#4a5568' : 'transparent',
                  borderColor: isSelected ? '#4a5568' : '#404040'
                }}>
                  {isSelected && (
                    <span style={{
                      color: '#ffffff',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      ✓
                    </span>
                  )}
                </div>
                <span style={{ flex: 1, lineHeight: '1.4' }}>
                  {attribute}
                </span>
              </div>
            )
          })}
        </div>

        {/* Custom Input Section */}
        <div style={{
          borderTop: '1px solid #404040',
          padding: '12px',
          display: 'flex',
          gap: '8px'
        }}>
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter custom positive attribute..."
            style={{
              flex: 1,
              padding: '8px 12px',
              backgroundColor: '#2a2a2a',
              border: '1px solid #404040',
              borderRadius: '4px',
              color: '#ffffff',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => {
              (e.target as HTMLInputElement).style.borderColor = '#555555'
            }}
            onBlur={(e) => {
              (e.target as HTMLInputElement).style.borderColor = '#404040'
            }}
          />
          <button
            onClick={addCustomAttribute}
            disabled={!customInput.trim()}
            style={{
              padding: '8px 16px',
              backgroundColor: customInput.trim() ? '#4a5568' : '#2a2a2a',
              border: '1px solid #404040',
              borderRadius: '4px',
              color: customInput.trim() ? '#ffffff' : '#666666',
              fontSize: '14px',
              cursor: customInput.trim() ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              if (customInput.trim()) {
                (e.target as HTMLButtonElement).style.backgroundColor = '#5a6578'
              }
            }}
            onMouseLeave={(e) => {
              if (customInput.trim()) {
                (e.target as HTMLButtonElement).style.backgroundColor = '#4a5568'
              }
            }}
          >
            Add Custom
          </button>
        </div>
      </div>

      {/* Selected Count Display */}
      {selectedAttributes.length > 0 && (
        <div style={{
          marginTop: '8px',
          fontSize: '12px',
          color: '#a0a0a0'
        }}>
          {selectedAttributes.length} positive attribute{selectedAttributes.length !== 1 ? 's' : ''} selected
        </div>
      )}
    </div>
  )
}

export default PositiveAttributesField