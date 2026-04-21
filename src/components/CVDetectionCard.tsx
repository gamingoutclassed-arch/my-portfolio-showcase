import { useEffect, useRef, useState } from "react";
import { Download, Eye } from "lucide-react";
import profileImg from "@/assets/murtaza-profile.png";

type DetKey = "PERSON" | "FACE" | "GLASSES" | "SMILE";

interface Detection {
  key: DetKey;
  label: string;
  conf: number;
  color: string;
  // box coords in % of the photo container
  top: number;
  left: number;
  width: number;
  height: number;
  z: number;
  borderWidth: number;
  glow?: string;
  chipPos: string; // tailwind classes
  chipFg?: string;
  // appearance order in ms
  appearAt: number;
}

// Coordinates calibrated against the profile photo rendered with object-cover object-top
// inside a 200x265 box. Mirrors the reference image the user provided.
const DETECTIONS: Detection[] = [
  {
    key: "PERSON",
    label: "PERSON",
    conf: 0.97,
    color: "#22c55e",
    top: 0,
    left: 0,
    width: 100,
    height: 100,
    z: 1,
    borderWidth: 2,
    chipPos: "top-1 left-1",
    appearAt: 200,
  },
  {
    key: "FACE",
    label: "FACE",
    conf: 0.94,
    color: "#3b82f6",
    // calibrated from manual annotation
    top: 7.5,
    left: 29.9,
    width: 45.2,
    height: 48.4,
    z: 2,
    borderWidth: 2,
    chipPos: "-top-4 left-0",
    chipFg: "#0a0a0f",
    appearAt: 600,
  },
  {
    key: "GLASSES",
    label: "GLASSES",
    conf: 0.91,
    color: "#f59e0b",
    top: 27.0,
    left: 37.0,
    width: 32.9,
    height: 10.0,
    z: 3,
    borderWidth: 2,
    chipPos: "-top-4 right-0",
    appearAt: 1000,
  },
  {
    key: "SMILE",
    label: "SMILE",
    conf: 0.88,
    color: "#ff2d55",
    top: 40.4,
    left: 40.6,
    width: 23.3,
    height: 5.8,
    z: 10,
    borderWidth: 3,
    glow: "0 0 10px rgba(255,45,85,0.9)",
    chipPos: "-bottom-4 right-0",
    chipFg: "#ffffff",
    appearAt: 1400,
  },
];

const ATTRS: { label: string; value: string; color?: string }[] = [
  { label: "identity", value: "Murtaza M.", color: "#3b82f6" },
  { label: "role", value: "Data Scientist", color: "#22c55e" },
  { label: "age", value: "~24" },
  { label: "expression", value: "Friendly", color: "#22c55e" },
  { label: "location", value: "Rawalpindi, PK" },
  { label: "status", value: "Open to hire ✓", color: "#22c55e" },
];

const LOG_LINES: { text: string; color?: string }[] = [
  { text: "[init] loading weights portrait_det_v2.pt" },
  { text: "[init] cuda:0 ready · 11.4GB free", color: "#22c55e" },
  { text: "[cap]  frame 0001 · 675×506 RGB" },
  { text: "[pre]  resize→640 · normalise [0,1]" },
  { text: "[fwd]  forward pass · 12.3ms" },
  { text: "[det]  PERSON  0.97  bbox(0,0,675,506)", color: "#22c55e" },
  { text: "[det]  FACE    0.94  bbox(243,30,202,192)", color: "#3b82f6" },
  { text: "[det]  GLASSES 0.91  bbox(263,90,162,35)", color: "#f59e0b" },
  { text: "[det]  SMILE   0.88  bbox(297,156,88,23)", color: "#ff2d55" },
  { text: "[nms]  iou=0.45 · 4 kept" },
  { text: "[post] 34.7ms · 28.4 fps ✓", color: "#22c55e" },
];

// Bracket-style corner ticks (replaces full-rect L corners look)
const Corners = ({ color, size = 12 }: { color: string; size?: number }) => {
  const t = 2;
  const common = { stroke: color, strokeWidth: t, fill: "none", strokeLinecap: "square" as const };
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
      <g {...common}>
        <path d={`M0 ${size} L0 0 L${size} 0`} />
        <path d={`M${100 - size} 0 L100 0 L100 ${size}`} />
        <path d={`M0 ${100 - size} L0 100 L${size} 100`} />
        <path d={`M${100 - size} 100 L100 100 L100 ${100 - size}`} />
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
    className={`absolute ${position} text-[9px] font-bold px-1.5 py-[1px] font-mono tracking-wide whitespace-nowrap rounded-sm`}
    style={{ background: bg, color: fg, lineHeight: 1.4 }}
  >
    {text}
  </span>
);

