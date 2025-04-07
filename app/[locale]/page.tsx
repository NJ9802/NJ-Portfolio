import Section from "@/components/Section";
import About from "../../components/About";
import ContactMe from "../../components/ContactMe";
import Experience from "../../components/Experience";
import Hero from "../../components/Hero";
import Projects from "../../components/Projects";
import ScrolleableDiv from "../../components/ScrolleableDiv";
import Skills from "../../components/Skills";
import {
  getPageInfo,
  getProjects,
  getSkills,
  getWorkExperience,
} from "../../utils";
import React from "react";

const Home = async () => {
  const pageInfo = await getPageInfo();
  const workExperiences = await getWorkExperience();
  const skills = await getSkills();
  const projects = await getProjects();

  return (
    <ScrolleableDiv>
      <Section id="hero" first>
        <Hero pageInfo={pageInfo} />
      </Section>

      <Section id="about">
        <About pageInfo={pageInfo} />
      </Section>

      {workExperiences.length !== 0 && (
        <Section id="experience">
          <Experience workExperiences={workExperiences} />
        </Section>
      )}

      <Section id="skills">
        <Skills skills={skills} />
      </Section>

      <Section id="projects">
        <Projects projects={projects} />
      </Section>

      <Section id="contact">
        <ContactMe pageInfo={pageInfo} />
      </Section>
    </ScrolleableDiv>
  );
};

export default Home;
