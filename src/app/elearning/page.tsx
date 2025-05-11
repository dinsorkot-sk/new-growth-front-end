

// 'use client'

// import React, { useEffect, useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBook } from '@fortawesome/free-solid-svg-icons';
// import ResourceViewer from '../../components/resourceviewer'; // แก้ไขพาธให้ถูกต้องตามโครงสร้างโปรเจค
// export default function ResourcesPage() {
//   const [resources, setResources] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filterType, setFilterType] = useState('All');
//   const [pagination, setPagination] = useState({
//     total: 0,
//     offset: 0,
//     limit: 10
//   });

//   const [selectedResource, setSelectedResource] = useState(null); // เพิ่ม state สำหรับทรัพยากรที่เลือก
//   // Fetch resources from API
//   useEffect(() => {
//     const fetchResources = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(`${process.env.NEXT_PUBLIC_API}/document/getallDocumentAndResouceVideo?offset=${pagination.offset}&limit=${pagination.limit}`);
        
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
        
//         const data = await response.json();
//         setResources(data.data);
//         setPagination(data.pagination);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching resources:', error);
//         setError('Failed to load resources. Please try again later.');
//         setLoading(false);
//       }
//     };

//     fetchResources();
//   }, [pagination.offset, pagination.limit]);

//   // Process API data to match the required format
//   const processedResources = resources.map(item => {
//     // Determine icon based on type
//     const icon = item.type.toLowerCase().includes('video') ? 'video' : 'document';
    
//     // Get file URL from file_path if available
//     const file = item.files && item.files.length > 0 ? item.files[0] : null;
//     const fileUrl = file ? `${process.env.NEXT_PUBLIC_IMG}/${file.file_path.replace(/\\/g, '/')}` : '';
    
//     // Format date
//     const date = new Date(item.published_date).toLocaleDateString('th-TH', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//     });

//     return {
//       id: item.id,
//       title: item.title,
//       description: item.description,
//       type: item.type.charAt(0).toUpperCase() + item.type.slice(1), // Capitalize first letter
//       duration: item.duration ? `${item.duration} minutes` : null,
//       pages: item.pages,
//       author: item.author || 'Unknown',
//       date: date,
//       icon: icon,
//       url: fileUrl,
//       isDownloadable: file ? file.is_downloadable : false
//     };
//   });

//   // Filter resources based on search query
//   const filteredResources = processedResources.filter(resource => {
//     const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          resource.description.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesType = filterType === 'All' || resource.type.toLowerCase() === filterType.toLowerCase();
//     return matchesSearch && matchesType;
//   });

//   // Function to render the appropriate icon
//   const renderIcon = (iconType) => {
//     switch(iconType) {
//       case 'video':
//         return <span className="text-blue-500">🎬</span>;
//       case 'document':
//       default:
//         return <span className="text-blue-500">📄</span>;
//     }
//   };

//   // Function to handle file downloads
//   // const handleDownload = async (url, defaultFileName) => {
//   //   try {
//   //     const response = await fetch(url);
//   //     const blob = await response.blob();
      
//   //     // Check file type from Content-Type
//   //     const contentType = response.headers.get('content-type');
//   //     let fileName = defaultFileName;
      
//   //     // If no filename is specified, create one from URL and content-type
//   //     if (!fileName) {
//   //       // Extract filename from URL if available
//   //       const urlParts = url.split('/');
//   //       const urlFileName = urlParts[urlParts.length - 1].split('?')[0];
        
//   //       if (urlFileName && urlFileName.includes('.')) {
//   //         fileName = urlFileName;
//   //       } else {
//   //         // Set extension based on content-type
//   //         if (contentType) {
//   //           if (contentType.includes('video')) {
//   //             fileName = 'video.mp4';
//   //           } else if (contentType.includes('pdf')) {
//   //             fileName = 'document.pdf';
//   //           } else if (contentType.includes('image')) {
//   //             fileName = 'image.jpg';
//   //           } else if (contentType.includes('audio')) {
//   //             fileName = 'audio.mp3';
//   //           } else {
//   //             fileName = 'downloaded_file';
//   //           }
//   //         } else {
//   //           fileName = 'downloaded_file';
//   //         }
//   //       }
//   //     }
  
