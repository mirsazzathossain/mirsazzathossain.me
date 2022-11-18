import {
  IconButton,
  MobileNav,
  Navbar,
  Typography,
} from "@material-tailwind/react";
import ArticleIcon from "@mui/icons-material/Article";
import HomeIcon from "@mui/icons-material/Home";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { useEffect, useState } from "react";

import Navmenu from "./Navmenu";

export default function Header() {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-0 mt-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Navmenu
        href="/"
        icon={
          <HomeIcon sx={{ fontSize: 16, color: "#1f2937", opacity: 0.8 }} />
        }
        label="Home"
      />

      <Navmenu
        href="/blogs"
        icon={
          <ArticleIcon sx={{ fontSize: 16, color: "#1f2937", opacity: 0.8 }} />
        }
        label="Blogs"
        tooltip="Coming Soon"
      />

      <Navmenu
        href="/publications"
        icon={
          <NewspaperIcon
            sx={{ fontSize: 16, color: "#1f2937", opacity: 0.8 }}
          />
        }
        label="Publications"
        tooltip="Coming Soon"
      />

      <Navmenu
        href="/talks"
        icon={
          <SlideshowIcon
            sx={{ fontSize: 16, color: "#1f2937", opacity: 0.8 }}
          />
        }
        label="Talks"
        tooltip="Coming Soon"
      />

      <Navmenu
        href="/videos"
        icon={
          <YouTubeIcon sx={{ fontSize: 16, color: "#1f2937", opacity: 0.8 }} />
        }
        label="Videos"
        tooltip="Coming Soon"
      />
    </ul>
  );

  return (
    <div className="relative left-2/4 z-[999] my-4 flex w-full max-w-screen-2xl -translate-x-2/4 flex-wrap items-center px-4 lg:fixed undefined">
      <Navbar className="mx-auto max-w-screen-2xl px-8 py-4 pl-6 pr-5 lg:py-2 shadow-2xl shadow-blue-gray-500/10">
        <div className="flex w-full items-center !justify-between text-gray-800 undefined">
          <Typography
            as="a"
            href="#"
            variant="h6"
            className="mr-4 cursor-pointer py-2.375 whitespace-nowrap font-bold text-inherit lg:ml-0"
          >
            <span>Mir Sazzat Hossain</span>
          </Typography>
          {/* <Button variant="gradient" size="sm" className="hidden lg:inline-block">
                        <span>Buy Now</span>
                    </Button> */}
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
          <div className="hidden lg:block">{navList}</div>
        </div>
        <MobileNav open={openNav}>
          {navList}
          {/* <Button variant="gradient" size="sm" fullWidth className="mb-2">
                        <span>Buy Now</span>
                    </Button> */}
        </MobileNav>
      </Navbar>
    </div>
  );
}
