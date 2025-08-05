import React, { use, useRef } from "react";
import { AnalysisResult } from "../services/analysisService";
import CallGraphView from "./CallGarphView";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { div } from "three/tsl";

interface ResultsDisplayProps {
  analysis: AnalysisResult | null;
  error: string | null;
  isLoading: boolean;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  analysis,
  error,
  isLoading,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (analysis) {
        gsap.from(".panel-item", {
          autoAlpha: 0,
          y: 40,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
        });
      }
    },
    {
      dependencies: [analysis],
      scope: containerRef,
    }
  );

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
        {/* Issues Panel Skeleton */}
        <div className="md:col-span-1 bg-gray-900/50 p-6 rounded-2xl">
          <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-700 rounded w-full mt-2"></div>
          <div className="h-4 bg-gray-700 rounded w-5/6 mt-2"></div>
        </div>
        {/* Call Graph Panel Skeleton */}
        <div className="md:col-span-2 bg-gray-900/50 p-6 rounded-2xl h-[550px]">
          <div className="h-6 bg-gray-700 rounded w-1/4 mb-4"></div>
          <div className="h-full bg-gray-800/50 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded-lg shadow-lg text-center">
        Error: {error}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Issues Panel */}
      <div className="panel-item md:col-span-1 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-6 ">
          Issues Detected ({analysis ? analysis.issues.length : 0})
        </h2>
        {analysis && analysis.issues.length > 0 ? (
          <ul className="space-y-2">
            {analysis.issues.map((issue, index) => (
              <li
                key={index}
                className="text-sm text-yellow-800 bg-yellow-100 p-2 rounded-md"
              >
                Line {issue.line}: {issue.message}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-green-800">No issues found.</p>
        )}
      </div>

      {/* Call Graph Panel */}
      <div className="panel-item md:col-span-2 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-800 border-b pb-4 mb-6  w-full">
          Call Graph
        </h2>
        {analysis ? (
          <CallGraphView callGraphData={analysis.callGraph} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Click "Analyze Code" to generate the graph.
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsDisplay;
