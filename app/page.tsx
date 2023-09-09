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
  getWithoutExperience,
  getWorkExperience,
} from "@/utils";
import React from "react";

const Home = async () => {
  const pageInfo = await getPageInfo();
  const workExperiences = await getWorkExperience();
  const skills = await getSkills();
  const projects = await getProjects();
  const { content } = await getWithoutExperience();

  return (
    <div
      id="mainDiv"
      className="h-screen snap-mandatory snap-y overflow-y-scroll 
    overflow-x-hidden md:scrollbar-thin md:scrollbar-track-gray-400/20 md:scrollbar-thumb-[#38bdf8]/80 
    scroll-smooth"
    >
      <section id="hero" className="snap-center">
        <Hero pageInfo={pageInfo} workExperiences={workExperiences} />
      </section>

      <section id="sobre mí" className="snap-center">
        <About pageInfo={pageInfo} />
      </section>

      {workExperiences.length !== 0 && (
        <section id="experience" className="snap-center">
          <Experience workExperiences={workExperiences} content={content} />
        </section>
      )}

      <section id="habilidades" className="snap-center">
        <Skills skills={skills} />
      </section>

      <section id="proyectos" className="snap-center">
        <Projects projects={projects} />
      </section>

      <section id="contact" className="snap-center">
        <ContactMe pageInfo={pageInfo} />
      </section>
    </div>
  );
};

export default Home;
