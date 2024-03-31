import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import wordanalyticsImg from "@/public/wordanalytics.png";
import penAI from "@/public/penAI.png";
import board from "@/public/board.png";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
  {
    title: "Java J2EE Internship",
    location: "WFH, IN",
    description:
      "I worked in a guided project in which needed implementaion of core and advanced concepts like JDBC, Servelet, API etc.",
    icon: React.createElement(CgWorkAlt),
    date: "Feb 2022 - Sep 2022",
  },
  {
    title: "Compleated B.Tech",
    location: "Bhopal, IN",
    description:
      "I graduated after completing my 4 years degree in electronics and communication in april 2023.",
    icon: React.createElement(LuGraduationCap),
    date: "Aug 2019 - Mar 2023",
  },

  {
    title: "Intern at Hexaware Technologies",
    location: "WFH, IN",
    description:
      "I Worked as a full-time intern in Hexaware technologies and worked in a Java SpringBoot backend + React frontend.",
    icon: React.createElement(FaReact),
    date: "sept 2023 - Mar 2024",
  },
] as const;

export const projectsData = [
  {
    title: "PEN.AI",
    description:
      "A SaaS platform that utilizes AI to interact with PDF documents using NEXT.JS. PINECONE as vector database for AI-powered PDF query capabilities.",
    tags: [
      "React",
      "Next.js",
      "PostgreSQL",
      "ai",
      "Tailwind",
      "Prisma",
      "Pinecone",
      "Stripe",
      "Uploadthing",
    ],
    imageUrl: penAI,
    link: "https://pen-ai.vercel.app/",
    github: "https://github.com/Rahu09/pen.AI",
  },
  {
    title: "Library Management System",
    description:
      "A complete LMS with features like book issue, return, fine calculation, and user management. Developed using React, SpringBoot, and MySQL.",
    tags: ["React", "Java", "MySQL", "ReactQuery", "Tailwind", "SpringBoot"],
    imageUrl: wordanalyticsImg,
    link: "",
    github: "https://github.com/Rahu09/lms",
  },
  {
    title: "BOARD",
    description:
      "A collaborative, real-time whiteboard. Implemented real-time database using Convex and LiveBlocks and Developed whiteboard features from scratch.",
    tags: ["Convex", "Next.js", "Tailwind", "TypeScript", "LiveBlocks"],
    imageUrl: board,
    link: "https://drew-board.vercel.app/",
    github: "https://github.com/Rahu09/drew_board",
  },
] as const;

export const skillsData = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Java",
  "SpringBoot",
  "Node.js",
  "Git",
  "WebSockets",
  "Tailwind",
  "Prisma",
  "MongoDB",
  "Redux",
  "Apollo",
  "Express",
  "PostgreSQL",
  "Framer Motion",
] as const;
