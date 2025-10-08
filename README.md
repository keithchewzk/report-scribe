<a id="readme-top"></a>

<div align="center">
  <a href="https://github.com/keithchewzk/report-scribe">
    <img src="frontend/public/report-scribe.svg" alt="Logo" width="120" height="120">
  </a>

<h3 align="center">ReportScribe</h3>

<p align="center">
    A web application that uses AI (Google Gemini 2.0 Flash) to generate personalized student reports for school teachers, streamlining the process and significantly reducing time and manual effort.
  </p>

</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#core-features">Core Features</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#frontend-and-backend-setup-using-docker-compose">Frontend and Backend Setup Using Docker Compose</a></li>
        <li><a href="#notes">Notes</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#report-creation--refinement-flow">Report Creation & Refinement Flow</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## About The Project

**ReportScribe** is a purpose-built web application designed to streamline the student report writing process for school teachers. It leverages AI to generate personalized student reports, significantly reducing the time and manual effort traditionally associated with this task. The application replaces repetitive manual typing and copying/pasting in generic LLM interfaces with a structured, efficient, two-panel interface for data input and refinement.

### Core Features

- **Structured Input:** Dedicated fields for Student Name, Gender, Positive Attributes, Areas for Improvement, and custom instructions.
- **AI Generation:** Integrates with the **Google Gemini 2.0 Flash API** for initial report generation (`POST /report/generate`).
- **AI Refinement:** Post-generation refinement capability using custom instructions (`POST /report/refine`).
- **User Interface:** Two-panel dark theme interface (StudentDetailsPanel + ReportPanel) built with React.
- **Robust Backend:** Service-oriented FastAPI architecture with Pydantic validation and clear separation of concerns (ModelService, ReportService).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

#### Frontend

[![React][React.js]][React-url] [![Vite][Vite.js]][Vite-url] [![TypeScript][TypeScript.js]][TypeScript-url]

#### Backend 

[![Python][Python.js]][Python-url] [![FastAPI][FastAPI.js]][FastAPI-url] [![Pydantic][Pydantic.js]][Pydantic-url] [![Google Gemini][Gemini.js]][Gemini-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

This guide explains how to run the **frontend** and **backend** locally using Docker Compose.

### Prerequisites

- **Node.js** and **npm** (for React/Vite frontend)
- **Python 3** and **pip** (for FastAPI backend)
- **Docker & Docker Compose** (for containerized development)
- **Google AI API Key** (required for Gemini API access)

> Sensitive keys should be stored in `.env` or as shell environment variables. Do **not** commit them to Git.

---

### Frontend and Backend Setup Using Docker Compose

1. Ensure you have a `.env` file in the backend directory containing your Google Gemini API key:

```env
GOOGLE_GEMINI_API_KEY=your_api_key_here
```

2. Run both services:

```bash
docker compose -f docker-compose.dev.yml up --build
```

3. Access services in the browser:

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8000`
- Backend API Docs: `http://localhost:8000/docs`

4. Stop the services:

```bash
docker compose -f docker-compose.dev.yml down
```

> Both frontend and backend will hot reload automatically on code changes.

---

### Notes

- **.env.example** provides safe default values for local development. Copy it to `.env` and fill in sensitive keys.
- Hot reload is enabled for all services when running in development mode.
- Docker Compose ensures both services run together in a local network, simplifying integration testing.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

The primary usage flow involves structured data input and AI-powered refinement.

### Report Creation & Refinement Flow

1.  **Data Entry:** The teacher inputs student information (Name, Gender) and selects/adds **Positive Attributes** and **Areas for Improvement** in the left panel.
2.  **Initial Generation:** The teacher clicks **"Generate Report"**, sending a `POST` request to the `/report/generate` endpoint with the structured data.
3.  **Review:** The generated report appears in the right panel.
4.  **Refinement:** The teacher enters custom instructions in the refinement field (e.g., "Make the tone more encouraging") and clicks the refine button, sending a `POST` request to `/report/refine` to instantly modify the existing report content.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Roadmap

Features currently **in development** and planned for the next release:

- [x] None at the moment

See the [open issues](https://github.com/keithchewzk/report-scribe/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact

[![LinkedIn][LinkedIn.badge]][LinkedIn.url] [![GitHub][GitHub.badge]][GitHub.url] [![Email][Email.badge]][Email.url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vite.js]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vitejs.dev/
[TypeScript.js]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[Python.js]: https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white
[Python-url]: https://www.python.org/
[FastAPI.js]: https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi
[FastAPI-url]: https://fastapi.tiangolo.com/
[Pydantic.js]: https://img.shields.io/badge/Pydantic-E92063?style=for-the-badge&logo=pydantic&logoColor=white
[Pydantic-url]: https://pydantic.dev/
[Gemini.js]: https://img.shields.io/badge/Google_Gemini-2C80FF?style=for-the-badge&logo=google&logoColor=white
[Gemini-url]: https://ai.google.dev/
[LinkedIn.badge]: https://img.shields.io/badge/-LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white
[LinkedIn.url]: https://www.linkedin.com/in/keithchewzikai
[GitHub.badge]: https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white
[GitHub.url]: https://github.com/keithchewzk
[Email.badge]: https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white
[Email.url]: mailto:keithchewzk@gmail.com
