"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

type Item = { label: string; href: string };

// Desktop nav with a highlighter pill that slides to the section you're reading.
export default function SectionNav({ items }: { items: Item[] }) {
  const [active, setActive] = useState<string | null>(null);
  const [pill, setPill] = useState<{ x: number; w: number } | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const lockUntil = useRef(0);

  // Work out which section is under the top third of the viewport.
  useEffect(() => {
    const ids = items.map((i) => i.href.slice(1));
    let raf = 0;
    const update = () => {
      raf = 0;
      if (performance.now() < lockUntil.current) return;
      const line = window.innerHeight * 0.33;
      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      // At the very bottom, the last section is the one being read.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = ids[ids.length - 1];
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [items]);

  // Move the pill under the active link.
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list || !active) return;
    const link = list.querySelector<HTMLAnchorElement>(`a[href="#${active}"]`);
    if (!link) return;
    const a = link.getBoundingClientRect();
    const l = list.getBoundingClientRect();
    setPill({ x: a.left - l.left, w: a.width });
  }, [active]);

  return (
    <ul ref={listRef} className="relative m-0 hidden list-none gap-1 p-0 md:flex">
      <span
        aria-hidden="true"
        className="nav-pill pointer-events-none absolute inset-y-0 left-0 rounded-md bg-mark"
        style={{
          width: pill?.w ?? 0,
          transform: `translateX(${pill?.x ?? 0}px)`,
          opacity: active && pill ? 1 : 0,
        }}
      />
      {items.map((item) => {
        const isActive = active === item.href.slice(1);
        return (
          <li key={item.href} className="relative z-10">
            <a
              href={item.href}
              aria-current={isActive ? "location" : undefined}
              onClick={() => {
                setActive(item.href.slice(1));
                lockUntil.current = performance.now() + 900; // let smooth scroll finish
              }}
              className={`block rounded-md px-3 py-2 text-[0.95rem] transition-colors duration-200 ${
                isActive ? "text-mark-ink" : "text-muted hover:text-ink"
              }`}
            >
              {item.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
