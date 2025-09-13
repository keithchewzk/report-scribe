import logging

from fastapi import APIRouter, HTTPException

from .schemas import ReportRequest, ReportResponse
from .services import ReportService

logger = logging.getLogger(__name__)

router = APIRouter()

# Initialize the report service
report_service = ReportService()


@router.post("/generate", response_model=ReportResponse)
async def generate_report(request: ReportRequest):
    """Generate a student report based on provided information"""

    try:
        # Log the incoming request
        logger.info(f"Generating report for student: {request.name}")

        # Generate the report using the service
        report_content = report_service.generate_mock_report(request)

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
