import React, { useState } from 'react'
import { FormData, FormChangeHandler } from '../../../types'
import NameField from './NameField'
import GenderField from './GenderField'
import PositiveAttributesField from './PositiveAttributesField'
import NegativeAttributesField from './NegativeAttributesField'

interface StudentFormProps {
  onFormDataChange: FormChangeHandler
}

const StudentForm: React.FC<StudentFormProps> = ({ onFormDataChange }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    gender: '',
    positiveAttributes: [],
    negativeAttributes: []
  })

  const updateFormData = (field: keyof FormData, value: string | string[]): void => {
    const newFormData = { ...formData, [field]: value } as FormData
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
        value={formData.positiveAttributes}
        onChange={(value) => updateFormData('positiveAttributes', value)}
      />

      <NegativeAttributesField
        value={formData.negativeAttributes}
        onChange={(value) => updateFormData('negativeAttributes', value)}
      />
    </div>
  )
}

export default StudentForm