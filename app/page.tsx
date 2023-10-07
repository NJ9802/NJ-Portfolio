import About from "@/components/About";
import ContactMe from "@/components/ContactMe";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import ScrolleableDiv from "@/components/ScrolleableDiv";
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
    <ScrolleableDiv>
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
    </ScrolleableDiv>
  );
};

export default Home;
