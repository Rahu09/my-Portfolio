"use client";

import React, { useEffect, useRef, useState } from "react";
import SectionHeading from "./section-heading";
import { impactData, systemNodes, type SystemNodeId } from "@/lib/data";
import SystemMap from "./system-map";
import clsx from "clsx";
import { useSectionInView } from "@/lib/hooks";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";

const fadeInAnimationVariants = {
  initial: { opacity: 0, y: 100 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.05 * index },
  }),
};

// Counts a figure like "26.3%", "1,200" or "<55 ms" up from zero when it scrolls into view.
function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const match = value.match(/^(\D*?)([\d,]+(?:\.\d+)?)(.*)$/);

  useEffect(() => {
    const el = ref.current;
    if (!el || !match || !inView || reduce) return;
    const [, prefix, num, suffix] = match;
    const target = parseFloat(num.replace(/,/g, ""));
    const decimals = num.includes(".") ? num.split(".")[1].length : 0;
    const useCommas = num.includes(",");
    const controls = animate(0, target, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate(v) {
        const n = useCommas
          ? Math.round(v).toLocaleString("en-US")
          : v.toFixed(decimals);
        el.textContent = `${prefix}${n}${suffix}`;
      },
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, value]);

  return <span ref={ref}>{value}</span>;
}

export default function Impact() {
  const { ref } = useSectionInView("Impact", 0.3);
  const [active, setActive] = useState<SystemNodeId | null>(null);
  const [hovered, setHovered] = useState<SystemNodeId | null>(null);
  const activeNode = systemNodes.find((node) => node.id === active);
  // The selected part's figures move to the front, so they are in view right under the map.
  const cards = active
    ? [
        ...impactData.filter((item) => item.node === active),
        ...impactData.filter((item) => item.node !== active),
      ]
    : impactData;

  return (
    <section
      id="impact"
      ref={ref}
      className="mb-28 max-w-[53rem] scroll-mt-28 text-center sm:mb-40"
    >
      <SectionHeading>My impact</SectionHeading>
      <p className="-mt-4 mb-8 text-gray-700 dark:text-white/70">
        Results from production on Citi&apos;s branded cards platform.
      </p>

      <div className="bg-white/60 borderBlack rounded-xl px-2 py-4 sm:px-4 dark:bg-white/5">
        <SystemMap
          active={active}
          hovered={hovered}
          onSelect={(id) => setActive((current) => (current === id ? null : id))}
        />
      </div>

      <div
        className="my-5 flex min-h-[4.5rem] items-center justify-center px-2 text-gray-700 dark:text-white/70"
        aria-live="polite"
      >
        {activeNode ? (
          <p>
            <span className="font-semibold text-gray-950 dark:text-white">
              {activeNode.name}.
            </span>{" "}
            {activeNode.story}{" "}
            <button
              type="button"
              onClick={() => setActive(null)}
              className="underline underline-offset-2 hover:text-gray-950 dark:hover:text-white"
            >
              Clear selection
            </button>
          </p>
        ) : (
          <p>Select a part of the system to see what I delivered there.</p>
        )}
      </div>

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((item, index) => (
          <motion.li
            key={item.label}
            layout
            className="h-full"
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            custom={index}
            onMouseEnter={() => setHovered(item.node)}
            onMouseLeave={() => setHovered(null)}
          >
            <div
              className={clsx(
                "bg-white borderBlack h-full rounded-xl px-5 py-5 text-left transition-opacity duration-300 dark:bg-white/10",
                active && item.node !== active && "opacity-35"
              )}
            >
            <p className="text-3xl font-bold tabular-nums text-gray-950 dark:text-white">
              <CountUp value={item.value} />
            </p>
            <p className="mt-1 text-[0.95rem] leading-snug text-gray-700 dark:text-white/70">
              {item.label}
            </p>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