const CVDetectionCard = () => {
  const [visibleLogs, setVisibleLogs] = useState<typeof LOG_LINES>([]);
  const [animatedConf, setAnimatedConf] = useState<Record<DetKey, number>>({
    PERSON: 0,
    FACE: 0,
    GLASSES: 0,
    SMILE: 0,
  });
  const [shownBoxes, setShownBoxes] = useState<Record<DetKey, boolean>>({
    PERSON: false,
    FACE: false,
    GLASSES: false,
    SMILE: false,
  });
  const [frame, setFrame] = useState(1);
  const [fps, setFps] = useState(28.4);
  const [latency, setLatency] = useState(34.7);
  const cardRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  // ===== Calibration mode =====
  type BoxRect = { top: number; left: number; width: number; height: number };
  const [calibrate, setCalibrate] = useState(false);
  const [rects, setRects] = useState<Record<DetKey, BoxRect>>(() => {
    const init = {} as Record<DetKey, BoxRect>;
    DETECTIONS.forEach((d) => {
      init[d.key] = { top: d.top, left: d.left, width: d.width, height: d.height };
    });
    return init;
  });

  const onPointerDown = (
    e: React.PointerEvent,
    key: DetKey,
    mode: "move" | "nw" | "ne" | "sw" | "se"
  ) => {
    if (!calibrate || !photoRef.current) return;
    e.stopPropagation();
    e.preventDefault();
    const photoRect = photoRef.current.getBoundingClientRect();
    const startX = e.clientX;
    const startY = e.clientY;
    const start = { ...rects[key] };
    try { (e.target as Element).setPointerCapture?.(e.pointerId); } catch {}

    const onMove = (ev: PointerEvent) => {
      const dxPct = ((ev.clientX - startX) / photoRect.width) * 100;
      const dyPct = ((ev.clientY - startY) / photoRect.height) * 100;
      setRects((r) => {
        const next = { ...start };
        if (mode === "move") {
          next.left = Math.max(0, Math.min(100 - start.width, start.left + dxPct));
          next.top = Math.max(0, Math.min(100 - start.height, start.top + dyPct));
        } else if (mode === "se") {
          next.width = Math.max(2, Math.min(100 - start.left, start.width + dxPct));
          next.height = Math.max(2, Math.min(100 - start.top, start.height + dyPct));
        } else if (mode === "nw") {
          const w = Math.max(2, start.width - dxPct);
          const h = Math.max(2, start.height - dyPct);
          next.left = start.left + (start.width - w);
          next.top = start.top + (start.height - h);
          next.width = w;
          next.height = h;
        } else if (mode === "ne") {
          next.width = Math.max(2, start.width + dxPct);
          const h = Math.max(2, start.height - dyPct);
          next.top = start.top + (start.height - h);
          next.height = h;
        } else if (mode === "sw") {
          const w = Math.max(2, start.width - dxPct);
          next.left = start.left + (start.width - w);
          next.width = w;
          next.height = Math.max(2, start.height + dyPct);
        }
        return { ...r, [key]: next };
      });
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  const copyCoords = () => {
    const out = (Object.keys(rects) as DetKey[])
      .map((k) => {
        const r = rects[k];
        return `${k}: top: ${r.top.toFixed(1)}, left: ${r.left.toFixed(1)}, width: ${r.width.toFixed(1)}, height: ${r.height.toFixed(1)},`;
      })
      .join("\n");
    navigator.clipboard?.writeText(out).catch(() => {});
    console.log("[calibration coords]\n" + out);
    alert("Coords copied to clipboard & logged to console:\n\n" + out);
  };

  // Reveal boxes sequentially + animate confidence per box
  useEffect(() => {
    if (calibrate) {
      setShownBoxes({ PERSON: true, FACE: true, GLASSES: true, SMILE: true });
      const full = {} as Record<DetKey, number>;
      DETECTIONS.forEach((d) => (full[d.key] = d.conf));
      setAnimatedConf(full);
      return;
    }
    const timeouts: number[] = [];
    DETECTIONS.forEach((d) => {
      const t1 = window.setTimeout(() => {
        setShownBoxes((s) => ({ ...s, [d.key]: true }));
        const start = performance.now();
        const dur = 700;
        const tick = () => {
          const p = Math.min(1, (performance.now() - start) / dur);
          setAnimatedConf((c) => ({ ...c, [d.key]: d.conf * p }));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }, d.appearAt);
      timeouts.push(t1);
    });
    return () => timeouts.forEach(clearTimeout);
  }, [calibrate]);

  // Live frame counter + jittered fps/latency for "real-time" feel
  useEffect(() => {
    const id = window.setInterval(() => {
      setFrame((f) => f + 1);
      setFps(28 + Math.random() * 2);
      setLatency(32 + Math.random() * 6);
    }, 120);
    return () => clearInterval(id);
  }, []);

  // typewriter inference log
  useEffect(() => {
    let cancelled = false;
    const timeouts: number[] = [];

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
        }, i * 260);
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
                <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75" />
                <span className="relative w-2 h-2 rounded-full bg-red-500" />
              </span>
              <span className="text-slate-300 truncate">REC · webcam_0.mp4</span>
            </div>
            <span className="text-slate-500 truncate hidden sm:inline">YOLOv8n</span>
          </div>

          {/* Photo box */}
          <div
            ref={photoRef}
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
              draggable={false}
            />

            {/* scan line */}
            {!calibrate && (
              <div
                className="absolute left-0 right-0 h-[2px] pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #22c55e 50%, transparent)",
                  boxShadow: "0 0 12px #22c55e",
                  animation: "scan-y 3s linear infinite",
                  zIndex: 4,
                }}
              />
            )}

            {/* crosshair reticle (subtle) */}
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 5 }}>
              <div className="absolute top-2 left-2 text-[8px] font-mono text-green-500/70">+</div>
              <div className="absolute top-2 right-2 text-[8px] font-mono text-green-500/70">+</div>
              <div className="absolute bottom-2 left-2 text-[8px] font-mono text-green-500/70">+</div>
              <div className="absolute bottom-2 right-2 text-[8px] font-mono text-green-500/70">+</div>
            </div>

            {/* Detection boxes */}
            {DETECTIONS.map((d) => {
              if (!shownBoxes[d.key]) return null;
              const isPerson = d.key === "PERSON";
              const r = rects[d.key];
              const handleSize = 10;
              return (
                <div
                  key={d.key}
                  className={`absolute ${calibrate ? "cursor-move" : "pointer-events-none"} animate-in fade-in duration-300`}
                  onPointerDown={(e) => onPointerDown(e, d.key, "move")}
                  style={{
                    top: `${r.top}%`,
                    left: `${r.left}%`,
                    width: `${r.width}%`,
                    height: `${r.height}%`,
                    border: `${d.borderWidth}px solid ${d.color}`,
                    borderRadius: "2px",
                    boxShadow: d.glow,
                    zIndex: d.z + (calibrate ? 20 : 0),
                    background: calibrate ? `${d.color}22` : "transparent",
                    touchAction: calibrate ? "none" : "auto",
                  }}
                >
                  {isPerson && !calibrate && <Corners color={d.color} />}
                  <Chip
                    text={`${d.label} · ${animatedConf[d.key].toFixed(2)}`}
                    bg={d.color}
                    fg={d.chipFg}
                    position={d.chipPos}
                  />
                  {calibrate && (["nw", "ne", "sw", "se"] as const).map((corner) => {
                    const pos: React.CSSProperties = {
                      position: "absolute",
                      width: handleSize,
                      height: handleSize,
                      background: d.color,
                      border: "1px solid #fff",
                      borderRadius: 2,
                      cursor: `${corner}-resize`,
                      touchAction: "none",
                      zIndex: 50,
                    };
                    if (corner === "nw") { pos.top = -handleSize / 2; pos.left = -handleSize / 2; }
                    if (corner === "ne") { pos.top = -handleSize / 2; pos.right = -handleSize / 2; }
                    if (corner === "sw") { pos.bottom = -handleSize / 2; pos.left = -handleSize / 2; }
                    if (corner === "se") { pos.bottom = -handleSize / 2; pos.right = -handleSize / 2; }
                    return (
                      <div
                        key={corner}
                        style={pos}
                        onPointerDown={(e) => onPointerDown(e, d.key, corner)}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>

          {/* Statusbar */}
          <div className="flex items-center justify-between text-[10px] font-mono mt-2 gap-2">
            <span className="text-slate-500 truncate">
              f:{String(frame).padStart(4, "0")} · {latency.toFixed(1)}ms
            </span>
            <span className="text-green-500 whitespace-nowrap">● LIVE · {fps.toFixed(1)} FPS</span>
          </div>

          {/* Calibration controls */}
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={() => setCalibrate((c) => !c)}
              className="text-[10px] font-mono px-2 py-1 rounded"
              style={{
                background: calibrate ? "#3b82f6" : "#0f172a",
                color: calibrate ? "#fff" : "#94a3b8",
                border: "1px solid #1e293b",
              }}
            >
              {calibrate ? "✓ CALIBRATING" : "⚙ CALIBRATE"}
            </button>
            {calibrate && (
              <button
                onClick={copyCoords}
                className="text-[10px] font-mono px-2 py-1 rounded"
                style={{ background: "#22c55e", color: "#0a0a0f", border: "1px solid #1e293b" }}
              >
                COPY COORDS
              </button>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col">
          {/* Panel 1: detections */}
          <div className="p-4 md:p-5" style={{ borderBottom: "1px solid #1e293b" }}>
            <div className="text-[11px] font-mono text-slate-500 mb-3">
              // detections · {Object.values(shownBoxes).filter(Boolean).length}/4 objects
            </div>
            <div className="space-y-2.5">
              {DETECTIONS.map((d) => (
                <div key={d.label} style={{ opacity: shownBoxes[d.key] ? 1 : 0.3 }} className="transition-opacity">
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{
                          background: d.color,
                          boxShadow: shownBoxes[d.key] ? `0 0 6px ${d.color}` : "none",
                        }}
                      />
                      <span className="text-slate-200">{d.label}</span>
                    </div>
                    <span style={{ color: d.color }}>{animatedConf[d.key].toFixed(2)}</span>
                  </div>
                  <div className="h-1 rounded-full overflow-hidden" style={{ background: "#1e293b" }}>
                    <div
                      className="h-full"
                      style={{
                        width: `${animatedConf[d.key] * 100}%`,
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
