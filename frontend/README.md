# Report Scribe Frontend

A React-based web application for teachers to generate AI-powered student reports with an intuitive two-panel interface.

## Quick Start

Choose one of the following methods to run the frontend:

## Method 1: Docker (Recommended)

### Prerequisites
- Docker installed on your system

### Running with Docker

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Build the Docker image:**
   ```bash
   docker build -t report-scribe-frontend .
   ```

3. **Run the container:**
   ```bash
   docker run -d -p 3000:80 --name report-scribe-frontend-container report-scribe-frontend
   ```

4. **Access the application:**
   - **Frontend URL**: http://localhost:3000
   - **API Proxy**: Requests to `/api/*` are automatically proxied to backend

## Method 2: Local Development

### Prerequisites
- Node.js 20+ (required for Vite 7.x)
- npm (Node package manager)

### Installation

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Running the Development Server

**Development server with hot reload:**
```bash
npm run dev
```

**Build for production:**
```bash
npm run build
```

**Preview production build:**
```bash
npm run preview
```

The application will be available at:
- **Development**: http://localhost:5173
- **Production Preview**: http://localhost:4173

## Architecture

### Component Structure
- **Two-panel layout**: StudentDetailsPanel (left) + ReportPanel (right)
- **Modular components**: Each panel broken into focused sub-components
- **Controlled forms**: Lifted state pattern with form validation
- **Dark theme**: Consistent styling across all components

### Key Features
- **Student Information Input**: Name, gender, and positive attributes
- **Multi-select attributes**: Predefined options + custom attribute addition
- **Form validation**: Real-time validation with error feedback
- **API integration**: RESTful communication with FastAPI backend
- **Responsive design**: Adapts to different screen sizes

## Docker Configuration

### Multi-stage Build
- **Stage 1**: Node.js 20-alpine for building the React app
- **Stage 2**: Nginx-alpine for serving static files

### Features
- **API Proxy**: Built-in nginx proxy for `/api/*` requests to backend
- **Health Check**: Container health monitoring
- **Production optimized**: Minimal image size with static file serving
- **SPA Support**: Proper routing with `try_files` for single-page app

### Docker Commands

```bash
# Build image
docker build -t report-scribe-frontend .

# Run container
docker run -d -p 3000:80 --name report-scribe-frontend-container report-scribe-frontend

# View logs
docker logs report-scribe-frontend-container

# Stop container
docker stop report-scribe-frontend-container

# Remove container
docker rm report-scribe-frontend-container
```

## Backend Integration

### API Communication
- **Backend URL**: http://localhost:8000 (development)
- **API Endpoint**: `POST /api/report` for report generation
- **CORS**: Enabled for cross-origin requests in development
- **Proxy**: Docker nginx proxy handles API requests in production

### Data Flow
```
Form Input → Validation → API Request → Backend Processing → Response Display
```

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── StudentDetailsPanel/     # Left panel components
│   │   │   ├── index.jsx           # Main panel with state
│   │   │   ├── Header.jsx          # Panel header
│   │   │   ├── Form/               # Form components
│   │   │   │   ├── index.jsx       # Form coordinator
│   │   │   │   ├── NameField.jsx   # Student name input
│   │   │   │   ├── GenderField.jsx # Gender selection
│   │   │   │   └── PositiveAttributesField.jsx # Multi-select
│   │   │   └── Button.jsx          # Generate report button
│   │   └── ReportPanel/            # Right panel components
│   │       ├── index.jsx           # Main panel
│   │       ├── Report.jsx          # Report display
│   │       └── Refinement.jsx      # Report refinement
│   ├── App.jsx                     # Main application
│   ├── App.css                     # Global styles
│   └── index.css                   # Base styles
├── Dockerfile                      # Multi-stage Docker build
├── .dockerignore                   # Docker ignore rules
└── package.json                    # Dependencies and scripts
```

## Development Notes

- **Hot Reload**: Development server automatically reloads on changes
- **Component-based**: Modular architecture for maintainability
- **State Management**: Lifted state pattern with controlled components
- **Dark Theme**: Professional color scheme optimized for readability
- **Form Validation**: Real-time validation with user-friendly error messages

## Troubleshooting

### Common Issues

**Build fails with Vite not found:**
- Ensure Node.js 20+ is installed
- Run `npm ci` to install all dependencies including dev dependencies

**API requests fail:**
- Ensure backend is running on port 8000
- Check CORS configuration in backend
- Verify API endpoint URLs

**Docker container won't start:**
- Check if port 3000 is already in use
- Verify Docker daemon is running
- Check container logs with `docker logs <container_name>`

## Future Enhancements

- [ ] Areas for improvement multi-select field
- [ ] Additional information textarea
- [ ] Report display and editing interface
- [ ] Export functionality (PDF, DOCX)
- [ ] User authentication
- [ ] Report history and templates
