from src.model.service import ModelService
from src.report.schemas import GenerateReportRequest, RefineReportRequest


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

        prompt = f"""You are an experienced school teacher writing a professional student report for parent communication.

Student Information:
- Name: {request.name}
- Gender: {request.gender} (use {pronoun}/{possessive} pronouns)
{attributes_text}

Please write a professional, positive, and constructive student report following these guidelines:

1. Use formal but warm educational language appropriate for parent communication
2. Incorporate the positive attributes naturally into meaningful sentences
3. Address areas for improvement constructively and professionally
4. Use proper pronouns ({pronoun}/{possessive}) throughout
5. Include 2-3 paragraphs covering strengths, areas for growth, and overall progress
6. Balance positive feedback with constructive suggestions for improvement
7. End with encouragement and specific next steps for continued growth
8. Keep the tone professional yet supportive - suitable for parent communication
9. Follow any additional instructions provided above (they take priority)
10. Length: 200-400 words (unless specified otherwise in instructions)

The report should sound like it was written by a caring teacher who knows the student well and wants to support their continued development."""

        return prompt

    def _build_refinement_prompt(self, request: RefineReportRequest) -> str:
        """Build a structured prompt for AI to refine existing student reports"""

        prompt = f"""You are an experienced school teacher refining a student report based on specific feedback and instructions.

ORIGINAL REPORT:
{request.current_report}

REFINEMENT INSTRUCTIONS:
{request.refinement_instructions}

Please refine the above student report according to the provided instructions. Follow these guidelines:

1. Maintain the professional, educational tone suitable for parent communication
2. Keep the same student name and basic structure unless specifically instructed otherwise
3. Apply the refinement instructions while preserving the core positive message
4. Ensure the refined report flows naturally and reads professionally
5. Maintain appropriate length (200-400 words unless specified otherwise)
6. Keep proper grammar, spelling, and formatting
7. Preserve any positive achievements mentioned unless specifically asked to modify them
8. If asked to shorten, prioritize the most important points
9. If asked to expand, add relevant educational context and examples
10. Always maintain a constructive and supportive tone

Return only the refined report content without any additional formatting or prefixes."""

        return prompt