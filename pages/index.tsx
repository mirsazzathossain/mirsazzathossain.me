import HeaderAvatar from "components/Avatar";
import MobileNavigation from "components/MobileNavigation";
import Navigation from "components/Navigation";
import ThemeSelector from "components/ThemeSelector";

const navigations = [
  {
    id: "1",
    title: "Home",
    href: "/home",
  },
  {
    id: "2",
    title: "About",
    href: "/about",
  },
  {
    id: "3",
    title: "Contact",
    href: "/contact",
  },
];

const authorImage = {
  src: "/images/user.png",
  alt: "Author image",
  height: 512,
  width: 512,
  sizes: "2.25rem",
  priority: true,
};

const homeLink = {
  href: "/",
  title: "Home",
};

const headerClass = {
  image: "h-9 w-9",
};

export default function Home() {
  return (
    <div className="container h-[200vh]">
      <HeaderAvatar
        image={authorImage}
        link={homeLink}
        classNames={headerClass}
      />
      <Navigation links={navigations} />
      <MobileNavigation links={navigations} />
      <ThemeSelector />
    </div>
  );
}
