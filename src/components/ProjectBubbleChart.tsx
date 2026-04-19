import { motion } from "framer-motion";
import { useMemo } from "react";

export interface BubbleProject {
  title: string;
  category: string;
  complexity: number; // 1-10
  github?: string;
  demo?: string;
}

interface Props {
  projects: BubbleProject[];
  categories: string[];
  active: string;
}

// Map a category to an HSL hue offset from primary
const CATEGORY_HUES: Record<string, number> = {
  "Deep Learning": 217,
  "NLP": 280,
  "Machine Learning": 160,
  "Data Analysis": 30,
};

const W = 900;
const H = 500;

const ProjectBubbleChart = ({ projects, categories, active }: Props) => {
  const positioned = useMemo(() => {
    // Layout: x by category index, y jittered; size by complexity
    const cats = categories.filter((c) => c !== "All");
    const colW = W / cats.length;

    // group by category to spread vertically
    const groups: Record<string, BubbleProject[]> = {};
    for (const p of projects) {
      (groups[p.category] ||= []).push(p);
    }

    const placed: Array<BubbleProject & { x: number; y: number; r: number; hue: number }> = [];
    for (const cat of cats) {
      const list = groups[cat] || [];
      const colIdx = cats.indexOf(cat);
      const cx = colW * colIdx + colW / 2;
      list.forEach((p, i) => {
        const yStep = (H - 100) / Math.max(list.length, 1);
        const y = 60 + yStep * i + yStep / 2;
        const r = 22 + p.complexity * 4;
        const jitter = (i % 2 === 0 ? -1 : 1) * Math.min(colW * 0.18, 30);
        placed.push({
          ...p,
          x: cx + jitter,
          y,
          r,
          hue: CATEGORY_HUES[cat] ?? 217,
        });
      });
    }
    return placed;
  }, [projects, categories]);

  const cats = categories.filter((c) => c !== "All");

  return (
    <div className="glass-card p-4 md:p-6 overflow-x-auto">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto min-w-[640px]">
        {/* Category column labels */}
        {cats.map((c, i) => {
          const cx = (W / cats.length) * i + W / cats.length / 2;
          const hue = CATEGORY_HUES[c] ?? 217;
          return (
            <g key={c}>
              <line
                x1={cx}
                y1={40}
                x2={cx}
                y2={H - 30}
                stroke="hsl(var(--border))"
                strokeDasharray="3 6"
              />
              <text
                x={cx}
                y={28}
                textAnchor="middle"
                style={{ fontSize: 13, fontWeight: 700 }}
                fill={`hsl(${hue} 80% 65%)`}
              >
                {c}
              </text>
            </g>
          );
        })}

        {/* Bubbles */}
        {positioned.map((p, i) => {
          const dim = active !== "All" && p.category !== active;
          return (
            <motion.g
              key={p.title}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: dim ? 0.18 : 1, scale: 1 }}
              transition={{ delay: i * 0.05, type: "spring", stiffness: 140, damping: 14 }}
            >
              <a
                href={p.demo || p.github || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={p.r}
                  fill={`hsl(${p.hue} 80% 60% / 0.22)`}
                  stroke={`hsl(${p.hue} 85% 65%)`}
                  strokeWidth={2}
                  className="cursor-pointer transition-all hover:fill-[hsl(var(--primary)/0.4)]"
                />
                <text
                  x={p.x}
                  y={p.y + 4}
                  textAnchor="middle"
                  className="pointer-events-none fill-foreground"
                  style={{ fontSize: 10, fontWeight: 600 }}
                >
                  {p.title.length > 18 ? p.title.slice(0, 16) + "…" : p.title}
                </text>
              </a>
            </motion.g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-4 text-xs text-muted-foreground">
        <span>Bubble size = complexity</span>
        <span>•</span>
        <span>Click a bubble to open project</span>
      </div>
    </div>
  );
};

export default ProjectBubbleChart;
