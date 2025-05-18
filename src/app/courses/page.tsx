'use client'

import React, { useState, useEffect } from 'react';
import { Search, Filter, ArrowRight, Clock, Calendar, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    totalCount: 0,
    currentPage: 1,
    totalPages: 1
  });
  const [offset, setOffset] = useState(0);
  const [categories, setCategories] = useState(['All']);
  const limit = 9;

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/course?offset=${offset}&limit=${limit}`);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Extract unique industry categories from the data
        const uniqueIndustries = new Set(['All']);
        data.data.forEach(course => {
          if (course.industries && course.industries.length > 0) {
            course.industries.forEach(industry => {
              uniqueIndustries.add(industry.name);
            });
          }
        });
        setCategories(Array.from(uniqueIndustries));

        // Transform API data to match our component's expected format
        const transformedCourses = data.data.map(course => ({
          id: course.id,
          title: course.name,
          instructor: 'Instructor', // This field is missing in the API data
          description: course.description,
          weeks: 12, // This field is missing in the API data
          date: new Date(course.created_at).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          }),
          students: 100, // This field is missing in the API data
          category: course.industries && course.industries.length > 0
            ? course.industries[0].name
            : 'General',
          industries: course.industries || [],
          image: course.image
            ? `${process.env.NEXT_PUBLIC_IMG}${course.image.image_path.startsWith("/") ? "" : "/"
            }${course.image.image_path}`
            : '/api/placeholder/400/320'
        }));

        setCourses(transformedCourses);
        setPagination(data.pagination);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCourses();
  }, [offset]);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (course.instructor && course.instructor.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = filter === 'All' ||
      (course.industries && course.industries.some((industry: any) => industry.name === filter));
    return matchesSearch && matchesFilter;
  });

  const handleViewDetails = (courseId: any, view_count: any) => {
    router.push(`/courses/${courseId}`);
  };
  return (
    <div>
      <div className="bg-[#0A2463] text-white py-10 md:py-20 px-14 xl:px-20">
        <div className="text-3xl font-bold">เนื้อหาทั้งหมดของเรา</div>
        <div className="text-wrap max-w-2xl text-base mt-5">ค้นพบโปรแกรมการฝึกอบรมที่เน้นอุตสาหกรรมของเราซึ่งออกแบบมาเพื่อเตรียมคุณให้พร้อมสำหรับอุตสาหกรรม New Growth Engine ของประเทศไทย</div>
      </div>

      <div className="bg-[#F9FAFB] p-10 md:p-10">
        <div className="min-h-screen bg-gray-50 p-4">
          <div className="mx-auto">
            {/* Search and Filter Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
              <div className="relative w-full ">
                <input
                  type="text"
                  placeholder="ค้นหาเนื้อหาหรือผู้สอน..."
                  className="w-full text-[black] border border-gray-300 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto justify-center">
                <Filter className="h-5 w-5 text-gray-600" />
                <select
                  className="border text-[black] border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category === 'All' ? 'ทั้งหมด' : category}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Courses Header */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-blue-900">รายการเนื้อหา</h1>
              <p className="text-gray-600">ทั้งหมด: {pagination.totalCount} เนื้อหา</p>
            </div>

            {/* Loading and Error States */}
            {loading && (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            )}

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                <p>เกิดข้อผิดพลาดในการโหลดเนื้อหา: {error}</p>
                <p>กำลังใช้ข้อมูลตัวอย่างแทน</p>
              </div>
            )}

            {/* Course Grid */}
            {!loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.length > 0 ? (
                  filteredCourses.map(course => (
                    <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                      <div className="relative">
                        <Image
                          src={
                            course.image
                          }
                          alt={course.title}
                          className="w-full h-48 object-cover"
                          width={400}
                          height={192}
                          style={{ width: '100%', height: '12rem', objectFit: 'cover' }}
                        />
                        {course.industries && course.industries.length > 0 && (
                          <span className="absolute top-4 left-4 bg-[#39A9DB] text-white text-xs font-semibold px-2 py-1 rounded-xl">
                            {course.industries[0].name}
                          </span>
                        )}
                      </div>

                      <div className="p-4 flex-grow">
                        <h3 className="text-lg font-semibold text-blue-900 mb-2">{course.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">ผู้สอน: {course.instructor || 'รอประกาศ'}</p>
                        <p className="text-sm text-gray-500 mb-4">{course.description}</p>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-auto">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{course.weeks} สัปดาห์</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{course.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{course.students} คน</span>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-100 p-4">
                        <button className="flex items-center text-blue-600 font-medium text-sm hover:text-blue-800 hover:underline transition-colors duration-200" onClick={() => handleViewDetails(course.id, course.view_count)}>
                          ดูรายละเอียด
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-3 text-center py-12">
                    <p className="text-lg text-gray-600">ไม่พบเนื้อหาที่ตรงกับการค้นหา</p>
                  </div>
                )}
              </div>
            )}

            {/* Pagination */}
            {!loading && pagination.totalPages > 0 && (
              <div className="flex justify-center mt-8">
                <div className="flex space-x-2">
                  <button
                    className={`px-4 py-2 border rounded ${offset > 0 ? 'bg-white hover:bg-gray-50' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                    disabled={offset === 0}
                    onClick={() => setOffset(Math.max(0, offset - limit))}
                  >
                    ก่อนหน้า
                  </button>
                  <span className="px-4 py-2  rounded">
                    หน้า {Math.floor(offset / limit) + 1} จาก {pagination.totalPages}
                  </span>
                  <button
                    className={`px-4 py-2 border rounded ${(Math.floor(offset / limit) + 1) < pagination.totalPages ? 'bg-white hover:bg-gray-50' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                    disabled={(Math.floor(offset / limit) + 1) >= pagination.totalPages}
                    onClick={() => setOffset(offset + limit)}
                  >
                    ถัดไป
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* <div className="bg-[#FFFFFF] px-14 md:px-14 py-10 rounded-lg shadow-sm">
        <h2 className="text-center text-2xl font-bold text-blue-900 mb-8">Course Categories</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.filter(category => category !== 'All').map((category, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6 shadow-sm flex gap-2 bg-[#E5E7EB]">
              <div>
                <div className="text-lg font-bold text-[#0A2463]">{category}</div>
                <div className="my-2 text-sm text-[#4B5563]">
                  Explore courses related to {category} and develop industry-ready skills.
                </div>
                <div className="text-[#39A9DB] text-sm">View {category} Courses</div>
              </div>
            </div>
          ))}
          
       
          {categories.filter(category => category !== 'All').length < 6 && Array(6 - categories.filter(category => category !== 'All').length).fill().map((_, index) => (
            <div key={`placeholder-${index}`} className="border border-gray-200 rounded-lg p-6 shadow-sm flex gap-2 bg-[#E5E7EB]">
              <div>
                <div className="text-lg font-bold text-[#0A2463]">Other Courses</div>
                <div className="my-2 text-sm text-[#4B5563]">
                  Discover more specialized courses and training programs.
                </div>
                <div className="text-[#39A9DB] text-sm">View All Courses</div>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}