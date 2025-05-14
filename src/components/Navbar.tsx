"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const registerUrl = process.env.NEXT_PUBLIC_REGISTER || "#";
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const menuItems = [
    { name: "หน้าแรก", path: "/" },
    { name: "เกี่ยวกับโครงการ", path: "/about" },
    { name: "เนื้อหา", path: "/courses" },
    { name: "การรับสมัคร", path: "/admissions" },
    { name: "ข่าวสารและกิจกรรม", path: "/newandevent" },
    { name: "อีเลิร์นนิง", path: "/elearning" },
    { name: "ถาม-ตอบ", path: "/qanda" },
    { name: "ติดต่อเรา", path: "/contact" },
  ];

  const isActive = (path) => pathname === path;

  if (!mounted) return null;

  return (
    <nav className="bg-[#0A2463] py-4 px-4 md:px-10" aria-label="เมนูหลัก" role="navigation">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <a href="/">  
          <div className="text-lg md:text-xl font-bold text-white">
            โครงการผลิตบัณฑิตพันธ์ใหม่ (แม่โจ้)
          </div>
        </a>

        {/* Mobile Menu Button */}
        <div className="xl:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
            aria-label={isMenuOpen ? "ปิดเมนู" : "เปิดเมนู"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
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
                className={`hover:text-blue-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded ${
                  isActive(item.path) ? "text-blue-400" : ""
                }`}
                aria-current={isActive(item.path) ? "page" : undefined}
              >
                {item.name}
              </a>
            </div>
          ))}
        </div>

        {/* Apply Button - Desktop */}
        <div className="hidden xl:block">
          <a href={registerUrl} className="w-full">
            <button className="bg-blue-500 hover:bg-blue-600 rounded-md py-2 px-4 text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
              เข้าร่วมกับเรา
            </button>
          </a>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div id="mobile-menu" className="xl:hidden mt-4 flex flex-col space-y-3 text-white" role="menu">
          {menuItems.map((item) => (
            <a 
              key={item.path}
              href={item.path}
              className={`py-2 px-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                isActive(item.path)
                  ? "bg-blue-800 text-blue-400"
                  : "hover:bg-blue-800"
              }`}
              aria-current={isActive(item.path) ? "page" : undefined}
              role="menuitem"
              tabIndex={0}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
          <a href={registerUrl} className="w-full" role="menuitem" tabIndex={0} onClick={() => setIsMenuOpen(false)}>
            <button className="bg-blue-500 hover:bg-blue-600 rounded-md py-2 px-4 text-white transition-colors w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
              เข้าร่วมกับเรา
            </button>
          </a>
        </div>
      )}
    </nav>
  );
}
