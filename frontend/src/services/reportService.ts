/**
 * Report Service - Handles all report-related API calls
 * This layer contains pure API functions with no React dependencies
 */

export interface GenerateReportRequest {
  name: string
  gender: 'Male' | 'Female'
  positive_attributes: string[]
  negative_attributes: string[]
  instructions: string
}

export interface GenerateReportResponse {
  success: boolean
  report: string
  message: string
}

export const generateReport = async (formData: GenerateReportRequest): Promise<GenerateReportResponse> => {
  const payload: GenerateReportRequest = {
    name: formData.name.trim(),
    gender: formData.gender,
    positive_attributes: formData.positive_attributes,
    negative_attributes: formData.negative_attributes,
    instructions: formData.instructions
  }

  const response = await fetch('http://localhost:8000/report/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const result: GenerateReportResponse = await response.json()
  return result
}