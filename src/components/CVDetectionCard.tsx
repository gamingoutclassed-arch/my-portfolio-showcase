import { useEffect, useRef, useState } from "react";
import { Download, Eye } from "lucide-react";
import profileImg from "@/assets/murtaza-profile.png";

const DETECTIONS = [
  { label: "PERSON", conf: 0.97, color: "#22c55e" },
  { label: "FACE", conf: 0.94, color: "#3b82f6" },
  { label: "GLASSES", conf: 0.91, color: "#f59e0b" },
  { label: "SMILE", conf: 0.88, color: "#ef4444" },
];

const ATTRS: { label: string; value: string; color?: string }[] = [
  { label: "identity", value: "Murtaza M.", color: "#3b82f6" },
  { label: "role", value: "Data Scientist", color: "#22c55e" },
  { label: "keypoints", value: "5 / 5" },
  { label: "expression", value: "Friendly", color: "#22c55e" },
  { label: "location", value: "Rawalpindi, PK" },
  { label: "status", value: "Open to hire ✓", color: "#22c55e" },
];

const LOG_LINES: { text: string; color?: string }[] = [
  { text: "[init] model loaded" },
  { text: "[img]  675×506 · RGB" },
  { text: "[pre]  normalising" },
  { text: "[det]  PERSON  0.97 ✓", color: "#22c55e" },
  { text: "[det]  FACE    0.94 ✓", color: "#3b82f6" },
  { text: "[det]  GLASSES 0.91", color: "#f59e0b" },
  { text: "[det]  SMILE   0.88", color: "#ef4444" },
  { text: "[kpt]  5 landmarks OK", color: "#f59e0b" },
  { text: "[nms]  iou=0.45 applied" },
  { text: "[done] 34.7ms · 28.4fps ✓", color: "#22c55e" },
];

// L-shaped corner ticks
const Corners = ({ color }: { color: string }) => {
  const t = 2;
  const len = 14;
  const common = { stroke: color, strokeWidth: t, fill: "none" };
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
      {/* Using percentage paths */}
      <g {...common}>
        {/* top-left */}
        <path d={`M0 ${len} L0 0 L${len} 0`} />
        {/* top-right */}
        <path d={`M${100 - len} 0 L100 0 L100 ${len}`} />
        {/* bottom-left */}
        <path d={`M0 ${100 - len} L0 100 L${len} 100`} />
        {/* bottom-right */}
        <path d={`M${100 - len} 100 L100 100 L100 ${100 - len}`} />
      </g>
    </svg>
  );
};

const Chip = ({
  text,
  bg,
  fg = "#0a0a0f",
  position,
}: {
  text: string;
  bg: string;
  fg?: string;
  position: string;
}) => (
  <span
    className={`absolute ${position} text-[10px] font-bold px-1.5 py-0.5 font-mono tracking-wide whitespace-nowrap`}
    style={{ background: bg, color: fg }}
  >
    {text}
  </span>
);

