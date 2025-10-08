# Report Scribe Backend

A minimal FastAPI backend for generating AI-powered student reports.

## Quick Start

Choose one of the following methods to run the backend:

## Method 1: Docker (Recommended)

### Prerequisites

- Docker installed on your system

### Running with Docker

1. **Navigate to backend directory:**

   ```bash
   cd backend
   ```

2. **Build the Docker image:**

   ```bash
   docker build -t reportscribe-backend .
   ```

3. **Run the container:**
   ```bash
   docker run -p 8000:8000 reportscribe-backend
   ```

## Method 2: Local Development

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

### Installation

1. **Navigate to backend directory:**

   ```bash
   cd backend
   ```

2. **Create virtual environment (recommended):**

   ```bash
   python3 -m venv venv

   # Activate virtual environment
   # On macOS/Linux:
   source venv/bin/activate
   # On Windows:
   venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

### Running the Server

**Development server with auto-reload:**

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Alternative (using Python directly):**

```bash
python main.py
```

The API will be available at:

- **API Base URL**: http://localhost:8000
- **Interactive Docs**: http://localhost:8000/docs (Swagger UI)
- **Alternative Docs**: http://localhost:8000/redoc (ReDoc)

## API Endpoints

### Health Check

- **GET** `/health`
- Returns: `{"status": "healthy", "service": "Report Scribe API"}`

### Generate Report

- **POST** `/api/report`
- **Content-Type**: `application/json`

**Request Body:**

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

**Response:**

```json
{
  "success": true,
  "report": "Student Report for Keith Chew\n\nKeith Chew has demonstrated several commendable qualities this term...",
  "message": "Report generated successfully"
}
```

**Error Response:**

```json
{
  "detail": "Student name is required"
}
```

## Testing the API

### Using curl:

```bash
# Health check
curl http://localhost:8000/health

# Generate report
curl -X POST "http://localhost:8000/api/report" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "gender": "Male",
    "positive_attributes": ["Shows enthusiasm for learning", "Demonstrates leadership skills"]
  }'
```

### Using the Interactive Docs:

1. Start the server
2. Open http://localhost:8000/docs in your browser
3. Try out the endpoints directly in the Swagger UI

## Frontend Integration

The backend is configured to accept requests from the frontend development server:

- **Frontend URL**: http://localhost:5173 (Vite dev server)
- **CORS**: Enabled for cross-origin requests

## Development Notes

- **Auto-reload**: Server automatically restarts when code changes (in development mode)
- **Logging**: Basic logging is configured to track requests and errors
- **Validation**: Input validation using Pydantic models
- **Error Handling**: Proper HTTP status codes and error messages

## Project Structure

```
backend/
├── main.py              # Main FastAPI application
├── requirements.txt     # Python dependencies
├── Dockerfile           # Docker configuration
├── .dockerignore        # Docker ignore rules
├── .gitignore           # Git ignore rules
└── README.md           # This file
```

## Docker Commands

### Building and Running

```bash
# Build the image
docker build -t reportscribe-backend .

# Run the container
docker run -p 8000:8000 reportscribe-backend

# Run with environment variables (if needed)
docker run -p 8000:8000 -e ENVIRONMENT=production reportscribe-backend

# Run in detached mode
docker run -d -p 8000:8000 reportscribe-backend
```

### Development with Docker

```bash
# Build and run in one command
docker build -t reportscribe-backend . && docker run -p 8000:8000 reportscribe-backend

# View logs
docker logs <container_id>

# Stop container
docker stop <container_id>
```

## Future Enhancements

- [ ] Add AI integration (OpenAI, Anthropic, etc.)
- [ ] Add database support for storing reports
- [ ] Add user authentication
- [ ] Add more sophisticated report templates
- [ ] Add areas for improvement support
- [ ] Add additional information field support
