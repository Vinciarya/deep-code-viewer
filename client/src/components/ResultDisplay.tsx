import React from "react";
import { AnalysisResult } from "../services/analysisService";
import CallGraphView from "./CallGarphView";

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
  if (isLoading) {
    return (
      <div className="bg-white p-10 rounded-lg shadow-lg text-center text-gray-500">
        Loading analysis...
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

  if (!analysis) {
    return (
      <div className="bg-white p-10 rounded-lg shadow-lg text-center text-gray-500">
        Analyze some code to see the results.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Issues Panel */}
      <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
          Issues Detected ({analysis.issues.length})
        </h2>
        {analysis.issues.length > 0 ? (
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
      <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
          Call Graph
        </h2>
        <CallGraphView callGraphData={analysis.callGraph} />
      </div>
    </div>
  );
};

export default ResultsDisplay;
