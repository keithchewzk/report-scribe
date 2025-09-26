import logging

from fastapi import APIRouter, Depends, HTTPException
from src.report.dependencies import get_report_service
from src.report.schemas import GenerateReportRequest, RefineReportRequest, Report
from src.report.service import ReportService

logger = logging.getLogger(__name__)

router = APIRouter()


@router.post("/generate", response_model=Report)
async def generate_report(
    request: GenerateReportRequest,
    report_service: ReportService = Depends(get_report_service),
):
    """Generate a student report based on provided information"""

    try:
        logger.info(f"Generating report for student: {request.name}")

        # Use AI report generation instead of mock
        report_content = await report_service.generate_report(request)

        logger.info(f"Successfully generated report for {request.name}")

        return Report(
            success=True, report=report_content, message="Report generated successfully"
        )

    except Exception as e:
        logger.error(f"Error generating report: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Internal server error occurred while generating report",
        )


@router.post("/refine", response_model=Report)
async def refine_report(
    request: RefineReportRequest,
    report_service: ReportService = Depends(get_report_service),
):
    """Refine an existing student report based on specific instructions"""

    try:
        logger.info(
            f"Refining report with instructions: {request.refinement_instructions[:50]}..."
        )

        # Use AI report refinement
        refined_content = await report_service.refine_report(request)

        logger.info("Successfully refined report")

        return Report(
            success=True, report=refined_content, message="Report refined successfully"
        )

    except Exception as e:
        logger.error(f"Error refining report: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Internal server error occurred while refining report",
        )
