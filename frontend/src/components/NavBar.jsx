import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Home", to: "/" },
    { name: "Discussions", to: "/discussions" },
    { name: "Members", to: "/members" },
    { name: "Blogs", to: "/blogs" },
  ];

  return (
    <nav className="relative">
      {/* Hamburger button (mobile only) */}
      <button
        className="md:hidden p-2 text-gray-700"
        onClick={() => setOpen(!open)}
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Menu items */}
      <ul
        className={`
          flex flex-col md:flex-row md:space-x-10
          absolute md:static top-full left-0 w-full md:w-auto bg-white md:bg-transparent
          overflow-hidden transition-all duration-300
          ${open ? "max-h-96" : "max-h-0 md:max-h-full"}
        `}
      >
        {links.map((link) => (
          <li key={link.to} className="px-4 py-2 md:p-0">
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-bold"
                  : "text-gray-700 hover:text-blue-600"
              }
              onClick={() => setOpen(false)} // close menu on mobile link click
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
