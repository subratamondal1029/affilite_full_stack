import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const Header = () => {
  const [userData] = useContext(AuthContext);

  return (
    <header className="w-full bg-gray-950 p-3 text-xl flex justify-end items-center gap-12 pr-20 min-h-16">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${isActive ? "text-orange-500" : "text-white"} hover:text-orange-500`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/product/1"
        className={({ isActive }) =>
          `${isActive ? "text-orange-500" : "text-white"} hover:text-orange-500`
        }
      >
        Product
      </NavLink>
      <NavLink
        to="/user"
        className={({ isActive }) =>
          `${isActive ? "text-orange-500" : "text-white"} hover:text-orange-500`
        }
      >
        User
      </NavLink>
      {userData.isLogin || (
        <NavLink
          to={"/login"}
          className={({ isActive }) =>
            `${isActive ? "bg-gray-900 text-orange-400" : "bg-gray-800"} ml-10 p-2 rounded-md`
          }
        >
          Login
        </NavLink>
      )}
    </header>
  );
};

export default Header;
