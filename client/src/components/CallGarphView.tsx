import React, { useEffect } from "react";
import ReactFlow, {
  Controls,
  Background,
  Node,
  Edge,
  Position,
  MarkerType,
  useReactFlow,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";

interface CallGraphViewProps {
  callGraphData: Record<string, string[]>;
}

const convertDataToFlow = (data: Record<string, string[]>) => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const nodeSet = new Set<string>();

  Object.entries(data).forEach(([source, targets]) => {
    nodeSet.add(source);
    targets.forEach((target) => {
      nodeSet.add(target);
      edges.push({
        id: `${source}-${target}`,
        source: source,
        target: target,
        animated: true,
        markerEnd: { type: MarkerType.ArrowClosed },
      });
    });
  });
  let i = 0;
  nodeSet.forEach((nodeName) => {
    nodes.push({
      id: nodeName,
      data: { label: nodeName },
      position: { x: (i % 4) * 200, y: Math.floor(i / 4) * 120 },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      style: {
        border: "1px solid #1a192b",
        borderRadius: "6px",
        padding: "8px 12px",
        background: "white",
      },
    });
    i++;
  });
  return { nodes, edges };
};

const Flow: React.FC<CallGraphViewProps> = ({ callGraphData }) => {
  const { nodes, edges } = convertDataToFlow(callGraphData);

  const { fitView } = useReactFlow();

  useEffect(() => {
    setTimeout(() => {
      fitView({ padding: 0.1, duration: 200 });
    }, 50);
  }, [nodes, edges, fitView]);

  return (
    <ReactFlow nodes={nodes} edges={edges}>
      <Controls />

      <Background gap={12} size={1} />
    </ReactFlow>
  );
};

// This is the parent component that provides the ReactFlow context
const CallGraphView: React.FC<CallGraphViewProps> = (props) => {
  return (
    <div
      className="w-full h-[500px] border border-gray-200 rounded-lg"
      style={{ height: "500px", width: "100%" }}
    >
      <ReactFlowProvider>
        <Flow {...props} />
      </ReactFlowProvider>
    </div>
  );
};
export default CallGraphView;
