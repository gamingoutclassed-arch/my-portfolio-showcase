import { motion } from "framer-motion";

interface Skill {
  label: string;
  value: number; // 0-100
}

const SKILLS: Skill[] = [
  { label: "Python", value: 95 },
  { label: "Computer Vision", value: 88 },
  { label: "NLP", value: 82 },
  { label: "Deep Learning", value: 86 },
  { label: "MLOps", value: 70 },
  { label: "Data Viz", value: 80 },
];

const SIZE = 360;
const CENTER = SIZE / 2;
const RADIUS = 130;

const point = (i: number, total: number, r: number) => {
  const angle = (Math.PI * 2 * i) / total - Math.PI / 2;
  return [CENTER + Math.cos(angle) * r, CENTER + Math.sin(angle) * r] as const;
};

const SkillsRadar = () => {
  const total = SKILLS.length;

  // grid rings
  const rings = [0.25, 0.5, 0.75, 1].map((f) => {
    const pts = SKILLS.map((_, i) => point(i, total, RADIUS * f).join(",")).join(" ");
    return pts;
  });

  // axes
  const axes = SKILLS.map((_, i) => point(i, total, RADIUS));

  // data polygon
  const dataPts = SKILLS.map((s, i) => point(i, total, RADIUS * (s.value / 100)).join(",")).join(" ");

  return (
    <div className="flex justify-center">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full max-w-[420px] h-auto">
        {/* grid rings */}
        {rings.map((pts, i) => (
          <polygon
            key={i}
            points={pts}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth={1}
          />
        ))}
        {/* axes */}
        {axes.map(([x, y], i) => (
          <line
            key={i}
            x1={CENTER}
            y1={CENTER}
            x2={x}
            y2={y}
            stroke="hsl(var(--border))"
            strokeWidth={1}
          />
        ))}
        {/* data polygon */}
        <motion.polygon
          points={dataPts}
          fill="hsl(var(--primary) / 0.25)"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
        />
        {/* data points */}
        {SKILLS.map((s, i) => {
          const [x, y] = point(i, total, RADIUS * (s.value / 100));
          return <circle key={i} cx={x} cy={y} r={4} fill="hsl(var(--primary))" />;
        })}
        {/* labels */}
        {SKILLS.map((s, i) => {
          const [x, y] = point(i, total, RADIUS + 26);
          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-foreground"
              style={{ fontSize: 12, fontWeight: 600 }}
            >
              {s.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

export default SkillsRadar;
