import { useEffect, useRef, useState } from "react";

interface Props {
  end: number;
  suffix?: string;
  duration?: number;
  label: string;
}

const StatCounter = ({ end, suffix = "", duration = 1600, label }: Props) => {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const step = (now: number) => {
              const t = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - t, 3);
              setValue(Math.round(end * eased));
              if (t < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          }
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-heading font-bold text-primary">
        {value}
        {suffix}
      </div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
        {label}
      </div>
    </div>
  );
};

export default StatCounter;
