# Report Scribe

## Project Overview

Report Scribe is a web application designed to streamline the student report writing process for school teachers. The application leverages AI to generate personalized student reports while significantly reducing the time and manual effort required compared to traditional methods or generic LLM interfaces.

## Problem Statement

School teachers spend considerable time writing individualized student reports. While teachers have adopted LLMs to accelerate this process, the current workflow still requires:
- Manual typing of student names and attributes
- Repetitive copying/pasting in generic LLM interfaces
- Multiple hours per class of students
- Extensive clicking and text box editing

Report Scribe addresses these pain points by providing a purpose-built interface that captures all necessary information in a structured format and generates reports efficiently.

## Target User

**Primary User**: School teachers who need to write regular student reports
**Use Case**: Generating personalized, professional student reports for parent communication

## Core Features

### Student Information Input
1. **Student Name**: Text input field with real-time validation
2. **Gender Selection**: Single select dropdown (Male/Female) for LLM context clarity
3. **Positive Attributes**: Multi-select from 10 predefined options with custom attribute addition capability
   - Pre-loaded attributes like "Shows enthusiasm for learning", "Demonstrates leadership skills"
   - Scrollable list with checkbox selection
   - Custom attribute input with instant addition to selection list
4. **Areas for Improvement**: Multi-select component (planned - similar to positive attributes)
5. **Additional Information**: Free-form text field for context (planned)

### Report Generation & Refinement
- **API Integration**: POST requests to `/report/generate` endpoint with structured JSON payload
- **Form Validation**: Real-time validation ensuring all required fields are completed
- **Loading States**: Visual feedback during report generation with animated spinner
- **Error Handling**: User-friendly error messages for network/validation failures
- **Post-generation refinement capabilities** (planned)
- **Support for re-prompting** (planned)

### Current Implementation Status
✅ **Completed Features:**

**Frontend:**
- Two-panel dark theme interface (StudentDetailsPanel + ReportPanel)
- Form state management with controlled components
- Name and Gender input fields
- Positive Attributes multi-select with custom additions (optional)
- Generate Report button with `/report/generate` API integration
- Form validation (name and gender required, positive attributes optional)
- Error handling and loading states

**Backend:**
- FastAPI application with enhanced Pydantic data validation (Field constraints)
- Modular architecture with domain-separated routers (general + report modules)
- `/health` endpoint for monitoring
- `/report/generate` endpoint for report generation (moved to report module)
- Mock report generator with pronoun handling
- CORS configuration for frontend integration
- Docker containerization with optimized src/ directory structure
- Virtual environment setup with requirements.txt

🚧 **In Development:**
- Areas for Improvement multi-select field
- Additional Information textarea
- Report display and refinement interface
- AI integration (OpenAI/Anthropic) for real report generation

## Technical Architecture

### Frontend
- **Framework**: React 19.1.0 with hooks (useState for state management)
- **Build Tool**: Vite
- **Location**: `/frontend/`
- **Architecture**: Modular component-based with Index File Pattern (Option 3)
- **Styling**: Inline styles with dark theme color palette
- **State Management**: Lifted state pattern with controlled components
- **Purpose**: Two-panel interface for data input, report generation, and editing

### Backend
- **Framework**: Python FastAPI 0.104.1
- **Server**: Uvicorn ASGI server with auto-reload
- **Location**: `/backend/` (source code in `/backend/src/`)
- **Architecture**: Domain-driven modular structure with separated concerns (general + report modules)
- **Data Validation**: Enhanced Pydantic models with Field constraints and Literal types
- **API Endpoints**:
  - `GET /health` - Health check endpoint (general module)
  - `POST /report/generate` - Generate student reports from structured input (report module)
  - `GET /` - Root endpoint with API information (general module)
- **Request Format**: `{ "name": "string" (min_length=1), "gender": Literal["Male", "Female"], "positive_attributes": ["string"] (can be empty) }`
- **Response Format**: `{ "success": boolean, "report": "string", "message": "string" }`
- **Deployment**: Docker support with optimized src/ directory copying
- **Development**: Python virtual environment with dependency isolation

### Development Workflow
- **Frontend**: Vite dev server on http://localhost:5173
- **Backend**: FastAPI with Uvicorn on http://localhost:8000
- **Integration**: CORS enabled for cross-origin requests
- **Docker**: Both services containerized for production deployment
  - Frontend: Multi-stage build with nginx proxy for `/report/*` routes on http://localhost:3000
  - Backend: Python slim container with health checks on http://localhost:8000
- **API Communication**: RESTful JSON API between frontend and backend

## Key User Flows

1. **Current Report Creation Flow**:
   - Teacher enters student name in responsive text field
   - Selects gender from dropdown (Male/Female)
   - Selects positive attributes from scrollable multi-select list
   - Optionally adds custom positive attributes via text input
   - Clicks "Generate Report" button (validates form first)
   - System makes POST request to `/report/generate` with form data
   - Loading spinner shows during API call
   - Success/error feedback displayed to user

2. **Planned Enhanced Flow**:
   - Add "Areas for Improvement" multi-select field
   - Add "Additional Information" textarea
   - Display generated report in right panel
   - Enable report refinement and re-prompting
   - Add export/copy functionality

3. **Future Batch Processing**:
   - Process multiple students from a single class
   - Consistent formatting and tone across reports

## Success Metrics

- **Time Reduction**: Significantly reduce hours spent per class of students
- **Consistency**: Maintain professional report quality across all students
- **Usability**: Intuitive interface requiring minimal learning curve
- **Flexibility**: Support for customization and refinement of generated content

## Development Notes

- Prioritize user experience and workflow efficiency
- Ensure generated reports maintain professional tone and accuracy
- Build with scalability in mind for potential multi-teacher/school deployment
- Consider data privacy and security for student information handling

## Commands

### Frontend Development

**Local Development:**
```bash
cd frontend
npm run dev          # Start development server (http://localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build
```

**Docker Development:**
```bash
cd frontend
docker build -t report-scribe-frontend .
docker run -d -p 3000:80 --name report-scribe-frontend-container report-scribe-frontend
# Access at http://localhost:3000
```

### Backend Development

**Local Development:**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
```

**Docker Development:**
```bash
cd backend
docker build -t report-scribe-backend .
docker run -p 8000:8000 report-scribe-backend
```

**API Endpoints:**
- Health Check: http://localhost:8000/health
- Interactive Docs: http://localhost:8000/docs
- Report Generation: POST http://localhost:8000/report/generate