//   //     const blobUrl = window.URL.createObjectURL(blob);
  
//   //     const link = document.createElement('a');
//   //     link.href = blobUrl;
//   //     link.download = fileName;
//   //     document.body.appendChild(link);
//   //     link.click();
//   //     document.body.removeChild(link);
  
//   //     window.URL.revokeObjectURL(blobUrl);
      
//   //     return { success: true, fileName, contentType };
//   //   } catch (error) {
//   //     console.error('Download failed:', error);
//   //     return { success: false, error };
//   //   }
//   // };

//   const [downloadingId, setDownloadingId] = useState(null);
//   const handleDownload = async (url, defaultFileName) => {
//     try {
//       // เริ่มดาวน์โหลด
//       const response = await fetch(url);
      
//       // ตรวจสอบว่า response สำเร็จหรือไม่
//       if (!response.ok) {
//         throw new Error(`ดาวน์โหลดล้มเหลว: ${response.status}`);
//       }
      
//       const blob = await response.blob();
      
//       // ตรวจสอบประเภทไฟล์จาก Content-Type
//       const contentType = response.headers.get('content-type');
//       let fileName = defaultFileName;
      
//       // ถ้าไม่ได้ระบุชื่อไฟล์ ให้สร้างจาก URL และ content-type
//       if (!fileName) {
//         // ดึงชื่อไฟล์จาก URL ถ้ามี
//         const urlParts = url.split('/');
//         const urlFileName = urlParts[urlParts.length - 1].split('?')[0];
        
//         if (urlFileName && urlFileName.includes('.')) {
//           fileName = urlFileName;
//         } else {
//           // กำหนดนามสกุลตาม content-type
//           if (contentType) {
//             if (contentType.includes('video')) {
//               fileName = 'video.mp4';
//             } else if (contentType.includes('pdf')) {
//               fileName = 'document.pdf';
//             } else if (contentType.includes('image')) {
//               fileName = 'image.jpg';
//             } else if (contentType.includes('audio')) {
//               fileName = 'audio.mp3';
//             } else {
//               fileName = 'downloaded_file';
//             }
//           } else {
//             fileName = 'downloaded_file';
//           }
//         }
//       }
      
//       // สร้าง URL สำหรับ blob และทำการดาวน์โหลด
//       const blobUrl = window.URL.createObjectURL(blob);
      
//       const link = document.createElement('a');
//       link.href = blobUrl;
//       link.download = fileName;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
      
//       // ล้าง URL หลังจากใช้งานเสร็จ
//       window.URL.revokeObjectURL(blobUrl);
      
//       return { success: true, fileName, contentType };
//     } catch (error) {
//       console.error('ดาวน์โหลดล้มเหลว:', error);
//       return { success: false, error: error.message };
//     }
//   };
// // 2. สร้างฟังก์ชันดาวน์โหลด
// const downloadResource = async (resource) => {
//   // เริ่มต้นสถานะการดาวน์โหลด
//   setDownloadingId(resource.id);
  
//   try {
//     // กำหนด URL ตามประเภทของไฟล์
//     const downloadUrl = resource.type === 'Video' 
//       ? `${process.env.NEXT_PUBLIC_API}/video/downloadVideo/${resource.id}`
//       : `${process.env.NEXT_PUBLIC_API}/document/downloadDocument/${resource.id}`;
    
//     // เรียกใช้ฟังก์ชัน handleDownload
//     const result = await handleDownload(
//       downloadUrl,
//       `${resource.title}.${resource.type === 'Video' ? 'mp4' : 'pdf'}`
//     );
    
//     // แสดงข้อความเมื่อดาวน์โหลดสำเร็จ (ถ้าต้องการ)
//     if (result.success) {
//       console.log(`ดาวน์โหลด ${resource.title} สำเร็จ`);
//     }
//   } catch (error) {
//     console.error(`เกิดข้อผิดพลาดในการดาวน์โหลด: ${error.message}`);
//   } finally {
//     // สิ้นสุดสถานะการดาวน์โหลด
//     setDownloadingId(null);
//   }
// };

