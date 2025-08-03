import React from "react";

interface CodeInputProps {
  code: string;
  setCode: (code: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}
const CodeInput: React.FC<CodeInputProps> = ({
  code,
  setCode,
  onAnalyze,
  isLoading,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: "var(--color-accent-dark)",
        padding: "24px",
        borderRadius: "8px",
        border: "1px solid var(--color-accent-primary)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
      }}
    >
      <h2 style={{ marginTop: 0, color: "var(--color-heading)" }}>
        Code Input
      </h2>
      <textarea
        id="codeInput"
        name="code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Paste your JavaScript code here..."
        rows={15}
        style={{
          width: "100%",
          fontFamily: "monospace",
          fontSize: "14px",
          backgroundColor: "var(--color-background",
          color: "var(--color-body-text)",
          border: "1px solid var(--color-accent-primary)",
          borderRadius: "6px",
          padding: "12px",
          boxSizing: "border-box",
        }}
      />
      <button
        onClick={onAnalyze}
        disabled={isLoading}
        style={{
          marginTop: "15px",
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "var(--color-accent-primary)",
          color: "var(--color-heading)",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          alignSelf: "flex-start",
          opacity: isLoading ? 0.6 : 1,
        }}
      >
        {isLoading ? "Analyzing..." : "Analyze Code"}
      </button>
    </div>
  );
};
export default CodeInput;
