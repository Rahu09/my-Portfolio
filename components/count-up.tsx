"use client";

import { useEffect, useRef, useState } from "react";

// Splits a figure like "<55 ms", "26.3%" or "3.5M" into prefix, number and suffix.
function parse(figure: string) {
  const m = figure.match(/^(\D*?)(\d+(?:\.\d+)?)(.*)$/);
  if (!m) return null;
  const decimals = m[2].includes(".") ? m[2].split(".")[1].length : 0;
  return { prefix: m[1], value: parseFloat(m[2]), decimals, suffix: m[3] };
}

const DURATION = 1200;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

// Renders the final figure on the server (so it reads correctly without JavaScript),
// then counts up from zero the first time it scrolls into view.
export default function CountUp({ figure, className }: { figure: string; className?: string }) {
  const parts = parse(figure);
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !parts) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    setShown(0);
    let frame = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / DURATION);
          setShown(parts.value * easeOut(t));
          if (t < 1) frame = requestAnimationFrame(tick);
          else setShown(null);
        };
        frame = requestAnimationFrame(tick);
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [figure]);

  const text =
    parts && shown !== null ? `${parts.prefix}${shown.toFixed(parts.decimals)}${parts.suffix}` : figure;

  return (
    <dt ref={ref} className={className} aria-label={figure}>
      <span aria-hidden="true">{text}</span>
    </dt>
  );
}