//   // Function to render action buttons
//   // const renderActionButton = (resource) => {
//   //   const handleClick = () => {
//   //     if (resource.icon === 'video') {
//   //       // Open video in new window
//   //       window.open(resource.url, '_blank');
//   //     } else {
//   //       // Open document in new window
//   //       window.open(resource.url, '_blank');
//   //     }
//   //   };
    
//   //   return (
//   //     <button
//   //       onClick={handleClick}
//   //       className="bg-blue-500 text-white rounded-md px-4 py-2 flex items-center"
//   //       disabled={!resource.url}
//   //     >
//   //       <span className="mr-2">
//   //         {resource.icon === 'video' ? '▶️' : '📄'}
//   //       </span>
//   //       <span>{resource.icon === 'video' ? 'Watch Video' : 'View Document'}</span>
//   //     </button>
//   //   );
//   // };
//   // แก้ไขฟังก์ชัน renderActionButton
//   const renderActionButton = (resource) => {
//     const handleClick = () => {
//       // แทนที่จะเปิดในหน้าต่างใหม่ เราจะเก็บทรัพยากรที่เลือกไว้ใน state
//       setSelectedResource(resource);
//     };
    
//     return (
//       <button
//         onClick={handleClick}
//         className="bg-blue-500 text-white rounded-md px-4 py-2 flex items-center"
//         disabled={!resource.url}
//       >
//         <span className="mr-2">
//           {resource.icon === 'video' ? '▶️' : '📄'}
//         </span>
//         <span>{resource.icon === 'video' ? 'Watch Video' : 'View Document'}</span>
//       </button>
//     );
//   };

//   // ฟังก์ชันสำหรับปิดหน้าดูรายละเอียด
//   const handleCloseViewer = () => {
//     setSelectedResource(null);
//   };
//   if (selectedResource) {
//     return <ResourceViewer resource={selectedResource} onBack={handleCloseViewer} />;
//   }

//   // Learning paths structure (unchanged from original)
//   const learningPaths = [
//     {
//       title: 'AI & Machine Learning Path',
//       description: 'A structured learning path covering the fundamental of AI, machine learning algorithms, and practical applications.',
//       topics: [
//         { title: 'Introduction to AI', count: 4 },
//         { title: 'Machine Learning Basics', count: 6 },
//         { title: 'Advanced ML Techniques', count: 5 },
//         { title: 'Practical Projects', count: 3 }
//       ]
//     },
//     {
//       title: 'Robotics & Automation Path',
//       description: 'Learn about robotics principles, programming robots, and automation systems for industrial applications.',
//       topics: [
//         { title: 'Robotics Fundamentals', count: 5 },
//         { title: 'Robot Programming', count: 4 },
//         { title: 'Sensors & Control Systems', count: 3 },
//         { title: 'Industrial Automation', count: 4 }
//       ]
//     },
//     {
//       title: 'Digital Innovation Path',
//       description: 'Explore digital transformation strategies, business model innovation, and entrepreneurship in the digital economy.',
//       topics: [
//         { title: 'Digital Transformation', count: 3 },
//         { title: 'Business Model Innovation', count: 5 },
//         { title: 'Digital Marketing', count: 4 },
//         { title: 'Tech Entrepreneurship', count: 3 }
//       ]
//     }
//   ];

//   // Additional resources sections (unchanged from original)
//   const additionalResources = [
//     {
//       title: 'การเรียนรู้ภายนอก',
//       items: [
//         { title: 'Coursera - Data Science Specialization', icon: 'external' },
//         { title: 'edX - Robotics MicroMasters', icon: 'external' },
//         { title: 'Udacity - AI for Business', icon: 'external' },
//         { title: 'LinkedIn Learning - Digital Marketing', icon: 'external' }
//       ]
//     },
//     {
//       title: 'ข่าวสาร',
//       items: [
//         { title: 'Thailand 4.0 Economic Model Overview', icon: 'document' },
//         { title: 'Digital Economy in Southeast Asia', icon: 'document' },
//         { title: 'AI Adoption in Thai Industries', icon: 'document' },
//         { title: 'S-Curve Industries Growth Forecast', icon: 'document' }
//       ]
//     },
//     {
//       title: 'Software & Tools',
//       items: [
//         { title: 'Python Development Environment Setup', icon: 'download' },
//         { title: 'Robot Simulation Software', icon: 'download' },
//         { title: 'Data Visualization Tools', icon: 'download' },
//         { title: 'IoT Development Kits Guide', icon: 'download' }
//       ]
//     }
//   ];

