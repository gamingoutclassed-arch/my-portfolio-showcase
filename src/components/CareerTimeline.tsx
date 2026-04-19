import { motion } from "framer-motion";
import { useState } from "react";

interface Role {
  title: string;
  company: string;
  location: string;
  startYear: number; // decimal e.g. 2025.92 for Dec 2025
  period: string;
  points: string[];
}

interface Props {
  roles: Role[];
  minYear?: number;
  maxYear?: number;
}

const CareerTimeline = ({ roles, minYear = 2022, maxYear = 2026 }: Props) => {
  const [active, setActive] = useState(0);
  const range = maxYear - minYear;
  const years = Array.from({ length: range + 1 }, (_, i) => minYear + i);

  return (
    <div className="glass-card p-6 md:p-8">
      {/* Plot area */}
      <div className="relative h-44 md:h-52">
        {/* Y axis label */}
        <div className="absolute left-0 top-0 text-xs uppercase tracking-wider text-muted-foreground">
          Career
        </div>

        {/* Horizontal axis line */}
        <div className="absolute left-0 right-0 bottom-8 h-px bg-border" />

        {/* Year ticks */}
        <div className="absolute left-0 right-0 bottom-0 flex justify-between text-xs text-muted-foreground">
          {years.map((y) => (
            <div key={y} className="flex flex-col items-center gap-1">
              <div className="w-px h-2 bg-border" />
              <span>{y}</span>
            </div>
          ))}
        </div>

        {/* Connecting line between points */}
        <svg className="absolute inset-0 w-full h-[calc(100%-2rem)] pointer-events-none" preserveAspectRatio="none">
          <polyline
            points={roles
              .slice()
              .sort((a, b) => a.startYear - b.startYear)
              .map((r, i, arr) => {
                const x = ((r.startYear - minYear) / range) * 100;
                const y = 30 + ((i % arr.length) / Math.max(arr.length - 1, 1)) * 40;
                return `${x}%,${y}%`;
              })
              .join(" ")}
            fill="none"
            stroke="hsl(var(--primary) / 0.4)"
            strokeWidth={2}
            strokeDasharray="4 4"
          />
        </svg>

        {/* Points */}
        {roles.map((r, i) => {
          const x = ((r.startYear - minYear) / range) * 100;
          const sorted = [...roles].sort((a, b) => a.startYear - b.startYear);
          const idx = sorted.findIndex((s) => s === r);
          const y = 30 + (idx / Math.max(sorted.length - 1, 1)) * 40;
          const isActive = active === i;
          return (
            <motion.button
              key={i}
              onClick={() => setActive(i)}
              className="absolute -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: `${x}%`, top: `${y}%` }}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
              aria-label={`${r.title} at ${r.company}`}
            >
              <span
                className={`block rounded-full transition-all ${
                  isActive
                    ? "w-5 h-5 bg-primary ring-4 ring-primary/30"
                    : "w-3.5 h-3.5 bg-primary/70 group-hover:bg-primary"
                }`}
                style={isActive ? { boxShadow: "var(--shadow-glow)" } : undefined}
              />
              <span
                className={`absolute left-1/2 -translate-x-1/2 -top-7 whitespace-nowrap text-[10px] font-medium px-2 py-0.5 rounded-full border transition-opacity ${
                  isActive
                    ? "opacity-100 border-primary text-primary bg-primary/10"
                    : "opacity-0 group-hover:opacity-100 border-border text-muted-foreground bg-card"
                }`}
              >
                {r.company}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Detail panel */}
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-8 pt-6 border-t border-border"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-1">
          <h3 className="font-heading font-semibold text-lg text-foreground">
            {roles[active].title}
          </h3>
          <span className="text-primary text-sm">{roles[active].period}</span>
        </div>
        <div className="text-sm text-muted-foreground mb-3">
          {roles[active].company} · {roles[active].location}
        </div>
        <ul className="space-y-2">
          {roles[active].points.map((p, j) => (
            <li key={j} className="text-muted-foreground text-sm flex gap-2">
              <span className="text-primary mt-1.5 shrink-0">•</span>
              {p}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default CareerTimeline;
