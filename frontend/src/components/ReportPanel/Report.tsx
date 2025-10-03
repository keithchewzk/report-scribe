import React, { useState } from "react";
import { ReportDisplayProps } from "../../types";

const Report: React.FC<ReportDisplayProps> = ({ reportData }) => {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">(
    "idle"
  );

  const reportText = reportData?.report || "";

  const handleCopy = async () => {
    if (!reportText) return;

    try {
      await navigator.clipboard.writeText(reportText);
      setCopyStatus("copied");
      setTimeout(() => setCopyStatus("idle"), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      setCopyStatus("error");
    }
  };

  const buttonColor = copyStatus === "copied" ? "#32CD32" : "#a0a0a0";

  return (
    <div
      style={{
        flex: "1 1 75%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#1e1e1e",
        minHeight: 0,
      }}
    >
      {/* Header Div (No Change) */}
      <div
        style={{
          padding: "16px 24px",
          borderBottom: "1px solid #404040",
          backgroundColor: "#2a2a2a",
          flexShrink: 0,
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "16px",
            fontWeight: "500",
            color: "#ffffff",
          }}
        >
          Generated Report
        </h2>
        <p style={{ margin: "4px 0 0 0", fontSize: "14px", color: "#a0a0a0" }}>
          Review and refine your student report
        </p>
      </div>

      {/* COPY BUTTON & FEEDBACK CONTAINER (Always Rendered for Layout Stability) */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          margin: "12px 24px 0 24px",
          minHeight: "38px",
        }}
      >
        {/* Status Message and Button Group */}
        {(reportData || copyStatus !== "idle") && (
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* Status Message */}
            {copyStatus === "copied" && (
              <span
                style={{
                  color: "#32CD32",
                  fontSize: "13px",
                  marginRight: "10px",
                  fontWeight: "bold",
                }}
              >
                ✅ Copied!
              </span>
            )}
            {copyStatus === "error" && (
              <span
                style={{
                  color: "#FF4500",
                  fontSize: "13px",
                  marginRight: "10px",
                }}
              >
                ❌ Error
              </span>
            )}

            {/* Copy Button (Smaller, No Border) */}
            <button
              onClick={handleCopy}
              disabled={copyStatus === "copied" || !reportData}
              style={{
                background: "none",
                border: "none", // Removed border as requested
                cursor: reportData ? "pointer" : "default",
                color: buttonColor,
                padding: "6px",
                display: "flex",
                alignItems: "center",
                transition: "color 0.2s",
                borderRadius: "4px",
              }}
              title="Copy report to clipboard"
            >
              {/* Icon is now 20x20 pixels */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Report Display Content */}
      <div
        style={{
          flex: 1,
          margin: "8px 24px 16px 24px",
          backgroundColor: "#3a3a3a",
          border: reportData ? "1px solid #404040" : "2px dashed #404040",
          borderRadius: "8px",
          display: "flex",
          alignItems: reportData ? "flex-start" : "center",
          justifyContent: reportData ? "flex-start" : "center",
          fontSize: "14px",
          color: reportData ? "#ffffff" : "#a0a0a0",
          padding: reportData ? "16px" : "0",
          overflow: "auto",
        }}
      >
        {reportData ? (
          <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.5" }}>
            {reportText}
          </div>
        ) : (
          "Generated Report Display Will Go Here"
        )}
      </div>
    </div>
  );
};

export default Report;
