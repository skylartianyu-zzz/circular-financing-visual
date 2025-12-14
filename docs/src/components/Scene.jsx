import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Node from "./Node";
import Edge from "./Edge";
import SnippetBox from "./SnippetBox";
import useGraphLayout from "../hooks/useGraphLayout";
import useUIState from "../state/uiState";

export default function Scene() {
  const [graph, setGraph] = useState(null);

  // global UI state (hovered line, clicked line)
  const clickedEdge = useUIState((s) => s.clickedEdge);

  // load JSON data
  useEffect(() => {
    fetch("/data/graph.json")
      .then((res) => res.json())
      .then((data) => setGraph(data));
  }, []);

  // run force layout to position nodes in 3D
  const { nodes, edges } = useGraphLayout(graph);

  if (!graph) return null;

  return (
    <>
      <Canvas
        camera={{ position: [0, 0, 80], fov: 45 }}
        onCreated={({ scene }) => {
          scene.background = new THREE.Color("#050607");
        }}
      >
        <ambientLight intensity={0.4} />
        <pointLight intensity={1} position={[10, 20, 10]} />

        <OrbitControls enableDamping dampingFactor={0.15} />

        {/* Render all nodes */}
        {nodes.map((node) => (
          <Node key={node.id} node={node} />
        ))}

        {/* Render all collaboration lines */}
        {edges.map((edge, i) => (
          <Edge key={i} edge={edge} />
        ))}
      </Canvas>

      {/* If an edge is clicked → show UI box */}
      {clickedEdge && <SnippetBox edge={clickedEdge} />}
    </>
  );
}

