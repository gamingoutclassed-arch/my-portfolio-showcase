import { useEffect, useRef } from "react";
import {
  Chart,
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from "chart.js";

Chart.register(RadarController, RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

const SKILLS = [
  { label: "Python", value: 95 },
  { label: "Computer Vision", value: 92 },
  { label: "Deep Learning", value: 88 },
  { label: "NLP", value: 85 },
  { label: "MLOps", value: 78 },
  { label: "Data Viz", value: 80 },
];

const SkillRadarChart = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    chartRef.current = new Chart(ctx, {
      type: "radar",
      data: {
        labels: SKILLS.map((s) => s.label),
        datasets: [
          {
            data: SKILLS.map((s) => s.value),
            backgroundColor: "rgba(59, 130, 246, 0.15)",
            borderColor: "#3b82f6",
            borderWidth: 2,
            pointBackgroundColor: "#3b82f6",
            pointBorderColor: "#3b82f6",
            pointRadius: 4,
            pointHoverRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          r: {
            min: 0,
            max: 100,
            ticks: { display: false, stepSize: 20 },
            grid: { color: "rgba(255,255,255,0.06)" },
            angleLines: { color: "rgba(255,255,255,0.05)" },
            pointLabels: {
              color: "#64748b",
              font: { family: "Space Mono, monospace", size: 11 },
            },
          },
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, []);

  return (
    <div className="rounded-xl p-5" style={{ background: "#0d1117", border: "1px solid #1e293b" }}>
      <div className="text-[11px] font-mono mb-2" style={{ color: "#334155" }}>
        // skill radar — self assessed
      </div>
      <div style={{ height: 300 }} className="relative">
        <canvas ref={canvasRef} />
      </div>
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {SKILLS.map((s) => (
          <span
            key={s.label}
            className="text-[10px] font-mono px-2 py-1 rounded"
            style={{ background: "#0f172a", border: "1px solid #1e293b", color: "#3b82f6" }}
          >
            {s.label} · {s.value}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillRadarChart;
