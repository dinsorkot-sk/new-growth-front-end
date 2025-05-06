// src/components/Navbar.tsx
'use client';

// import React from "react";

// export default function Navbar() {
//     return (
//       <div className="flex justify-between items-center bg-[#0A2463] py-4 px-10">
//         <div className="text-xl font-bold text-white">โครงการผลิตบัณฑิตพันธ์ใหม่</div>
//         <div className="flex space-x-6 text-white">
//           <div><a href="">Home</a></div>
//           <div><a href="/about">About Us</a></div>
//           <div>Courses</div>
//           <div>Admissions</div>
//           <div>News & Events</div>
//           <div>E-learning</div>
//           <div>FAQ</div>
//           <div>Contact</div>
//         </div>
//         <div>
//           <button className="bg-blue-500 rounded-md py-2 px-4 text-white">เข้าร่วมกับเรา</button>
//         </div>
//       </div>
//     );
//   }

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePath, setActivePath] = useState("");

  useEffect(() => {
    // Get current path for highlighting active menu item
    setActivePath(window.location.pathname);
  }, []);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Courses", path: "/courses" },
    { name: "Admissions", path: "/admissions" },
    { name: "News & Events", path: "/newandevent" },
    { name: "E-learning", path: "/elearning" },
    { name: "Q & A", path: "/qanda" },
    { name: "Contact", path: "/contact" }
  ];

  const isActive = (path) => {
    return activePath === path;
  };

  return (
    <nav className="bg-[#0A2463] py-4 px-4 md:px-10">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="text-lg md:text-xl font-bold text-white">
          โครงการผลิตบัณฑิตพันธ์ใหม่
        </div>

        {/* Mobile Menu Button */}
        <div className="xl:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden xl:flex space-x-6 text-white">
          {menuItems.map((item) => (
            <div key={item.path}>
              <a 
                href={item.path}
                className={`hover:text-blue-300 transition-colors ${
                  isActive(item.path) ? "text-blue-400" : ""
                }`}
              >
                {item.name}
              </a>
            </div>
          ))}
        </div>

        {/* Apply Button - Desktop */}
        <div className="hidden xl:block">
        <a href={`${process.env.NEXT_PUBLIC_REGISTER}`} className="w-full">
          <button  className="bg-blue-500 hover:bg-blue-600 rounded-md py-2 px-4 text-white transition-colors">
          เข้าร่วมกับเรา
          </button>
          </a>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="xl:hidden mt-4 flex flex-col space-y-3 text-white">
          {menuItems.map((item) => (
            <a 
              key={item.path}
              href={item.path}
              className={`py-2 px-2 rounded-md ${
                isActive(item.path) ? "bg-blue-800 text-blue-400" : "hover:bg-blue-800"
              }`}
            >
              {item.name}
            </a>
          ))}
          
          <a href={`${process.env.NEXT_PUBLIC_REGISTER}`} className="w-full">
          <button  className="bg-blue-500 hover:bg-blue-600 rounded-md py-2 px-4 text-white transition-colors w-full">
          เข้าร่วมกับเรา
          </button>
          </a>
          
        </div>
      )}
    </nav>
  );
}