# Report Scribe Backend

## Project Overview

The Report Scribe backend is a minimal yet robust FastAPI application designed to generate AI-powered student reports. It provides a RESTful API that receives structured student data from the frontend and returns professionally formatted reports.

**Key Goals:**

- Provide fast, reliable API endpoints for report generation
- Validate input data with strong typing using Pydantic
- Generate contextually appropriate reports with proper pronoun usage
- Support easy deployment with Docker containerization
- Maintain development efficiency with auto-reload capabilities

## Technical Stack

- **Framework**: FastAPI 0.104.1 (High-performance async web framework)
- **Server**: Uvicorn 0.24.0 (Lightning-fast ASGI server)
- **Validation**: Pydantic 2.5.0 (Data validation using Python type annotations)
- **Python Version**: 3.10+ (Modern Python with enhanced type hints)
- **Containerization**: Docker with multi-stage builds

## Architecture Overview

### Request/Response Flow

```
Frontend (React)
    ↓ HTTP POST /api/report
FastAPI Application
    ↓ Pydantic Validation
Report Generator Function
    ↓ Structured Response
Frontend (Display/Refinement)
```

### Core Components

**1. FastAPI Application (`src/main.py`)**

- Application initialization with metadata
- CORS middleware configuration
- Router inclusion for modular API endpoints
- Logging configuration

**2. General API Router (`src/router.py`)**

- Health check and root endpoint definitions
- General application information endpoints
- No business logic - pure infrastructure endpoints

**3. Model Module (`src/model/`)**

- **Service (`src/model/service.py`)**: Centralized LLM API integration with Google Gemini 2.0 Flash
- **Configuration Management**: Temperature, topP, topK, safety settings, and other LLM parameters
- **HTTP Client**: Handles all API communication, error handling, and response parsing
- **Provider Abstraction**: Clean interface for future support of multiple LLM providers

**4. Report Module (`src/report/`)**

- **Router (`src/report/router.py`)**: Report-specific endpoints and business logic for both generation and refinement
- **Schemas (`src/report/schemas.py`)**: Enhanced Pydantic models with Field constraints
- **Service (`src/report/service.py`)**: Report business logic and prompt engineering
- **Dependencies (`src/report/dependencies.py`)**: Dependency injection for both ModelService and ReportService
- **Constants (`src/report/constants.py`)**: Centralized LLM prompt templates and core report guidelines
  - `CORE_REPORT_GUIDELINES`: Formal, professional, and educational guidelines for all reports
  - `REPORT_GENERATION_PROMPT_TEMPLATE`: Template for generating a new report from structured student data
  - `REPORT_REFINEMENT_PROMPT_TEMPLATE`: Template for refining an existing report based on teacher instructions
  - Ensures consistent tone, structure, pronoun usage, and adherence to educational standards across all AI-generated content

**5. Data Models (`src/report/schemas.py`)**

- `GenerateReportRequest`: Enhanced input validation for report generation with Field constraints and Literal types
- `RefineReportRequest`: Input validation for report refinement with instruction length limits
- `Report`: Unified output response model for both generation and refinement
- Type safety with strict validation rules

**6. Service Architecture**

- **Separation of Concerns**: ModelService handles LLM integration, ReportService handles business logic
- **Dependency Injection**: ReportService depends on ModelService for AI functionality
- **Contextual prompt engineering**: Specialized prompts for generation vs refinement
- **Centralized configuration**: All LLM settings managed in ModelService
- **Extensible design**: Easy to add new LLM providers or modify AI parameters

## Project Structure

```
backend/
├── src/                 # Source code directory
│   ├── __init__.py      # Python package marker
│   ├── main.py          # FastAPI app initialization and middleware
│   ├── router.py        # General endpoints (health, root)
│   ├── settings.py      # Application configuration
│   ├── model/           # LLM service module
│   │   ├── __init__.py  # Python package marker
│   │   └── service.py   # ModelService - LLM API integration
│   └── report/          # Report domain module
│       ├── __init__.py  # Python package marker
│       ├── constants.py # Core report guidelines and LLM prompt templates
│       ├── dependencies.py # Dependency injection for services
│       ├── router.py    # Report-specific endpoints and business logic
│       ├── schemas.py   # Report Pydantic models with validation
│       └── service.py   # ReportService - report business logic
├── requirements.txt     # Python dependencies
├── Dockerfile           # Docker build (copies src/ directory)
├── .dockerignore        # Docker build exclusions
├── .gitignore           # Git ignore rules
├── CLAUDE.md           # Backend technical documentation
├── venv/               # Python virtual environment (ignored)
└── __pycache__/        # Python cache (ignored)
```

---

The rest of the CLAUDE.md (API endpoints, validation, CORS, Docker, testing, future enhancements) remains the same, now with `constants.py` explicitly documented under `src/report/` and its role clearly explained.
