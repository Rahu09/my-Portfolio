"use client";

import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { BsCheck2, BsArrowCounterclockwise } from "react-icons/bs";

// A scripted replay of how the AI PR Reviewer handles one pull request.
// Nothing here calls a model. The code under review is invented for the demo.

const steps = [
  { title: "Webhook verified", detail: "HMAC-SHA256 over the raw request bytes", ms: 700 },
  { title: "Redelivery check", detail: "Delivery ID seen for the first time", ms: 700 },
  { title: "Diff snapshot", detail: "Fetched between the exact base and head commits", ms: 800 },
  { title: "Locations listed", detail: "The model may only pick from L1 to L3", ms: 900 },
  { title: "LLM review", detail: "Spring AI, no tools, PR content treated as untrusted", ms: 1600 },
  { title: "Finding validated in Java", detail: "L2 maps to line 43 of SettlementClient.java", ms: 900 },
  { title: "Review posted once", detail: "A hidden marker stops duplicates on retries", ms: 600 },
] as const;

const LOCATIONS = 3;
const REVIEW = 4;
const VALIDATE = 5;
const DONE = steps.length;

type DiffLine = {
  oldNo?: number;
  newNo?: number;
  kind: "ctx" | "del" | "add";
  code: string;
  loc?: string;
};

const diff: DiffLine[] = [
  { oldNo: 41, newNo: 41, kind: "ctx", code: "public Settlement settle(CardTxn txn) {" },
  { oldNo: 42, kind: "del", code: '  return gateway.post("/settlements", txn);' },
  { newNo: 42, kind: "add", code: "  return retry.execute(", loc: "L1" },
  { newNo: 43, kind: "add", code: '      () -> gateway.post("/settlements", txn),', loc: "L2" },
  { newNo: 44, kind: "add", code: "      Backoff.exponential(Duration.ofMillis(200), 4));", loc: "L3" },
  { oldNo: 43, newNo: 45, kind: "ctx", code: "}" },
];

