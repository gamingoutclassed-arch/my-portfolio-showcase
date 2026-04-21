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
  stack: string;
  bullets: string[];
}

const ROLES: Role[] = [
  {
    title: "Content Writer",
    company: "Xerosector Technologies",
    period: "Jul 2022 – Aug 2022",
    x: 2022.6,
    y: 1,
    color: "#64748b",
    stack: "WordPress · SEO · Keyword Research",
    bullets: [
      "Created 50+ SEO-optimized product descriptions",
      "Boosted organic traffic by 15% via keyword optimization",
      "Aligned copy with brand strategy across pages",
    ],
  },
  {
    title: "LLM Task Trainer",
    company: "Turing",
    period: "2025",
    x: 2025.2,
    y: 2,
    color: "#8b5cf6",
    stack: "Prompt Engineering · RLHF · Tool Use",
    bullets: [
      "Engineered system/user prompts and multi-step task chains",
      "Integrated external API tools (Search, News, Yelp) with temporal logic",
      "Mitigated hallucinations via rigorous RLHF evaluation",
    ],
  },
  {
    title: "Data Science Intern",
    company: "ITSOLERA Pvt. Ltd.",
    period: "Jul 2025 – Sep 2025",
    x: 2025.6,
    y: 3,
    color: "#3b82f6",
    stack: "Python · Pandas · Scikit-Learn · Streamlit · Plotly",
    bullets: [
      "Improved time-series forecast accuracy by 15% (LSTM, ARIMA, XGBoost, RF)",
      "Built interactive Streamlit dashboards for KPIs & predictions",
      "Developed end-to-end ML pipelines on real-world structured datasets",
    ],
  },
  {
    title: "Computer Vision & AI Intern",
    company: "Scoutrex",
    period: "Dec 2025 – Feb 2026",
    x: 2025.95,
    y: 4,
    color: "#22c55e",
    stack: "PyTorch · OpenCV · MediaPipe · Roboflow",
    bullets: [
      "Optimized PyTorch models for cricket video analysis under motion blur",
      "Implemented MediaPipe pose extraction for biomechanical analysis",
      "Built action phase segmentation pipeline for bowling stages",
    ],
  },
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
              left: Math.min(hover.x + 12, 280),
              top: Math.max(hover.y - 90, 0),
              background: "#0a0a0f",
              border: `1px solid ${hover.role.color}`,
              minWidth: 220,
              maxWidth: 280,
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

      {/* Role detail cards — always visible, with descriptions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">
        {ROLES.map((r) => (
          <div
            key={r.title}
            className="rounded-lg p-3"
            style={{
              background: "#0f172a",
              border: `1px solid ${r.current ? r.color : "#1e293b"}`,
            }}
          >
            <div className="flex items-center justify-between gap-2 mb-1">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: r.color, boxShadow: r.current ? `0 0 8px ${r.color}` : "none" }} />
                <div className="text-sm font-semibold text-white truncate">{r.title}</div>
              </div>
              {r.current && (
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded" style={{ background: "rgba(34,197,94,0.15)", color: "#22c55e" }}>● CURRENT</span>
              )}
            </div>
            <div className="text-xs text-slate-400">{r.company}</div>
            <div className="text-[10px] font-mono mt-0.5" style={{ color: "#3b82f6" }}>{r.period}</div>
            <div className="text-[10px] font-mono mt-1.5" style={{ color: "#64748b" }}>{r.stack}</div>
            <ul className="mt-2 space-y-1">
              {r.bullets.map((b, i) => (
                <li key={i} className="text-[11px] text-slate-300 leading-snug flex gap-1.5">
                  <span style={{ color: r.color }}>▸</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareerScatterChart;
