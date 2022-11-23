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

export default function Home() {
  return (
    <div className="container">
      <Navigation links={navigations} />
      <MobileNavigation links={navigations} />
      <ThemeSelector />
    </div>
  );
}
