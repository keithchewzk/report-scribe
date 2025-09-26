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
4. **Areas for Improvement**: Multi-select from predefined options with custom attribute addition capability
   - Pre-loaded improvement areas like "Could improve focus during lessons", "Needs to participate more in discussions"
   - Scrollable list with checkbox selection
   - Custom attribute input with instant addition to selection list
5. **Additional Information**: Free-form textarea for context and additional instructions
   - Expandable input area for detailed teacher instructions
   - Character validation and proper formatting

### Report Generation & Refinement
- **API Integration**: POST requests to `/report/generate` and `/report/refine` endpoints with structured JSON payload
- **Form Validation**: Real-time validation ensuring all required fields are completed
- **Loading States**: Visual feedback during report generation and refinement with animated spinner
- **Error Handling**: User-friendly error messages for network/validation failures
- **Post-generation refinement capabilities**: Interactive refinement with custom instructions
- **AI-powered refinement**: Real-time report modification using Google Gemini 2.0 Flash API
- **Unified state management**: Single source of truth for report data across both operations

### Current Implementation Status
✅ **Completed Features:**

**Frontend:**
- Two-panel dark theme interface (StudentDetailsPanel + ReportPanel)
- Enhanced form state management with controlled components and TypeScript
- Complete student input form: Name, Gender, Positive Attributes, Areas for Improvement, and Instructions
- Multi-select fields with custom additions for both positive and negative attributes
- Generate Report button with `/report/generate` API integration
- Report refinement interface with `/report/refine` API integration
- Unified state management through enhanced useReport hook
- Form validation (name and gender required, other fields optional)
- Comprehensive error handling and loading states for both operations
- Real-time report display and interactive refinement tools

**Backend:**
- FastAPI application with enhanced Pydantic data validation (Field constraints)
- Modular architecture with domain-separated routers (general + report modules)
- `/health` endpoint for monitoring
- `/report/generate` endpoint for initial report generation
- `/report/refine` endpoint for AI-powered report refinement
- AI integration with Google Gemini 2.0 Flash API for both generation and refinement
- Refactored schema: GenerateReportRequest, RefineReportRequest, and unified Report response
- Advanced prompt engineering for both generation and refinement contexts
- CORS configuration for frontend integration
- Docker containerization with optimized src/ directory structure
- Virtual environment setup with requirements.txt

🚧 **In Development:**
- Export functionality (copy, download)
- Refinement history tracking
- Batch processing for multiple students

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
  - `POST /report/refine` - Refine existing reports with custom instructions (report module)
  - `GET /` - Root endpoint with API information (general module)
- **Generation Request Format**: `{ "name": "string", "gender": Literal["Male", "Female"], "positive_attributes": ["string"], "negative_attributes": ["string"], "instructions": "string" }`
- **Refinement Request Format**: `{ "refinement_instructions": "string", "current_report": "string" }`
- **Unified Response Format**: `{ "success": boolean, "report": "string", "message": "string" }`
- **AI Integration**: Google Gemini 2.0 Flash API with specialized prompts for generation vs refinement
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

1. **Complete Report Creation & Refinement Flow**:
   - Teacher enters student name in responsive text field
   - Selects gender from dropdown (Male/Female)
   - Selects positive attributes from scrollable multi-select list
   - Optionally adds custom positive attributes via text input
   - Selects areas for improvement from scrollable multi-select list
   - Optionally adds custom improvement areas via text input
   - Enters additional instructions in free-form textarea
   - Clicks "Generate Report" button (validates form first)
   - System makes POST request to `/report/generate` with complete form data
   - Loading spinner shows during API call
   - Generated report displays in right panel
   - Teacher can refine report by entering refinement instructions
   - System makes POST request to `/report/refine` with current report and instructions
   - Refined report replaces original content in right panel
   - Success/error feedback displayed throughout the process

2. **Planned Enhanced Flow**:
   - Add export/copy functionality for generated reports
   - Implement refinement history tracking
   - Add batch processing for multiple students

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