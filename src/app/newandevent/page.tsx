
// 'use client'

// import React, { useState } from 'react';

// import { Search, Filter, ArrowRight, Clock, Calendar, Users } from 'lucide-react';
// export default function Home() {
//     const [searchQuery, setSearchQuery] = useState('');
//     const [filter, setFilter] = useState('All');
    
//     const newsItems = [
//         {
//           id: 1,
//           title: 'Thailand 4.0 Program Partners with Leading Tech Companies',
//           description: 'New partnership provides students with internship opportunities at top tech firms in Thailand. The initiative aims to bridge the gap between academia and industry.',
//           date: 'December 10, 2023',
//           category: 'Partnership',
//           image: 'https://cdn-cakae.nitrocdn.com/HNXbhKzVPUNXWpRTNzWDzAgzHZYmqDrJ/assets/images/optimized/rev-b9ddf3b/zortout.com/wp-content/uploads/2020/08/consumers-isometric-composition_1284-26384.jpg'
//         },
//         {
//           id: 2,
//           title: 'Graduates Showcase Innovative Projects at Tech Expo 2023',
//           description: 'Students presented their final projects to industry leaders and potential employers at the annual Tech Expo.',
//           date: 'November 28, 2023',
//           category: 'Event',
//           image: 'https://cdn-cakae.nitrocdn.com/HNXbhKzVPUNXWpRTNzWDzAgzHZYmqDrJ/assets/images/optimized/rev-b9ddf3b/zortout.com/wp-content/uploads/2020/08/consumers-isometric-composition_1284-26384.jpg'
//         },
//         {
//           id: 3,
//           title: 'New AI & Machine Learning Course Launching in February 2024',
//           description: 'The program announces a new specialized course in Artificial Intelligence and Machine Learning, designed to boost skills.',
//           date: 'November 15, 2023',
//           category: 'Course',
//           image: 'https://cdn-cakae.nitrocdn.com/HNXbhKzVPUNXWpRTNzWDzAgzHZYmqDrJ/assets/images/optimized/rev-b9ddf3b/zortout.com/wp-content/uploads/2020/08/consumers-isometric-composition_1284-26384.jpg'
//         },
//         {
//           id: 4,
//           title: 'Thailand 4.0 Students Win National Innovation Competition',
//           description: 'A team of students from our Digital Innovation course secured first place at the National Innovation Challenge.',
//           date: 'October 22, 2023',
//           category: 'Achievement',
//           image: 'https://cdn-cakae.nitrocdn.com/HNXbhKzVPUNXWpRTNzWDzAgzHZYmqDrJ/assets/images/optimized/rev-b9ddf3b/zortout.com/wp-content/uploads/2020/08/consumers-isometric-composition_1284-26384.jpg'
//         },
//         {
//           id: 5,
//           title: 'Ministry of Digital Economy Announces Additional Funding for Thailand 4.0 Program',
//           description: 'The government has allocated additional budget to expand the program to more universities across Thailand.',
//           date: 'October 5, 2023',
//           category: 'Announcement',
//           image: 'https://cdn-cakae.nitrocdn.com/HNXbhKzVPUNXWpRTNzWDzAgzHZYmqDrJ/assets/images/optimized/rev-b9ddf3b/zortout.com/wp-content/uploads/2020/08/consumers-isometric-composition_1284-26384.jpg'
//         },
//         {
//           id: 6,
//           title: 'International Technology Conference to be Hosted by Thailand 4.0 Program',
//           description: 'The program will host its first international conference on emerging technologies in March 2024, featuring speakers from leading tech companies.',
//           date: 'September 18, 2023',
//           category: 'Event',
//           image: 'https://cdn-cakae.nitrocdn.com/HNXbhKzVPUNXWpRTNzWDzAgzHZYmqDrJ/assets/images/optimized/rev-b9ddf3b/zortout.com/wp-content/uploads/2020/08/consumers-isometric-composition_1284-26384.jpg'
//         }
//       ];

//       const events = [
//         {
//           id: 1,
//           title: 'Open House: Explore Thailand 4.0 Program',
//           description: 'Join us for an informative session about our training programs, meet instructors, and tour our facilities. Registration required.',
//           date: 'January 15, 2024',
//           icon: 'calendar' // ใช้สำหรับแสดงไอคอน
//         },
//         {
//           id: 2,
//           title: 'Industry Talk: Future of AI in Thailand',
//           description: 'A panel discussion with industry experts on the growing role of artificial intelligence in Thailand s economic development.',
//           date: 'February 5, 2024',
//           icon: 'calendar'
//         },
//         {
//           id: 3,
//           title: 'Workshop: Introduction to Robotics',
//           description: 'A hands-on workshop introducing basic robotics concepts and applications. Open to prospective students and the general public.',
//           date: 'February 20, 2024',
//           icon: 'calendar'
//         },
//         {
//           id: 4,
//           title: 'Career Fair: Thailand 4.0 Industries',
//           description: 'Connect with potential employers from Thailand s leading technology and innovation companies. Bring your resume and portfolio.',
//           date: 'March 10, 2024',
//           icon: 'calendar'
//         }
//       ];

