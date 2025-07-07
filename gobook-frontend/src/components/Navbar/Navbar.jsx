import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Menu, X, UserCircle2 } from "lucide-react";
import { gobook_logo } from "../../assets/assets";


const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  const profileRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user")) || { username: "Guest", email: "guest@example.com" };
  const isLoggedIn = localStorage.getItem("token") !== null;

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white text-black fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="text-2xl font-bold tracking-wide text-black-700">
          <img src={gobook_logo} alt="GoBook Logo" className="h-12 sm:h-15 md:h-14 w-auto animate-pulse" />
        </Link>

        <nav className="hidden md:flex space-x-10 text-lg font-medium">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/about" className="hover:text-blue-600">About</Link>
          <a href="#footer" className="hover:text-blue-600">Contact</a>
          <Link to="/hotels" className="hover:text-blue-600">Hotels</Link>
          <Link to="/flights" className="hover:text-blue-600">Flights</Link>
          <Link to="/geo" className="hover:text-blue-600">Discover</Link>
        </nav>

        <div className="hidden md:flex items-center gap-4 relative">
          {isLoggedIn ? (
            <>
              <button onClick={() => setShowProfile(!showProfile)}>
                <UserCircle2 className="text-3xl text-gray-700 hover:text-blue-600" />
              </button>
              <button
                onClick={handleLogout}
                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 flex items-center gap-2"
              >
                <LogOut size={16} />
                Logout
              </button>
              {showProfile && (
                <div
                  ref={profileRef}
                  className="absolute top-14 right-0 w-64 bg-white border shadow-lg rounded-md p-4 z-50"
                >
                  <h2 className="text-lg font-semibold mb-1">{user.username}</h2>
                  <p className="text-sm text-gray-600 mb-4">{user.email}</p>
                  <button
                    onClick={() => {
                      navigate("/payment-history");
                      setShowProfile(false);
                    }}
                    className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                  >
                    View Payment History
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link to="/login">
              <button className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-700 transition">
                Login
              </button>
            </Link>
          )}
        </div>

        <button
          onClick={toggleSidebar}
          className="md:hidden text-black focus:outline-none"
        >
          {sidebarOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-3/4 sm:w-1/2 bg-white z-50 shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300`}
      >
        <div className="flex justify-between items-center px-5 py-4 border-b text-black">
          <span className="text-xl font-bold">Menu</span>
          <button onClick={toggleSidebar}>
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col items-start px-6 py-6 space-y-5 text-lg font-medium">
          <Link to="/" onClick={toggleSidebar}>Home</Link>
          <Link to="/about" onClick={toggleSidebar}>About</Link>
          <a href="#footer" onClick={toggleSidebar}>Contact</a>
          <Link to="/hotels" onClick={toggleSidebar}>Hotels</Link>
          <Link to="/flights" onClick={toggleSidebar}>Flights</Link>
          <Link to="/geo" onClick={toggleSidebar}>Discover</Link>

          {isLoggedIn ? (
            <>
              <button
                onClick={() => {
                  navigate("/payment-history");
                  toggleSidebar();
                }}
                className="text-left text-blue-600 hover:underline"
              >
                View Payment History
              </button>
              <button
                onClick={() => {
                  toggleSidebar();
                  handleLogout();
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 w-full text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" onClick={toggleSidebar} className="w-full">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 w-full text-left">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
