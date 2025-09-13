import NameField from './NameField'
import GenderField from './GenderField'

function StudentForm() {
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
        <NameField />
        <GenderField />
      </div>
      
      {/* Placeholder for additional form fields */}
      <div style={{ 
        height: '600px', 
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