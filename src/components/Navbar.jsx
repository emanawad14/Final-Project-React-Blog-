
import React, { useEffect, useState } from "react";
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
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export default function Navbar() {
  const [isLogged, setIsLogged] = useState(false);
  const [userName, setUserName] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  let {setIsLoggedIn , isLoggedIn , setUserData}=useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("userName");
    if (token && name) {
      setIsLogged(true);
      setUserName(name);
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(null)
    setUserData(null)
    localStorage.removeItem("userName");
    setIsLogged(false);
    setUserName("");
    navigate("/login");
  }

  return (
    <HeroUi isBordered  className="bg-[#0f172a] rounded-2xl text-white" position="static">
      <NavbarBrand>
        <Link to={'/'} className="font-bold text-3xl outline-0 ">Yeolpumta</Link>
      </NavbarBrand>

    
      <NavbarContent justify="end" className="hidden md:flex gap-4">
        {isLogged ? (
          <>
            <NavbarItem>
              <span className="font-semibold">Hi {userName}</span>
            </NavbarItem>
            <NavbarItem
              className="cursor-pointer text-red-600 hover:text-red-700"
              onClick={handleLogout}
            >
              Logout
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem>
              <NavLink className={({ isActive }) =>
                  `px-4 py-2 rounded-full transition ${
                    isActive
                      ? "bg-white text-black font-bold"
                      : "bg-[#006d77] text-white "
                  }`
                } to={"/register"}>Register</NavLink>
            </NavbarItem>
            <NavbarItem>
              <NavLink  className={({ isActive }) =>
                  `px-4 py-2 rounded-full transition ${
                    isActive
                      ? "bg-white text-black font-bold"
                      : "bg-[#006d77] text-white "
                  }`
                } to={"/login"}>Login</NavLink>
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
        {isLogged ? (
          <>
            <NavbarMenuItem>
              <span className="font-semibold">Hi {userName}</span>
            </NavbarMenuItem>
            <NavbarMenuItem
              className="cursor-pointer text-red-600"
              onClick={handleLogout}
            >
              Logout
            </NavbarMenuItem>
          </>
        ) : (
          <>
            <NavbarMenuItem>
              <NavLink    className={({ isActive }) =>
                  isActive
                   ? "text-#006d77 font-bold"
                    : "text-#83c5be hover:text-gray-400"
                } to={"/register"} onClick={() => setMenuOpen(false)}>
                Register
              </NavLink>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <NavLink     className={({ isActive }) =>
                  isActive
                    ? "text-#006d77 font-bold"
                    : "text-#83c5be hover:text-gray-400"
                } to={"/login"} onClick={() => setMenuOpen(false)}>
                Login
              </NavLink>
            </NavbarMenuItem>
          </>
        )}
      </NavbarMenu>
    </HeroUi>
  );
}

