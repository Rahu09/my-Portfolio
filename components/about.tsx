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
        At <span className="font-medium">Hexaware Technologies</span>, I work
        on <span className="font-medium">Citi&apos;s branded cards platform</span>,
        where downtime means failed customer transactions. I built a{" "}
        <span className="font-medium">Recovery-as-a-Service</span> framework
        that automatically recovers 88% of failed calls, delivered a{" "}
        <span className="font-medium">3.5M-account migration</span> with zero
        downtime, and build <span className="font-medium">80+ REST APIs</span>{" "}
        across 20+ microservices handling 1,200 requests per second.{" "}
        <span className="italic">My favorite part of programming</span> is the
        problem-solving aspect. I <span className="underline">love</span> the
        feeling of finally figuring out a solution to a problem.
      </p>

      <p className="mb-3">
        I bring the same discipline to{" "}
        <span className="font-medium">GenAI</span>: LLM features that are
        tested, secure and production-ready, not demos. My{" "}
        <span className="underline">AI PR Reviewer</span> (Java, Spring AI)
        reviews pull requests on GitHub and is backed by 162 automated tests.
        My core stack is{" "}
        <span className="font-medium">
          Java, Spring Boot, Spring AI, Kafka, Redis, PostgreSQL, React and
          Next.js
        </span>
        , and I&apos;m <span className="font-medium">AWS and 4× Claude certified</span>.
      </p>

      <p>
        <span className="italic">When I&apos;m not coding</span>, I enjoy
        reading books, doing calisthenics and gym workouts, and playing video
        games. I also enjoy <span className="font-medium">learning new things</span>.
        I&apos;m currently learning about{" "}
        <span className="font-medium">history and philosophy</span>.
      </p>
    </motion.section>
  );
}

export default About;
