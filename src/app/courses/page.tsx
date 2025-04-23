
'use client'

import React, { useState } from 'react';
import { Search, Filter, ArrowRight, Clock, Calendar, Users } from 'lucide-react';
export default function Home() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('All');
    
    const courses = [
      {
        id: 1,
        title: 'Artificial Intelligence and Machine Learning',
        instructor: 'Dr. Somchai Jaklee',
        weeks: 12,
        date: 'Feb 15, 2024',
        students: 120,
        category: 'AI & Data',
        image: 'https://cdn-cakae.nitrocdn.com/HNXbhKzVPUNXWpRTNzWDzAgzHZYmqDrJ/assets/images/optimized/rev-b9ddf3b/zortout.com/wp-content/uploads/2020/08/consumers-isometric-composition_1284-26384.jpg'
      },
      {
        id: 2,
        title: 'Robotics and Automation Systems',
        instructor: 'Prof. Adisya Thongchai',
        weeks: 16,
        date: 'Mar 1, 2024',
        students: 85,
        category: 'Robotics',
        image: 'https://cdn-cakae.nitrocdn.com/HNXbhKzVPUNXWpRTNzWDzAgzHZYmqDrJ/assets/images/optimized/rev-b9ddf3b/zortout.com/wp-content/uploads/2020/08/consumers-isometric-composition_1284-26384.jpg'
      },
      {
        id: 3,
        title: 'Digital Innovation and Entrepreneurship',
        instructor: 'Dr. Chai Wattana',
        weeks: 10,
        date: 'Jan 20, 2024',
        students: 150,
        category: 'Business',
        image: 'https://cdn-cakae.nitrocdn.com/HNXbhKzVPUNXWpRTNzWDzAgzHZYmqDrJ/assets/images/optimized/rev-b9ddf3b/zortout.com/wp-content/uploads/2020/08/consumers-isometric-composition_1284-26384.jpg'
      },
      {
        id: 4,
        title: 'Advanced Data Analytics for Business',
        instructor: 'Dr. Siriwat Maneerat',
        weeks: 14,
        date: 'Feb 7, 2024',
        students: 95,
        category: 'AI & Data',
        image: 'https://cdn-cakae.nitrocdn.com/HNXbhKzVPUNXWpRTNzWDzAgzHZYmqDrJ/assets/images/optimized/rev-b9ddf3b/zortout.com/wp-content/uploads/2020/08/consumers-isometric-composition_1284-26384.jpg'
      },
      {
        id: 5,
        title: 'IoT Applications for Smart Cities',
        instructor: 'Prof. Thaksin Wongsuwan',
        weeks: 12,
        date: 'Mar 15, 2024',
        students: 75,
        category: 'IoT',
        image: 'https://cdn-cakae.nitrocdn.com/HNXbhKzVPUNXWpRTNzWDzAgzHZYmqDrJ/assets/images/optimized/rev-b9ddf3b/zortout.com/wp-content/uploads/2020/08/consumers-isometric-composition_1284-26384.jpg'
      },
      {
        id: 6,
        title: 'Biotechnology and Genomics',
        instructor: 'Dr. Malee Suwannaporn',
        weeks: 20,
        date: 'Jan 10, 2024',
        students: 60,
        category: 'Biotech',
        image: 'https://cdn-cakae.nitrocdn.com/HNXbhKzVPUNXWpRTNzWDzAgzHZYmqDrJ/assets/images/optimized/rev-b9ddf3b/zortout.com/wp-content/uploads/2020/08/consumers-isometric-composition_1284-26384.jpg'
      }
    ];
  
    const categories = ['All', 'AI & Data', 'Robotics', 'Business', 'IoT', 'Biotech'];
  
    const filteredCourses = courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filter === 'All' || course.category === filter;
      return matchesSearch && matchesFilter;
    });
  return (
    <div>
    <div className=" bg-[#0A2463] h-70  text-white py-10 md:py-20 px-14 xl:px-20 ">
        <div className="text-3xl font-bold">หลักสูตรของเรา</div>
        <div className="text-wrap max-w-2xl text-base mt-5">ค้นพบโปรแกรมการฝึกอบรมที่เน้นอุตสาหกรรมของเราซึ่งออกแบบมาเพื่อเตรียมคุณให้พร้อมสำหรับอุตสาหกรรม New Growth Engine ของประเทศไทย</div>
    </div>
    <div className=" bg-[#F9FAFB] p-10 md:p-10 ">
    <div className="min-h-screen bg-gray-50 p-4 ">
      <div className=" mx-auto">
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="relative w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search courses or instructors..."
              className="w-full border border-gray-300 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto justify-center">
            <Filter className="h-5 w-5 text-gray-600" />
            <select 
              className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Courses Header */}
        <h1 className="text-2xl font-bold text-blue-900 mb-6">All Courses</h1>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
              <div className="relative">
                <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                <span className="absolute top-4 left-4 bg-[#39A9DB] text-white text-xs font-semibold px-2 py-1 rounded-xl">
                  {course.category}
                </span>
              </div>
              
              <div className="p-4 flex-grow">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-4">Instructor: {course.instructor}</p>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-auto">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.weeks} weeks</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{course.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{course.students} students</span>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-100 p-4">
                <button className="flex items-center text-blue-600 font-medium text-sm hover:text-blue-800">
                  View Details
                  <ArrowRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
    
    <div className="bg-[#FFFFFF] px-14 md:px-14 py-10 rounded-lg shadow-sm">
          <h2 className="text-center text-2xl font-bold text-blue-900 mb-8">Course Categories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Objective 1 */}
            <div className="border border-gray-200 rounded-lg p-6 shadow-sm flex gap-2  bg-[#E5E7EB]">
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
             
              <div>
                <div className="text-lg font-bold text-[#0A2463]">AI & Data Science</div>
                <div className="my-2 text-sm text-[#4B5563]">Learn machine learning, data analytics, and artificial intelligence applications for various industries.</div>
                <div className='text-[#39A9DB] text-sm'>View Business Courses</div>
                </div>
            </div>
            
            {/* Objective 2 */}
            <div className="border border-gray-200 rounded-lg p-6 shadow-sm flex gap-2 bg-[#E5E7EB]">
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
              
              <div>
                <div className="text-lg font-bold text-[#0A2463]">Robotics & Automation</div>
                <div className="my-2 text-sm text-[#4B5563]">Develop skills in robotics engineering, industrial automation, and smart manufacturing systems.</div>
                <div className='text-[#39A9DB] text-sm'>View Business Courses</div>
                </div>
            </div>
            
            {/* Objective 3 */}
            <div className="border border-gray-200 rounded-lg p-6 shadow-sm flex gap-2 bg-[#E5E7EB]">
              
              
              <div>
                <div className="text-lg font-bold text-[#0A2463]">Digital Innovation</div>
                <div className="my-2 text-sm text-[#4B5563]"> Explore digital transformation, entrepreneurship, and business model innovation for the digital economy.</div>
                <div className='text-[#39A9DB] text-sm'>View Business Courses</div>
                </div>
            </div>
            
            {/* Objective 4 */}
            <div className="border border-gray-200 rounded-lg p-6 shadow-sm flex gap-2 bg-[#E5E7EB]">
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
                
              <div>
                <div className="text-lg font-bold text-[#0A2463]">Internet of Things</div>
                <div className="my-2 text-sm text-[#4B5563]"> Master IoT technologies, smart devices, and connected systems for various applications.</div>
                <div className='text-[#39A9DB] text-sm'>View Business Courses</div>
                </div>
            </div>
             {/* Objective 5 */}
             <div className="border border-gray-200 rounded-lg p-6 shadow-sm flex gap-2 bg-[#E5E7EB]" >
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
                
              <div>
                <div className="text-lg font-bold text-[#0A2463]">Biotechnology</div>
                <div className="my-2 text-sm text-[#4B5563]"> Study advanced biotechnology, genomics, and their applications in healthcare and agriculture.</div>
                <div className='text-[#39A9DB] text-sm'>View Business Courses</div>
                </div>
            </div>
             {/* Objective 6 */}
             <div className="border border-gray-200 rounded-lg p-6 shadow-sm flex gap-2 bg-[#E5E7EB]">
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
                
              <div>
                <div className="text-lg font-bold text-[#0A2463]">All S-Curve Industries</div>
                <div className="my-2 text-sm text-[#4B5563]"> Browse all our courses supporting Thailand's targeted S-Curve industries for economic growth.</div>
                <div className='text-[#39A9DB] text-sm'>View Business Courses</div>
                </div>
            </div>
          </div>
        </div>
    
    </div>
  );
}