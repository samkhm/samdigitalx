import { useState } from "react";
import { HomeModernIcon, UserIcon } from "@heroicons/react/24/solid";
import { getUserRole } from "@/utils/auth";
import {
  Receipt,
  BedIcon,
  MenuIcon,
  X as SidebarCloseIcon,
} from "lucide-react";

export default function Sidebar({ activeSection, setActiveSection }) {
  const [openSidebarToggle, setSidebarToggle] = useState(false);
  const userRole = getUserRole();

  const toggleSidebar = () => {
    setSidebarToggle((prev) => !prev);
  };

  const adminMenuItems = [
    { name: "Home", icon: <HomeModernIcon className="h-5 w-5" />, key: "home" },
    { name: "Users", icon: <UserIcon className="h-5 w-5" />, key: "users" },
    {
      name: "Projects",
      icon: <BedIcon className="h-5 w-5" />,
      key: "projects",
    },
    {
      name: "Services",
      icon: <Receipt className="h-5 w-5" />,
      key: "services",
    },
    { name: "Skills", icon: <Receipt className="h-5 w-5" />, key: "skills" },
    { name: "Hobbies", icon: <Receipt className="h-5 w-5" />, key: "hobbies" },
    {
      name: "Testimonials",
      icon: <Receipt className="h-5 w-5" />,
      key: "testimonials",
    },
    { name: "Profile", icon: <UserIcon className="h-5 w-5" />, key: "profile" },
  ];

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <div className="md:hidden p-4 w-fit  absolute ">
        <MenuIcon onClick={toggleSidebar} className="h-6 w-6 cursor-pointer" />
      </div>

      {/* Sidebar */}
      <aside
        className={`
                    bg-[rgb(3,3,26)] text-white p-4 space-y-4 w-auto
                    fixed left-0 z-50 transform transition-transform
                    ${openSidebarToggle ? "translate-x-0" : "-translate-x-full"}
                    md:translate-x-0 md:relative md:block
                `}
      >
        {/* Close Button on Mobile */}
        <div className="flex justify-end md:hidden">
          <SidebarCloseIcon
            onClick={toggleSidebar}
            className="h-6 w-6 cursor-pointer mb-4"
          />
        </div>

        {/* Menu Title (optional on mobile) */}
        <h2 className="text-2xl font-bold mb-6 hidden md:block">Menu</h2>

        {/* Menu Items */}
        {adminMenuItems.map((i) => (
          <button
            key={i.key}
            className={`flex items-center space-x-2 w-full text-left p-2 rounded-xl transition hover:bg-gray-600 ${
              activeSection === i.key ? "bg-gray-700" : ""
            }`}
            onClick={() => setActiveSection(i.key)} // 🚫 No sidebar toggle here
          >
            {i.icon}
            <span>{i.name}</span>
          </button>
        ))}
      </aside>
    </>
  );
}
