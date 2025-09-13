import './App.css'
import StudentDetailsPanel from './components/StudentDetailsPanel'
import ReportPanel from './components/ReportPanel'

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
        <ReportPanel />
      </div>
    </div>
  )
}

export default App
