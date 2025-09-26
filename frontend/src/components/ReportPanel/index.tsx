import React from 'react'
import { ReportPanelProps } from '../../types'
import Report from './Report'
import Refinement from './Refinement'

const ReportPanel: React.FC<ReportPanelProps> = ({ reportData, onRefineReport, loading, error }) => {
  return (
    <div style={{
      width: '50%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#1e1e1e'
    }}>
      <Report reportData={reportData} />
      <Refinement
        reportData={reportData}
        onRefineReport={onRefineReport}
        loading={loading}
        error={error}
      />
    </div>
  )
}

export default ReportPanel