import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function NavBar({ mobileButtons }) {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const links = [
    { name: "Home", to: "/" },
    { name: "Discussions", to: "/discussions" },
    { name: "Members", to: "/members" },
    { name: "Blogs", to: "/blogs" },
  ];

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
    alert("✅ Logged out successfully!");
  };

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
              onClick={() => setOpen(false)}
            >
              {link.name}
            </NavLink>
          </li>
        ))}

        {/* Show logout button if authenticated, otherwise show login/register in mobile */}
        {open && (
          <li className="px-4 py-2 md:hidden">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            ) : (
              mobileButtons && <div className="flex flex-col gap-2">{mobileButtons}</div>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
}