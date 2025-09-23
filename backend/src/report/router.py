import logging

from fastapi import APIRouter, Depends, HTTPException
from src.report.dependencies import get_report_service
from src.report.schemas import ReportRequest, ReportResponse
from src.report.services import ReportService

logger = logging.getLogger(__name__)

router = APIRouter()


@router.post("/generate", response_model=ReportResponse)
async def generate_report(
    request: ReportRequest, report_service: ReportService = Depends(get_report_service)
):
    """Generate a student report based on provided information"""

    try:
        logger.info(f"Generating report for student: {request.name}")

        # Use AI report generation instead of mock
        report_content = await report_service.generate_ai_report(request)

        logger.info(f"Successfully generated report for {request.name}")

        return ReportResponse(
            success=True, report=report_content, message="Report generated successfully"
        )

    except Exception as e:
        logger.error(f"Error generating report: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Internal server error occurred while generating report",
        )
