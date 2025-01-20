import SanityBody, { LocaleString } from "./SanityBody";
import Technology from "./Technology";

export default interface Experience extends SanityBody {
  _type: "experience";
  company: string;
  companyImage: string;
  dateStarted: Date;
  dateEnded: Date;
  isCurrentlyWorkingHere: boolean;
  jobTitle: string;
  points: LocaleString[];
  technologies: Technology[];
}
