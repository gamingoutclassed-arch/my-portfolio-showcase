import { useEffect, useRef } from "react";

/**
 * Bold animated neural-network canvas background.
 * Nodes drift slowly; lines connect when within threshold; periodic pulses travel along edges.
 * Uses HSL primary token color so it stays on-theme.
 */
const NeuralNetworkBg = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // read primary color from CSS var
    const styles = getComputedStyle(document.documentElement);
    const primary = styles.getPropertyValue("--primary").trim() || "217 91% 60%";

    type Node = { x: number; y: number; vx: number; vy: number; r: number };
    let nodes: Node[] = [];
    type Pulse = { a: number; b: number; t: number; speed: number };
    let pulses: Pulse[] = [];

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const NODE_COUNT = isMobile ? 38 : 75;
    const LINK_DIST = isMobile ? 130 : 160;

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = () => {
      resize();
      nodes = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 1.2,
      }));
      pulses = [];
    };

    const spawnPulse = () => {
      if (nodes.length < 2) return;
      const a = Math.floor(Math.random() * nodes.length);
      let b = Math.floor(Math.random() * nodes.length);
      if (b === a) b = (b + 1) % nodes.length;
      pulses.push({ a, b, t: 0, speed: 0.012 + Math.random() * 0.018 });
      if (pulses.length > 18) pulses.shift();
    };

    const tick = () => {
      ctx.clearRect(0, 0, width, height);

      // move nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }

      // draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < LINK_DIST) {
            const alpha = (1 - d / LINK_DIST) * 0.45;
            ctx.strokeStyle = `hsla(${primary} / ${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // draw nodes
      for (const n of nodes) {
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 4);
        grad.addColorStop(0, `hsla(${primary} / 0.95)`);
        grad.addColorStop(1, `hsla(${primary} / 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `hsla(${primary} / 1)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // animate pulses traveling along edges
      pulses = pulses.filter((p) => p.t < 1);
      for (const p of pulses) {
        const a = nodes[p.a];
        const b = nodes[p.b];
        if (!a || !b) continue;
        p.t += p.speed;
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        ctx.fillStyle = `hsla(${primary} / 0.95)`;
        ctx.shadowColor = `hsla(${primary} / 1)`;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(x, y, 2.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      raf = requestAnimationFrame(tick);
    };

    init();
    tick();
    const pulseInterval = setInterval(spawnPulse, 400);
    window.addEventListener("resize", init);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(pulseInterval);
      window.removeEventListener("resize", init);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};

export default NeuralNetworkBg;
