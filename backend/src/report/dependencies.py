from src.model.service import ModelService
from src.report.service import ReportService


def get_model_service() -> ModelService:
    return ModelService()


def get_report_service(model_service: ModelService = None) -> ReportService:
    if model_service is None:
        model_service = get_model_service()
    return ReportService(model_service)
