"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import GlobalStyles from "@mui/material/GlobalStyles";

const EASE = "cubic-bezier(0.2, 0.7, 0.2, 1)";

// Hidden states only apply once JS has added `reveal-ready` to <html>, so
// content is never invisible for crawlers, no-JS visitors or reduced motion.
const styles = {
  "html.reveal-ready .reveal": {
    opacity: 0,
    transform: "translateY(28px)",
    transition: `opacity 0.8s ${EASE}, transform 0.8s ${EASE}`,
  },
  "html.reveal-ready .reveal.is-visible": { opacity: 1, transform: "none" },
  // Cards/tiles inside a revealed section arrive one after another.
  "html.reveal-ready .reveal .MuiGrid-container > *": {
    opacity: 0,
    transform: "translateY(20px)",
    transition: `opacity 0.7s ${EASE}, transform 0.7s ${EASE}`,
  },
  "html.reveal-ready .reveal.is-visible .MuiGrid-container > *": { opacity: 1, transform: "none" },
  ...Object.fromEntries(
    Array.from({ length: 8 }, (_, i) => [
      `html.reveal-ready .reveal .MuiGrid-container > *:nth-of-type(${i + 1})`,
      { transitionDelay: `${0.12 + i * 0.09}s` },
    ]),
  ),
  "@media (prefers-reduced-motion: reduce)": {
    "html.reveal-ready .reveal, html.reveal-ready .reveal .MuiGrid-container > *": {
      opacity: 1,
      transform: "none",
      transition: "none",
    },
  },
};

/**
 * Site-wide scroll reveal: every <section> below the fold fades and slides up
 * the first time it enters the viewport. Sections already on screen at load
 * are left alone so nothing flashes. Re-runs on client-side navigation.
 */
export default function RevealOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    // Let the new route's DOM settle before scanning it.
    const id = window.setTimeout(() => {
      document.documentElement.classList.add("reveal-ready");
      document.querySelectorAll<HTMLElement>("section:not(.reveal)").forEach((el) => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight * 0.9) return; // already in view
        el.classList.add("reveal");
        io.observe(el);
      });
    }, 50);

    return () => {
      window.clearTimeout(id);
      io.disconnect();
    };
  }, [pathname]);

  return <GlobalStyles styles={styles} />;
}