//       const images = [
//         'https://cdn-cakae.nitrocdn.com/HNXbhKzVPUNXWpRTNzWDzAgzHZYmqDrJ/assets/images/optimized/rev-b9ddf3b/zortout.com/wp-content/uploads/2020/08/consumers-isometric-composition_1284-26384.jpg', // Person using laptop in classroom
//         'https://cdn-cakae.nitrocdn.com/HNXbhKzVPUNXWpRTNzWDzAgzHZYmqDrJ/assets/images/optimized/rev-b9ddf3b/zortout.com/wp-content/uploads/2020/08/consumers-isometric-composition_1284-26384.jpg', // People working on computers
//         'https://cdn-cakae.nitrocdn.com/HNXbhKzVPUNXWpRTNzWDzAgzHZYmqDrJ/assets/images/optimized/rev-b9ddf3b/zortout.com/wp-content/uploads/2020/08/consumers-isometric-composition_1284-26384.jpg', // Audience in auditorium
//         'https://cdn-cakae.nitrocdn.com/HNXbhKzVPUNXWpRTNzWDzAgzHZYmqDrJ/assets/images/optimized/rev-b9ddf3b/zortout.com/wp-content/uploads/2020/08/consumers-isometric-composition_1284-26384.jpg', // Hands working on tablet
//         'https://cdn-cakae.nitrocdn.com/HNXbhKzVPUNXWpRTNzWDzAgzHZYmqDrJ/assets/images/optimized/rev-b9ddf3b/zortout.com/wp-content/uploads/2020/08/consumers-isometric-composition_1284-26384.jpg', // People in a seminar
//         'https://cdn-cakae.nitrocdn.com/HNXbhKzVPUNXWpRTNzWDzAgzHZYmqDrJ/assets/images/optimized/rev-b9ddf3b/zortout.com/wp-content/uploads/2020/08/consumers-isometric-composition_1284-26384.jpg', // People with sticky notes on whiteboard
//         'https://cdn-cakae.nitrocdn.com/HNXbhKzVPUNXWpRTNzWDzAgzHZYmqDrJ/assets/images/optimized/rev-b9ddf3b/zortout.com/wp-content/uploads/2020/08/consumers-isometric-composition_1284-26384.jpg', // Person working with papers
//         'https://cdn-cakae.nitrocdn.com/HNXbhKzVPUNXWpRTNzWDzAgzHZYmqDrJ/assets/images/optimized/rev-b9ddf3b/zortout.com/wp-content/uploads/2020/08/consumers-isometric-composition_1284-26384.jpg', // Group discussion with tablet
//         'https://cdn-cakae.nitrocdn.com/HNXbhKzVPUNXWpRTNzWDzAgzHZYmqDrJ/assets/images/optimized/rev-b9ddf3b/zortout.com/wp-content/uploads/2020/08/consumers-isometric-composition_1284-26384.jpg', // Group discussion with tablet
//         'https://cdn-cakae.nitrocdn.com/HNXbhKzVPUNXWpRTNzWDzAgzHZYmqDrJ/assets/images/optimized/rev-b9ddf3b/zortout.com/wp-content/uploads/2020/08/consumers-isometric-composition_1284-26384.jpg', // Group discussion with tablet
//         'https://cdn-cakae.nitrocdn.com/HNXbhKzVPUNXWpRTNzWDzAgzHZYmqDrJ/assets/images/optimized/rev-b9ddf3b/zortout.com/wp-content/uploads/2020/08/consumers-isometric-composition_1284-26384.jpg', // Group discussion with tablet
//         'https://cdn-cakae.nitrocdn.com/HNXbhKzVPUNXWpRTNzWDzAgzHZYmqDrJ/assets/images/optimized/rev-b9ddf3b/zortout.com/wp-content/uploads/2020/08/consumers-isometric-composition_1284-26384.jpg', // Group discussion with tablet
//       ];

