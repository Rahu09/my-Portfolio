"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { projectsData } from "@/lib/data";
import Project from "./project";
import PrReviewReplay from "./pr-review-replay";
import { useSectionInView } from "@/lib/hooks";

function Projects() {
  const { ref } = useSectionInView("Projects", 0.5);
  return (
    <section ref={ref} id="projects" className="scroll-mt-28 mb-28">
      <SectionHeading>My Projects</SectionHeading>
      <div>
        {projectsData.map((project, index) => (
          project.title === "AI PR Reviewer" ? (
            // One wrapper keeps the odd/even card layout of the projects that follow.
            <div key={index}>
              <Project {...project} />
              <PrReviewReplay />
            </div>
          ) : (
            <Project key={index} {...project} />
          )
        ))}
      </div>
    </section>
  );
}

export default Projects;
