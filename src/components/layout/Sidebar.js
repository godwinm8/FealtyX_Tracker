import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, X } from "lucide-react";
import useAuth from "../../hooks/useAuth";

const navLinks = [
  {
    to: "/",
    icon: LayoutDashboard,
    text: "Dashboard",
    roles: ["Developer", "Manager"],
  },
];

const Sidebar = ({ isMobileOpen, toggleMenu }) => {
  const { user } = useAuth();

  const activeLinkStyle = "bg-indigo-500 hover:bg-indigo-400 text-white";
  const inactiveLinkStyle =
    "text-white bg-indigo-500 hover:bg-indigo-400 hover:text-white";

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-500">
        <h1 className="text-xl font-bold text-white">FealtyX Tracker</h1>
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-300 hover:text-white"
          aria-label="Close menu"
        >
          <X size={24} />
        </button>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-2">
        {navLinks
          .filter((link) => user && link.roles.includes(user.role))
          .map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={isMobileOpen ? toggleMenu : undefined}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  isActive ? activeLinkStyle : inactiveLinkStyle
                }`
              }
            >
              <link.icon className="mr-3 h-6 w-6" />
              {link.text}
            </NavLink>
          ))}
      </nav>

      <div className="px-4 py-2 mt-auto border-t  border-gray-500">
        <p className="text-xs text-gray-200">
          Logged in as: <span className="font-semibold">{user?.name}</span>
          <br />
          Role: <span className="font-semibold">{user?.role}</span>
        </p>
      </div>
    </div>
  );

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={toggleMenu}
          aria-hidden="true"
        ></div>
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white transform ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 md:flex-shrink-0 transition-transform duration-300 ease-in-out z-30`}
      >
        {sidebarContent}
      </aside>
    </>
  );
};

Sidebar.propTypes = {
  isMobileOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};

export default Sidebar;
