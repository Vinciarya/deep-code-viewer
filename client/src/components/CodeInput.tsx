import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

interface CodeInputProps {
  code: string;
  setCode: (code: string) => void;
  onAnalyze: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isLoading: boolean;
}
const CodeInput: React.FC<CodeInputProps> = ({
  code,
  setCode,
  onAnalyze,
  isLoading,
}) => {
  const lineCounterRef = useRef<HTMLTextAreaElement>(null);
  const codeEditorRef = useRef<HTMLTextAreaElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleScroll = () => {
    if (lineCounterRef.current && codeEditorRef.current) {
      lineCounterRef.current.scrollTop = codeEditorRef.current.scrollTop;
    }
  };
  useGSAP(
    () => {
      if (isLoading) {
        gsap.to(buttonRef.current, {
          scale: 1.05,
          repeat: -1,
          yoyo: true,
          duration: 0.5,
        });
      } else {
        gsap.to(buttonRef.current, {
          scale: 1,
          duration: 0.2,
        });
      }
      return () => {
        gsap.killTweensOf(buttonRef.current);
      };
    },
    { dependencies: [isLoading] }
  );
  const lineCount = code.split("\n").length;
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1).join(
    "\n"
  );

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
      <div
        style={{
          display: "flex",
          width: "100%",
          border: "1px solid var(--color-accent-primary)",
          borderRadius: "6px",
          minHeight: "300px",
        }}
      >
        <textarea
          ref={lineCounterRef}
          id="lineCounter"
          name="lineNumbers"
          value={lineNumbers}
          readOnly
          style={{
            width: "20px",
            textAlign: "right",
            fontFamily: "monospace",
            fontSize: "14px",
            lineHeight: "1.3",
            backgroundColor: "var(--color-background)",
            color: "var(--color-body-text)",
            border: "none",
            padding: "12pxn 5px 12px 0",
            borderRight: "1px solid var(--color-accent-primary)",
            resize: "none",
            outline: "none",
            overflow: "hidden",
          }}
        />
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
            borderRadius: "2px",

            boxSizing: "border-box",
          }}
        />
      </div>
      <button
        ref={buttonRef}
        onClick={(e) => onAnalyze(e)}
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
