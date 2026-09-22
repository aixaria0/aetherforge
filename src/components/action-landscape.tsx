import { useEffect, useRef } from "react";
import { actionAt } from "@/lib/physics";

export function ActionLandscape({ gamma, jMean }: { gamma: number; jMean: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    const img = ctx.createImageData(w, h);
    const range = 0.42;
    let min = Infinity;
    let max = -Infinity;
    const grid = new Float32Array(w * h);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const bx = (x / (w - 1)) * 2 * range - range;
        const by = (y / (h - 1)) * 2 * range - range;
        const s = actionAt(bx, by, gamma, jMean);
        grid[y * w + x] = s;
        if (s < min) min = s;
        if (s > max) max = s;
      }
    }
    const span = max - min || 1;
    for (let i = 0; i < grid.length; i++) {
      const t = (grid[i] - min) / span;
      const k = i * 4;
      img.data[k] = 12 + t * 140;
      img.data[k + 1] = 13 + t * 155;
      img.data[k + 2] = 16 + t * 170;
      img.data[k + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    ctx.strokeStyle = "rgba(236,236,232,0.18)";
    ctx.lineWidth = 1;
    const steps = 6;
    ctx.beginPath();
    for (let s = 1; s < steps; s++) {
      const gx = (s / steps) * w;
      const gy = (s / steps) * h;
      ctx.moveTo(gx, 0);
      ctx.lineTo(gx, h);
      ctx.moveTo(0, gy);
      ctx.lineTo(w, gy);
    }
    ctx.stroke();
    ctx.fillStyle = "rgba(236,236,232,0.7)";
    ctx.font = "11px ui-monospace, monospace";
    ctx.fillText("βx", w - 28, h - 8);
    ctx.fillText("βy", 8, 16);
  }, [gamma, jMean]);

  return (
    <canvas
      ref={ref}
      width={520}
      height={280}
      className="h-auto w-full rounded-md border border-border"
      aria-label="EPRL action landscape slice"
    />
  );
}
