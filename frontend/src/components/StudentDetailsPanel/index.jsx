import { useState } from 'react'
import Header from './Header'
import Form from './Form'
import Button from './Button'

function StudentDetailsPanel() {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    positiveAttributes: []
  })

  return (
    <div style={{ 
      width: '50%', 
      borderRight: '1px solid #404040',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#2a2a2a'
    }}>
      <Header />
      <Form onFormDataChange={setFormData} />
      <Button formData={formData} />
    </div>
  )
}

export default StudentDetailsPanel