import { useState, useEffect } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Menu as MenuIcon, X as NavbarCloseIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const menuItems = [
  { title: "Home", key: "home", link: "#home" },
  { title: "About", key: "about", link: "#about" },
  { title: "Services", key: "services", link: "#services" },
  { title: "Skills", key: "skills", link: "#skills" },
  { title: "Projects", key: "projects", link: "#projects" },
  { title: "Pricing", key: "pricing", link: "#pricing" },  
  { title: "Testimonials", key: "testimonials", link: "#testimonials" },
];

const LetsTalkButton = () => {
  return (
    <Button
      className="w-fit h-fit px-4 py-1 m-2 rounded-full bg-gradient-to-r from-cyan-500 to-teal-400
     text-white font-semibold shadow-lg transition 
     duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
    >
      {" "}
      <a href="#contact">Lets Talk</a>{" "}
    </Button>
  );
};

export default function Navbar() {
  const [openNavbarToggle, setNavbarToggle] = useState(false);

  const toggleNavbar = () => setNavbarToggle((prev) => !prev);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = openNavbarToggle ? "hidden" : "auto";
  }, [openNavbarToggle]);

  return (
    <>
      {/* HEADER BAR */}
      <div
        className="w-full sticky top-0 flex items-center justify-between py-2 px-2 rounded-t
       border-b bg-[rgb(10,10,71)] z-50 relative"
      >
        {/* Logo */}
        <div className="text-lg font-bold text-gray-800 ml-10">
          <span className="text-white">SamDigX</span>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="flex gap-4">
              {menuItems.map((item) => (
                <NavigationMenuItem key={item.key}>
                  
                    <a
                      href={item.link}
                      style={{ color: "rgb(237, 237, 243)" }}
                      className="text-sm font-medium transition-colors mr-4 
                      hover:underline decoration-[rgb(196, 196, 216)] underline-offset-4"
                    >
                      {item.title}
                    </a>
                  
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
            <LetsTalkButton />
          </NavigationMenu>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden"
            onClick={toggleNavbar}
            aria-label="Toggle navigation"
          >
            {openNavbarToggle ? (
              <NavbarCloseIcon className="w-6 h-6 text-gray-100" />
            ) : (
              <MenuIcon className="w-6 h-6 text-gray-100" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE SLIDE-IN MENU */}
      <div
        className={`fixed top-0 right-0 h-auto bg-[rgb(4, 4, 39)] rounded border-b
            shadow-lg z-40 md:hidden transform transition-transform duration-300 ease-in-out ${
          openNavbarToggle ? "translate-x-0" : "translate-x-full"
        } w-auto max-w-fit px-3 py-8`}
      >
        <div className="flex flex-col items-start gap-6 mt-10 pl-2 border-l-2 border-t-2 rounded-t ">
          {menuItems.map((item) => (
            <a
              key={item.key}
              href={item.link}
              onClick={() => setNavbarToggle(false)}
              style={{ color: "rgb(205, 223, 226)" }}
              className="text-base font-medium transition-colors hover:text-black hover:underline decoration-[rgb(113, 131, 134)] underline-offset-4"
            >
              {item.title}
            </a>
          ))}
        </div>

        <div className="flex flex-wrap items-center">
          <LetsTalkButton />
          {/* <AdminLogin /> */}
        </div>
      </div>
    </>
  );
}
