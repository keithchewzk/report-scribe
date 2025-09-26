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

## API Endpoints

### Health Check
- **Endpoint**: `GET /health`
- **Purpose**: Application health monitoring
- **Response**: `{"status": "healthy", "service": "Report Scribe API"}`
- **Use Case**: Load balancer health checks, monitoring systems

### Report Generation
- **Endpoint**: `POST /report/generate` (with `/report` prefix from main.py)
- **Content-Type**: `application/json`
- **Purpose**: Generate student reports from structured data

**Request Schema:**
```python
class GenerateReportRequest(BaseModel):
    name: str = Field(..., min_length=1, description="Student's full name")
    gender: Literal["Male", "Female"] = Field(..., description="Student's gender for pronoun context")
    positive_attributes: list[str] = Field(default_factory=list, description="List of positive attributes for the student")
    negative_attributes: list[str] = Field(default_factory=list, description="List of areas for improvement for the student")
    instructions: str = Field(default="", description="Additional instructions for report generation")
```

**Example Request to `/report/generate`:**
```json
{
  "name": "Keith Chew",
  "gender": "Male",
  "positive_attributes": [
    "Shows enthusiasm for learning",
    "Demonstrates leadership skills",
    "Exhibits excellent teamwork"
  ],
  "negative_attributes": [
    "Could improve focus during lessons",
    "Needs to participate more in discussions"
  ],
  "instructions": "Keep the tone encouraging and focus on growth opportunities"
}
```

### Report Refinement
- **Endpoint**: `POST /report/refine` (with `/report` prefix from main.py)
- **Content-Type**: `application/json`
- **Purpose**: Refine existing student reports based on specific instructions

**Request Schema:**
```python
class RefineReportRequest(BaseModel):
    refinement_instructions: str = Field(..., min_length=1, max_length=1000, description="Instructions for refining the report")
    current_report: str = Field(..., min_length=1, description="The current report content to be refined")
```

**Example Request to `/report/refine`:**
```json
{
  "refinement_instructions": "Make it shorter and focus more on math skills",
  "current_report": "Student Report for Keith Chew\n\nKeith consistently demonstrates initiative..."
}
```

### Unified Response Schema
Both endpoints return the same response format:

**Response Schema:**
```python
class Report(BaseModel):
    success: bool                # Operation success indicator
    report: str                  # Generated/refined report content
    message: str                 # Status message
```

**Example Response:**
```json
{
  "success": true,
  "report": "Student Report for Keith Chew\n\nKeith Chew has demonstrated several commendable qualities this term. Particularly noteworthy is how he shows enthusiasm for learning, demonstrates leadership skills, exhibits excellent teamwork.\n\nOverall, Keith Chew is a valued member of our classroom community. With continued effort and focus, he will achieve even greater success in his academic journey.",
  "message": "Report generated successfully"
}
```

## Data Validation & Error Handling

### Input Validation
- **Pydantic Validation**: All validation handled by Pydantic models (no manual checks)
- **Name Validation**: Must be non-empty string (min_length=1 Field constraint)
- **Gender Validation**: Must be exactly "Male" or "Female" (enforced by Literal type)
- **Attributes Validation**: Must be a list (can be empty) of strings
- **Error Responses**: 422 Unprocessable Entity with detailed validation messages

### Error Responses
- **400 Bad Request**: Invalid input data (missing/invalid fields)
- **500 Internal Server Error**: Unexpected server errors
- **HTTP Status Codes**: Proper REST API status code usage

### Error Response Format
```json
{
  "detail": "Student name is required"
}
```

## Report Generation Logic

### AI-Powered Report Generation
1. **Prompt Engineering**: Structured prompts for consistent, professional reports
2. **Context Integration**: Student name, gender, and attributes seamlessly incorporated
3. **Professional Tone**: Educational language appropriate for parent communication
4. **Personalization**: Each report tailored to individual student characteristics

### LLM Integration Features
- **Real-time Generation**: Live API calls to generate unique reports
- **Contextual Awareness**: Proper pronoun usage and attribute integration
- **Quality Consistency**: Maintains professional educational standards
- **Error Resilience**: Robust handling of API failures and timeouts

### Report Generation Process
```python
# Actual LLM integration replaces mock generation
# - Structured prompts with student context
# - API calls to language model service
# - Professional formatting and tone
# - Error handling for API reliability
```

## CORS Configuration

### Cross-Origin Resource Sharing
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

**Purpose**: Enable frontend-backend communication during development
**Security**: Restricted to specific origins for production deployment

## Development Environment

### Virtual Environment Setup
```bash
# Create isolated Python environment
python3 -m venv venv

# Activate environment
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt
```

### Development Server
```bash
# Auto-reload development server (from backend root)
uvicorn src.main:app --reload --host 0.0.0.0 --port 8000

# Alternative direct execution
python -m src.main
```

### Development Features
- **Auto-reload**: Server restarts on code changes
- **Interactive Docs**: Swagger UI at `/docs`
- **Alternative Docs**: ReDoc at `/redoc`
- **Logging**: Request/error tracking with Python logging

## Docker Containerization

### Dockerfile Features
- **Base Image**: `python:3.10-slim` (lightweight)
- **Optimized Build**: Copies only src/ directory for smaller image
- **Environment Variables**: Proper Python configuration
- **Health Check**: Built-in monitoring on `/health`
- **Clean Structure**: Separates configuration from source code

