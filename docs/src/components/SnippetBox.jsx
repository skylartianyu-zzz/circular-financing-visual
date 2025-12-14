import React from "react";
import useUIState from "../state/uiState";

export default function SnippetBox({ edge }) {
  const setClicked = useUIState((s) => s.setClickedEdge);

  return (
    <div
      style={{
        position: "absolute",
        left: edge.mouseX,
        top: edge.mouseY,
        padding: "14px 18px",
        background: "rgba(20, 22, 25, 0.75)",
        backdropFilter: "blur(8px)",
        borderRadius: "12px",
        width: "260px",
        color: "white",
        border: "1px solid rgba(0, 200, 255, 0.25)",
      }}
    >
      <div style={{ fontSize: "14px", opacity: 0.7 }}>
        {edge.date}
      </div>

      <div style={{ marginTop: "6px", fontWeight: 600 }}>
        {edge.source.id} → {edge.target.id}
      </div>

      <div style={{ marginTop: "6px", fontSize: "13px" }}>
        {edge.snippet || "No snippet available yet."}
      </div>

      {edge.url && (
        <a href={edge.url} target="_blank" style={{ color: "#00e0ff", marginTop: "8px", display: "block" }}>
          Open Source
        </a>
      )}

      <button
        onClick={() => setClicked(null)}
        style={{
          marginTop: "12px",
          width: "100%",
          padding: "6px",
          background: "#0a84ff",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          color: "white",
        }}
      >
        Close
      </button>
    </div>
  );
}

