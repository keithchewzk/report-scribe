from fastapi import Depends
from src.model.service import ModelService
from src.report.service import ReportService


def get_model_service() -> ModelService:
    return ModelService()


def get_report_service(model_service: ModelService = Depends(get_model_service)) -> ReportService:
    return ReportService(model_service)
