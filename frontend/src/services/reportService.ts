/**
 * Report Service - Handles all report-related API calls
 * This layer contains pure API functions with no React dependencies
 */

export interface GenerateReportRequest {
  name: string
  gender: 'Male' | 'Female'
  positive_attributes: string[]
}

export interface GenerateReportResponse {
  content: string
}

export const generateReport = async (formData: GenerateReportRequest): Promise<GenerateReportResponse> => {
  // Mock API response - comment out when ready to use real backend
  await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate network delay

  const result: GenerateReportResponse = {
    content: `This report is for ${formData.name.trim()}`
  }

  return result

  /* Real API call - uncomment when backend is ready
  const payload: GenerateReportRequest = {
    name: formData.name.trim(),
    gender: formData.gender,
    positive_attributes: formData.positive_attributes
  }

  const response = await fetch('/report/generate', {
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
  */
}