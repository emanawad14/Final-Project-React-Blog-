// import React, { useState } from 'react'
// import {Navbar as HeroUi, NavbarBrand, NavbarContent, NavbarItem} from "@heroui/react";
// import { NavLink } from 'react-router-dom';

// export default function Navbar() {

//   const [isLogged, setIsLogged] = useState(localStorage.getItem('token')!=null)


//   return (
//     <HeroUi position="static">
//       <NavbarBrand>
       
//         <p className="font-bold text-inherit">Linked In</p>
//       </NavbarBrand>

      
      

//       <NavbarContent justify="end">

//         {isLogged  ?  <NavbarItem >
         
//           LogOut
         
//         </NavbarItem> 
        
//       :   
      
//       <>
//         <NavbarItem >
//           <NavLink to={'/register'}>
//           Register
//           </NavLink>
//         </NavbarItem>
//        <NavbarItem >
//           <NavLink to={'/login'}>
//           Login
//           </NavLink>
//         </NavbarItem>
//       </>}
      
      
       
//       </NavbarContent>
//     </HeroUi>
//   )
// }




//**************************************************** *

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
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export default function Navbar() {
  const [isLogged, setIsLogged] = useState(false);
  const [userName, setUserName] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  let {setIsLoggedIn , isLoggedIn}=useContext(AuthContext);

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
    localStorage.removeItem("userName");
    setIsLogged(false);
    setUserName("");
    navigate("/login");
  }

  return (
    <HeroUi isBordered position="static">
      <NavbarBrand>
        <p className="font-bold text-inherit">Linked In</p>
      </NavbarBrand>

      {/* Desktop Menu */}
      <NavbarContent justify="end" className="hidden md:flex gap-4">
        {isLogged ? (
          <>
            <NavbarItem>
              <span className="font-semibold">Hi {userName}</span>
            </NavbarItem>
            <NavbarItem
              className="cursor-pointer text-red-600"
              onClick={handleLogout}
            >
              Logout
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem>
              <NavLink to={"/register"}>Register</NavLink>
            </NavbarItem>
            <NavbarItem>
              <NavLink to={"/login"}>Login</NavLink>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      {/* Mobile Menu Button */}
      <NavbarMenuToggle
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        className="md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
      />

      {/* Mobile Menu */}
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

