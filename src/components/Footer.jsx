import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-gray-300 py-10 rounded-2xl px-6 md:px-16">
      <div className="grid md:grid-cols-2 gap-8 border-b border-gray-600 ">
        
      
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">Yeolpumta</h3>
          <p className="text-sm leading-6">
            Yeolpumta helps you stay productive, manage tasks, and achieve your goals. 
            Join us and make every second count!
          </p>
        </div>

       
       
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
          <div className="flex gap-4 text-2xl">
            <a href="#" className="hover:text-[#83c5be]"><FaFacebook /></a>
            <a href="#" className="hover:text-[#83c5be]"><FaInstagram /></a>
            <a href="#" className="hover:text-[#83c5be]"><FaTwitter /></a>
            <a href="#" className="hover:text-[#83c5be]"><FaLinkedin /></a>
          </div>
        </div>

      </div>

     
      <div className="text-center text-sm text-gray-400 mt-6">
        © 2025 <span className="text-white font-semibold">Eman Awad</span>. All Rights Reserved.
      </div>
    </footer>
  );
}
