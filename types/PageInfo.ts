import SanityBody from "./SanityBody";

export default interface PageInfo extends SanityBody {
  _type: "pageInfo";
  backgroundInformation: string;
  email: string;
  role: { [key: string]: string };
  heroImage: string;
  name: string;
  phoneNumber: string;
  profilePic: string;
}
