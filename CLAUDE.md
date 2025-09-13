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
- **API Integration**: POST requests to `/api/report` endpoint with structured JSON payload
- **Form Validation**: Real-time validation ensuring all required fields are completed
- **Loading States**: Visual feedback during report generation with animated spinner
- **Error Handling**: User-friendly error messages for network/validation failures
- **Post-generation refinement capabilities** (planned)
- **Support for re-prompting** (planned)

### Current Implementation Status
✅ **Completed Features:**
- Two-panel dark theme interface (StudentDetailsPanel + ReportPanel)
- Form state management with controlled components
- Name and Gender input fields
- Positive Attributes multi-select with custom additions
- Generate Report button with API integration
- Form validation and error handling

🚧 **In Development:**
- Areas for Improvement multi-select field
- Additional Information textarea
- Report display and refinement interface

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
- **Framework**: Python FastAPI
- **Location**: `/backend/`
- **API Endpoints**: 
  - `POST /api/report` - Generate student reports from structured input
- **Expected Payload**: `{ "name": "string", "gender": "Male|Female", "positive_attributes": ["array"] }`
- **Purpose**: API endpoints, AI integration, data processing

### Development Workflow
- Frontend runs on Vite dev server during development
- Backend provides REST API endpoints
- Both services can be containerized with Docker for deployment

## Key User Flows

1. **Current Report Creation Flow**:
   - Teacher enters student name in responsive text field
   - Selects gender from dropdown (Male/Female)
   - Selects positive attributes from scrollable multi-select list
   - Optionally adds custom positive attributes via text input
   - Clicks "Generate Report" button (validates form first)
   - System makes POST request to `/api/report` with form data
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
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Backend Development
```bash
cd backend
# Commands will be defined as backend is developed
```