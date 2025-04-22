// src/components/Navbar.tsx
'use client';

import React from "react";

// export default function Navbar() {
//   return (
//     <div className="grid grid-cols-7 bg-[#0A2463] p-2"> 
//     <div className="col-span-2 text-center text-xl font-bold text-white">โครงการผลิตบัณฑิตพันธ์ใหม่</div>
//     <div className="col-span-4 flex  gap-10 text-white">
//         <div>Home</div>
//         <div>About Us</div>
//         <div>Courses</div>
//         <div>Admissions</div>
//         <div>News & Events</div>
//         <div>E-learning</div>
//         <div>FAQ</div>
//         <div>Contact</div>
//     </div>
//     <div className="col-span-1 flex justify-center "><button className=" bg-[#39A9DB] rounded-md py-1 px-3 text-white">Apply Now</button></div>
//     </div>
   
//   );
// }
export default function Navbar() {
    return (
      <div className="flex justify-between items-center bg-[#0A2463] py-4 px-10">
        <div className="text-xl font-bold text-white">โครงการผลิตบัณฑิตพันธ์ใหม่</div>
        <div className="flex space-x-6 text-white">
          <div><a href="">Home</a></div>
          <div><a href="/about">About Us</a></div>
          <div>Courses</div>
          <div>Admissions</div>
          <div>News & Events</div>
          <div>E-learning</div>
          <div>FAQ</div>
          <div>Contact</div>
        </div>
        <div>
          <button className="bg-blue-500 rounded-md py-2 px-4 text-white">Apply Now</button>
        </div>
      </div>
    );
  }