//       const [displayCount, setDisplayCount] = useState(8);
//       const handleLoadMore = () => {
//         // เพิ่มจำนวนรูปที่แสดงอีก 8 รูป แต่ไม่เกินจำนวนรูปทั้งหมด
//         setDisplayCount(prevCount => Math.min(prevCount + 8, images.length));
//       };
//       const categories = ['All', 'Partnership', 'Event', 'Course', 'Achievement', 'Announcement'];
    
//       const filteredNews = newsItems.filter(item => {
//         const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
//                               item.description.toLowerCase().includes(searchQuery.toLowerCase());
//         const matchesFilter = filter === 'All' || item.category === filter;
//         return matchesSearch && matchesFilter;
//       });
//   return (
//     <div>
//     <div className=" bg-[#0A2463] h-70  text-white py-10 md:py-20 px-14 xl:px-20 ">
//         <div className="text-3xl font-bold">ข่าวสารและกิจกรรม</div>
//         <div className="text-wrap max-w-2xl text-base mt-5">ติดตามข่าวสาร กิจกรรม และความสำเร็จล่าสุดจากโครงการฝึกอบรมบัณฑิตไทยแลนด์ 4.0</div>
//     </div>
//     <div className=" bg-[#F9FAFB] p-4 md:p-4 ">
//     <div className=" bg-gray-50 p-4 md:p-10">
//         <div className="mx-auto">
//           {/* Search Bar */}
//           <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
//             <div className="relative w-full">
//               <input
//                 type="text"
//                 placeholder="Search news..."
//                 className="w-full border border-gray-300 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//               <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//             </div>
            
//             <div className="flex items-center gap-2 w-full md:w-auto justify-center md:justify-end">
//               <select 
//                 className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={filter}
//                 onChange={(e) => setFilter(e.target.value)}
//               >
//                 {categories.map(category => (
//                   <option key={category} value={category}>{category}</option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* News Header - ใช้ภาษาไทยตามภาพ */}
//           <h1 className="text-2xl font-bold text-blue-900 mb-6">ข่าวสารและกิจกรรมล่าสุด</h1>

//           {/* News Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredNews.map(news => (
//               <div key={news.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
//                 <div className="relative">
//                   <img src={news.image} alt={news.title} className="w-full h-48 object-cover" />
//                   <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
//                     {news.category}
//                   </span>
//                 </div>
                
//                 <div className="p-4 flex-grow">
//                   <p className="text-xs text-gray-500 mb-2">{news.date}</p>
//                   <h3 className="text-lg font-semibold text-blue-900 mb-2">{news.title}</h3>
//                   <p className="text-sm text-gray-600 mb-4">{news.description}</p>
//                 </div>
                
//                 <div className="px-4 pb-4">
//                   <button className="flex items-center text-blue-600 font-medium text-sm hover:text-blue-800">
//                     Read More
//                     <ArrowRight className="h-4 w-4 ml-1" />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
    
//     <div className="bg-white py-10 px-10 md:px-14">
//       <div className=" mx-auto">
//         <h2 className="text-2xl font-bold text-blue-900 mb-8">กิจกรรมที่กำลังจะเกิดขึ้น</h2>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
//           {events.map((event, index) => (
//             <div key={event.id} className="flex flex-col bg-[#E5E7EB] p-5  rounded-xl">
//               <div className="flex items-start">
//                 <div className="mr-3 text-blue-400">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                   </svg>
//                 </div>
//                 <p className="text-sm text-blue-400">{event.date}</p>
//               </div>
              
//               <h3 className="font-semibold text-lg mt-2 text-[#0A2463]">{event.title}</h3>
//               <p className="text-sm text-gray-600 mt-1 mb-3">{event.description}</p>
              
//               <div className="mt-auto">
//                 <button className="flex items-center text-blue-600 font-medium text-sm hover:text-blue-800">
//                   Learn More
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>

//     <div className=" mx-auto  py-8 px-14 xl:px-20 bg-[#F9FAFB]">
//       {/* หัวข้อ */}
//       <h1 className="text-2xl font-bold text-blue-900 mb-6">บรรยากาศโครงการ</h1>
      
//       {/* แสดงรูปภาพในรูปแบบ grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//         {images.slice(0, displayCount).map((image, index) => (
//           <div key={index} className="rounded-lg overflow-hidden h-48">
//             <img 
//               src={image}
//               alt={`Program atmosphere ${index + 1}`}
//               className="w-full h-full object-cover"
//             />
//           </div>
//         ))}
//       </div>
      
