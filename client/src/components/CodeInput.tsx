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
        background: "black",
        padding: "10px 40px 20px",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ marginTop: 0 }}>Code Input</h2>
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
          border: "1px solid #ddd",
          borderRadius: "4px",
          padding: "10px",
        }}
      />
      <button
        onClick={onAnalyze}
        disabled={isLoading}
        style={{
          marginTop: "15px",
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          alignSelf: "flex-start",
        }}
      >
        {isLoading ? "Analyzing..." : "Analyze Code"}
      </button>
    </div>
  );
};
export default CodeInput;
