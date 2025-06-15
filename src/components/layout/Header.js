import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { Menu as MenuIcon, User, LogOut } from "lucide-react";
import useAuth from "../../hooks/useAuth";

const Header = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="flex items-center justify-between h-16  border-b border-gray-500 p-4 bg-white dark:bg-gray-900 shadow-md z-20">
      <button
        onClick={onMenuClick}
        className="text-gray-500 dark:text-gray-300 focus:outline-none md:hidden"
        aria-label="Open mobile menu"
      >
        <MenuIcon className="h-6 w-6" />
      </button>

      <div className="hidden md:block flex-grow" />

      <div className="relative">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center items-center rounded-md px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              <User className="mr-2 h-5 w-5" />
              <span>{user?.name || "User"}</span>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 dark:divide-gray-600 rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleLogout}
                      className={`${
                        active
                          ? "bg-indigo-500 text-white"
                          : "text-gray-900 dark:text-gray-200"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <LogOut className="mr-2 h-5 w-5" aria-hidden="true" />
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </header>
  );
};

Header.propTypes = {
  onMenuClick: PropTypes.func.isRequired,
};

export default Header;
