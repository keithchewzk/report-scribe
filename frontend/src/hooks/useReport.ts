import { useState } from 'react'
import {
  generateReport as generateReportService,
  GenerateReportRequest,
  GenerateReportResponse
} from '../services/reportService'

export interface UseReportReturn {
  reportData: GenerateReportResponse | null
  loading: boolean
  error: string
  generateReport: (formData: GenerateReportRequest) => Promise<void>
  clearReport: () => void
  clearError: () => void
}

/**
 * Custom React hook for managing report generation state and actions
 * Encapsulates all report-related logic and state management
 */
export const useReport = (): UseReportReturn => {
  const [reportData, setReportData] = useState<GenerateReportResponse | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const generateReport = async (formData: GenerateReportRequest): Promise<void> => {
    // Validate form data
    if (!formData.name.trim() || !formData.gender) {
      setError('Please fill in all required fields')
      return
    }

    setLoading(true)
    setError('')

    try {
      const result = await generateReportService(formData)
      setReportData(result)
      console.log('Report generated:', result)
    } catch (error) {
      console.error('Failed to generate report:', error)
      setError('Failed to generate report. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const clearReport = (): void => {
    setReportData(null)
    setError('')
  }

  const clearError = (): void => {
    setError('')
  }

  return {
    // State
    reportData,
    loading,
    error,

    // Actions
    generateReport,
    clearReport,
    clearError
  }
}