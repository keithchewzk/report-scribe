import httpx
from src.report.schemas import ReportRequest
from src.settings import settings


class ReportService:
    """Service class for handling report generation logic"""

    def generate_mock_report(self, request: ReportRequest) -> str:
        """Generate a mock student report based on the provided data"""

        # Determine pronouns based on gender
        pronoun = "he" if request.gender == "Male" else "she"
        possessive = "his" if request.gender == "Male" else "her"

        # Start building the report
        report = f"Student Report for {request.name}\n\n"

        # Add positive attributes section
        if request.positive_attributes:
            report += f"{request.name} has demonstrated several commendable qualities this term. "

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
                report += (
                    f"Additionally, {request.name} {', '.join(remaining).lower()}. "
                )

        # Add a general conclusion
        report += f"\n\nOverall, {request.name} is a valued member of our classroom community. "
        report += f"With continued effort and focus, {pronoun} will achieve even greater success in {possessive} academic journey."

        return report

    async def generate_ai_report(self, request: ReportRequest) -> str:
        """Generate a student report using Google Gemini 2.0 Flash API"""

        if not settings.gemini_api_key:
            raise ValueError("GEMINI_API_KEY not configured")

        # Craft the prompt for professional student report generation
        prompt = self._build_report_prompt(request)

        # Gemini 2.0 Flash API endpoint
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key={settings.gemini_api_key}"

        # Request payload structure for Gemini API
        payload = {
            "contents": [
                {
                    "parts": [
                        {
                            "text": prompt
                        }
                    ]
                }
            ],
            "generationConfig": {
                "temperature": 0.7,
                "topP": 0.8,
                "topK": 40,
                "maxOutputTokens": 1000,
                "responseMimeType": "text/plain"
            },
            "safetySettings": [
                {
                    "category": "HARM_CATEGORY_HARASSMENT",
                    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    "category": "HARM_CATEGORY_HATE_SPEECH",
                    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
                }
            ]
        }

        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post(
                    url,
                    json=payload,
                    headers={"Content-Type": "application/json"}
                )

                if response.status_code != 200:
                    raise httpx.HTTPStatusError(
                        f"Gemini API returned {response.status_code}: {response.text}",
                        request=response.request,
                        response=response
                    )

                result = response.json()

                # Extract the generated text from Gemini's response structure
                if "candidates" in result and len(result["candidates"]) > 0:
                    candidate = result["candidates"][0]
                    if "content" in candidate and "parts" in candidate["content"]:
                        parts = candidate["content"]["parts"]
                        if len(parts) > 0 and "text" in parts[0]:
                            return parts[0]["text"].strip()

                raise ValueError("Unexpected response format from Gemini API")

        except httpx.TimeoutException:
            raise Exception("Gemini API request timed out")
        except httpx.HTTPStatusError as e:
            raise Exception(f"Gemini API HTTP error: {e}")
        except Exception as e:
            raise Exception(f"Failed to generate AI report: {str(e)}")

    def _build_report_prompt(self, request: ReportRequest) -> str:
        """Build a structured prompt for Gemini to generate professional student reports"""

        # Determine pronouns
        pronoun = "he" if request.gender == "Male" else "she"
        possessive = "his" if request.gender == "Male" else "her"

        # Build attributes list
        attributes_text = ""
        if request.positive_attributes:
            attributes_text += f"Positive attributes observed: {', '.join(request.positive_attributes)}\n"
        if request.negative_attributes:
            attributes_text += f"Areas for improvement: {', '.join(request.negative_attributes)}"

        prompt = f"""You are an experienced school teacher writing a professional student report for parent communication.

Student Information:
- Name: {request.name}
- Gender: {request.gender} (use {pronoun}/{possessive} pronouns)
{attributes_text}

Please write a professional, positive, and constructive student report following these guidelines:

1. Start with "Student Report for {request.name}"
2. Use formal but warm educational language
3. Incorporate the positive attributes naturally into meaningful sentences
4. Address areas for improvement constructively and professionally
5. Use proper pronouns ({pronoun}/{possessive}) throughout
6. Include 2-3 paragraphs covering strengths, areas for growth, and overall progress
7. Balance positive feedback with constructive suggestions for improvement
8. End with encouragement and specific next steps for continued growth
9. Keep the tone professional yet supportive - suitable for parent communication
10. Length: 200-400 words

The report should sound like it was written by a caring teacher who knows the student well and wants to support their continued development."""

        return prompt
