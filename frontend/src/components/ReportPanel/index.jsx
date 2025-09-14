import Report from './Report'
import Refinement from './Refinement'

function ReportPanel({ reportData }) {
  return (
    <div style={{
      width: '50%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#1e1e1e'
    }}>
      <Report reportData={reportData} />
      <Refinement />
    </div>
  )
}

export default ReportPanel