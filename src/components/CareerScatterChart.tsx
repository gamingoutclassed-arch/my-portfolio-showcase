import { useEffect, useRef, useState } from "react";
import {
  Chart,
  ScatterController,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";

Chart.register(ScatterController, LinearScale, PointElement, Tooltip);

interface Role {
  title: string;
  company: string;
  period: string;
  x: number;
  y: number;
  color: string;
  current?: boolean;
}

const ROLES: Role[] = [
  { title: "Content Writer", company: "Xerosector", period: "Jul 2022 – Aug 2022", x: 2022.5, y: 1, color: "#64748b" },
  { title: "LLM Task Trainer", company: "Turing", period: "2024", x: 2024.0, y: 2, color: "#8b5cf6" },
  { title: "Data Science Intern", company: "ITSOLERA Pvt. Ltd.", period: "Jul 2025 – Sep 2025", x: 2025.6, y: 3, color: "#3b82f6" },
  { title: "CV & AI Intern", company: "Scoutrex", period: "Dec 2025 – Feb 2026", x: 2025.9, y: 4, color: "#22c55e", current: true },
];

const CareerScatterChart = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<Chart | null>(null);
  const [hover, setHover] = useState<{ role: Role; x: number; y: number } | null>(null);
  const [reveal, setReveal] = useState(0);

  // intersection observer for reveal animation
  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          ROLES.forEach((_, i) => {
            setTimeout(() => setReveal((r) => Math.max(r, i + 1)), i * 200);
          });
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const visibleRoles = ROLES.slice(0, reveal);

    chartRef.current = new Chart(ctx, {
      type: "scatter",
      data: {
        datasets: [
          {
            data: visibleRoles.map((r) => ({ x: r.x, y: r.y })),
            backgroundColor: visibleRoles.map((r) => r.color),
            borderColor: visibleRoles.map((r) => r.color),
            pointRadius: visibleRoles.map((r) => (r.current ? 11 : 8)),
            pointHoverRadius: visibleRoles.map((r) => (r.current ? 13 : 10)),
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false },
        },
        onHover: (event, elements) => {
          if (elements.length > 0 && event.native) {
            const idx = elements[0].index;
            const role = visibleRoles[idx];
            const rect = (event.native.target as HTMLElement).getBoundingClientRect();
            const ne = event.native as MouseEvent;
            setHover({
              role,
              x: ne.clientX - rect.left,
              y: ne.clientY - rect.top,
            });
          } else {
            setHover(null);
          }
        },
        scales: {
          x: {
            type: "linear",
            min: 2022,
            max: 2026.5,
            ticks: {
              stepSize: 1,
              color: "#475569",
              font: { family: "Space Mono, monospace", size: 11 },
              callback: (v) => `${v}`,
            },
            grid: { display: false },
            border: { color: "rgba(255,255,255,0.1)" },
          },
          y: {
            display: false,
            min: 0,
            max: 5,
            grid: { color: "rgba(255,255,255,0.04)" },
          },
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, [reveal]);

  return (
    <div className="rounded-xl p-5" style={{ background: "#0d1117", border: "1px solid #1e293b" }}>
      <div className="text-[11px] font-mono mb-2" style={{ color: "#334155" }}>
        // career timeline — 2022 → 2026
      </div>
      <div ref={containerRef} className="relative" style={{ height: 300 }}>
        <canvas ref={canvasRef} />

        {/* Pulsing ring around current role overlay (decorative legend) */}
        {hover && (
          <div
            className="absolute pointer-events-none rounded-md p-3 z-10 shadow-xl"
            style={{
              left: Math.min(hover.x + 12, 300),
              top: Math.max(hover.y - 70, 0),
              background: "#0a0a0f",
              border: `1px solid ${hover.role.color}`,
              minWidth: 180,
            }}
          >
            <div className="text-sm font-bold text-white">{hover.role.title}</div>
            <div className="text-xs text-slate-400 mt-0.5">{hover.role.company}</div>
            <div className="text-[11px] font-mono mt-1" style={{ color: "#3b82f6" }}>{hover.role.period}</div>
            {hover.role.current && (
              <div className="text-[10px] font-mono mt-1 text-green-500">● CURRENT</div>
            )}
          </div>
        )}
      </div>

      {/* Static legend below */}
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {ROLES.map((r) => (
          <span
            key={r.title}
            className="text-[10px] font-mono px-2 py-1 rounded flex items-center gap-1.5"
            style={{ background: "#0f172a", border: "1px solid #1e293b", color: "#cbd5e1" }}
          >
            <span className="w-2 h-2 rounded-full" style={{ background: r.color }} />
            {r.company} · {Math.floor(r.x)}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CareerScatterChart;
