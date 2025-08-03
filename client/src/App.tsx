// src/App.tsx
import { useState, useRef, useLayoutEffect } from "react";
import { analyzeCode, AnalysisResult } from "./services/analysisService";
import CodeInput from "./components/CodeInput";
import ResultsDisplay from "./components/ResultDisplay";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import "./index.css";
import { ThreeCanvas } from "./components/ThreeCanvas";

function App() {
  const [code, setCode] = useState<string>(
    "function main() {\n  helperOne();\n  helperTwo();\n}\n\nfunction helperOne() {}\nfunction helperTwo() {\n  helperOne();\n}"
  );

  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(".panel", {
      y: 50,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: "power3.inOut",
    });
  });

  const handleAnalyze = async () => {
    setIsLoading(true);
    setError(null);
    setAnalysis(null);
    try {
      const result = await analyzeCode(code);
      setAnalysis(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container ">
      <ThreeCanvas />
      <header className="app-header panel">
        <h1>Deep Code Viewer</h1>
        <p>Paste your code below to analyze its structure and dependencies.</p>
      </header>

      <main className="main-content">
        <CodeInput
          code={code}
          setCode={setCode}
          onAnalyze={handleAnalyze}
          isLoading={isLoading}
        />

        <ResultsDisplay
          analysis={analysis}
          error={error}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
}

export default App;
