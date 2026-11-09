"use client";

import React, { useEffect, useRef } from "react";
import SectionHeading from "./section-heading";
import { impactData } from "@/lib/data";
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

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {impactData.map((item, index) => (
          <motion.li
            key={item.label}
            className="bg-white borderBlack rounded-xl px-5 py-5 text-left dark:bg-white/10"
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            custom={index}
          >
            <p className="text-3xl font-bold tabular-nums text-gray-950 dark:text-white">
              <CountUp value={item.value} />
            </p>
            <p className="mt-1 text-[0.95rem] leading-snug text-gray-700 dark:text-white/70">
              {item.label}
            </p>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
