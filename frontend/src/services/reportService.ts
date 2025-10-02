/**
 * Report Service - Handles all report-related API calls
 * This layer contains pure API functions with no React dependencies
 */

const BACKEND_API_URL =
  import.meta.env.VITE_BACKEND_API_URL || "http://localhost:8000";

export interface GenerateReportRequest {
  name: string;
  gender: "Male" | "Female";
  positive_attributes: string[];
  negative_attributes: string[];
  instructions: string;
}

export interface GenerateReportResponse {
  success: boolean;
  report: string;
  message: string;
}

export interface RefineReportRequest {
  refinement_instructions: string;
  current_report: string;
}

export interface RefineReportResponse {
  success: boolean;
  report: string;
  message: string;
}

export const generateReport = async (
  formData: GenerateReportRequest
): Promise<GenerateReportResponse> => {
  const payload: GenerateReportRequest = {
    name: formData.name.trim(),
    gender: formData.gender,
    positive_attributes: formData.positive_attributes,
    negative_attributes: formData.negative_attributes,
    instructions: formData.instructions,
  };

  const response = await fetch(`${BACKEND_API_URL}/report/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result: GenerateReportResponse = await response.json();
  return result;
};

export const refineReport = async (
  refinementData: RefineReportRequest
): Promise<RefineReportResponse> => {
  const payload: RefineReportRequest = {
    refinement_instructions: refinementData.refinement_instructions.trim(),
    current_report: refinementData.current_report,
  };

  const response = await fetch(`${BACKEND_API_URL}/report/refine`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result: RefineReportResponse = await response.json();
  return result;
};
