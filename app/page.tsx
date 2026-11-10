import About from "@/components/about";
import Contact from "@/components/contact";
import Experience from "@/components/experience";
import Impact from "@/components/impact";
import Intro from "@/components/intro";
import Projects from "@/components/projects";
import SectionDevider from "@/components/section-devider";
import Skills from "@/components/skills";

export default function Home() {
  return (
    <main className="flex flex-col items-center px-4">
      <Intro />
      <SectionDevider />
      <About />
      <Impact />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
    </main>
  );
}