//   // Icons
//   const DocumentIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//       <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
//     </svg>
//   );

//   const ExternalIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//       <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
//     </svg>
//   );

//   const DownloadIcon = () => (
//     <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//       <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
//     </svg>
//   );

//   // Get icon component based on icon type
//   const getIconComponent = (iconType) => {
//     switch (iconType) {
//       case 'document':
//         return <DocumentIcon />;
//       case 'external':
//         return <ExternalIcon />;
//       case 'download':
//         return <DownloadIcon />;
//       default:
//         return <DocumentIcon />;
//     }
//   };

//   // Handle pagination
//   const handleNextPage = () => {
//     if (pagination.offset + pagination.limit < pagination.total) {
//       setPagination({
//         ...pagination,
//         offset: pagination.offset + pagination.limit
//       });
//     }
//   };

//   const handlePrevPage = () => {
//     if (pagination.offset - pagination.limit >= 0) {
//       setPagination({
//         ...pagination,
//         offset: pagination.offset - pagination.limit
//       });
//     }
//   };

//   return (
//     <div className="mx-auto">
//       {/* Header */}
//       <div className="bg-[#0A2463] md:h-50 text-white py-10 px-10">
//         <div className="text-3xl font-bold text-white">แหล่งข้อมูลการเรียนรู้แบบออนไลน์</div>
//         <div className="text-wrap max-w-2xl text-base mt-5 text-white">
//           เข้าถึงวิดีโอการฝึกอบรม เอกสารประกอบ แบบฝึกหัด และสื่อการเรียนรู้เพื่อสนับสนุนการศึกษาของคุณ
//         </div>
//       </div>

//       {/* Search and filter bar */}
//       <div className="w-full bg-white text-[black] py-8 md:flex items-center justify-between space-x-4 px-10">
//         <input
//           type="text"
//           placeholder="Search resources..."
//           className="flex-grow border rounded-md py-2 px-4 w-full"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//         <div className="flex justify-center">
//           <select 
//             className="border rounded-md py-2 px-4 my-3 md:my-0 items-center"
//             value={filterType}
//             onChange={(e) => setFilterType(e.target.value)}
//           >
//             <option value="All">All</option>
//             <option value="Video">Videos</option>
//             <option value="Document">Documents</option>
//           </select>
//         </div>
//       </div>

//       {/* Main content */}
//       <div className="pt-6 pb-10 bg-[#F9FAFB] px-10">
//         <h1 className="text-xl font-bold text-[#0A2463] mb-6">ทั้งหมด</h1>
        
//         {/* Loading and error states */}
//         {loading && (
//           <div className="text-center py-10">
//             <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
//             <p className="mt-2 text-gray-600">กำลังโหลดข้อมูล...</p>
//           </div>
//         )}
        
//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
//             <strong className="font-bold">Error! </strong>
//             <span className="block sm:inline">{error}</span>
//           </div>
//         )}
        
//         {/* Resources list */}
//         {!loading && !error && (
//           <>
//             {filteredResources.length === 0 ? (
//               <div className="text-center py-10">
//                 <p className="text-gray-600">ไม่พบข้อมูลที่ค้นหา</p>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {filteredResources.map(resource => (
//                   <div key={resource.id} className="bg-white rounded-lg shadow-md p-6">
//                     <div className="md:flex justify-between">
//                       <div className="md:flex items-start space-x-4">
//                         <div className="mt-1 text-lg text-center my-3 md:my-0">
//                           {renderIcon(resource.icon)}
//                         </div>
//                         <div>
//                           <h3 className="font-bold text-[#0A2463]">{resource.title}</h3>
//                           <p className="text-[#4B5563] text-sm mt-1">{resource.description}</p>
                          
