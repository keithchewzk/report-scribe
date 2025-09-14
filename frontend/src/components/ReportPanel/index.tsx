import React from 'react'
import { ReportPanelProps } from '../../types'
import Report from './Report'
import Refinement from './Refinement'

const ReportPanel: React.FC<ReportPanelProps> = ({ reportData }) => {
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