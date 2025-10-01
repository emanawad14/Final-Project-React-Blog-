import React, { useState, useContext } from "react";
import {
  Navbar as HeroUi,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { motion } from "framer-motion";
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  let { setIsLoggedIn, isLoggedIn, setUserData, userData } = useContext(AuthContext);

  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(null);
    setUserData(null);
    navigate("/login");
  }

  return (
    <HeroUi isBordered className="bg-[#0f172a] rounded-2xl text-white" position="static">
     
      <NavbarBrand>
        <Link
          to={"/"}
          className="font-bold text-3xl outline-0 flex items-center gap-1"
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="text-4xl bg-white p-2 rounded-2xl  text-[#83c5be] drop-shadow-lg"
          >
            Y
          </motion.span>
          <span className="tracking-wide">eolpumta</span>
        </Link>
      </NavbarBrand>
     
      <NavbarContent justify="end" className="hidden md:flex gap-4">
        {isLoggedIn && userData ? (
          <>
            <NavbarItem>
              <span className="font-semibold">Hi {userData.name}</span>
            </NavbarItem>

            <NavbarItem>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full  transition ${
                    isActive
                      ? "bg-white text-black font-bold"
                      : "bg-[#83c5be] text-white hover:bg-[#006d77]"
                  }`
                }
              >
                Profile
              </NavLink>
            </NavbarItem>

            <NavbarItem
              className="cursor-pointer font-bold text-red-600  hover:text-red-700"
              onClick={handleLogout}
            >
              Logout
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem>
              <NavLink
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full transition ${
                    isActive
                      ? "bg-white text-black font-bold"
                      : "bg-[#006d77] text-white "
                  }`
                }
                to={"/register"}
              >
                Register
              </NavLink>
            </NavbarItem>
            <NavbarItem>
              <NavLink
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full transition ${
                    isActive
                      ? "bg-white text-black font-bold"
                      : "bg-[#006d77] text-white "
                  }`
                }
                to={"/login"}
              >
                Login
              </NavLink>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

     
      <NavbarMenuToggle
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        className="md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
      />

  
      <NavbarMenu>
        {isLoggedIn && userData ? (
          <>
            <NavbarMenuItem>
              <span className="font-semibold">Hi {userData.name}</span>
            </NavbarMenuItem>

            <NavbarMenuItem>
              <NavLink to="/profile" onClick={() => setMenuOpen(false)}>
                Profile
              </NavLink>
            </NavbarMenuItem>

            <NavbarMenuItem
              className="cursor-pointer  text-red-600"
              onClick={handleLogout}
            >
              Logout
            </NavbarMenuItem>
          </>
        ) : (
          <>
            <NavbarMenuItem>
              <NavLink to={"/register"} onClick={() => setMenuOpen(false)}>
                Register
              </NavLink>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <NavLink to={"/login"} onClick={() => setMenuOpen(false)}>
                Login
              </NavLink>
            </NavbarMenuItem>
          </>
        )}
      </NavbarMenu>
    </HeroUi>
  );
}
