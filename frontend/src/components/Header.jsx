import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import NavBar from "./NavBar";

export default function Header() {
  const { isAuthenticated, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    alert("✅ Logged out successfully!");
  };

  // Don't render auth buttons while checking authentication
  if (loading) {
    return (
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-blue-600">SolveHub</div>
            <div>Loading...</div>
          </div>
        </div>
      </header>
    );
  }

  // Mobile buttons for non-authenticated users
  const mobileButtons = !isAuthenticated ? (
    <>
      <button
        onClick={() => navigate("/login")}
        className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition duration-200"
      >
        Sign In
      </button>
      <button
        onClick={() => navigate("/register")}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
      >
        Register
      </button>
    </>
  ) : null;

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold text-blue-600 cursor-pointer" onClick={() => navigate("/")}>
            SolveHub
          </div>

          {/* Navigation */}
          <NavBar mobileButtons={mobileButtons} />

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 transition duration-200"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition duration-200"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}