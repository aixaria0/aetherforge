import { useCallback, useRef, useState } from "react";

type Node = { x: number; y: number; j: string };

const INITIAL: Node[] = [
  { x: 70, y: 56, j: "1" },
  { x: 250, y: 56, j: "1" },
  { x: 70, y: 220, j: "1" },
  { x: 250, y: 220, j: "½" },
];

export function SpinNetwork() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [nodes, setNodes] = useState(INITIAL);
  const [vertex, setVertex] = useState({ x: 160, y: 138 });
  const drag = useRef<null | "v" | number>(null);

  const toLocal = (e: React.PointerEvent) => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };
    const p = pt.matrixTransform(ctm.inverse());
    return {
      x: Math.max(18, Math.min(302, p.x)),
      y: Math.max(22, Math.min(258, p.y)),
    };
  };

  const onMove = useCallback((e: React.PointerEvent) => {
    if (drag.current === null) return;
    const p = toLocal(e);
    if (drag.current === "v") setVertex(p);
    else {
      const i = drag.current;
      setNodes((prev) => prev.map((n, k) => (k === i ? { ...n, ...p } : n)));
    }
  }, []);

  const stop = () => {
    drag.current = null;
  };

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 320 280"
      className="mx-auto block h-auto w-full max-w-sm touch-none cursor-grab"
      onPointerMove={onMove}
      onPointerUp={stop}
      onPointerLeave={stop}
      aria-label="Interactive 4-valent spin network"
    >
      {nodes.map((n, i) => (
        <line
          key={`e${i}`}
          x1={n.x}
          y1={n.y}
          x2={vertex.x}
          y2={vertex.y}
          stroke="var(--color-accent)"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.85"
        />
      ))}
      {nodes.map((n, i) => (
        <g key={`n${i}`}>
          <circle
            cx={n.x}
            cy={n.y}
            r="11"
            fill="var(--color-accent)"
            className="cursor-grab"
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              drag.current = i;
            }}
          />
          <text
            x={n.x}
            y={n.y - 18}
            textAnchor="middle"
            fill="var(--color-fg)"
            fontSize="13"
            fontWeight="600"
            fontFamily="var(--font-mono)"
          >
            {`j=${n.j}`}
          </text>
        </g>
      ))}
      <circle
        cx={vertex.x}
        cy={vertex.y}
        r="18"
        fill="var(--color-elevated)"
        stroke="var(--color-fg)"
        strokeWidth="2"
        className="cursor-grab"
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          drag.current = "v";
        }}
      />
      <text
        x={vertex.x}
        y={vertex.y + 4}
        textAnchor="middle"
        fill="var(--color-muted)"
        fontSize="8"
        fontWeight="600"
        fontFamily="var(--font-sans)"
      >
        ι
      </text>
    </svg>
  );
}
