import React, { useState, useRef, useLayoutEffect } from "react";
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

  const container = useRef(null);
  const scrollPositionRef = useRef(0);
  const activeElementRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      gsap.from(".panel", {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.inOut",
      });
    },
    { scope: container }
  );

  const handleAnalyze = async (event: React.MouseEvent<HTMLButtonElement>) => {
    activeElementRef.current = event.currentTarget;
    scrollPositionRef.current = window.scrollY;

    setIsLoading(true);
    setError(null);

    try {
      const result = await analyzeCode(code);
      setAnalysis(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  useLayoutEffect(() => {
    if (!isLoading && (analysis || error)) {
      window.scrollTo({
        top: scrollPositionRef.current,
        behavior: "instant",
      });
      activeElementRef.current?.scrollIntoView();
    }
  }, [isLoading, analysis, error]);

  return (
    <div
      className="app-container relative min-h-screen bg-gray-100 dark:bg-gray-900 font-sans "
      ref={container}
    >
      <ThreeCanvas />
      <div className="absolute inset-0 z-10 flex flex-col gap-6 p-8 ">
        <header className="app-header panel">
          <h1 className="text-3xl font-bold sm:text-7xl text-gray-800 dark:text-gray-100">
            Deep Code Viewer
          </h1>
          <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
            Paste your code below to analyze its structure and dependencies.
          </p>
        </header>

        <main className=" w-full max-w-7xl flex flex-col gap-6">
          <CodeInput
            code={code}
            setCode={setCode}
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
          />
          <div className="min-h-[600px]">
            <ResultsDisplay
              analysis={analysis}
              error={error}
              isLoading={isLoading}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
