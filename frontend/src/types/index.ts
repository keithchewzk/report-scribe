/**
 * Shared TypeScript interfaces for the Report Scribe application
 */

import { GenerateReportRequest, GenerateReportResponse } from '../services/reportService'

// Form Data Types
export interface FormData {
  name: string
  gender: '' | 'Male' | 'Female'
  positiveAttributes: string[]
}

// Component Prop Types
export interface FormFieldProps {
  value: string
  onChange: (value: string) => void
}

export interface MultiSelectFieldProps {
  value: string[]
  onChange: (value: string[]) => void
}

export interface GenerateReportButtonProps {
  formData: FormData
  onGenerateReport: (formData: GenerateReportRequest) => void
  loading: boolean
  error: string
}

export interface ReportDisplayProps {
  reportData: GenerateReportResponse | null
}

export interface StudentDetailsPanelProps {
  onGenerateReport: (formData: GenerateReportRequest) => void
  loading: boolean
  error: string
}

export interface ReportPanelProps {
  reportData: GenerateReportResponse | null
}

export interface FormChangeHandler {
  (formData: FormData): void
}

// Re-export service types for convenience
export type { GenerateReportRequest, GenerateReportResponse } from '../services/reportService'