from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(
    title="Report Scribe API",
    description="AI-powered student report generation API",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request/Response Models
class ReportRequest(BaseModel):
    name: str
    gender: str
    positive_attributes: List[str]

class ReportResponse(BaseModel):
    success: bool
    report: str
    message: str = ""

# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "Report Scribe API"}

# Mock report generation function
def generate_mock_report(request: ReportRequest) -> str:
    """Generate a mock student report based on the provided data"""
    
    # Determine pronouns based on gender
    pronoun = "he" if request.gender == "Male" else "she"
    possessive = "his" if request.gender == "Male" else "her"
    
    # Start building the report
    report = f"Student Report for {request.name}\n\n"
    
    # Add positive attributes section
    if request.positive_attributes:
        report += f"{request.name} has demonstrated several commendable qualities this term. "
        
        # Use first few attributes in a sentence
        if len(request.positive_attributes) >= 3:
            first_three = request.positive_attributes[:3]
            report += f"Particularly noteworthy is how {pronoun} {', '.join(first_three).lower()}. "
        elif len(request.positive_attributes) == 2:
            report += f"Particularly noteworthy is how {pronoun} {' and '.join(request.positive_attributes).lower()}. "
        else:
            report += f"Particularly noteworthy is how {pronoun} {request.positive_attributes[0].lower()}. "
        
        # Add remaining attributes if there are more
        if len(request.positive_attributes) > 3:
            remaining = request.positive_attributes[3:]
            report += f"Additionally, {request.name} {', '.join(remaining).lower()}. "
    
    # Add a general conclusion
    report += f"\n\nOverall, {request.name} is a valued member of our classroom community. "
    report += f"With continued effort and focus, {pronoun} will achieve even greater success in {possessive} academic journey."
    
    return report

# Main report generation endpoint
@app.post("/api/report", response_model=ReportResponse)
async def generate_report(request: ReportRequest):
    """Generate a student report based on provided information"""
    
    try:
        # Log the incoming request
        logger.info(f"Generating report for student: {request.name}")
        
        # Validate required fields
        if not request.name.strip():
            raise HTTPException(status_code=400, detail="Student name is required")
        
        if request.gender not in ["Male", "Female"]:
            raise HTTPException(status_code=400, detail="Gender must be 'Male' or 'Female'")
        
        if not request.positive_attributes:
            raise HTTPException(status_code=400, detail="At least one positive attribute is required")
        
        # Generate the report
        report_content = generate_mock_report(request)
        
        logger.info(f"Successfully generated report for {request.name}")
        
        return ReportResponse(
            success=True,
            report=report_content,
            message="Report generated successfully"
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error generating report: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error occurred while generating report")

# Root endpoint
@app.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "message": "Welcome to Report Scribe API",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/health"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)