import React from "react";
import Scene from "./components/Scene";
import "./styles.css"; // optional if you want global css

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "#050607" }}>
      <Scene />
    </div>
  );
}

