import logging

from fastapi import APIRouter, HTTPException

from .schemas import ReportRequest, ReportResponse

logger = logging.getLogger(__name__)

router = APIRouter()


# Mock report generation function
def generate_mock_report(request: ReportRequest) -> str:
    """Generate a mock student report based on the provided data"""

    # Determine pronouns based on gender
    pronoun = "he" if request.gender == "Male" else "she"
    possessive = "his" if request.gender == "Male" else "her"

    # Start building the report
    report = f"Student Report for {request.name}\n\n"

    # Add positive attributes section
    if request.positive_attributes:
        report += (
            f"{request.name} has demonstrated several commendable qualities this term. "
        )

        # Use first few attributes in a sentence
        if len(request.positive_attributes) >= 3:
            first_three = request.positive_attributes[:3]
            report += f"Particularly noteworthy is how {pronoun} {', '.join(first_three).lower()}. "
        elif len(request.positive_attributes) == 2:
            report += f"Particularly noteworthy is how {pronoun} {' and '.join(request.positive_attributes).lower()}. "
        else:
            report += f"Particularly noteworthy is how {pronoun} {request.positive_attributes[0].lower()}. "

        # Add remaining attributes if there are more
        if len(request.positive_attributes) > 3:
            remaining = request.positive_attributes[3:]
            report += f"Additionally, {request.name} {', '.join(remaining).lower()}. "

    # Add a general conclusion
    report += (
        f"\n\nOverall, {request.name} is a valued member of our classroom community. "
    )
    report += f"With continued effort and focus, {pronoun} will achieve even greater success in {possessive} academic journey."

    return report


@router.post("/", response_model=ReportResponse)
async def generate_report(request: ReportRequest):
    """Generate a student report based on provided information"""

    try:
        # Log the incoming request
        logger.info(f"Generating report for student: {request.name}")

        # Generate the report
        report_content = generate_mock_report(request)

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