const CVDetectionCard = () => {
  const [logIdx, setLogIdx] = useState(0);
  const [visibleLogs, setVisibleLogs] = useState<typeof LOG_LINES>([]);
  const [animatedConf, setAnimatedConf] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // animate confidence bars on mount
  useEffect(() => {
    const t = setTimeout(() => setAnimatedConf(true), 200);
    return () => clearTimeout(t);
  }, []);

  // typewriter log
  useEffect(() => {
    let cancelled = false;
    let timeouts: number[] = [];

    const run = () => {
      setVisibleLogs([]);
      LOG_LINES.forEach((line, i) => {
        const id = window.setTimeout(() => {
          if (cancelled) return;
          setVisibleLogs((prev) => {
            const next = [...prev, line];
            return next.length > 8 ? next.slice(next.length - 8) : next;
          });
          if (i === LOG_LINES.length - 1) {
            const restart = window.setTimeout(() => {
              if (!cancelled) run();
            }, 2200);
            timeouts.push(restart);
          }
        }, i * 280);
        timeouts.push(id);
      });
    };
    run();
    return () => {
      cancelled = true;
      timeouts.forEach((t) => clearTimeout(t));
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="rounded-xl overflow-hidden"
      style={{ border: "1px solid #1e293b", background: "#0a0a0f" }}
    >
      <div className="grid md:grid-cols-[280px_1fr]">
        {/* LEFT COLUMN */}
        <div className="p-4 md:p-5 border-b md:border-b-0 md:border-r" style={{ borderColor: "#1e293b" }}>
          {/* Topbar */}
          <div className="flex items-center justify-between text-[10px] font-mono mb-2 gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="relative flex w-2 h-2 shrink-0">
                <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75" />
                <span className="relative w-2 h-2 rounded-full bg-green-500" />
              </span>
              <span className="text-slate-300 truncate">detect.py · murtaza_profile.png</span>
            </div>
            <span className="text-slate-500 truncate hidden sm:inline">YOLOv8n · portrait_det_v2.pt</span>
          </div>

          {/* Photo box */}
          <div
            className="relative mx-auto"
            style={{ width: 200, height: 265, background: "#050810" }}
          >
            {/* faint blue grid */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                opacity: 0.05,
                backgroundImage:
                  "linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)",
                backgroundSize: "16px 16px",
              }}
            />

            {/* photo */}
            <img
              src={profileImg}
              alt="Murtaza Majid"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />

            {/* scan line */}
            <div
              className="absolute left-0 right-0 h-[2px] pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #22c55e 50%, transparent)",
                boxShadow: "0 0 12px #22c55e",
                animation: "scan-y 3s linear infinite",
              }}
            />

            {/* PERSON box (whole) */}
            <div className="absolute inset-0 pointer-events-none" style={{ border: "2px solid #22c55e" }}>
              <Corners color="#22c55e" />
              <Chip text="PERSON · 0.97" bg="#22c55e" position="top-1 left-1" />
            </div>

            {/* FACE box */}
            <div
              className="absolute pointer-events-none"
              style={{
                top: "6%",
                bottom: "51%",
                left: "16%",
                right: "16%",
                border: "2px solid #3b82f6",
              }}
            >
              {/* crosshair */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4">
                <div className="absolute top-1/2 left-0 right-0 h-px bg-[#3b82f6]" />
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#3b82f6]" />
              </div>
              <Chip text="FACE · 0.94" bg="#3b82f6" fg="#0a0a0f" position="-bottom-4 left-0" />
            </div>

            {/* GLASSES box */}
            <div
              className="absolute pointer-events-none"
              style={{
                top: "22%",
                height: "10%",
                left: "20%",
                right: "20%",
                border: "2px solid #f59e0b",
              }}
            >
              <Chip text="GLASSES · 0.91" bg="#f59e0b" position="-top-4 right-0" />
            </div>

            {/* SMILE box dashed */}
            <div
              className="absolute pointer-events-none"
              style={{
                top: "38%",
                height: "9%",
                left: "30%",
                right: "30%",
                border: "2px dashed #ef4444",
              }}
            >
              <Chip text="SMILE · 0.88" bg="#ef4444" fg="#0a0a0f" position="-bottom-4 right-0" />
            </div>

            {/* Keypoints + skeleton */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* skeleton lines */}
              <g stroke="#f59e0b" strokeWidth="0.4" opacity="0.7">
                <line x1="32" y1="27" x2="50" y2="34" />
                <line x1="68" y1="27" x2="50" y2="34" />
                <line x1="50" y1="34" x2="42" y2="42" />
                <line x1="50" y1="34" x2="58" y2="42" />
              </g>
              {/* keypoints */}
              {[
                [32, 27],
                [68, 27],
                [50, 34],
                [42, 42],
                [58, 42],
              ].map(([cx, cy], i) => (
                <g key={i}>
                  <circle cx={cx} cy={cy} r="1.8" fill="#f59e0b" opacity="0.3" />
                  <circle cx={cx} cy={cy} r="0.9" fill="#f59e0b" />
                </g>
              ))}
            </svg>
          </div>

          {/* Statusbar */}
          <div className="flex items-center justify-between text-[10px] font-mono mt-2 gap-2">
            <span className="text-slate-500 truncate">frame: 0001 img: 675×506 iou: 0.45 conf: 0.25</span>
            <span className="text-green-500 whitespace-nowrap">● LIVE · 28.4 FPS</span>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col">
          {/* Panel 1: detections */}
          <div className="p-4 md:p-5" style={{ borderBottom: "1px solid #1e293b" }}>
            <div className="text-[11px] font-mono text-slate-500 mb-3">// detections · 4 objects</div>
            <div className="space-y-2.5">
              {DETECTIONS.map((d) => (
                <div key={d.label}>
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                      <span className="text-slate-200">{d.label}</span>
                    </div>
                    <span style={{ color: d.color }}>{d.conf.toFixed(2)}</span>
                  </div>
                  <div className="h-1 rounded-full overflow-hidden" style={{ background: "#1e293b" }}>
                    <div
                      className="h-full transition-all duration-[1200ms] ease-out"
                      style={{
                        width: animatedConf ? `${d.conf * 100}%` : "0%",
                        background: d.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Panel 2: attributes */}
          <div className="p-4 md:p-5" style={{ borderBottom: "1px solid #1e293b" }}>
            <div className="text-[11px] font-mono text-slate-500 mb-3">// attributes</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {ATTRS.map((a) => (
                <div
                  key={a.label}
                  className="rounded p-2"
                  style={{ background: "#0f172a", border: "1px solid #1e293b" }}
                >
                  <div className="text-[10px] font-mono text-slate-500">{a.label}</div>
                  <div className="text-xs font-mono font-bold mt-0.5" style={{ color: a.color || "#e2e8f0" }}>
                    {a.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Panel 3: bio */}
          <div className="p-4 md:p-5" style={{ borderBottom: "1px solid #1e293b" }}>
            <div className="text-[11px] font-mono text-slate-500 mb-3">// bio</div>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              A dedicated and innovative data scientist with a strong foundation in data analysis,
              machine learning, and visualization. I combine technical expertise with a flair for design.
            </p>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px] font-mono mb-4">
              <div><span className="text-slate-500">name:</span> <span className="text-slate-200">Murtaza Majid</span></div>
              <div><span className="text-slate-500">email:</span> <span className="text-slate-200">Murtazaworks0@gmail.com</span></div>
              <div><span className="text-slate-500">edu:</span> <span className="text-slate-200">BS Data Science</span></div>
              <div><span className="text-slate-500">loc:</span> <span className="text-slate-200">Rawalpindi, PK</span></div>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href="/Murtaza_Majid_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded text-xs font-medium text-white transition-opacity hover:opacity-90"
                style={{ background: "#3b82f6" }}
              >
                <Eye size={14} /> View Resume
              </a>
              <a
                href="/Murtaza_Majid_Resume.pdf"
                download="Murtaza_Majid_Resume.pdf"
                className="flex items-center gap-2 px-4 py-2 rounded text-xs font-medium transition-colors hover:border-[#3b82f6] hover:text-[#3b82f6]"
                style={{ border: "1px solid #1e293b", color: "#e2e8f0" }}
              >
                <Download size={14} /> Download PDF
              </a>
            </div>
          </div>

          {/* Panel 4: inference log */}
          <div className="p-4 md:p-5">
            <div className="text-[11px] font-mono text-slate-500 mb-3">// inference log</div>
            <div
              className="rounded p-3 font-mono text-[11px] leading-5 min-h-[180px]"
              style={{ background: "#050810", border: "1px solid #1e293b" }}
            >
              {visibleLogs.map((l, i) => (
                <div key={`${i}-${l.text}`} style={{ color: l.color || "#94a3b8" }}>
                  <span className="text-slate-600">$</span> {l.text}
                </div>
              ))}
              <span className="inline-block w-2 h-3 bg-[#3b82f6] animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVDetectionCard;
