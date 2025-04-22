import Image from "next/image";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck,faUser} from '@fortawesome/free-regular-svg-icons';
import { faBullseye,faAward } from '@fortawesome/free-solid-svg-icons';
export default function Home() {
  return (
    <div>
    <div className=" bg-[#0A2463] h-70  text-white p-10 md:p-20 ">
        <div className="text-3xl font-bold">About The Program</div>
        <div className="text-wrap max-w-2xl text-lg mt-5">Building Thailand's future workforce through innovative education and industry partnerships.</div>
    </div>
    <div className=" bg-[#F9FAFB] p-10 md:p-20 grid grid-cols-1 md:grid-cols-2">
        <div className="pr-0 md:pr-10">
            <div className="text-2xl font-bold">Our Mission</div>
            <div className="mt-3 text-sm">The Thailand 4.0 Graduate Training Program aims to create high-performance personnel in the New Growth Engine industry according to the Thailand 4.0 policy and reform Thai higher education. We work to bridge the gap between academic knowledge and industry needs by providing practical, hands-on training in  technologies and business practices.</div>
            <div className="text-sm mt-3">Our program is designed to produce graduates who are not only technically proficient but also possess the critical thinking, problem-solving, and entrepreneurial skills needed to drive innovation and economic growth in Thailand's key industries.</div>
        </div>
        <div className="px-0 md:px-5  mt-5 md:mt-0">
        <div className="text-2xl font-bold">Our Vision</div>
        <div className="mt-3 text-sm">We envision Thailand as a hub for innovation and technological advancement in Southeast Asia, with a highly skilled workforce driving economic growth and sustainable development across all sectors.</div>
        <div className="text-sm mt-3">Through our program, we aim to contribute to the transformation of Thailand into a value-based economy that is driven by innovation, technology, and creativity, in line with the government's Thailand 4.0 economic model.</div>
        </div>
    </div>
    <div className="bg-[#F9FAFB] p-8 md:p-12 py-10 rounded-lg shadow-sm">
      <h2 className="text-center text-2xl font-bold text-blue-900 mb-8">Program Objectives</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Objective 1 */}
        <div className="border border-gray-200 rounded-lg p-6 shadow-sm flex gap-2 ">
          {/* <div className="flex items-center mb-3">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              1
            </div>
            <h3 className="font-bold text-blue-800">Develop Industry-Ready Skills</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Equip graduates with practical skills and knowledge that align with the 
            needs of Thailand's targeted S-Curve industries, ensuring immediate 
            employability and value addition to employers.
          </p> */}
          <div className=" p-2"><div className="bg-blue-100 p-2 rounded-full"><FontAwesomeIcon icon={faBullseye} className="bg-blue-100" style={{color: "#002594" , width: "20px", height: "20px"}} /></div></div>
          <div>
            <div className="text-lg font-bold text-[#0A2463]">Develop Industry-Ready Skills</div>
            <div className="my-2 text-sm">Equip graduates with practical skills and knowledge that align with the 
            needs of Thailand's targeted S-Curve industries, ensuring immediate 
            employability and value addition to employers.</div>
            </div>
        </div>
        
        {/* Objective 2 */}
        <div className="border border-gray-200 rounded-lg p-6 shadow-sm flex gap-2">
          {/* <div className="flex items-center mb-3">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              2
            </div>
            <h3 className="font-bold text-blue-800">Foster Innovation</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Cultivate a mindset of innovation and entrepreneurship among 
            participants, encouraging them to develop new solutions to real-world 
            problems and create value-added products and services.
          </p> */}
          <div className=" p-2"><div className="bg-blue-100 p-2 rounded-full"><FontAwesomeIcon icon={faCircleCheck} className="bg-blue-100" style={{color: "#002594" , width: "20px", height: "20px"}} /></div></div>
          <div>
            <div className="text-lg font-bold text-[#0A2463]">Foster Innovation</div>
            <div className="my-2 text-sm">Cultivate a mindset of innovation and entrepreneurship among 
            participants, encouraging them to develop new solutions to real-world 
            problems and create value-added products and services.</div>
            </div>
        </div>
        
        {/* Objective 3 */}
        <div className="border border-gray-200 rounded-lg p-6 shadow-sm flex gap-2">
          
          <div className=" p-2"><div className="bg-blue-100 p-2 rounded-full"><FontAwesomeIcon icon={faUser} className="bg-blue-100" style={{color: "#002594" , width: "20px", height: "20px"}} /></div></div>
          <div>
            <div className="text-lg font-bold text-[#0A2463]">Strengthen Industry-Academia Collaboration</div>
            <div className="my-2 text-sm"> Build strong partnerships between educational institutions and industry real-
            players to ensure curriculum relevance and provide students with 
            experience through internships and collaborative projects.</div>
            </div>
        </div>
        
        {/* Objective 4 */}
        <div className="border border-gray-200 rounded-lg p-6 shadow-sm flex gap-2">
          {/* <div className="flex items-center mb-3">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              4
            </div>
            <h3 className="font-bold text-blue-800">Support Economic Transformation</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Contribute to Thailand's economic transformation by producing skilled 
            professionals who can drive growth in high-value industries and help 
            the country escape the middle-income trap.
          </p> */}
            <div className=" p-2"><div className="bg-blue-100 p-2 rounded-full"><FontAwesomeIcon icon={faAward} className="bg-blue-100" style={{color: "#002594" , width: "20px", height: "20px"}} /></div></div>
          <div>
            <div className="text-lg font-bold text-[#0A2463]">Support Economic Transformation</div>
            <div className="my-2 text-sm"> Contribute to Thailand's economic transformation by producing skilled 
            professionals who can drive growth in high-value industries and help 
            the country escape the middle-income trap.</div>
            </div>
        </div>
      </div>
    </div>
    <div className=" bg-[#F9FAFB] p-10 md:p-20 ">
    <h2 className="text-center text-2xl font-bold text-blue-900 mb-8">Program Sponsors</h2>
    <div className="flex flex-wrap justify-center">
    <div className="text-center w-55 h-32 p-5 bg-white shadow-md rounded-lg m-4 flex items-center justify-center">
      <div>Ministry of Education</div>
    </div>
    
    <div className="text-center w-55 h-32 p-5 bg-white shadow-md rounded-lg m-4 flex items-center justify-center">
      <div>Ministry of Digital Economy</div>
    </div>
    
    <div className="text-center w-55 h-32 p-5 bg-white shadow-md rounded-lg m-4 flex items-center justify-center">
      <div>National Science and Technology Development Agency</div>
    </div>
    
    <div className="text-center w-55 h-32 p-5 bg-white shadow-md rounded-lg m-4 flex items-center justify-center">
      <div>Digital Economy Promotion Agency</div>
    </div>
    
    <div className="text-center w-55 h-32 p-5 bg-white shadow-md rounded-lg m-4 flex items-center justify-center">
      <div>Thailand Board of Investment</div>
    </div>
  </div>
    </div>
    <div className="bg-[#F9FAFB] container mx-auto px-4 py-8">
  <h2 className="text-center text-blue-800 text-2xl font-bold mb-10">Our History</h2>
  
  <div className="relative max-w-3xl mx-auto">
   
    <div className="absolute left-6 top-6 bottom-40 md:bottom-20 w-1 bg-blue-200"></div>
    
   
    <div className="relative mb-12">
      <div className="flex items-start">
        <div className="absolute left-6 transform -translate-x-1/2 mt-1.5">
          <div className="w-6 h-6 bg-blue-400 rounded-full"></div>
        </div>
        <div className="ml-16">
          <h3 className="text-lg font-semibold text-blue-800">2020: Program Inception</h3>
          <p className="text-gray-500 text-sm">January 2020</p>
          <p className="mt-2 text-gray-700">
            The Thailand 4.0 Graduate Training Program was established as part of the government's initiative to reform higher 
            education and prepare graduates for the changing job market driven by technological advancement.
          </p>
        </div>
      </div>
    </div>
    
    
    <div className="relative mb-12">
      <div className="flex items-start">
        <div className="absolute left-6 transform -translate-x-1/2 mt-1.5">
          <div className="w-6 h-6 bg-blue-400 rounded-full"></div>
        </div>
        <div className="ml-16">
          <h3 className="text-lg font-semibold text-blue-800">2021: First Cohort</h3>
          <p className="text-gray-500 text-sm">June 2021</p>
          <p className="mt-2 text-gray-700">
            The program welcomed its first cohort of 200 students across five universities in Thailand, offering courses in Artificial
            Intelligence, Robotics, and Digital Innovation.
          </p>
        </div>
      </div>
    </div>
    
   
    <div className="relative mb-12">
      <div className="flex items-start">
        <div className="absolute left-6 transform -translate-x-1/2 mt-1.5">
          <div className="w-6 h-6 bg-blue-400 rounded-full"></div>
        </div>
        <div className="ml-16">
          <h3 className="text-lg font-semibold text-blue-800">2022: Industry Partnerships</h3>
          <p className="text-gray-500 text-sm">March 2022</p>
          <p className="mt-2 text-gray-700">
            The program established partnerships with over 50 leading companies in Thailand's technology sector, creating internship
            opportunities and collaborative research projects for students.
          </p>
        </div>
      </div>
    </div>
    
    
    <div className="relative mb-12">
      <div className="flex items-start">
        <div className="absolute left-6 transform -translate-x-1/2 mt-1.5">
          <div className="w-6 h-6 bg-blue-400 rounded-full"></div>
        </div>
        <div className="ml-16">
          <h3 className="text-lg font-semibold text-blue-800">2023: Program Expansion</h3>
          <p className="text-gray-500 text-sm">September 2023</p>
          <p className="mt-2 text-gray-700">
            The program expanded to include 10 universities nationwide and introduced new courses in Biotechnology, Smart
            Electronics, and Advanced Agriculture to support all S-Curve industries.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
  );
}