### Docker Commands
```bash
# Build image
docker build -t report-scribe-backend .

# Run container
docker run -p 8000:8000 report-scribe-backend

# Development with logs
docker run -p 8000:8000 report-scribe-backend
```

### Production Considerations
- **Environment Variables**: Support for configuration injection
- **Health Monitoring**: Built-in health check endpoint
- **Logging**: Structured logging for production monitoring
- **Scalability**: Stateless design for horizontal scaling

## Dependencies

### Core Dependencies
```
fastapi==0.104.1          # Web framework
uvicorn[standard]==0.24.0  # ASGI server
pydantic==2.5.0           # Data validation
python-multipart==0.0.6   # Form data support
```

### Why These Dependencies?
- **FastAPI**: Modern, fast, type-safe web framework
- **Uvicorn**: High-performance ASGI server with WebSocket support
- **Pydantic**: Runtime type checking and validation
- **Python-multipart**: Future support for file uploads

## Service Architecture

### ModelService (`src/model/service.py`)

**Purpose**: Centralized LLM API integration and configuration management

**Key Features:**
- **LLM Configuration**: Centralized management of temperature (0.7), topP (0.8), topK (40), maxOutputTokens (1000)
- **Safety Settings**: Comprehensive content filtering for harassment, hate speech, explicit content, and dangerous content
- **HTTP Client**: Async HTTP client with 30-second timeout and proper error handling
- **Response Parsing**: Robust parsing of Gemini API response structure
- **Error Handling**: Comprehensive error handling for timeouts, HTTP errors, and API failures

**Core Method:**
```python
async def generate_content(self, prompt: str) -> str:
    # Single method that handles all LLM interactions
    # Takes any prompt, returns generated content
    # Handles HTTP requests, response parsing, and error handling
```

**Benefits:**
- **Provider Abstraction**: Easy to swap LLM providers (OpenAI, Claude, etc.)
- **Configuration Centralization**: All LLM settings in one place
- **Reusability**: Can be used by any service that needs LLM functionality
- **Testability**: Easy to mock for testing other services

### ReportService (`src/report/service.py`)

**Purpose**: Report-specific business logic and prompt engineering

**Key Features:**
- **Dependency Injection**: Takes ModelService as constructor parameter
- **Prompt Engineering**: Specialized prompt building for generation vs refinement
- **Business Logic**: Report-specific logic separate from LLM implementation
- **Clean Interface**: Simple async methods for generate and refine operations

**Core Methods:**
```python
async def generate_report(self, request: GenerateReportRequest) -> str:
    prompt = self._build_report_prompt(request)
    return await self.model_service.generate_content(prompt)

async def refine_report(self, request: RefineReportRequest) -> str:
    prompt = self._build_refinement_prompt(request)
    return await self.model_service.generate_content(prompt)
```

**Benefits:**
- **Single Responsibility**: Only handles report business logic
- **Testability**: Can easily mock ModelService for unit testing
- **Maintainability**: Changes to LLM integration don't affect report logic
- **Clarity**: Clear separation between prompt building and LLM calls

### Dependency Injection (`src/report/dependencies.py`)

**Purpose**: Manages service instantiation and dependency injection

**Structure:**
```python
def get_model_service() -> ModelService:
    return ModelService()

def get_report_service(model_service: ModelService = None) -> ReportService:
    if model_service is None:
        model_service = get_model_service()
    return ReportService(model_service)
```

**Benefits:**
- **Flexibility**: Easy to configure different service instances
- **Testing**: Can inject mock services for testing
- **Lifecycle Management**: Controls service creation and dependency resolution

## Testing & Quality Assurance

### Manual Testing
```bash
# Health check
curl http://localhost:8000/health

# Report generation (with real LLM calls)
curl -X POST "http://localhost:8000/report/generate" \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Student", "gender": "Male", "positive_attributes": ["Shows enthusiasm"], "negative_attributes": ["Could improve focus"], "instructions": "Keep it encouraging"}'

# Report refinement (with real LLM calls)
curl -X POST "http://localhost:8000/report/refine" \
  -H "Content-Type: application/json" \
  -d '{"refinement_instructions": "Make it shorter and more specific", "current_report": "Student Report for Test Student..."}'
```

### Interactive Testing
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **Manual Form Testing**: Try different input combinations

## Future Enhancements

### Planned Features
- **Enhanced AI Features**: Advanced prompt templates and fine-tuning options
- **Database Support**: Persistent storage for reports and user data
- **Authentication**: User login and session management
- **Template System**: Customizable report templates
- **Areas for Improvement**: Additional input field support
- **Export Formats**: PDF, DOCX, HTML export options

### Technical Improvements
- **Unit Tests**: Comprehensive test suite with pytest
- **Integration Tests**: End-to-end API testing
- **Performance Monitoring**: Response time and throughput metrics
- **Security Hardening**: Input sanitization, rate limiting
- **Documentation**: OpenAPI schema enhancements

## Integration with Frontend

### API Contract
The backend maintains a strict API contract with the frontend:
- **Endpoint Consistency**: URLs match frontend expectations
- **Data Format**: JSON request/response format
- **Error Handling**: Predictable error response structure
- **CORS Support**: Seamless cross-origin communication

### Development Workflow
1. **Frontend Development**: React app on port 5173
2. **Backend Development**: FastAPI app on port 8000
3. **Integration Testing**: Both services running simultaneously
4. **API Documentation**: Swagger UI for frontend developers

This backend architecture provides a solid foundation for the Report Scribe application, balancing simplicity with extensibility for future AI integration and feature enhancements.