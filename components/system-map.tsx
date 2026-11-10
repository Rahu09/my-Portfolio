"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import { useInView } from "framer-motion";
import { systemNodes, type SystemNodeId } from "@/lib/data";

// A simplified picture of the platform. Geometry lives here; the copy is in lib/data.ts.

type Point = { x: number; y: number };
type Edge = {
  from: SystemNodeId | "clients";
  to: SystemNodeId;
  d: string;
  dur: number;
  deploy?: boolean;
};
type Layout = {
  width: number;
  height: number;
  nodeW: number;
  nodeH: number;
  clients: Point;
  nodes: Record<SystemNodeId, Point>;
  edges: Edge[];
};

const desktop: Layout = {
  width: 840,
  height: 380,
  nodeW: 168,
  nodeH: 56,
  clients: { x: 70, y: 120 },
  nodes: {
    gateway: { x: 260, y: 120 },
    services: { x: 460, y: 120 },
    cache: { x: 700, y: 50 },
    db: { x: 700, y: 190 },
    kafka: { x: 460, y: 300 },
    splunk: { x: 700, y: 330 },
    delivery: { x: 260, y: 300 },
  },
  edges: [
    { from: "clients", to: "gateway", d: "M70,120 L260,120", dur: 1.6 },
    { from: "gateway", to: "services", d: "M260,120 L460,120", dur: 1.6 },
    { from: "services", to: "cache", d: "M460,120 L700,50", dur: 2 },
    { from: "services", to: "db", d: "M460,120 L700,190", dur: 2 },
    { from: "services", to: "kafka", d: "M460,120 L460,300", dur: 1.8 },
    { from: "services", to: "splunk", d: "M460,120 L700,330", dur: 2.6 },
    { from: "delivery", to: "services", d: "M260,300 L460,120", dur: 3.2, deploy: true },
  ],
};

const mobile: Layout = {
  width: 360,
  height: 392,
  nodeW: 160,
  nodeH: 52,
  clients: { x: 90, y: 36 },
  nodes: {
    gateway: { x: 270, y: 36 },
    delivery: { x: 90, y: 140 },
    services: { x: 270, y: 140 },
    cache: { x: 90, y: 250 },
    db: { x: 270, y: 250 },
    kafka: { x: 90, y: 360 },
    splunk: { x: 270, y: 360 },
  },
  edges: [
    { from: "clients", to: "gateway", d: "M90,36 L270,36", dur: 1.6 },
    { from: "gateway", to: "services", d: "M270,36 L270,140", dur: 1.4 },
    { from: "services", to: "cache", d: "M270,140 L90,250", dur: 2 },
    { from: "services", to: "db", d: "M270,140 L270,250", dur: 1.4 },
    { from: "services", to: "kafka", d: "M270,140 L180,195 L180,305 L90,360", dur: 2.6 },
    { from: "services", to: "splunk", d: "M270,140 L180,195 L180,305 L270,360", dur: 2.6 },
    { from: "delivery", to: "services", d: "M90,140 L270,140", dur: 3, deploy: true },
  ],
};

type SystemMapProps = {
  active: SystemNodeId | null;
  hovered: SystemNodeId | null;
  onSelect: (id: SystemNodeId) => void;
};

function Diagram({
  layout,
  active,
  hovered,
  onSelect,
  className,
}: SystemMapProps & { layout: Layout; className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const inView = useInView(svgRef);
  const { nodeW, nodeH } = layout;

  // Stop the particles while the diagram is off screen.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || typeof svg.pauseAnimations !== "function") return;
    if (inView) svg.unpauseAnimations();
    else svg.pauseAnimations();
  }, [inView]);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${layout.width} ${layout.height}`}
      className={clsx("w-full h-auto select-none", className)}
      role="group"
      aria-label="Simplified diagram of the cards platform. Select a part to see the results I delivered there."
    >
      {layout.edges.map((edge) => {
        const lit =
          active !== null && (edge.from === active || edge.to === active);
        return (
          <g key={`${edge.from}-${edge.to}`}>
            <path
              d={edge.d}
              fill="none"
              strokeWidth={lit ? 2 : 1.5}
              strokeDasharray={edge.deploy ? "5 5" : undefined}
              className={clsx(
                "transition-colors",
                lit
                  ? "stroke-gray-500 dark:stroke-white/60"
                  : "stroke-gray-300 dark:stroke-white/20"
              )}
            />
            <g className="motion-reduce:hidden" aria-hidden="true">
              {[0, 1, 2].slice(0, edge.deploy ? 1 : 3).map((i) => (
                <circle
                  key={i}
                  r={3}
                  fill={edge.deploy ? "#f472b6" : "#a78bfa"}
                >
                  <animateMotion
                    dur={`${edge.dur}s`}
                    begin={`-${(edge.dur / 3) * i}s`}
                    repeatCount="indefinite"
                    path={edge.d}
                  />
                </circle>
              ))}
            </g>
          </g>
        );
      })}

      <g aria-hidden="true">
        <rect
          x={layout.clients.x - 55}
          y={layout.clients.y - 17}
          width={110}
          height={34}
          rx={17}
          className="fill-gray-100 stroke-black/10 dark:fill-gray-800 dark:stroke-white/10"
        />
        <text
          x={layout.clients.x}
          y={layout.clients.y + 4}
          textAnchor="middle"
          fontSize={12}
          className="fill-gray-600 dark:fill-white/60"
        >
          Card traffic
        </text>
      </g>

      {systemNodes.map((node) => {
        const { x, y } = layout.nodes[node.id];
        const isActive = active === node.id;
        const isHovered = hovered === node.id;
        return (
          <g
            key={node.id}
            role="button"
            tabIndex={0}
            aria-pressed={isActive}
            aria-label={`${node.name}: ${node.headline}`}
            onClick={() => onSelect(node.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(node.id);
              }
            }}
            className="group/node cursor-pointer outline-none"
          >
            <rect
              x={x - nodeW / 2}
              y={y - nodeH / 2}
              width={nodeW}
              height={nodeH}
              rx={12}
              strokeWidth={isActive || isHovered ? 2 : 1}
              className={clsx(
                "fill-white transition-colors dark:fill-gray-800 group-focus-visible/node:stroke-violet-500",
                isActive
                  ? "stroke-gray-950 dark:stroke-white"
                  : isHovered
                  ? "stroke-violet-400"
                  : "stroke-black/10 group-hover/node:stroke-gray-400 dark:stroke-white/15 dark:group-hover/node:stroke-white/50"
              )}
            />
            <text
              x={x}
              y={y - 4}
              textAnchor="middle"
              fontSize={13}
              fontWeight={600}
              className="fill-gray-950 dark:fill-white"
            >
              {node.name}
            </text>
            <text
              x={x}
              y={y + 14}
              textAnchor="middle"
              fontSize={11.5}
              className="fill-gray-600 dark:fill-white/60"
            >
              {node.headline}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function SystemMap(props: SystemMapProps) {
  return (
    <>
      <Diagram layout={desktop} className="hidden sm:block" {...props} />
      <Diagram layout={mobile} className="sm:hidden" {...props} />
    </>
  );
}
