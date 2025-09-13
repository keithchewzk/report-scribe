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
1. **Student Name**: Text input field
2. **Gender Selection**: Single select (Male/Female) for LLM context clarity
3. **Commendable Attributes**: Multi-select from 20+ predefined options with custom attribute addition capability
4. **Areas for Improvement**: Multi-select from 20+ predefined options with custom attribute addition capability
5. **Additional Information**: Free-form text field for context that doesn't fit structured fields

### Report Generation & Refinement
- AI-powered report generation based on structured input
- Post-generation refinement capabilities
- Support for re-prompting (e.g., "make the report more parent-friendly")
- Tone and style adjustments based on teacher feedback

## Technical Architecture

### Frontend
- **Framework**: React 19.1.0
- **Build Tool**: Vite
- **Location**: `/frontend/`
- **Purpose**: User interface for data input, report generation, and editing

### Backend
- **Framework**: Python FastAPI
- **Location**: `/backend/`
- **Purpose**: API endpoints, AI integration, data processing

### Development Workflow
- Frontend runs on Vite dev server during development
- Backend provides REST API endpoints
- Both services can be containerized with Docker for deployment

## Key User Flows

1. **Report Creation Flow**:
   - Teacher enters student information
   - Selects relevant attributes from multi-select lists
   - Adds any additional context
   - Generates initial report via AI
   - Reviews and refines report as needed

2. **Batch Processing** (Future Enhancement):
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