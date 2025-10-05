# Report Scribe Frontend

## Project Overview

Report Scribe is a web application for school teachers to generate AI-powered student reports efficiently. The frontend provides a structured interface that captures student information and enables report generation and refinement, significantly reducing the time required compared to traditional methods.

**Key Goals:**

- Streamline student report writing process
- Provide intuitive two-panel interface
- Support structured data input and AI-powered report generation
- Enable post-generation refinement and customization

## Technical Stack

- **Framework**: React 19.1.0 with TypeScript
- **Build Tool**: Vite
- **Styling**: Inline styles with dark theme
- **Architecture**: Component-based with modular organization and custom hooks
- **State Management**: Enhanced `useReport` hook with unified report operations
- **API Integration**: Centralized service layer with TypeScript interfaces
- **Local Development**: Supports Docker Compose with hot reload

## Code Organization

### Component Structure

The frontend follows a **modular component architecture** using the **Index File Pattern (Option 3)** with **lifted state management**:

```
src/
├── components/
│   ├── StudentDetailsPanel/          # Left panel - student input
│   │   ├── index.tsx                 # Main panel with form state management
│   │   ├── Header.tsx                # Panel header
│   │   ├── Form/                     # Student form components
│   │   │   ├── index.tsx            # Form coordinator with state
│   │   │   ├── NameField.tsx        # Student name input (controlled)
│   │   │   ├── GenderField.tsx      # Gender selection (controlled)
│   │   │   ├── PositiveAttributesField.tsx # Multi-select with custom input
│   │   │   └── NegativeAttributesField.tsx # Multi-select improvement areas
│   │   └── Button.tsx                # Generate report button with API calls
│   └── ReportPanel/                  # Right panel - report display
│       ├── index.tsx                 # Main panel component
│       ├── Report.tsx                # Report display area
│       └── Refinement.tsx            # Report refinement tools
├── App.tsx                           # Main application container
├── App.css                           # Global app styles
└── index.css                         # Global base styles
```

### Architecture Principles

**1. Index File Pattern**

- Each major component has its own directory
- Main component is named `index.tsx` for clean imports
- Sub-components use simple, contextual names

**2. Lifted State Management**

- Form state lives in `StudentDetailsPanel/index.tsx`
- All form fields are controlled components receiving props
- Unidirectional data flow: state down, events up

**3. Clean Import Paths**

```typescript
// Clean imports thanks to index.tsx pattern
import StudentDetailsPanel from "./components/StudentDetailsPanel";
import ReportPanel from "./components/ReportPanel";

// Internal sub-component imports (within component directory)
import Header from "./Header";
import Form from "./Form";
import NameField from "./NameField";
```

**4. Controlled Components Pattern**

```typescript
// Parent manages state
const [formData, setFormData] = useState({ name: '', gender: '', positiveAttributes: [] })

// Child receives value and onChange
<NameField value={formData.name} onChange={(value) => updateFormData('name', value)} />
```

**5. Single Responsibility**

- Each component has one clear purpose
- Form fields handle only their UI and user interactions
- State management separated from presentation logic

**6. Contextual Naming**

- Sub-components use simple names (`Header`, `Form`, `Button`)
- Context comes from their parent directory location
- Avoids repetitive naming like `StudentDetailsHeader`

## Application Layout

### Two-Panel Interface

```
┌─────────────────────────────────────────────────────────┐
│                    Header Bar                           │
├─────────────────────┬───────────────────────────────────┤
│  StudentDetailsPanel│        ReportPanel                │
│  ┌─────────────────┐│  ┌─────────────────────────────┐  │
│  │     Header      ││  │         Report              │  │
│  ├─────────────────┤│  ├─────────────────────────────┤  │
│  │      Form       ││  │       Refinement            │  │
│  │   (scrollable)  ││  │     (scrollable)            │  │
│  ├─────────────────┤│  └─────────────────────────────┘  │
│  │     Button      ││                                   │
│  └─────────────────┘│                                   │
└─────────────────────┴───────────────────────────────────┘
```

**Key Layout Features:**

- Full viewport: `100vw` x `100vh` with no body margins
- Independent scrolling: Each panel scrolls internally
- 50/50 split: Equal width panels for balanced interface
- Responsive containers: Proper flex layout with `minHeight: 0` for scroll behavior

