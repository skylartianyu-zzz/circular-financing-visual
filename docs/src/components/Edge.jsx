import React, { useMemo, useRef, useState } from "react";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import useUIState from "../state/uiState";

export default function Edge({ edge }) {
  const ref = useRef();

  const setHovered = useUIState((s) => s.setHoveredEdge);
  const setClicked = useUIState((s) => s.setClickedEdge);

  const [hovered, setHover] = useState(false);

  // Pre-compute the curve path for performance
  const curve = useMemo(() => {
    const start = new THREE.Vector3(edge.source.x, edge.source.y, edge.source.z);
    const end = new THREE.Vector3(edge.target.x, edge.target.y, edge.target.z);

    // middle control point to make a slight arc
    const mid = start.clone().lerp(end, 0.5);
    mid.y += Math.random() * 8; // slight variation so multiple lines don’t overlap completely

    return new THREE.QuadraticBezierCurve3(start, mid, end).getPoints(50);
  }, [edge]);

  return (
    <Line
      ref={ref}
      points={curve}
      lineWidth={hovered ? 3 : 1.2}
      color={hovered ? "#00b7ff" : "#4f5b66"}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHover(true);
        setHovered(edge);
      }}
      onPointerOut={() => {
        setHover(false);
        setHovered(null);
      }}
      onClick={(e) => {
        e.stopPropagation();
        setClicked(edge);
      }}
    />
  );
}

