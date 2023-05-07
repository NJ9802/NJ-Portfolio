import { clientFetch } from "@/sanity-utils";
import Experience from "@/types/Experience";
import PageInfo from "@/types/PageInfo";
import Social from "@/types/Social";
import Skill from "@/types/Skill";
import { groq } from "next-sanity";
import Project from "@/types/Project";

export const getSocials = async (): Promise<Social[]> => {
  return clientFetch(groq`
  *[_type == "social"]{_id, url}`);
};

export const getPageInfo = async (): Promise<PageInfo> => {
  return clientFetch(groq`
  *[_type == "pageInfo"][0]{
    name,
    "heroImage":heroImage.asset->url,
    role,
    "profilePic":profilePic.asset->url,
    backgroundInformation,
    phoneNumber,
    email,
    }`);
};
export const getWorkExperience = async (): Promise<Experience[]> => {
  return clientFetch(groq`
  *[_type == "experience"]{
    _id,
    jobTitle,
    company,
    "technologies":technologies[]->{
      _id,
      title,
      "logo":logo.asset->url,
    },
    "companyImage":companyImage.asset->url,
    points,
    dateStarted,
    dateEnded,
    isCurrentlyWorkingHere,

    }`);
};

export const getSkills = async (): Promise<Skill[]> => {
  return clientFetch(groq`
  *[_type == "skill"]{
    _id,
    title,
    "logo": logo.asset->url
  }
  `);
};
export const getProjects = async (): Promise<Project[]> => {
  return clientFetch(groq`
  *[_type == "project"]{
    _id,
    title,
    "image": image.asset->url,
    linkToBuild,
    linkToDemo,
    summary,
    "technologies":technologies[]->{
      _id,
      title,
      "logo":logo.asset->url,
    },
  }
  `);
};
