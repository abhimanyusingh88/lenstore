import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { AiFillHome } from "react-icons/ai";
import { FaInfoCircle, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

function PageNav({ handleLogout, userName }) {
  return (
    <nav className="flex items-center justify-between p-2 bg-gray-800">
      {/* Logo */}
      <NavLink to="/" className="flex-shrink-0">
        <img src="/logo.png" className="h-10 w-auto md:h-12" alt="Logo" />
      </NavLink>

      {/* Navigation Links */}
      <ul className="flex items-center gap-4 text-white text-sm md:text-base">
        {/* Home */}
        <li>
          <NavLink to="/" className="hover:text-blue-500 flex items-center gap-1">
            <AiFillHome className="text-lg md:text-xl" />
            <span className="hidden sm:inline">Home</span>
          </NavLink>
        </li>
        {/* About */}
        <li>
          <NavLink to="/about" className="hover:text-blue-500 flex items-center gap-1">
            <FaInfoCircle className="text-lg md:text-xl" />
            <span className="hidden sm:inline">About</span>
          </NavLink>
        </li>
        {/* Contact */}
        <li>
          <NavLink to="/contact" className="hover:text-blue-500 flex items-center gap-1">
            <FaPhoneAlt className="text-lg md:text-xl" />
            <span className="hidden sm:inline">Contact</span>
          </NavLink>
        </li>
        {/* Locations */}
        <li>
          <NavLink to="/location" className="hover:text-blue-500 flex items-center gap-1">
            <FaMapMarkerAlt className="text-lg md:text-xl" />
            <span className="hidden sm:inline">Locations</span>
          </NavLink>
        </li>
        {/* User Name */}
        {userName && (
          <li>
            <span className="text-sm md:text-base font-semibold text-yellow-400 bg-gray-700 px-3 py-1 rounded-full shadow-lg truncate max-w-[80px] sm:max-w-none">
              {userName}
            </span>
          </li>
        )}
        {/* Logout Button */}
        {userName && (
          <li>
            <button
              className="text-xs md:text-sm bg-blue-500 rounded-lg px-3 py-1 hover:bg-blue-600 transition-all"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

PageNav.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  userName: PropTypes.string,
};

export default PageNav;
