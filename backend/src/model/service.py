import logging
import json
import httpx
from src.settings import settings


class ModelService:
    """Service class for handling LLM API interactions"""

    def __init__(self):
        # Logger instance
        self.logger = logging.getLogger(__name__)

        # LLM Configuration
        self.temperature = 0.7
        self.top_p = 0.8
        self.top_k = 40
        self.max_output_tokens = 1000
        self.response_mime_type = "text/plain"

        # Safety settings for content filtering
        self.safety_settings = [
            {
                "category": "HARM_CATEGORY_HARASSMENT",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
                "category": "HARM_CATEGORY_HATE_SPEECH",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
                "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
                "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE",
            },
        ]

    async def generate_content(self, prompt: str) -> str:
        """Generate content using Google Gemini 2.0 Flash API"""
        if not settings.gemini_api_key:
            raise ValueError("GEMINI_API_KEY not configured")

        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key={settings.gemini_api_key}"

        payload = {
            "contents": [{"parts": [{"text": prompt}]}],
            "generationConfig": {
                "temperature": self.temperature,
                "topP": self.top_p,
                "topK": self.top_k,
                "maxOutputTokens": self.max_output_tokens,
                "responseMimeType": self.response_mime_type,
            },
            "safetySettings": self.safety_settings,
        }

        self.logger.info(f"LLM API call payload: {json.dumps(payload, indent=2)}")

        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post(
                    url, json=payload, headers={"Content-Type": "application/json"}
                )

                if response.status_code != 200:
                    raise httpx.HTTPStatusError(
                        f"Gemini API returned {response.status_code}: {response.text}",
                        request=response.request,
                        response=response,
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
            raise Exception(f"Failed to generate content: {str(e)}")