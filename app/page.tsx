import About from "@/components/About";
import ContactMe from "@/components/ContactMe";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import {
  getPageInfo,
  getProjects,
  getSkills,
  getWorkExperience,
} from "@/utils";
import React from "react";

const Home = async () => {
  const pageInfo = await getPageInfo();
  const workExperiences = await getWorkExperience();
  const skills = await getSkills();
  const projects = await getProjects();

  return (
    <div
      className="h-screen snap-mandatory snap-y overflow-y-scroll 
    overflow-x-hidden md:scrollbar-thin md:scrollbar-track-gray-400/20 md:scrollbar-thumb-[#f2ab0a]/80 
    scroll-smooth"
    >
      <section id="hero" className="snap-center">
        <Hero pageInfo={pageInfo} />
      </section>

      <section id="about" className="snap-center">
        <About pageInfo={pageInfo} />
      </section>

      <section id="experience" className="snap-center">
        <Experience workExperiences={workExperiences} />
      </section>

      <section id="skills" className="snap-center">
        <Skills skills={skills} />
      </section>

      <section id="projects" className="snap-center">
        <Projects projects={projects} />
      </section>

      <section id="contact" className="snap-center">
        <ContactMe pageInfo={pageInfo} />
      </section>
    </div>
  );
};

export default Home;
