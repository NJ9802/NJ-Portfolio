import SanityBody, { LocaleString } from "./SanityBody";
import Technology from "./Technology";

export default interface Project extends SanityBody {
  title: string;
  image: string;
  linkToBuild: string;
  linkToDemo: string;
  summary: LocaleString;
  technologies: Technology[];
}
