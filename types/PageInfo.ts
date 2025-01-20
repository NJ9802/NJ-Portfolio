import SanityBody, { LocaleString } from "./SanityBody";

export default interface PageInfo extends SanityBody {
  _type: "pageInfo";
  backgroundInformation: LocaleString;
  email: string;
  role: LocaleString;
  heroImage: string;
  name: string;
  phoneNumber: string;
  profilePic: string;
}
