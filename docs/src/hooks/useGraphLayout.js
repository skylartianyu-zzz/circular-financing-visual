import { useMemo } from "react";
import * as d3 from "d3-force-3d";

export default function useGraphLayout(graph) {
  if (!graph) return { nodes: [], edges: [] };

  const { nodes, edges } = useMemo(() => {
    const nodes = Object.keys(graph.companies).map((name) => ({
      id: name,
      size: 3 + Math.random() * 2,
    }));

    const edges = graph.collaborations.map((c) => ({
      ...c,
      source: c.companyA,
      target: c.companyB,
    }));

    const sim = d3
      .forceSimulation(nodes)
      .force("link", d3.forceLink(edges).id((d) => d.id).distance(22))
      .force("charge", d3.forceManyBody().strength(-120))
      .force("center", d3.forceCenter(0, 0, 0))
      .force("z", d3.forceZ().strength(0.1))
      .stop();

    // Run simulation manually
    for (let i = 0; i < 120; i++) sim.tick();

    // Attach resolved coordinates
    edges.forEach((e) => {
      e.source = nodes.find((n) => n.id === e.source);
      e.target = nodes.find((n) => n.id === e.target);
    });

    return { nodes, edges };
  }, [graph]);

  return { nodes, edges };
}

