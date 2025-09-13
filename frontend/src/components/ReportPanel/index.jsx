import Report from './Report'
import Refinement from './Refinement'

function ReportPanel() {
  return (
    <div style={{ 
      width: '50%', 
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#1e1e1e'
    }}>
      <Report />
      <Refinement />
    </div>
  )
}

export default ReportPanel