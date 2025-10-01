
import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import {  FaEnvelope, FaVenusMars, FaBirthdayCake } from "react-icons/fa";

export default function ProfilePage() {
  const { userData } = useContext(AuthContext);

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-600">Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-10 px-4 ">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-2xl relative">
     
        <div className="h-32 w-full rounded-2xl bg-gradient-to-r from-[#006d77] to-[#83c5be] absolute top-0 left-0"></div>

       
        <div className="relative flex flex-col items-center mt-20">
          <img
            src={`https://ui-avatars.com/api/?name=${userData.name}&background=006d77&color=fff&size=150`}
            alt="User Avatar"
            className="w-32 h-32 rounded-full border-4 border-white shadow-md"
          />
          <h1 className="text-2xl font-bold text-gray-900 mt-4">
            {userData.name}
          </h1>
          <p className="text-gray-500">@{userData.username || userData.name}</p>
        </div>

      
        <div className="mt-8 space-y-6">
          <div className="flex items-center gap-4 text-gray-700">
            <FaEnvelope className="text-[#006d77] text-xl" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold">{userData.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-gray-700">
            <FaVenusMars className="text-[#006d77] text-xl" />
            <div>
              <p className="text-sm text-gray-500">Gender</p>
              <p className="font-semibold">{userData.gender || "Not specified"}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-gray-700">
            <FaBirthdayCake className="text-[#006d77] text-xl" />
            <div>
              <p className="text-sm text-gray-500">Date of Birth</p>
              <p className="font-semibold">{userData.dateOfBirth || "Not specified"}</p>
            </div>
          </div>
        </div>

     
        <div className="mt-8 flex justify-center gap-4">
          <button className="px-6 py-2 bg-[#006d77] text-white rounded-full shadow hover:bg-[#0f172a] transition">
            Edit Profile
          </button>
          <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full shadow hover:bg-gray-300 transition">
            Settings
          </button>
        </div>
      </div>
    </div>
  );
}