//       {/* ปุ่ม "ดูเพิ่มเติม" จะซ่อนเมื่อแสดงรูปครบทั้งหมดแล้ว */}
//       {displayCount < images.length && (
//         <div className="flex justify-center">
//           <button 
//             onClick={handleLoadMore}
//             className="bg-blue-400 hover:bg-blue-500 text-white py-2 px-8 rounded-md transition-colors duration-300">
//             ดูเพิ่มเติม
//           </button>
//         </div>
//       )}
//     </div>
    
    
//     </div>
//   );
// }



'use client'

import React, { useState, useEffect } from 'react';
import { Search, Filter, ArrowRight, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';
export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    totalCount: 0,
    currentPage: 0,
    totalPages: 0,
    prev: null,
    next: null
  });
  const [images, setVibeImages] = useState([]);

  // Fetch news from API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/news?offset=0&limit=10`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch news data');
        }
        
        const data = await response.json();
        setNewsItems(data.data);
        setPagination(data.pagination);
        // ดึงรูปภาพ
      const images = await fetchVibeImages();
      setVibeImages(images);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchNews();
    
  }, []);

  // Load more news function
  const loadMoreNews = async () => {
    if (!pagination.next) return;
    
    try {
      setLoading(true);
      const response = await fetch(pagination.next);
      
      if (!response.ok) {
        throw new Error('Failed to fetch more news');
      }
      
      const data = await response.json();
      setNewsItems(prev => [...prev, ...data.data]);
      setPagination(data.pagination);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Extract all unique tags from news items
  const getAllTags = () => {
    const tagSet = new Set();
    tagSet.add('All'); // Always include 'All' option
    
    newsItems.forEach(item => {
      if (item.tagAssignments && item.tagAssignments.length > 0) {
        item.tagAssignments.forEach(tagAssignment => {
          if (tagAssignment.tag && tagAssignment.tag.name) {
            tagSet.add(tagAssignment.tag.name);
            console.log("asdadadada : ",tagAssignment.tag.name)
          }
        });
      }
    });
    
    return Array.from(tagSet);
  };

  const categories = getAllTags();

  // Filter news based on search query and selected tag
  const filteredNews = newsItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (item.short_description && item.short_description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = filter === 'All' || 
                         (item.tagAssignments && 
                          item.tagAssignments.some(tagAssignment => 
                            tagAssignment.tag && tagAssignment.tag.name === filter
                          ));
    
    return matchesSearch && matchesFilter;
  });

  // Format date to readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Example upcoming events (you might want to fetch these from another API endpoint)
  const events = [
    {
      id: 1,
      title: 'Open House: Explore Thailand 4.0 Program',
      description: 'Join us for an informative session about our training programs, meet instructors, and tour our facilities. Registration required.',
      date: 'January 15, 2024',
    },
    {
      id: 2,
      title: 'Industry Talk: Future of AI in Thailand',
      description: 'A panel discussion with industry experts on the growing role of artificial intelligence in Thailand s economic development.',
      date: 'February 5, 2024',
    },
    {
      id: 3,
      title: 'Workshop: Introduction to Robotics',
      description: 'A hands-on workshop introducing basic robotics concepts and applications. Open to prospective students and the general public.',
      date: 'February 20, 2024',
    },
    {
      id: 4,
      title: 'Career Fair: Thailand 4.0 Industries',
      description: 'Connect with potential employers from Thailand s leading technology and innovation companies. Bring your resume and portfolio.',
      date: 'March 10, 2024',
    }
  ];

  // For the gallery section
  const [displayCount, setDisplayCount] = useState(8);
  // const images = [
  //   'upload/image-1746425401979-674470988.png',
    
  // ];

  const fetchVibeImages = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/image/getAllImage/vibe?offset=0&limit=10`);
      const data = await response.json();
      
      // Extract only the image paths from vibe-type images
      const vibeImages = data.images
        .filter(image => image.ref_type === 'vibe')
        .map(image => image.image_path);
      console.log("asdadad : ",vibeImages)
      return vibeImages;
    } catch (error) {
      console.error('Error fetching vibe images:', error);
      return []; // Return empty array as fallback
    }
  };

  // const handleLoadMore = () => {
  //   setDisplayCount(prevCount => Math.min(prevCount + 8, images.length));
  // };

   const handleViewAllGallery = () => {
    router.push('/gallery');
  };

 const router = useRouter();
  const handleViewDetails = (newId,view_count) => {

  // อัพเดต view_count ในแบบ background (ไม่ใช้ await)
  fetch(`${process.env.NEXT_PUBLIC_API}/news/view/${newId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      view_count: view_count + 1 
    }),

    
  }).catch(error => {
    console.error('Error updating view count:', error);
    // ในกรณีนี้ ถึงแม้จะมีข้อผิดพลาด ผู้ใช้ก็อยู่ที่หน้ารายละเอียดแล้ว
  });
    router.push(`/newandevent/${newId}`);
  };

  return (
    <div>
      <div className="bg-[#0A2463] h-70 text-white py-10 md:py-20 px-14 xl:px-20">
        <div className="text-3xl font-bold">ข่าวสารและกิจกรรม</div>
        <div className="text-wrap max-w-2xl text-base mt-5">ติดตามข่าวสาร กิจกรรม และความสำเร็จล่าสุดจากโครงการฝึกอบรมบัณฑิตไทยแลนด์ 4.0</div>
      </div>
      
      <div className="bg-[#F9FAFB] p-4 md:p-4">
        <div className="bg-gray-50 p-4 md:p-10">
          <div className="mx-auto">
            {/* Search Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search news..."
                  className="w-full text-[black] border border-gray-300 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              
              <div className="flex items-center gap-2 w-full md:w-auto justify-center md:justify-end">
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

            {/* News Header */}
            <h1 className="text-2xl font-bold text-blue-900 mb-6">ข่าวสารและกิจกรรมล่าสุด</h1>

            {/* Loading and Error States */}
            {loading && <div className="text-center py-8">กำลังโหลดข้อมูล...</div>}
            {error && <div className="text-center text-red-500 py-8">เกิดข้อผิดพลาด: {error}</div>}

            {/* News Grid */}
            {!loading && !error && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredNews.map(news => (
                    <div key={news.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                      <div className="relative">
                        <img 
                          src={`${process.env.NEXT_PUBLIC_IMG}/${news.image?.image_path}`} 
                          alt={news.title} 
                          className="w-full h-48 object-cover" 
                          
                        />
                        {news.tagAssignments && news.tagAssignments.length > 0 && (
                          <div className="absolute top-2 left-2 flex flex-wrap gap-2">
                            {news.tagAssignments.map((tagAssignment, index) => (
                              <span key={index} className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
                                {tagAssignment.tag.name}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <div className="p-4 flex-grow">
                        <p className="text-xs text-gray-500 mb-2">{formatDate(news.published_date)}</p>
                        <h3 className="text-lg font-semibold text-blue-900 mb-2">{news.title}</h3>
                        <p className="text-sm text-gray-600 mb-4">{news.short_description}</p>
                      </div>
                      
                      <div className="px-4 pb-4">
                        <button className="flex items-center text-blue-600 font-medium text-sm hover:text-blue-800"  onClick={() => handleViewDetails(news.id,news.view_count)}>
                          อ่านเพิ่มเติม
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination / Load More Button */}
                {pagination.next && (
                  <div className="flex justify-center mt-8">
                    <button 
                      className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                      onClick={loadMoreNews}
                      disabled={loading}
                    >
                      {loading ? 'กำลังโหลด...' : 'โหลดเพิ่มเติม'}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* <div className="bg-white py-10 px-10 md:px-14">
        <div className="mx-auto">
          <h2 className="text-2xl font-bold text-blue-900 mb-8">กิจกรรมที่กำลังจะเกิดขึ้น</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event) => (
              <div key={event.id} className="flex flex-col bg-[#E5E7EB] p-5 rounded-xl">
                <div className="flex items-start">
                  <div className="mr-3 text-blue-400">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <p className="text-sm text-blue-400">{event.date}</p>
                </div>
                
                <h3 className="font-semibold text-lg mt-2 text-[#0A2463]">{event.title}</h3>
                <p className="text-sm text-gray-600 mt-1 mb-3">{event.description}</p>
                
                <div className="mt-auto">
                  <button className="flex items-center text-blue-600 font-medium text-sm hover:text-blue-800">
                    ดูรายละเอียด
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      <div className="mx-auto py-8 px-14 xl:px-20 bg-[#F9FAFB]">
      
        <h1 className="text-2xl font-bold text-blue-900 mb-6">บรรยากาศโครงการ</h1>
        
      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          {images.slice(0, displayCount).map((image, index) => (
            <div key={index} className="rounded-lg overflow-hidden h-48">
            
              <img 
                src={`${process.env.NEXT_PUBLIC_IMG}/${image}`}
                alt={`Program atmosphere ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        
      
        {0 < images.length && ( //displayCount
          <div className="flex justify-center">
            <button 
              onClick={handleViewAllGallery}
              className="bg-blue-400 hover:bg-blue-500 text-white py-2 px-8 rounded-md transition-colors duration-300">
              ดูเพิ่มเติม
            </button>
          </div>
        )}
      </div>
    </div>
  );
}