//                           <div className="flex flex-wrap gap-x-8 gap-y-2 mt-3 text-xs text-[#6B7280]">
//                             <div><span className="font-semibold">Type:</span> {resource.type}</div>
//                             {resource.duration && (
//                               <div><span className="font-semibold">Duration:</span> {resource.duration}</div>
//                             )}
//                             {resource.pages && (
//                               <div><span className="font-semibold">Pages:</span> {resource.pages}</div>
//                             )}
//                             <div><span className="font-semibold">Author:</span> {resource.author}</div>
//                             <div><span className="font-semibold">Date:</span> {resource.date}</div>
//                           </div>
//                         </div>
//                       </div>
                      
//                       <div className="flex flex-col items-center space-y-3 mt-3 md:mt-0">
//                         {renderActionButton(resource)}
//                         {resource.isDownloadable && resource.url && (
//                           // <button 
//                           //   onClick={() => handleDownload(
//                           //     resource.url, 
//                           //     `${resource.title}.${resource.type === 'Video' ? 'mp4' : 'pdf'}`
//                           //   )} 
//                           //   className="flex items-center text-white hover:text-blue-500 transition-colors text-sm"
//                           // >
//                           //   <span className="mr-2">⬇️</span>
//                           //   <span className="text-[#374151]">Download</span>
//                           // </button>
//                           <button 
//   onClick={() => downloadResource(resource)} 
//   disabled={downloadingId === resource.id} 
//   className={`flex items-center transition-colors text-sm ${
//     downloadingId === resource.id ? 'opacity-50 cursor-not-allowed' : 'hover:text-blue-500'
//   }`}
// >
//   <span className="mr-2">
//     {downloadingId === resource.id ? '⏳' : '⬇️'}
//   </span>
//   <span className="text-[#374151]">
//     {downloadingId === resource.id ? 'Downloading...' : 'Download'}
//   </span>
// </button>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
            
//             {/* Pagination */}
//             <div className="flex items-center justify-between mt-6">
//               <div className="text-sm text-gray-600">
//                 แสดง {pagination.offset + 1}-{Math.min(pagination.offset + filteredResources.length, pagination.total)} จากทั้งหมด {pagination.total} รายการ
//               </div>
//               <div className="flex space-x-2">
//                 <button 
//                   onClick={handlePrevPage}
//                   disabled={pagination.offset === 0}
//                   className={`px-4 py-2 border rounded ${pagination.offset === 0 ? 'bg-gray-100 text-gray-400' : 'bg-white text-blue-500 hover:bg-blue-50'}`}
//                 >
//                   ก่อนหน้า
//                 </button>
//                 <button 
//                   onClick={handleNextPage}
//                   disabled={pagination.offset + pagination.limit >= pagination.total}
//                   className={`px-4 py-2 border rounded ${pagination.offset + pagination.limit >= pagination.total ? 'bg-gray-100 text-gray-400' : 'bg-white text-blue-500 hover:bg-blue-50'}`}
//                 >
//                   ถัดไป
//                 </button>
//               </div>
//             </div>
//           </>
//         )}
//       </div>

//     </div>
//   );
// }

'use client'

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import ResourceViewer from '../../components/resourceviewer'; // แก้ไขพาธให้ถูกต้องตามโครงสร้างโปรเจค

