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

**2. API Router (`src/router.py`)**
- All API endpoint definitions
- Business logic and report generation functions
- Error handling and validation
- Request/response processing

**3. Data Models (`src/schemas.py`)**
- `ReportRequest`: Enhanced input validation with Field constraints
- `ReportResponse`: Output response model
- Type safety with Literal types and validation rules

**4. Report Generation Logic**
- Mock report generator with intelligent text composition
- Dynamic pronoun handling (he/she, his/her)
- Contextual attribute integration

## Project Structure

```
backend/
├── src/                 # Source code directory
│   ├── __init__.py      # Python package marker
│   ├── main.py          # FastAPI app initialization and middleware
│   ├── router.py        # API endpoints and business logic
│   └── schemas.py       # Pydantic data models with validation
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
- **Endpoint**: `POST /api/report`
- **Content-Type**: `application/json`
- **Purpose**: Generate student reports from structured data

**Request Schema:**
```python
class ReportRequest(BaseModel):
    name: str = Field(..., min_length=1, description="Student's full name")
    gender: Literal["Male", "Female"] = Field(..., description="Student's gender for pronoun context")
    positive_attributes: list[str] = Field(..., description="List of positive attributes for the student")
```

**Response Schema:**
```python
class ReportResponse(BaseModel):
    success: bool                # Operation success indicator
    report: str                  # Generated report content
    message: str = ""           # Additional status message
```

**Example Request:**
```json
{
  "name": "Keith Chew",
  "gender": "Male",
  "positive_attributes": [
    "Shows enthusiasm for learning",
    "Demonstrates leadership skills",
    "Exhibits excellent teamwork"
  ]
}
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
- **Required Fields**: All fields in `ReportRequest` are mandatory
- **Name Validation**: Must be non-empty string (min_length=1) after trimming
- **Gender Validation**: Must be exactly "Male" or "Female" (enforced by Literal type)
- **Attributes Validation**: Must be a list (can be empty) of strings

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

### Mock Report Structure
1. **Header**: "Student Report for {name}"
2. **Positive Attributes Section**: Contextual integration of attributes
3. **Conclusion**: Professional closing with encouragement

### Intelligent Text Composition
- **Pronoun Handling**: Automatic he/she, his/her selection based on gender
- **Attribute Integration**: Smart grouping and sentence construction
- **Dynamic Content**: Different patterns based on number of attributes
- **Professional Tone**: Maintains formal educational language

### Example Generation Logic
```python
def generate_mock_report(request: ReportRequest) -> str:
    pronoun = "he" if request.gender == "Male" else "she"
    possessive = "his" if request.gender == "Male" else "her"
    
    # Build report sections dynamically
    report = f"Student Report for {request.name}\n\n"
    
    # Process attributes with intelligent grouping
    if len(request.positive_attributes) >= 3:
        first_three = request.positive_attributes[:3]
        report += f"Particularly noteworthy is how {pronoun} {', '.join(first_three).lower()}."
    
    # Add professional conclusion
    report += f"\n\nOverall, {request.name} is a valued member of our classroom community..."
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

## Testing & Quality Assurance

### Manual Testing
```bash
# Health check
curl http://localhost:8000/health

# Report generation
curl -X POST "http://localhost:8000/api/report" \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Student", "gender": "Male", "positive_attributes": ["Shows enthusiasm"]}'
```

### Interactive Testing
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **Manual Form Testing**: Try different input combinations

## Future Enhancements

### Planned Features
- **AI Integration**: OpenAI/Anthropic API integration for real report generation
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