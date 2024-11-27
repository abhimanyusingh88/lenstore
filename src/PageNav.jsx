import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";  // Import PropTypes
import { AiFillHome } from "react-icons/ai"; // Import home icon

function PageNav({ handleLogout, userName }) {
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800">
      <NavLink to="/">
        <img src="/logo.png" className="h-[60px] w-[130px]" alt="Logo" />
      </NavLink>
      <ul className="flex gap-4 items-center text-white">
        <li>
          <NavLink to="/" className="hover:text-blue-500 flex items-center gap-2">
            <AiFillHome className="text-2xl" /> {/* Home Icon */}
            <h4 className="text-xl font-sans hidden md:block">Home</h4> {/* Text hidden on small screens */}
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className="hover:text-blue-500">
            <h4 className="text-xl font-sans">About</h4>
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className="text-xl font-sans hover:text-blue-500">
            Contact
          </NavLink>
        </li>
        <li>
          <NavLink to="/location" className="text-xl font-sans hover:text-blue-500">
            Locations
          </NavLink>
        </li>
        {/* Show the user's name when logged in */}
        {userName && (
          <li>
            <span className="text-xl font-semibold text-yellow-400 bg-gray-700 px-4 py-2 rounded-full shadow-lg">
              {userName}
            </span>
          </li>
        )}
        {/* Logout Button as part of the ul */}
        {userName && (
          <li>
            <div
              className="text-white text-lg bg-blue-500 rounded-lg px-4 py-2 cursor-pointer hover:bg-blue-600 transition-all duration-200"
              onClick={handleLogout}
            >
              Logout
            </div>
          </li>
        )}
      </ul>
    </nav>
  );
}

// Add prop types validation
PageNav.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  userName: PropTypes.string,
};

export default PageNav;
