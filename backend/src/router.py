from fastapi import APIRouter

# Create router for general endpoints
router = APIRouter()


# Health check endpoint
@router.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "Report Scribe API"}


# Root endpoint
@router.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "message": "Welcome to Report Scribe API",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/health",
    }