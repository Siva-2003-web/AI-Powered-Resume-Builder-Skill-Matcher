import { useEffect } from "react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/Services/login";
import { addUserData } from "@/features/user/userFeatures";
import ThemeToggle from "./ThemeToggle";
import { LogOut, LayoutDashboard, FileText, Eye } from "lucide-react";

function Header({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log("Printing From Header User Found");
    } else {
      console.log("Printing From Header User Not Found");
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await logoutUser();
      if (response.statusCode == 200) {
        dispatch(addUserData(""));
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <header
      id="printHeader"
      className="sticky top-0 z-50 w-full glass border-b border-gray-200/50 dark:border-gray-700/50"
    >
      <div className="flex justify-between items-center px-6 md:px-10 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform duration-300">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <span className="hidden md:block font-bold text-lg bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            ResumeAI
          </span>
        </Link>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Demo Button - Always visible */}
          <Button
            variant="ghost"
            onClick={() => navigate("/demo")}
            className="hidden sm:flex items-center gap-2 transition-all duration-300 hover:bg-primary/10 hover:text-primary"
          >
            <Eye className="h-4 w-4" />
            <span className="hidden md:inline">Demo</span>
          </Button>

          {user ? (
            <>
              <Button
                variant="outline"
                onClick={() => navigate("/dashboard")}
                className="hidden sm:flex items-center gap-2 transition-all duration-300 hover:bg-primary/10 hover:border-primary"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden md:inline">Dashboard</span>
              </Button>
              <Button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 transition-all duration-300 btn-shine"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </>
          ) : (
            <Link to="/auth/sign-in">
              <Button className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 transition-all duration-300 btn-shine px-6">
                Get Started
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

