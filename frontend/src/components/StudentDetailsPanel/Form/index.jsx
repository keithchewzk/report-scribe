import { useState } from 'react'
import NameField from './NameField'
import GenderField from './GenderField'
import PositiveAttributesField from './PositiveAttributesField'

function StudentForm({ onFormDataChange }) {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    positiveAttributes: []
  })

  const updateFormData = (field, value) => {
    const newFormData = { ...formData, [field]: value }
    setFormData(newFormData)
    if (onFormDataChange) {
      onFormDataChange(newFormData)
    }
  }

  return (
    <div style={{ 
      flex: 1, 
      overflowY: 'auto',
      padding: '24px',
      backgroundColor: '#2a2a2a'
    }}>
      <div style={{ 
        display: 'flex', 
        gap: '16px', 
        alignItems: 'flex-end',
        marginBottom: '24px'
      }}>
        <NameField 
          value={formData.name}
          onChange={(value) => updateFormData('name', value)}
        />
        <GenderField 
          value={formData.gender}
          onChange={(value) => updateFormData('gender', value)}
        />
      </div>
      
      <PositiveAttributesField 
        selectedAttributes={formData.positiveAttributes}
        onChange={(value) => updateFormData('positiveAttributes', value)}
      />
      
      {/* Placeholder for additional form fields */}
      <div style={{ 
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
        Additional Form Components Will Go Here
      </div>
    </div>
  )
}

export default StudentForm