
// 'use client'

// import React, { useState, useEffect } from 'react';
// import { ArrowLeft, Star, Trash } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';

// export default function CourseDetail({ params }) {
//     console.log('CourseDetail params:', params);
//   const router = useRouter();
//   const [course, setCourse] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [username, setUsername] = useState('');
//   const [score, setScore] = useState(5);
//   const [comment, setComment] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitMessage, setSubmitMessage] = useState('');
//   const [submitError, setSubmitError] = useState('');

//   useEffect(() => {
//     const fetchCourseData = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(`${process.env.NEXT_PUBLIC_API}/course/${params}`);
        
//         if (!response.ok) {
//           throw new Error('Failed to fetch course data');
//         }
        
//         const data = await response.json();
//         console.log('Fetched course data:', data);
//         setCourse(data);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching course data:', err);
//         setError(err.message);
//         setLoading(false);
//       }
//     };
    
//     if (params && params !== 'undefined') {
//       fetchCourseData();
//     }
//   }, [params]);

//   const handleGoBack = () => {
//     router.back();
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('th-TH', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   const handleSubmitReview = async (e) => {
//     e.preventDefault();
    
//     if (!username.trim() || !comment.trim()) {
//       setSubmitError('กรุณากรอกชื่อผู้ใช้และความคิดเห็น');
//       return;
//     }

//     try {
//       setIsSubmitting(true);
//       setSubmitError('');
      
//       const reviewData = {
//         username: username,
//         score: score,
//         comment: comment,
//         course_id: course.id
//       };
      
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API}/review`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(reviewData),
//       });
      
//       if (!response.ok) {
//         throw new Error('Failed to submit review');
//       }
      
//       const data = await response.json();
//       console.log('Review submitted:', data);
      
//       // Reset form
//       setUsername('');
//       setScore(5);
//       setComment('');
//       setSubmitMessage('ส่งความคิดเห็นเรียบร้อยแล้ว');
      
//       // Clear success message after 3 seconds
//       setTimeout(() => {
//         setSubmitMessage('');
//       }, 3000);
      
//     } catch (err) {
//       console.error('Error submitting review:', err);
//       setSubmitError('เกิดข้อผิดพลาดในการส่งความคิดเห็น กรุณาลองใหม่อีกครั้ง');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded m-6">
//         <p>Error loading course details: {error}</p>
//         <button 
//           onClick={handleGoBack}
//           className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   if (!course) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <p className="text-xl text-gray-600">Course not found</p>
//       </div>
//     );
//   }

//   const updateDate = new Date(course.updated_at || course.created_at);
//   const formattedUpdateDate = formatDate(updateDate);

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
//       {/* Header Section */}
//       <div className="bg-[#0A2463] text-white">
//       <div className="max-w-7xl mx-auto py-10 px-6 md:px-14 xl:px-20">
//         <button 
//           onClick={handleGoBack}
//           className="flex items-center text-white mb-6 hover:underline"
//         >
//           <ArrowLeft className="h-4 w-4 mr-2" />
//           กลับ
//         </button>
        
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
//           <div className="md:w-1/2 ">
//             <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">{course.name}</h1>
            
//             <div className="flex items-center mb-2 justify-center">
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <Star 
//                   key={star}
//                   className="h-5 w-5" 
//                   fill={star <= 4.5 ? "#FFB800" : "none"}
//                   stroke={star <= 4.5 ? "#FFB800" : "#D1D5DB"}
//                 />
//               ))}
//               <span className="ml-2">(3 รีวิว)</span>
//             </div>
            
//             <div className="text-sm text-center">
//               อัปเดตล่าสุด: {formattedUpdateDate}
//             </div>
//           </div>
          
//           {/* Video Display Section with Black Background */}
//           <div className="md:w-1/2 flex justify-center">
//             <div className="bg-black w-full h-64 rounded-lg flex items-center justify-center">
//               <span className="text-gray-500">Video Player</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
      
//       {/* Main Content */}
//       <div className="flex-grow">
//         <div className="max-w-6xl mx-auto px-6 md:px-14 xl:px-20 py-8">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {/* Left Column - Course Info */}
//             <div className="md:col-span-2">
//               {/* Course Content Section */}
//               <div className="mb-8">
//                 <h2 className="text-xl font-bold mb-4">เนื้อหาหลักสูตร</h2>
//                 <p className="text-gray-700">{course.description || 'ไม่มีข้อมูล'}</p>
//               </div>
              
//               {/* Reviews Section */}
//             <div className="mb-8">
//   <h2 className="text-xl font-bold mb-4">รีวิวจากผู้เรียน</h2>
//   {!course.review || course.review.length === 0 ? (
//     <div className="text-center py-6 text-gray-500">ยังไม่มีรีวิวสำหรับคอร์สนี้</div>
//   ) : (
//     course.review.map(review => (
//       <div key={review.id} className="border rounded-lg p-4 mb-4 shadow-sm hover:shadow transition-shadow">
//         <div className="flex items-start">
//           <div 
//             className="text-white rounded-full w-10 h-10 flex items-center justify-center mr-3"
//             style={{ backgroundColor: review.avatarColor || "#4F46E5" }} // ใช้สีเริ่มต้นถ้าไม่มี avatarColor
//           >
//             <span className="text-lg font-medium">{review.username ? review.username.charAt(0).toUpperCase() : "U"}</span>
//           </div>
//           <div className="flex-grow">
//             <div className="flex justify-between items-center mb-1">
//               <span className="font-medium">{review.username}</span>
//               <div className="flex items-center">
//                 <span className="text-sm text-gray-500">{review.created_at ? new Date(review.created_at).toLocaleDateString('th-TH') : review.date}</span>
//               </div>
//             </div>
//             <div className="flex items-center mb-2">
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <Star
//                   key={star}
//                   className="h-4 w-4"
//                   fill={star <= review.score ? "#FFB800" : "none"}
//                   stroke={star <= review.score ? "#FFB800" : "#D1D5DB"}
//                 />
//               ))}
//               <span className="ml-2 text-sm">{review.score}/5</span>
//             </div>
//             <p className="text-gray-700">{review.comment}</p>
//           </div>
//         </div>
//       </div>
//     ))
//   )}
// </div>
              
//               {/* Comment Form Section */}
//               <div className="bg-white border rounded-lg p-6 shadow-sm">
//                 <h3 className="text-lg font-bold mb-4">เพิ่มความคิดเห็นของคุณ</h3>
                
//                 {submitMessage && (
//                   <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
//                     {submitMessage}
//                   </div>
//                 )}
                
//                 {submitError && (
//                   <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//                     {submitError}
//                   </div>
//                 )}
                
//                 <form onSubmit={handleSubmitReview}>
//                   <div className="mb-4">
//                     <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
//                       ชื่อผู้ใช้ *
//                     </label>
//                     <input
//                       type="text"
//                       id="username"
//                       value={username}
//                       onChange={(e) => setUsername(e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       required
//                     />
//                   </div>
                  
//                   <div className="mb-4">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       คะแนน *
//                     </label>
//                     <div className="flex items-center">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <button
//                           key={star}
//                           type="button"
//                           onClick={() => setScore(star)}
//                           className="focus:outline-none mr-1"
//                         >
//                           <Star 
//                             className="h-6 w-6 cursor-pointer" 
//                             fill={star <= score ? "#FFB800" : "none"}
//                             stroke={star <= score ? "#FFB800" : "#D1D5DB"}
//                           />
//                         </button>
//                       ))}
//                       <span className="ml-2 text-sm">{score}/5</span>
//                     </div>
//                   </div>
                  
//                   <div className="mb-4">
//                     <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
//                       ความคิดเห็น *
//                     </label>
//                     <textarea
//                       id="comment"
//                       value={comment}
//                       onChange={(e) => setComment(e.target.value)}
//                       rows="4"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       required
//                     ></textarea>
//                   </div>
                  
//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className={`w-full py-2 px-4 rounded-md text-white font-medium ${
//                       isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
//                     }`}
//                   >
//                     {isSubmitting ? 'กำลังส่ง...' : 'ส่งความคิดเห็น'}
//                   </button>
//                 </form>
//               </div>
//             </div>
            
//             {/* Right Column - Sidebar */}
//             <div>
//               {/* Additional Info Section */}
//               {course.additional_info && (
//                 <div className="mb-8">
//                   <h2 className="text-xl font-bold mb-4">ข้อมูลเพิ่มเติม</h2>
//                   <p className="text-gray-700">{course.additional_info}</p>
//                 </div>
//               )}
              
//               {/* Course Instructor */}
//               <div className="mb-6">
//                 <h2 className="text-xl font-bold mb-4">ผู้สอน</h2>
//                 {course.instructor ? (
//                   <div className="flex items-center">
//                     <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center mr-3">
//                       <span>{course.instructor.charAt(0)}</span>
//                     </div>
//                     <span>{course.instructor}</span>
//                   </div>
//                 ) : (
//                   <div className="text-gray-500 italic">ไม่มีข้อมูลผู้สอน</div>
//                 )}
//               </div>
              
//               {/* Course Publication Date */}
//               <div className="mb-6">
//                 <h2 className="text-xl font-bold mb-4">วันที่เผยแพร่</h2>
//                 <div className="text-gray-700">{formatDate(course.created_at)}</div>
//               </div>

//               {/* Course Image */}
//               {course.image && (
//                 <div className="mb-6">
//                   <div className="relative w-full h-48 rounded-lg shadow-md overflow-hidden">
//                     <img 
//                       src={`${process.env.NEXT_PUBLIC_IMG || ''}${course.image.image_path}`} 
//                       alt={course.name}
//                       className="object-cover w-full h-full"
//                     />
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

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
  const [username, setUsername] = useState('');
  const [score, setScore] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/course/${params}`);
        
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

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    if (!username.trim() || !comment.trim()) {
      setSubmitError('กรุณากรอกชื่อผู้ใช้และความคิดเห็น');
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError('');
      
      const reviewData = {
        username: username,
        score: score,
        comment: comment,
        course_id: course.id
      };
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit review');
      }
      
      const data = await response.json();
      console.log('Review submitted:', data);
      
      // สร้าง Object รีวิวใหม่ที่จะแสดงทันที
      const newReview = {
        id: data.id || Date.now(), // ใช้ ID จาก response หรือใช้ timestamp ถ้าไม่มี
        username: username,
        score: score,
        comment: comment,
        created_at: new Date().toISOString(),
        // กำหนดสีสุ่มสำหรับ avatar
        avatarColor: `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`
      };
      
      // อัปเดต state ของ course โดยเพิ่มรีวิวใหม่เข้าไป
      setCourse(prevCourse => {
        // ถ้ายังไม่มี property review หรือเป็น null ให้สร้างเป็น array ใหม่
        const currentReviews = prevCourse.review || [];
        return {
          ...prevCourse,
          review: [newReview, ...currentReviews] // เพิ่มรีวิวใหม่ไว้บนสุด
        };
      });
      
      // Reset form
      setUsername('');
      setScore(5);
      setComment('');
      setSubmitMessage('ส่งความคิดเห็นเรียบร้อยแล้ว');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSubmitMessage('');
      }, 3000);
      
    } catch (err) {
      console.error('Error submitting review:', err);
      setSubmitError('เกิดข้อผิดพลาดในการส่งความคิดเห็น กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsSubmitting(false);
    }
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

  // คำนวณคะแนนเฉลี่ยจากรีวิวทั้งหมด
  const calculateAverageRating = () => {
    if (!course.review || course.review.length === 0) return 0;
    
    const sum = course.review.reduce((total, review) => total + review.score, 0);
    return (sum / course.review.length).toFixed(1);
  };

  const averageRating = calculateAverageRating();
  const reviewCount = course.review ? course.review.length : 0;
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
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">{course.name}</h1>
            
            <div className="flex items-center mb-2 justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star}
                  className="h-5 w-5" 
                  fill={star <= averageRating ? "#FFB800" : "none"}
                  stroke={star <= averageRating ? "#FFB800" : "#D1D5DB"}
                />
              ))}
              <span className="ml-2">({reviewCount} รีวิว)</span>
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
                <h2 className="text-xl font-bold mb-4 text-[black]">เนื้อหาหลักสูตร</h2>
                <p className="text-gray-700">{course.description || 'ไม่มีข้อมูล'}</p>
              </div>
              
              {/* Reviews Section */}
            <div className="mb-8">
  <h2 className="text-xl font-bold mb-4 text-[black]">รีวิวจากผู้เรียน</h2>
  {!course.review || course.review.length === 0 ? (
    <div className="text-center py-6 text-gray-500">ยังไม่มีรีวิวสำหรับคอร์สนี้</div>
  ) : (
    course.review.map(review => (
      <div key={review.id} className="border rounded-lg p-4 mb-4 shadow-sm hover:shadow transition-shadow">
        <div className="flex items-start">
          <div 
            className="text-white rounded-full w-10 h-10 flex items-center justify-center mr-3"
            style={{ backgroundColor: review.avatarColor || `hsl(${(review.username.charCodeAt(0) * 10) % 360}, 70%, 50%)` }}
          >
            <span className="text-lg font-medium">{review.username ? review.username.charAt(0).toUpperCase() : "U"}</span>
          </div>
          <div className="flex-grow">
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium">{review.username}</span>
              <div className="flex items-center">
                <span className="text-sm text-gray-500">{review.created_at ? new Date(review.created_at).toLocaleDateString('th-TH') : review.date}</span>
              </div>
            </div>
            <div className="flex items-center mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="h-4 w-4"
                  fill={star <= review.score ? "#FFB800" : "none"}
                  stroke={star <= review.score ? "#FFB800" : "#D1D5DB"}
                />
              ))}
              <span className="ml-2 text-sm">{review.score}/5</span>
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        </div>
      </div>
    ))
  )}
</div>
              
              {/* Comment Form Section */}
              <div className="bg-white border rounded-lg p-6 shadow-sm ">
                <h3 className="text-lg text-[black] font-bold mb-4">เพิ่มความคิดเห็นของคุณ</h3>
                
                {submitMessage && (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                    {submitMessage}
                  </div>
                )}
                
                {submitError && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {submitError}
                  </div>
                )}
                
                <form onSubmit={handleSubmitReview}>
                  <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                      ชื่อผู้ใช้ *
                    </label>
                    <input
                      type="text"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      คะแนน *
                    </label>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setScore(star)}
                          className="focus:outline-none mr-1"
                        >
                          <Star 
                            className="h-6 w-6 cursor-pointer" 
                            fill={star <= score ? "#FFB800" : "none"}
                            stroke={star <= score ? "#FFB800" : "#D1D5DB"}
                          />
                        </button>
                      ))}
                      <span className="ml-2 text-sm">{score}/5</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                      ความคิดเห็น *
                    </label>
                    <textarea
                      id="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows="4"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                      isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {isSubmitting ? 'กำลังส่ง...' : 'ส่งความคิดเห็น'}
                  </button>
                </form>
              </div>
            </div>
            
            {/* Right Column - Sidebar */}
            <div>
              {/* Additional Info Section */}
              {course.additional_info && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-4 text-[black]">ข้อมูลเพิ่มเติม</h2>
                  <p className="text-gray-700">{course.additional_info}</p>
                </div>
              )}
              
              {/* Course Instructor */}
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-4 text-[black]">ผู้สอน</h2>
                {course.instructor ? (
                  <div className="flex items-center">
                    <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center mr-3 ">
                      <span>{course.instructor.charAt(0)}</span>
                    </div>
                    <span className='text-[black]'>{course.instructor}</span>
                  </div>
                ) : (
                  <div className="text-gray-500 italic">ไม่มีข้อมูลผู้สอน</div>
                )}
              </div>
              
              {/* Course Publication Date */}
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-4 text-[black]">วันที่เผยแพร่</h2>
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