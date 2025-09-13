import './App.css'
import StudentDetailsPanel from './components/StudentDetailsPanel'

function App() {
  return (
    <div style={{ 
      height: '100vh',
      width: '100vw',
      display: 'flex', 
      flexDirection: 'column',
      backgroundColor: '#1e1e1e',
      color: '#ffffff',
      margin: 0,
      padding: 0
    }}>
      {/* Header */}
      <header style={{ 
        padding: '16px 24px', 
        borderBottom: '1px solid #404040',
        backgroundColor: '#2a2a2a',
        flexShrink: 0
      }}>
        <h1 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#ffffff' }}>
          Student Report Generator
        </h1>
      </header>

      {/* Main Content - Two Panel Layout */}
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        
        {/* Left Panel - Student Input */}
        <StudentDetailsPanel />

        {/* Right Panel - Report Display & Refinement */}
        <div style={{ 
          width: '50%', 
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#1e1e1e'
        }}>
          {/* Right Panel Header */}
          <div style={{ 
            padding: '16px 24px', 
            borderBottom: '1px solid #404040',
            backgroundColor: '#2a2a2a',
            flexShrink: 0
          }}>
            <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '500', color: '#ffffff' }}>
              Generated Report
            </h2>
            <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#a0a0a0' }}>
              Review and refine your student report
            </p>
          </div>

          {/* Right Panel Scrollable Content */}
          <div style={{ 
            flex: 1, 
            overflowY: 'auto',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            backgroundColor: '#1e1e1e'
          }}>
            {/* Report Display Area */}
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
              Generated Report Display Will Go Here
            </div>

            {/* Report Refinement Area */}
            <div style={{ 
              height: '300px', 
              backgroundColor: '#3a3a3a', 
              border: '2px dashed #404040',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              color: '#a0a0a0'
            }}>
              Report Refinement Components Will Go Here
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
