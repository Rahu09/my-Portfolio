import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaJava } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import aiPrReviewerImg from "@/public/aiPrReviewer.png";
import penAI from "@/public/penAI.png";
import board from "@/public/board.png";

// All site copy lives in this file. Keep numbers identical to the resume and LinkedIn.

export const siteLinks = {
  email: "tiwarirahul0809@gmail.com",
  linkedin: "https://www.linkedin.com/in/rahultiwaridev",
  github: "https://github.com/Rahu09",
  resume: "/Rahul_Tiwari_Resume.pdf",
};

export const links = [
  { name: "Home", hash: "#home" },
  { name: "About", hash: "#about" },
  { name: "Impact", hash: "#impact" },
  { name: "Projects", hash: "#projects" },
  { name: "Skills", hash: "#skills" },
  { name: "Experience", hash: "#experience" },
  { name: "Contact", hash: "#contact" },
] as const;

export const impactData = [
  { value: "1,200", label: "requests per second on card-processing microservices", node: "gateway" },
  { value: "80+", label: "REST APIs across 20+ microservices", node: "gateway" },
  { value: "3.5M", label: "accounts migrated with zero downtime and 99.9% accuracy", node: "gateway" },
  { value: "32%", label: "faster code reviews from the AI PR review pipeline I built", node: "delivery" },
  { value: "18%", label: "fewer syntax bugs reaching review", node: "delivery" },
  { value: "35%", label: "fewer timeout failures with Recovery-as-a-Service", node: "services" },
  { value: "88%", label: "of timed-out inter-service calls recovered automatically", node: "services" },
  { value: "48%", label: "faster P1/P2 resolution with Splunk dashboards and logging", node: "splunk" },
  { value: "26.3%", label: "lower retrieval latency from Redis caching and SQL tuning", node: "cache" },
  { value: "22.5%", label: "less database CPU", node: "db" },
  { value: "<55 ms", label: "anomaly detection on an async Kafka pipeline", node: "kafka" },
  { value: "90%+", label: "test coverage, cutting manual QA effort by 60%", node: "delivery" },
] as const;

// Parts of the system drawn in the Impact section. Each impact figure above points at one of these.
export const systemNodes = [
  {
    id: "gateway",
    name: "Card APIs",
    headline: "1,200 RPS",
    story:
      "Card-processing and transaction microservices behind 80+ REST APIs, with retries and fallbacks for partial outages. I also designed the APIs that migrated 3.5M accounts onto the platform with zero downtime.",
  },
  {
    id: "services",
    name: "Microservices",
    headline: "88% auto-recovery",
    story:
      "I built Recovery-as-a-Service, a framework with state tracking and exponential backoff that recovers timed-out inter-service calls on its own. It saves 14 hrs/week.",
  },
  {
    id: "cache",
    name: "Redis cache",
    headline: "26.3% lower latency",
    story:
      "Distributed Redis caching, together with restructured SQL indexes, cut retrieval latency on hot reads.",
  },
  {
    id: "db",
    name: "SQL database",
    headline: "22.5% less DB CPU",
    story:
      "Restructured SQL indexes lowered database CPU and, together with Redis caching, cut retrieval latency.",
  },
  {
    id: "kafka",
    name: "Kafka pipeline",
    headline: "<55 ms detection",
    story:
      "An async Kafka pipeline that detects anomalies in under 55 ms, tuned through partitions and consumer groups.",
  },
  {
    id: "splunk",
    name: "Splunk",
    headline: "48% faster P1/P2 fixes",
    story:
      "Splunk dashboards and logging that shorten root-cause analysis on P1/P2 incidents.",
  },
  {
    id: "delivery",
    name: "Review and CI",
    headline: "32% faster reviews",
    story:
      "An AI PR review pipeline, live since Feb 2026, parses Git diffs and posts inline fix suggestions. TDD and an automated BDD (Gherkin) pipeline keep coverage above 90%.",
  },
] as const;

export type SystemNodeId = (typeof systemNodes)[number]["id"];

export const experiencesData = [
  {
    title: "B.Tech, Electronics & Communication",
    location: "LNCT Excellence, Bhopal, IN",
    description: "Graduated with a CGPA of 7.9. Learned full-stack web development alongside my degree and built multiple projects.",
    icon: React.createElement(LuGraduationCap),
    date: "2019 - 2023",
  },
  {
    title: "Associate Software Engineer — Hexaware",
    location: "Chennai, IN (remote)",
    description:
      "Worked on an internal enterprise learning platform with Java, Spring Boot and React. Lazy loading and async state management raised the Lighthouse score by 24% and cut 140 KB from the JS bundle. Built an AI onboarding chatbot that deflected 38% of tier-1 onboarding tickets.",
    icon: React.createElement(CgWorkAlt),
    date: "Sep 2023 - Jul 2024",
  },
  {
    title: "Software Engineer — Citi (via Hexaware)",
    location: "Chennai, IN (remote)",
    description:
      "Branded cards platform, Java 21 and Spring Boot, team of 12. Promoted from Associate Software Engineer in July 2026. Built the Recovery-as-a-Service framework (35% fewer timeouts, 14 hrs/week saved), delivered the 3.5M-account migration, a sub-55ms Kafka anomaly pipeline, and an AI PR review pipeline live since Feb 2026 (32% faster reviews).",
    icon: React.createElement(FaJava),
    date: "Aug 2024 - Present",
  },
] as const;

export const projectsData = [
  {
    title: "AI PR Reviewer",
    description:
      "A GitHub App that reviews pull requests with an LLM and posts inline comments. Duplicate-safe, hardened against prompt injection, and backed by 162 tests and 20 ADRs.",
    tags: ["Java 25", "Spring Boot 4", "Spring AI", "pgvector", "Kafka"],
    imageUrl: aiPrReviewerImg,
    link: "",
    github: "https://github.com/Rahu09/ai-pr-reviewer",
  },
  {
    title: "PEN.AI",
    description:
      "A SaaS platform to chat with PDF documents. A RAG pipeline indexes uploads in Pinecone for ~120ms retrieval, with Stripe subscriptions.",
    tags: ["Next.js", "TypeScript", "Pinecone", "Prisma", "PostgreSQL", "Stripe"],
    imageUrl: penAI,
    link: "https://pen-ai.vercel.app/",
    github: "https://github.com/Rahu09/pen.AI",
  },
  {
    title: "BOARD",
    description:
      "A real-time collaborative whiteboard. Liveblocks and Convex keep 60 FPS for 50+ users, with shapes, sticky notes and drawing built from scratch.",
    tags: ["Next.js", "TypeScript", "Liveblocks", "Convex", "Clerk"],
    imageUrl: board,
    link: "https://drew-board.vercel.app/",
    github: "https://github.com/Rahu09/drew_board",
  },
] as const;

export const skillsData = [
  "Java",
  "Spring Boot",
  "Spring AI",
  "Microservices",
  "REST APIs",
  "Kafka",
  "Redis",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "RAG",
  "AI Agents",
  "MCP",
  "LangChain",
  "LLM Evaluation",
  "pgvector",
  "Pinecone",
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind",
  "AWS",
  "Docker",
  "GitHub Actions",
  "Jenkins",
  "Splunk",
  "JUnit",
  "TDD / BDD",
] as const;

export const certificationsData = [
  "Claude Certified Architect – Professional",
  "Claude Certified Architect – Foundations",
  "Claude Certified Developer – Foundations",
  "Claude Certified Associate – Foundations",
  "AWS Certified Solutions Architect – Associate",
] as const;
