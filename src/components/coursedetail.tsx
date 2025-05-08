'use client'

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function CourseDetail({ params }) {
    console.log('CourseDetail params:', params);
  const router = useRouter();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3001/api/course/${params}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch course data');
        }
        
        const data = await response.json();
        console.log('Fetched course data:', data);
        setCourse(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching course data:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    
    if (params && params !== 'undefined') {
      fetchCourseData();
    }
  }, [params]);

  const handleGoBack = () => {
    router.back();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded m-6">
        <p>Error loading course details: {error}</p>
        <button 
          onClick={handleGoBack}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Course not found</p>
      </div>
    );
  }

  const updateDate = new Date(course.updated_at || course.created_at);
  const formattedUpdateDate = formatDate(updateDate);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-[#0A2463] text-white">
      <div className="max-w-7xl mx-auto py-10 px-6 md:px-14 xl:px-20">
        <button 
          onClick={handleGoBack}
          className="flex items-center text-white mb-6 hover:underline"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          กลับ
        </button>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="md:w-1/2 ">
            {/* {course.industries && course.industries.length > 0 && (
              <span className="bg-[#39A9DB] text-white text-xs font-semibold px-3 py-1 rounded-xl mb-4 inline-block ">
                {course.industries[0].name}
              </span>
            )} */}
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">{course.name}</h1>
            
            <div className="flex items-center mb-2 justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star}
                  className="h-5 w-5" 
                  fill={star <= 4.5 ? "#FFB800" : "none"}
                  stroke={star <= 4.5 ? "#FFB800" : "#D1D5DB"}
                />
              ))}
              <span className="ml-2">(3 รีวิว)</span>
            </div>
            
            <div className="text-sm text-center">
              อัปเดตล่าสุด: {formattedUpdateDate}
            </div>
          </div>
          
          {/* Video Display Section with Black Background */}
          <div className="md:w-1/2 flex justify-center">
            <div className="bg-black w-full h-64 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Video Player</span>
            </div>
          </div>
        </div>
      </div>
    </div>
      
      {/* Main Content */}
      <div className="flex-grow">
        <div className="max-w-6xl mx-auto px-6 md:px-14 xl:px-20 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column - Course Info */}
            <div className="md:col-span-2">
              {/* Course Content Section */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">เนื้อหาหลักสูตร</h2>
                <p className="text-gray-700">{course.description || 'ไม่มีข้อมูล'}</p>
              </div>
              
              
              
              {/* Reviews Section */}
              <div>
                <h2 className="text-xl font-bold mb-4">รีวิวจากผู้เรียน</h2>
                
                {/* Review 1 */}
                <div className="border rounded-lg p-4 mb-4">
                  <div className="flex items-start">
                    <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center mr-3">
                      <span>j</span>
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">john_doe</span>
                        <div className="flex items-center">
                          <span className="text-sm text-gray-500 mr-2">7 พฤษภาคม 2568</span>
                          <button className="text-red-500">
                            <Trash className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center mb-2">
                        {[1, 2, 3, 4, 5].map((star, i) => (
                          <Star 
                            key={i}
                            className="h-4 w-4" 
                            fill={star <= 4.5 ? "#FFB800" : "none"}
                            stroke={star <= 4.5 ? "#FFB800" : "#D1D5DB"}
                          />
                        ))}
                        <span className="ml-2 text-sm">4.5/5</span>
                      </div>
                      <p className="text-gray-700">คอร์สดีมากๆ</p>
                    </div>
                  </div>
                </div>
                
                {/* Review 2 */}
                <div className="border rounded-lg p-4 mb-4">
                  <div className="flex items-start">
                    <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center mr-3">
                      <span>j</span>
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">john_doe</span>
                        <div className="flex items-center">
                          <span className="text-sm text-gray-500 mr-2">7 พฤษภาคม 2568</span>
                          <button className="text-red-500">
                            <Trash className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center mb-2">
                        {[1, 2, 3, 4, 5].map((star, i) => (
                          <Star 
                            key={i}
                            className="h-4 w-4" 
                            fill={star <= 4.5 ? "#FFB800" : "none"}
                            stroke={star <= 4.5 ? "#FFB800" : "#D1D5DB"}
                          />
                        ))}
                        <span className="ml-2 text-sm">4.5/5</span>
                      </div>
                      <p className="text-gray-700">คอร์สดีมากๆ</p>
                    </div>
                  </div>
                </div>
                
                {/* Review 3 */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center mr-3">
                      <span>j</span>
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">john_doe</span>
                        <div className="flex items-center">
                          <span className="text-sm text-gray-500 mr-2">7 พฤษภาคม 2568</span>
                          <button className="text-red-500">
                            <Trash className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center mb-2">
                        {[1, 2, 3, 4, 5].map((star, i) => (
                          <Star 
                            key={i}
                            className="h-4 w-4" 
                            fill={star <= 5 ? "#FFB800" : "none"}
                            stroke={star <= 5 ? "#FFB800" : "#D1D5DB"}
                          />
                        ))}
                        <span className="ml-2 text-sm">5/5</span>
                      </div>
                      <p className="text-gray-700">คอร์สดีมากๆ</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Sidebar */}
            <div>
              {/* Course Categories */}
              {/* Additional Info Section */}
              {course.additional_info && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-4">ข้อมูลเพิ่มเติม</h2>
                  <p className="text-gray-700">{course.additional_info}</p>
                </div>
              )}
              
              {/* Course Instructor */}
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-4">ผู้สอน</h2>
                {course.instructor ? (
                  <div className="flex items-center">
                    <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center mr-3">
                      <span>{course.instructor.charAt(0)}</span>
                    </div>
                    <span>{course.instructor}</span>
                  </div>
                ) : (
                  <div className="text-gray-500 italic">ไม่มีข้อมูลผู้สอน</div>
                )}
              </div>
              
              {/* Course Publication Date */}
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-4">วันที่เผยแพร่</h2>
                <div className="text-gray-700">{formatDate(course.created_at)}</div>
              </div>

              {/* Course Image */}
              {course.image && (
                <div className="mb-6">
                  <div className="relative w-full h-48 rounded-lg shadow-md overflow-hidden">
                    <img 
                      src={`${process.env.NEXT_PUBLIC_IMG || ''}${course.image.image_path}`} 
                      alt={course.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}