import { create } from "zustand";

const useUIState = create((set) => ({
  hoveredEdge: null,
  clickedEdge: null,

  setHoveredEdge: (edge) => set({ hoveredEdge: edge }),
  setClickedEdge: (edge) => {
    if (!edge) return set({ clickedEdge: null });

    // attach mouse position for positioning the SnippetBox
    set({
      clickedEdge: {
        ...edge,
        mouseX: window.lastPointerX || 200,
        mouseY: window.lastPointerY || 200,
      },
    });
  },
}));

// Track mouse globally so snippet box knows where to render
window.addEventListener("pointermove", (e) => {
  window.lastPointerX = e.clientX;
  window.lastPointerY = e.clientY;
});

export default useUIState;

