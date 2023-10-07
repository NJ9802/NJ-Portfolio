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
      className="h-screen overflow-y-auto overflow-x-hidden md:scrollbar-thin md:scrollbar-track-gray-400/20 md:scrollbar-thumb-[#38bdf8]/80 
        scroll-smooth"
    >
      <section id="hero">
        <Hero pageInfo={pageInfo} workExperiences={workExperiences} />
      </section>

      <section id="sobre mí">
        <About pageInfo={pageInfo} />
      </section>

      {workExperiences.length !== 0 && (
        <section id="experience">
          <Experience workExperiences={workExperiences} content={content} />
        </section>
      )}

      <section id="habilidades">
        <Skills skills={skills} />
      </section>

      <section id="proyectos">
        <Projects projects={projects} />
      </section>

      <section id="contact">
        <ContactMe pageInfo={pageInfo} />
      </section>
    </div>
  );
};

export default Home;
