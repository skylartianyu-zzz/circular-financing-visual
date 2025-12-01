const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const infoBox = document.getElementById("infoBox");
const infoText = document.getElementById("infoText");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let graph = null;
let nodes = [];
let edges = [];

fetch("data/collaborations.json")
  .then(res => res.json())
  .then(data => {
    graph = data;
    initLayout();
    draw();
  });

function initLayout() {
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const radius = 220;

  graph.nodes.forEach((n, i) => {
    const angle = i * (Math.PI * 2 / graph.nodes.length);
    nodes.push({
      ...n,
      x: cx + Math.cos(angle) * radius,
      y: cy + Math.sin(angle) * radius
    });
  });

  edges = graph.edges.map(e => ({
    ...e,
    hover: false
  }));
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  edges.forEach(e => {
    const a = nodes.find(n => n.id === e.source);
    const b = nodes.find(n => n.id === e.target);

    ctx.strokeStyle = e.hover ? "#00ffff" : "#555";
    ctx.lineWidth = e.hover ? 4 : 1;

    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  });

  nodes.forEach(n => {
    ctx.fillStyle = "#999";
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.size * 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.fillText(n.id, n.x - 14, n.y - 12);
  });

  requestAnimationFrame(draw);
}

canvas.addEventListener("mousemove", e => {
  const mx = e.offsetX;
  const my = e.offsetY;

  edges.forEach(edge => {
    const a = nodes.find(n => n.id === edge.source);
    const b = nodes.find(n => n.id === edge.target);

    edge.hover = pointToLineDist(mx, my, a.x, a.y, b.x, b.y) < 6;
  });
});

canvas.addEventListener("click", () => {
  const hit = edges.find(e => e.hover);
  if (!hit) return;

  infoText.innerHTML = `
    <b>${hit.source} ⇄ ${hit.target}</b><br><br>
    ${hit.text}<br><br>
    <i>${hit.source_file}</i>
  `;
  infoBox.classList.remove("hidden");
});

function pointToLineDist(px, py, x1, y1, x2, y2) {
  const A = px - x1;
  const B = py - y1;
  const C = x2 - x1;
  const D = y2 - y1;

  const dot = A * C + B * D;
  const len = C * C + D * D;
  const t = Math.max(0, Math.min(1, dot / len));

  const x = x1 + t * C;
  const y = y1 + t * D;

  return Math.hypot(px - x, py - y);
}
