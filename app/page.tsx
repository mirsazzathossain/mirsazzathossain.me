import About from "./About";
import Articles from "./Articles";
import { default as Educations, default as Experiences } from "./Educations";
import LifeEvents from "./LifeEvents";
import Publications from "./Publications";

const photos = [
  "/images/photos/image-1.jpg",
  "/images/photos/image-2.jpg",
  "/images/photos/image-3.jpg",
  "/images/photos/image-4.jpg",
  "/images/photos/image-5.jpg",
];

export default async function Home(): Promise<JSX.Element> {
  return (
    <>
      <About />
      {/* <Photos images={photos} /> */}
      <Educations />
      <Experiences />
      <Publications />
      <Articles />
      <LifeEvents />
    </>
  );
}