export default function ResourcesPage() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showType, setShowType] = useState('Video'); // ค่าเริ่มต้นเป็น Video
  const [paginationVideo, setPaginationVideo] = useState({
    total: 0,
    offset: 0,
    limit: 10
  });
  const [paginationDocument, setPaginationDocument] = useState({
    total: 0,
    offset: 0,
    limit: 10
  });

  const [selectedResource, setSelectedResource] = useState(null);

  // Fetch resources from API based on type
  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);
        
        // ใช้พารามิเตอร์ pagination ตามประเภทที่กำลังแสดง
        const pagination = showType === 'Video' ? paginationVideo : paginationDocument;
        
        // เพิ่ม query parameter ประเภท (type) ในการดึงข้อมูล
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API}/document/getallDocumentAndResouceVideo?offset=${pagination.offset}&limit=${pagination.limit}&type=${showType}` //&type=${showType.toLowerCase()
        );
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        setResources(data.data);
        
        // อัปเดต pagination ตามประเภทที่กำลังแสดง
        if (showType === 'Video') {
          setPaginationVideo({
            ...paginationVideo,
            total: data.pagination.total
          });
        } else {
          setPaginationDocument({
            ...paginationDocument,
            total: data.pagination.total
          });
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching resources:', error);
        setError('Failed to load resources. Please try again later.');
        setLoading(false);
      }
    };

    fetchResources();
  }, [showType, paginationVideo.offset, paginationVideo.limit, paginationDocument.offset, paginationDocument.limit]);

  // Process API data to match the required format
  const processedResources = resources.map(item => {
    // Determine icon based on type
    const icon = item.type.toLowerCase().includes('video') ? 'video' : 'document';
    
    // Get file URL from file_path if available
    const file = item.files && item.files.length > 0 ? item.files[0] : null;
    const fileUrl = file ? `${process.env.NEXT_PUBLIC_IMG}/${file.file_path.replace(/\\/g, '/')}` : '';
    
    // Format date
    const date = new Date(item.published_date).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return {
      id: item.id,
      title: item.title,
      description: item.description,
      type: item.type.charAt(0).toUpperCase() + item.type.slice(1), // Capitalize first letter
      duration: item.duration ? `${item.duration} minutes` : null,
      pages: item.pages,
      author: item.author || 'Unknown',
      date: date,
      icon: icon,
      url: fileUrl,
      isDownloadable: file ? file.is_downloadable : false
    };
  });

  // Filter resources based on search query
  const filteredResources = processedResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // Function to render the appropriate icon
  const renderIcon = (iconType) => {
    switch(iconType) {
      case 'video':
        return <span className="text-blue-500">🎬</span>;
      case 'document':
      default:
        return <span className="text-blue-500">📄</span>;
    }
  };

  const [downloadingId, setDownloadingId] = useState(null);
  const handleDownload = async (url, defaultFileName) => {
    try {
      // เริ่มดาวน์โหลด
      const response = await fetch(url);
      
      // ตรวจสอบว่า response สำเร็จหรือไม่
      if (!response.ok) {
        throw new Error(`ดาวน์โหลดล้มเหลว: ${response.status}`);
      }
      
      const blob = await response.blob();
      
      // ตรวจสอบประเภทไฟล์จาก Content-Type
      const contentType = response.headers.get('content-type');
      let fileName = defaultFileName;
      
      // ถ้าไม่ได้ระบุชื่อไฟล์ ให้สร้างจาก URL และ content-type
      if (!fileName) {
        // ดึงชื่อไฟล์จาก URL ถ้ามี
        const urlParts = url.split('/');
        const urlFileName = urlParts[urlParts.length - 1].split('?')[0];
        
        if (urlFileName && urlFileName.includes('.')) {
          fileName = urlFileName;
        } else {
          // กำหนดนามสกุลตาม content-type
          if (contentType) {
            if (contentType.includes('video')) {
              fileName = 'video.mp4';
            } else if (contentType.includes('pdf')) {
              fileName = 'document.pdf';
            } else if (contentType.includes('image')) {
              fileName = 'image.jpg';
            } else if (contentType.includes('audio')) {
              fileName = 'audio.mp3';
            } else {
              fileName = 'downloaded_file';
            }
          } else {
            fileName = 'downloaded_file';
          }
        }
      }
      
      // สร้าง URL สำหรับ blob และทำการดาวน์โหลด
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // ล้าง URL หลังจากใช้งานเสร็จ
      window.URL.revokeObjectURL(blobUrl);
      
      return { success: true, fileName, contentType };
    } catch (error) {
      console.error('ดาวน์โหลดล้มเหลว:', error);
      return { success: false, error: error.message };
    }
  };

  // สร้างฟังก์ชันดาวน์โหลด
  const downloadResource = async (resource) => {
    // เริ่มต้นสถานะการดาวน์โหลด
    setDownloadingId(resource.id);
    
    try {
      // กำหนด URL ตามประเภทของไฟล์
      const downloadUrl = resource.type === 'Video' 
        ? `${process.env.NEXT_PUBLIC_API}/video/downloadVideo/${resource.id}`
        : `${process.env.NEXT_PUBLIC_API}/document/downloadDocument/${resource.id}`;
      
      // เรียกใช้ฟังก์ชัน handleDownload
      const result = await handleDownload(
        downloadUrl,
        `${resource.title}.${resource.type === 'Video' ? 'mp4' : 'pdf'}`
      );
      
      // แสดงข้อความเมื่อดาวน์โหลดสำเร็จ (ถ้าต้องการ)
      if (result.success) {
        console.log(`ดาวน์โหลด ${resource.title} สำเร็จ`);
      }
    } catch (error) {
      console.error(`เกิดข้อผิดพลาดในการดาวน์โหลด: ${error.message}`);
    } finally {
      // สิ้นสุดสถานะการดาวน์โหลด
      setDownloadingId(null);
    }
  };

  // Function to render action buttons
  const renderActionButton = (resource) => {
    const handleClick = () => {
      // เก็บทรัพยากรที่เลือกไว้ใน state
      setSelectedResource(resource);
    };
    
    return (
      <button
        onClick={handleClick}
        className="bg-blue-500 text-white rounded-md px-4 py-2 flex items-center hover:bg-blue-600 transition-colors"
        disabled={!resource.url}
      >
        <span className="mr-2">
          {resource.icon === 'video' ? '▶️' : '📄'}
        </span>
        <span>{resource.icon === 'video' ? 'Watch Video' : 'View Document'}</span>
      </button>
    );
  };

  // ฟังก์ชันสำหรับปิดหน้าดูรายละเอียด
  const handleCloseViewer = () => {
    setSelectedResource(null);
  };
  
  if (selectedResource) {
    return <ResourceViewer resource={selectedResource} onBack={handleCloseViewer} />;
  }

  // Handle pagination based on current type
  const handleNextPage = () => {
    if (showType === 'Video') {
      if (paginationVideo.offset + paginationVideo.limit < paginationVideo.total) {
        setPaginationVideo({
          ...paginationVideo,
          offset: paginationVideo.offset + paginationVideo.limit
        });
      }
    } else {
      if (paginationDocument.offset + paginationDocument.limit < paginationDocument.total) {
        setPaginationDocument({
          ...paginationDocument,
          offset: paginationDocument.offset + paginationDocument.limit
        });
      }
    }
  };

  const handlePrevPage = () => {
    if (showType === 'Video') {
      if (paginationVideo.offset - paginationVideo.limit >= 0) {
        setPaginationVideo({
          ...paginationVideo,
          offset: paginationVideo.offset - paginationVideo.limit
        });
      }
    } else {
      if (paginationDocument.offset - paginationDocument.limit >= 0) {
        setPaginationDocument({
          ...paginationDocument,
          offset: paginationDocument.offset - paginationDocument.limit
        });
      }
    }
  };
  
  // ฟังก์ชันสลับประเภทการแสดงผล
  const toggleResourceType = () => {
    setShowType(showType === 'Video' ? 'Document' : 'Video');
  };

  return (
    <div className="mx-auto">
      {/* Header */}
      <div className="bg-[#0A2463] md:h-50 text-white py-10 px-10">
        <div className="text-3xl font-bold text-white">แหล่งข้อมูลการเรียนรู้แบบออนไลน์</div>
        <div className="text-wrap max-w-2xl text-base mt-5 text-white">
          เข้าถึงวิดีโอการฝึกอบรม เอกสารประกอบ แบบฝึกหัด และสื่อการเรียนรู้เพื่อสนับสนุนการศึกษาของคุณ
        </div>
      </div>

      {/* Search and toggle bar */}
      <div className="w-full bg-white text-[black] py-8 px-10">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <input
            type="text"
            placeholder="Search resources..."
            className="w-full md:w-4/6 lg:w-5/6 border rounded-md py-2 px-4"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            onClick={toggleResourceType}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md transition-colors w-full md:w-auto"
          >
            {showType === 'Video' ? 'แสดงเอกสาร' : 'แสดงวิดีโอ'}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="pt-6 pb-10 bg-[#F9FAFB] px-10">
        <h1 className="text-xl font-bold text-[#0A2463] mb-6">
          {showType === 'Video' ? 'วิดีโอทั้งหมด' : 'เอกสารทั้งหมด'}
        </h1>
        
        {/* Loading and error states */}
        {loading && (
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-600">กำลังโหลดข้อมูล...</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        {/* Resources list */}
        {!loading && !error && (
          <>
            {filteredResources.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-600">ไม่พบข้อมูลที่ค้นหา</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredResources.map(resource => (
                  <div key={resource.id} className="bg-white rounded-lg shadow-md p-6">
                    <div className="md:flex justify-between">
                      <div className="md:flex items-start space-x-4">
                        <div className="mt-1 text-lg text-center my-3 md:my-0">
                          {renderIcon(resource.icon)}
                        </div>
                        <div>
                          <h3 className="font-bold text-[#0A2463]">{resource.title}</h3>
                          <p className="text-[#4B5563] text-sm mt-1">{resource.description}</p>
                          
                          <div className="flex flex-wrap gap-x-8 gap-y-2 mt-3 text-xs text-[#6B7280]">
                            <div><span className="font-semibold">Type:</span> {resource.type}</div>
                            {resource.duration && (
                              <div><span className="font-semibold">Duration:</span> {resource.duration}</div>
                            )}
                            {resource.pages && (
                              <div><span className="font-semibold">Pages:</span> {resource.pages}</div>
                            )}
                            <div><span className="font-semibold">Author:</span> {resource.author}</div>
                            <div><span className="font-semibold">Date:</span> {resource.date}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-center space-y-3 mt-3 md:mt-0">
                        {renderActionButton(resource)}
                        {resource.isDownloadable && resource.url && (
                          <button 
                            onClick={() => downloadResource(resource)} 
                            disabled={downloadingId === resource.id} 
                            className={`flex items-center transition-colors text-sm ${
                              downloadingId === resource.id ? 'opacity-50 cursor-not-allowed' : 'hover:text-blue-500'
                            }`}
                          >
                            <span className="mr-2">
                              {downloadingId === resource.id ? '⏳' : '⬇️'}
                            </span>
                            <span className="text-[#374151]">
                              {downloadingId === resource.id ? 'Downloading...' : 'Download'}
                            </span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-600">
                {showType === 'Video' ? (
                  <>
                    แสดง {paginationVideo.offset + 1}-{Math.min(paginationVideo.offset + filteredResources.length, paginationVideo.total)} จากทั้งหมด {paginationVideo.total} รายการ
                  </>
                ) : (
                  <>
                    แสดง {paginationDocument.offset + 1}-{Math.min(paginationDocument.offset + filteredResources.length, paginationDocument.total)} จากทั้งหมด {paginationDocument.total} รายการ
                  </>
                )}
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={handlePrevPage}
                  disabled={showType === 'Video' ? paginationVideo.offset === 0 : paginationDocument.offset === 0}
                  className={`px-4 py-2 border rounded ${
                    (showType === 'Video' ? paginationVideo.offset === 0 : paginationDocument.offset === 0) 
                      ? 'bg-gray-100 text-gray-400' 
                      : 'bg-white text-blue-500 hover:bg-blue-50'
                  }`}
                >
                  ก่อนหน้า
                </button>
                <button 
                  onClick={handleNextPage}
                  disabled={showType === 'Video' 
                    ? paginationVideo.offset + paginationVideo.limit >= paginationVideo.total 
                    : paginationDocument.offset + paginationDocument.limit >= paginationDocument.total
                  }
                  className={`px-4 py-2 border rounded ${
                    (showType === 'Video' 
                      ? paginationVideo.offset + paginationVideo.limit >= paginationVideo.total 
                      : paginationDocument.offset + paginationDocument.limit >= paginationDocument.total) 
                      ? 'bg-gray-100 text-gray-400' 
                      : 'bg-white text-blue-500 hover:bg-blue-50'
                  }`}
                >
                  ถัดไป
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}