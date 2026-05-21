import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0f1115]/80 backdrop-blur border-b border-neutral-800">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/logoFull.png"
            alt="Stellara Logo"
            className="h-12 md:h-14"
          />
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex gap-6 text-sm">
          <Link to="/" className="hover:text-indigo-400 transition">
            Home
          </Link>
          <Link to="/about" className="hover:text-indigo-400 transition">
            About
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex gap-3">
          <Link
            to="/login"
            className="px-4 py-2 border border-neutral-600 rounded-lg hover:bg-white hover:text-black hover:scale-105 transition-transform duration-200"
          >
            Log In
          </Link>

          <Link
            to="/signup"
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 hover:scale-105 transition-transform duration-200"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;