export default function PrReviewReplay() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  // Index of the step that is running. -1 before the start, DONE when finished.
  const [current, setCurrent] = useState(-1);

  useEffect(() => {
    if (!inView || current !== -1) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setCurrent(reduce ? DONE : 0);
  }, [inView, current]);

  useEffect(() => {
    if (current < 0 || current >= DONE) return;
    const timer = setTimeout(() => setCurrent((c) => c + 1), steps[current].ms);
    return () => clearTimeout(timer);
  }, [current]);

  const showLocations = current >= LOCATIONS;
  const flagged = current > VALIDATE;

  let modelLine = "Waiting for the pull request…";
  if (current >= 0) modelLine = "pull_request event received";
  if (current === REVIEW) modelLine = "Model is reviewing the diff…";
  if (current === VALIDATE) modelLine = '{ "location": "L2", "severity": "HIGH" }';
  if (current > VALIDATE) modelLine = "L2 → SettlementClient.java:43 ✓";

  return (
    <div
      ref={ref}
      className="mb-3 max-w-[42rem] rounded-lg border border-black/5 bg-gray-100 p-5 sm:mb-8 sm:p-8 dark:bg-white/10 dark:text-white"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="text-lg font-semibold">Watch it review a pull request</h4>
          <p className="mt-1 text-sm text-gray-600 dark:text-white/60">
            A scripted replay. The code under review is invented for this demo.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setCurrent(0)}
          disabled={current >= 0 && current < DONE}
          className="flex shrink-0 items-center gap-2 rounded-full bg-gray-900 px-4 py-2 text-sm text-white outline-none transition hover:scale-105 hover:bg-gray-950 focus:scale-105 active:scale-100 disabled:scale-100 disabled:opacity-40 dark:bg-white/15"
        >
          <BsArrowCounterclockwise /> Replay
        </button>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-[14rem_1fr]">
        <ol className="space-y-3">
          {steps.map((step, index) => {
            const done = index < current;
            const running = index === current;
            return (
              <li
                key={step.title}
                className={clsx(
                  "flex gap-3 transition-opacity duration-300",
                  !done && !running && "opacity-40"
                )}
              >
                <span
                  className={clsx(
                    "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs",
                    done
                      ? "border-transparent bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                      : "border-black/20 dark:border-white/30",
                    running && "animate-pulse border-violet-500"
                  )}
                  aria-hidden="true"
                >
                  {done && <BsCheck2 />}
                </span>
                <span>
                  <span className="block text-sm font-medium leading-5">{step.title}</span>
                  <span className="block text-xs leading-snug text-gray-600 dark:text-white/60">
                    {step.detail}
                  </span>
                </span>
              </li>
            );
          })}
        </ol>

        <div className="min-w-0">
          <div className="overflow-hidden rounded-lg border border-black/10 bg-white text-gray-900 dark:border-white/10 dark:bg-gray-900 dark:text-gray-100">
            <div className="flex items-center justify-between border-b border-black/10 px-3 py-2 font-mono text-xs dark:border-white/10">
              <span>payments/SettlementClient.java</span>
              <span>
                <span className="text-green-700 dark:text-green-400">+3</span>{" "}
                <span className="text-red-700 dark:text-red-400">-1</span>
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse font-mono text-[0.7rem] leading-6">
                <tbody>
                  {diff.map((line, index) => (
                    <tr
                      key={index}
                      className={clsx(
                        "transition-colors duration-500",
                        line.kind === "add" && "bg-green-50 dark:bg-green-500/10",
                        line.kind === "del" && "bg-red-50 dark:bg-red-500/10",
                        flagged && line.loc === "L2" && "!bg-yellow-100 dark:!bg-yellow-500/25"
                      )}
                    >
                      <td className="min-w-9 select-none pl-3 pr-1 text-right text-gray-400">{line.oldNo}</td>
                      <td className="min-w-8 select-none pr-2 text-right text-gray-400">{line.newNo}</td>
                      <td className="min-w-4 select-none text-gray-500">
                        {line.kind === "add" ? "+" : line.kind === "del" ? "-" : ""}
                      </td>
                      <td className="min-w-8 pr-2">
                        {line.loc && (
                          <span
                            className={clsx(
                              "rounded bg-violet-100 px-1 text-violet-700 transition-opacity duration-300 dark:bg-violet-500/25 dark:text-violet-200",
                              showLocations ? "opacity-100" : "opacity-0"
                            )}
                          >
                            {line.loc}
                          </span>
                        )}
                      </td>
                      <td className="whitespace-pre w-full pr-3">{line.code}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p
              className="border-t border-black/10 px-3 py-2 font-mono text-[0.7rem] text-gray-600 dark:border-white/10 dark:text-white/60"
              aria-live="polite"
            >
              {modelLine}
            </p>
          </div>

          <AnimatePresence>
            {current >= DONE && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-3 rounded-lg border border-black/10 bg-white p-4 text-left text-gray-900 dark:border-white/10 dark:bg-gray-900 dark:text-gray-100"
              >
                <p className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="font-semibold">ai-pr-reviewer</span>
                  <span className="rounded border border-black/20 px-1.5 text-xs text-gray-600 dark:border-white/30 dark:text-white/60">
                    bot
                  </span>
                  <span className="text-gray-600 dark:text-white/60">commented on line 43</span>
                  <span className="ml-auto rounded bg-yellow-300 px-2 py-0.5 text-xs font-semibold text-gray-900">
                    High
                  </span>
                </p>
                <p className="mt-2 text-sm leading-relaxed">
                  Retrying this POST can settle the same transaction twice. If the first
                  attempt succeeds but times out, the retry charges the card again. Send an
                  idempotency key with every attempt, such as{" "}
                  <code className="rounded bg-gray-100 px-1 font-mono text-xs dark:bg-white/10">
                    txn.id()
                  </code>
                  , so the gateway can drop repeats.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
