from src.model.service import ModelService
from src.report.schemas import GenerateReportRequest, RefineReportRequest
from src.report.constants import REPORT_GENERATION_PROMPT_TEMPLATE, REPORT_REFINEMENT_PROMPT_TEMPLATE


class ReportService:
    """Service class for handling report generation and refinement business logic"""

    def __init__(self, model_service: ModelService):
        self.model_service = model_service

    async def generate_report(self, request: GenerateReportRequest) -> str:
        """Generate a student report using AI model"""
        prompt = self._build_report_prompt(request)
        return await self.model_service.generate_content(prompt)

    async def refine_report(self, request: RefineReportRequest) -> str:
        """Refine an existing student report using AI model"""
        prompt = self._build_refinement_prompt(request)
        return await self.model_service.generate_content(prompt)

    def _build_report_prompt(self, request: GenerateReportRequest) -> str:
        """Build a structured prompt for AI to generate professional student reports"""

        # Determine pronouns
        pronoun = "he" if request.gender == "Male" else "she"
        possessive = "his" if request.gender == "Male" else "her"

        # Build attributes list
        attributes_text = ""
        if request.positive_attributes:
            attributes_text += f"Positive attributes observed: {', '.join(request.positive_attributes)}\n"
        if request.negative_attributes:
            attributes_text += (
                f"Areas for improvement: {', '.join(request.negative_attributes)}\n"
            )
        if request.instructions.strip():
            attributes_text += (
                f"Additional instructions: {request.instructions.strip()}"
            )

        prompt = REPORT_GENERATION_PROMPT_TEMPLATE.format(
            name=request.name,
            gender=request.gender,
            pronoun=pronoun,
            possessive=possessive,
            attributes_text=attributes_text
        )

        return prompt

    def _build_refinement_prompt(self, request: RefineReportRequest) -> str:
        """Build a structured prompt for AI to refine existing student reports"""

        prompt = REPORT_REFINEMENT_PROMPT_TEMPLATE.format(
            current_report=request.current_report,
            refinement_instructions=request.refinement_instructions
        )

        return prompt