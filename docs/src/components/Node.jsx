import React, { useRef } from "react";
import { Html } from "@react-three/drei";
import * as THREE from "three";

export default function Node({ node }) {
  const ref = useRef();

  return (
    <mesh ref={ref} position={[node.x, node.y, node.z]}>
      {/* Sphere for company node */}
      <sphereGeometry args={[node.size || 3, 32, 32]} />
      <meshStandardMaterial
        color={"#0a84ff"}
        emissive={"#003d99"}
        emissiveIntensity={0.4}
        metalness={0.3}
        roughness={0.2}
      />

      {/* Floating text label */}
      <Html position={[0, node.size + 2, 0]} center style={{ color: "white" }}>
        {node.id}
      </Html>
    </mesh>
  );
}

