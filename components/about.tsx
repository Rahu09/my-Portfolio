"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

function About() {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About me</SectionHeading>
      <p className="mb-3">
        While pursuing my degree in{" "}
        <span className="font-medium">Electronics & Communication</span>, I
        learned <span className="font-medium">full-stack web development</span>{" "}
        online and made multiple projects{" "}
        <span className="italic">My favorite part of programming</span> is the
        problem-solving aspect. I <span className="underline">love</span> the
        feeling of finally figuring out a solution to a problem. The technology
        and frameworks that I use for development are{" "}
        <span className="font-medium">
          React, Next.js, Node.js, Java, MongoDB, PostgreSQL, mySQL
        </span>
        . I am also familiar with TypeScript, WebSockets, Tailwind and Prisma. I
        am always looking to learn new technologies. I am currently looking for
        a <span className="font-medium">full-time position</span> as a software
        developer.
      </p>

      <p>
        <span className="italic">When I'm not coding</span>, I enjoy reading
        Books, doing calisthenic and gym activities, playing video games. I also
        enjoy <span className="font-medium">learning new things</span>. I am
        currently learning about{" "}
        <span className="font-medium">history and philosophy</span>. I'm also
        learning how to use neo vim.
      </p>
    </motion.section>
  );
}

export default About;
