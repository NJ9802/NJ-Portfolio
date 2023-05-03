import SanityBody from "./SanityBody";
import Technology from "./Technology";

export default interface Project extends SanityBody {
  title: string;
  image: string;
  linkToBuild: string;
  summary: string;
  technologies: Technology[];
}
