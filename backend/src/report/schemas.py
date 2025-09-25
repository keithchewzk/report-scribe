from typing import Literal

from pydantic import BaseModel, Field


class ReportRequest(BaseModel):
    name: str = Field(..., min_length=1, description="Student's full name")
    gender: Literal["Male", "Female"] = Field(
        ..., description="Student's gender for pronoun context"
    )
    positive_attributes: list[str] = Field(
        default_factory=list, description="List of positive attributes for the student"
    )
    negative_attributes: list[str] = Field(
        default_factory=list, description="List of areas for improvement for the student"
    )


class ReportResponse(BaseModel):
    success: bool
    report: str
    message: str
