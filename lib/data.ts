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
  { value: "1,200", label: "requests per second on card-processing microservices" },
  { value: "80+", label: "REST APIs across 20+ microservices" },
  { value: "3.5M", label: "accounts migrated with zero downtime and 99.9% accuracy" },
  { value: "32%", label: "faster code reviews from the AI PR review pipeline I built" },
  { value: "18%", label: "fewer syntax bugs reaching review" },
  { value: "35%", label: "fewer timeout failures with Recovery-as-a-Service" },
  { value: "88%", label: "of timed-out inter-service calls recovered automatically" },
  { value: "48%", label: "faster P1/P2 resolution with Splunk dashboards and logging" },
  { value: "26.3%", label: "lower retrieval latency from Redis caching and SQL tuning" },
  { value: "22.5%", label: "less database CPU" },
  { value: "<55 ms", label: "anomaly detection on an async Kafka pipeline" },
  { value: "90%+", label: "test coverage, cutting manual QA effort by 60%" },
] as const;

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