## Dark Theme Design System

### Color Palette

```typescript
const colors = {
  background: "#1e1e1e",
  cards: "#2a2a2a",
  inputs: "#3a3a3a",
  borders: "#404040",
  textPrimary: "#ffffff",
  textSecondary: "#a0a0a0",
};
```

**Design Philosophy:**

- NotebookLM-inspired professional theme
- High contrast for readability
- Consistent usage across all components

## Core Features Implementation

### Student Information Input (Left Panel)

**✅ Implemented Components:**

- NameField, GenderField, PositiveAttributesField, NegativeAttributesField, InstructionsField
- Generate Report Button with API integration, validation, loading states

### Report Generation & Refinement (Right Panel)

**✅ Implemented Components:**

- Report Display (`Report.tsx`)
- Refinement Tools (`Refinement.tsx`)

**🚧 Planned Features:**

- Export options (copy/download)
- Refinement history tracking

## Development Workflow

### Local Development

```bash
npm install
npm run dev          # Start Vite dev server (http://localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build
```

### Docker Development

```bash
# Build Docker image
docker build -t report-scribe-frontend .

# Run container with backend API proxy
docker run -d -p 3000:80 --name report-scribe-frontend-container report-scribe-frontend

# Access application
# Frontend: http://localhost:3000
# Backend API: http://localhost:3000/report/* -> backend:8000/report/*
```

### Docker Architecture

- Multi-stage build: Node.js 20-alpine for build + nginx-alpine for serving
- Built-in nginx proxy routes `/report/*` requests to backend
- SPA support with proper `try_files` routing
- Container health monitoring on port 80
- Production optimized with minimal static image

## Adding New Components

**Major Panels:**

- `src/components/ComponentName/` → `index.tsx` → sub-components

**Form Fields:**

- Controlled pattern with `value` and `onChange`
- Place in `Form/` directory
- Use contextual names (`NameField` not `StudentNameField`)

**Sub-Components:**

- Place in parent directory
- Contextual naming: `Header`, `Form`, `Button`

## State Management Examples

**Lifted State Pattern**

```typescript
const [formData, setFormData] = useState({ name: '', gender: '', positiveAttributes: [] })
<Header />
<Form onFormDataChange={setFormData} />
<Button formData={formData} />
```

**Form Coordinator**

```typescript
function StudentForm({ onFormDataChange }) {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    positiveAttributes: [],
  });
  const updateFormData = (field, value) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);
    onFormDataChange(newFormData);
  };
  return (
    <div>
      <NameField
        value={formData.name}
        onChange={(value) => updateFormData("name", value)}
      />
      <GenderField
        value={formData.gender}
        onChange={(value) => updateFormData("gender", value)}
      />
    </div>
  );
}
```

**Enhanced API Integration (`services/reportService.ts`)**

```typescript
export interface GenerateReportRequest { ... }
export interface RefineReportRequest { ... }

export const generateReport = async (...) => { ... }
export const refineReport = async (...) => { ... }
```

**Custom Hook (`hooks/useReport.ts`)**

```typescript
export const useReport = () => {
  const [reportData, setReportData] = useState<GenerateReportResponse | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const generateReport = async (...) => { ... }
  const refineReport = async (...) => { ... }

  return { reportData, loading, error, generateReport, refineReport, clearReport, clearError }
}
```

**App-Level State (`App.tsx`)**

```typescript
const App: React.FC = () => {
  const { reportData, loading, error, generateReport, refineReport } =
    useReport();
  return (
    <div>
      <StudentDetailsPanel
        onGenerateReport={generateReport}
        loading={loading}
        error={error}
      />
      <ReportPanel
        reportData={reportData}
        onRefineReport={refineReport}
        loading={loading}
        error={error}
      />
    </div>
  );
};
```

## Import Examples

```typescript
import StudentDetailsPanel from "./components/StudentDetailsPanel";
import ReportPanel from "./components/ReportPanel";
import Header from "./Header";
import Form from "./Form";
import Button from "./Button";
import NameField from "./NameField";
import GenderField from "./GenderField";
import PositiveAttributesField from "./PositiveAttributesField";
```

This architecture provides a maintainable, scalable foundation for building the Report Scribe frontend with Docker Compose support and proper hot reload integration.
