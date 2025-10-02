import React from "react";
import "./App.css";
import StudentDetailsPanel from "./components/StudentDetailsPanel";
import ReportPanel from "./components/ReportPanel";
import { useReport } from "./hooks/useReport";

const App: React.FC = () => {
  const { reportData, loading, error, generateReport, refineReport } =
    useReport();

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#1e1e1e",
        color: "#ffffff",
        margin: 0,
        padding: 0,
      }}
    >
      {/* Header */}
      <header
        style={{
          padding: "16px 24px",
          borderBottom: "1px solid #404040",
          backgroundColor: "#2a2a2a",
          flexShrink: 0,
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "18px",
            fontWeight: "600",
            color: "#ffffff",
          }}
        >
          Report Scribe
        </h1>
      </header>

      {/* Main Content - Two Panel Layout */}
      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        {/* Left Panel - Student Input */}
        <StudentDetailsPanel
          onGenerateReport={generateReport}
          loading={loading}
          error={error}
        />

        {/* Right Panel - Report Display & Refinement */}
        <ReportPanel
          reportData={reportData}
          onRefineReport={refineReport}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
};

export default App;
