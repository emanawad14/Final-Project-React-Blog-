import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AuthLayout() {
  return (

   
    <>
    
     <Navbar/>
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <Outlet />
    </div>
    </>
  );
}
