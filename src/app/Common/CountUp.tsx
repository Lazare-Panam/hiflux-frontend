"use client";

import { useLayoutEffect, useRef } from "react";

// Every number in the string ("150,000 psi", "−252°C to 649°C") counts up
// from 0, keeping the surrounding text and thousands separators.
function format(value: string, progress: number) {
  return value.replace(/\d[\d,]*/g, (m) => {
    const n = Number(m.replace(/,/g, ""));
    const cur = Math.round(n * progress);
    return m.includes(",") ? cur.toLocaleString("en-GB") : String(cur);
  });
}

/**
 * Animated stat figure. The server renders the final value (so crawlers and
 * no-JS visitors see real numbers); on the client it resets to 0 before paint
 * and counts up the first time it scrolls into view. Text is written straight
 * to the DOM each frame rather than through React state, so the animation
 * doesn't re-render the component 60 times a second.
 */
export default function CountUp({ value, duration = 1800 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.textContent = format(value, 0);
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          el.textContent = format(value, 1 - Math.pow(1 - t, 3)); // ease-out cubic
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.textContent = value;
    };
  }, [value, duration]);

  return <span ref={ref}>{value}</span>;
}
