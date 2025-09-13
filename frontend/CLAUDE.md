# Report Scribe Frontend

## Project Overview

Report Scribe is a web application for school teachers to generate AI-powered student reports efficiently. The frontend provides a structured interface that captures student information and enables report generation and refinement, significantly reducing the time required compared to traditional methods.

**Key Goals:**
- Streamline student report writing process
- Provide intuitive two-panel interface
- Support structured data input and AI-powered report generation
- Enable post-generation refinement and customization

## Technical Stack

- **Framework**: React 19.1.0
- **Build Tool**: Vite
- **Styling**: Inline styles with dark theme
- **Architecture**: Component-based with modular organization

## Code Organization

### Component Structure

The frontend follows a **modular component architecture** using the **Index File Pattern (Option 3)**:

```
src/
├── components/
│   ├── StudentDetailsPanel/          # Left panel - student input
│   │   ├── index.jsx                # Main panel component
│   │   ├── Header.jsx               # Panel header
│   │   ├── Form.jsx                 # Student input form
│   │   └── Button.jsx               # Generate report button
│   └── ReportPanel/                 # Right panel - report display
│       ├── index.jsx                # Main panel component
│       ├── Report.jsx               # Report display area
│       └── Refinement.jsx           # Report refinement tools
├── App.jsx                          # Main application container
├── App.css                          # Global app styles
└── index.css                        # Global base styles
```

### Architecture Principles

**1. Index File Pattern**
- Each major component has its own directory
- Main component is named `index.jsx` for clean imports
- Sub-components use simple, contextual names

**2. Clean Import Paths**
```javascript
// Clean imports thanks to index.jsx pattern
import StudentDetailsPanel from './components/StudentDetailsPanel'
import ReportPanel from './components/ReportPanel'

// Internal sub-component imports (within component directory)
import Header from './Header'
import Form from './Form'
```

**3. Single Responsibility**
- Each component has one clear purpose
- Logical separation between panels and their sub-components
- Easy to maintain and test independently

**4. Contextual Naming**
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
- **Full viewport**: `100vw` x `100vh` with no body margins
- **Independent scrolling**: Each panel scrolls internally, main page never scrolls
- **50/50 split**: Equal width panels for balanced interface
- **Responsive containers**: Proper flex layout with `minHeight: 0` for scroll behavior

## Dark Theme Design System

### Color Palette
```javascript
const colors = {
  background: '#1e1e1e',    // Main background (lighter dark gray)
  cards: '#2a2a2a',         // Panel headers and cards
  inputs: '#3a3a3a',        // Input fields and content areas
  borders: '#404040',       // All border elements
  textPrimary: '#ffffff',   // Main text
  textSecondary: '#a0a0a0'  // Secondary/muted text
}
```

**Design Philosophy:**
- **NotebookLM-inspired**: Professional, easy on the eyes
- **Good contrast**: Ensures readability while being dark
- **Consistent application**: All components use the same color variables

## Core Features Implementation

### Student Information Input (Left Panel)
1. **Student Name**: Text input field
2. **Gender Selection**: Single select dropdown
3. **Commendable Attributes**: Multi-select with custom additions
4. **Areas for Improvement**: Multi-select with custom additions
5. **Additional Information**: Free-form textarea

### Report Generation & Refinement (Right Panel)
- **Report Display**: Generated report with formatting
- **Refinement Tools**: Re-prompting and style adjustments
- **Export Options**: Copy, download functionality

## Development Workflow

### Getting Started
```bash
npm run dev          # Start development server (http://localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build
```

### Adding New Components

**For Major Components (New Panels):**
1. Create directory: `src/components/ComponentName/`
2. Create `index.jsx` as main component
3. Add sub-components with simple names
4. Import in parent component

**For Sub-Components:**
1. Create in parent component directory
2. Use contextual names (`Header`, `Form`, `Button`)
3. Import using relative paths

### Code Style Guidelines

**1. Component Structure**
```javascript
// Component imports at top
import SubComponent from './SubComponent'

// Main component function
function ComponentName() {
  return (
    <div style={containerStyles}>
      <SubComponent />
    </div>
  )
}

// Default export
export default ComponentName
```

**2. Styling Approach**
- Use inline styles for now (can migrate to CSS modules later)
- Apply dark theme colors consistently
- Use semantic style objects when styles are complex

**3. File Organization**
- One component per file
- Clear, descriptive component names
- Consistent export/import patterns

## Future Enhancements

### Component Architecture
- **State Management**: Add React Context or Redux for complex state
- **Styling System**: Migrate to CSS modules or styled-components
- **Component Library**: Extract reusable UI components

### Features
- **Form Validation**: Input validation and error handling
- **Data Persistence**: Local storage for form data
- **Batch Processing**: Multiple student report generation
- **Theme Toggle**: Light/dark mode switching

## Development Notes

- **Prioritize UX**: Focus on intuitive workflow for teachers
- **Maintain Performance**: Efficient re-renders and state updates  
- **Component Isolation**: Each component should be testable independently
- **Consistent Patterns**: Follow established naming and organization conventions
- **Accessibility**: Ensure keyboard navigation and screen reader support

## Import Examples

```javascript
// Main App.jsx
import StudentDetailsPanel from './components/StudentDetailsPanel'
import ReportPanel from './components/ReportPanel'

// Within StudentDetailsPanel/index.jsx
import Header from './Header'
import Form from './Form'
import Button from './Button'

// Within ReportPanel/index.jsx  
import Report from './Report'
import Refinement from './Refinement'
```

This architecture provides a solid foundation for building out the Report Scribe frontend with maintainable, scalable code.