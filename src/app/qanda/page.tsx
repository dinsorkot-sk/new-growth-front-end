// 'use client';
// import React, { useState } from 'react';

// export default function Home() {
//     const faqData = [
//         {
//           question: "Who can apply to the Thailand 4.0 Graduate Training Program?",
//           answer: "The program is open to recent graduates with a bachelor's degree or higher in relevant fields such as computer science, engineering, business, or science. Applicants must be Thai citizens or have the necessary permits to study and work in Thailand. Some courses may have specific prerequisites, which will be listed in the course details.",
//           isOpen: true
//         },
//         {
//           question: "How long are the training programs?",
//           answer: "Training program durations vary depending on the specialization. Most programs range from 3 to 6 months of intensive training.",
//           isOpen: false
//         },
//         {
//           question: "Is there a fee to participate in the program?",
//           answer: "Yes, there is a participation fee that varies by program. However, scholarships and financial aid options are available for qualified applicants. Some employer-sponsored positions may also cover the program costs.",
//           isOpen: false
//         },
//         {
//           question: "What is the application process like?",
//           answer: "The application process includes submitting an online application form, uploading your resume and academic transcripts, completing a skills assessment, and participating in an interview if shortlisted.",
//           isOpen: false
//         },
//         {
//           question: "Do you offer job placement after completing the program?",
//           answer: "Yes, we partner with leading technology companies and startups in Thailand to provide job placement opportunities. Our program has an 85% placement rate within three months of completion.",
//           isOpen: false
//         },
//         {
//           question: "Are the courses offered online or in-person?",
//           answer: "We offer both online and in-person options. Our flagship programs are conducted in-person at our Bangkok campus, but we also provide hybrid and fully online alternatives for international students or those unable to attend in person.",
//           isOpen: false
//         },
//         {
//           question: "What certification will I receive upon completion?",
//           answer: "Graduates receive an official Thailand 4.0 Digital Talent certification recognized by the Ministry of Digital Economy and Society. Additional industry-specific certifications may be available depending on your program track.",
//           isOpen: false
//         },
//         {
//           question: "Can international students apply?",
//           answer: "Yes, international students can apply. However, they must obtain the necessary visa and work permits to participate in the program in Thailand. Our admissions team can provide guidance on the required documentation.",
//           isOpen: false
//         }
//       ];
    
//       // Toggle function to open/close FAQ items
//       const [openIndex, setOpenIndex] = useState(0); // 0 means the first item is open by default

//   // Toggle function that ensures only one FAQ is open
//   const toggleFAQ = (index) => {
//     // Always open the clicked item, never close it
//     setOpenIndex(index);
//   };

//   return (
//     <div>
//     <div className=" bg-[#0A2463] h-70   p-10 md:p-20 ">
//         <div className="text-3xl font-bold text-white">กระทู้คำถาม</div>
//         <div className="text-wrap max-w-2xl text-lg mt-5 text-white">คำถามทั่วไปเกี่ยวกับโปรแกรมการฝึกอบรม กระบวนการสมัคร และอื่นๆ ของเรา</div>
//     </div>
//     <div className="flex justify-center bg-[#F9FAFB]">
//     <div className="py-4 ">
//     <div className=''>
//       <div className="max-w-5xl mx-auto px-4 py-8">
//         <div className="  overflow-hidden">
//           {faqData.map((faq, index) => (
//             <div key={index} className=" bg-white my-5  rounded-lg">
//               <button
//                 className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-blue-50 transition-colors"
//                 onClick={() => toggleFAQ(index)}
//               >
//                 <h3 className="font-medium text-[#0A2463] text-lg">{faq.question}</h3>
//                 <svg
//                   className={`w-5 h-5 text-blue-600 transform transition-transform ${
//                     openIndex === index ? 'rotate-180' : ''
//                   }`}
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                 </svg>
//               </button>
//               <div
//                 className={`px-6 py-4 text-[#4B5563] ${
//                   openIndex === index ? 'block' : 'hidden'
//                 }`}
//               >
//                 <p className='text-[#4B5563] text-sm '>{faq.answer}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//     </div>
//     </div>
//     <div className="flex justify-center bg-[#F9FAFB] items-center py-8 px-5">
//         <div>
//         <div className='text-center text-2xl text-[#0A2463]'>ยังมีคำถามใช่ไหม?</div>
   
//    <div className='text-sm my-5 text-[#4B5563]'> หากคุณไม่พบคำตอบสำหรับคำถามของคุณ โปรดอย่าลังเลที่จะติดต่อเราโดยตรง ทีมงานของเรายินดีให้ความช่วยเหลือ</div>
   
//    <div className='flex justify-center gap-8 my-5'>
//    <button className='bg-[#39A9DB] p-4 rounded-lg text-white'>ติดต่อเรา</button>
//    <button className=' p-4 text-[#0A2463] rounded-lg'>อีเมลเรา</button>
//    </div>
//         </div>
    
//     </div>
    
   
//     </div>
//   );
// }

'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
    const [faqData, setFaqData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openIndex, setOpenIndex] = useState(null);

    // Pagination states
    const [offset, setOffset] = useState(0);
    const [limit] = useState(10);
    const [pagination, setPagination] = useState({
        totalCount: 0,
        currentPage: 1,
        totalPages: 1,
        prev: null,
        next: null
    });

    useEffect(() => {
        fetchFAQData();
    }, [offset]);

    const fetchFAQData = async () => {
        try {
            // เรียก API โดยใช้ค่าจาก environment variable หรือค่าเริ่มต้น
            const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/topic`;
            
            const response = await axios.get(
                apiUrl,
                {
                    params: {
                        offset: offset,  // ส่งค่า offset ที่อัปเดตแล้ว
                        limit: limit
                    }
                }
            );

            // แปลงข้อมูลตามโครงสร้าง API ที่ได้รับมา
            const formattedData = response.data.data.map((item) => ({
                id: item.id,
                question: item.title,
                postedBy: item.posted_by,
                createdAt: new Date(item.created_at).toLocaleDateString('th-TH', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                }),
                answers: item.answer.map(ans => ({
                    id: ans.id,
                    text: ans.answer_text,
                    answeredBy: ans.answered_by,
                    createdAt: new Date(ans.created_at).toLocaleDateString('th-TH', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })
                })),
                isOpen: false
            }));
            
            // อัปเดต state pagination ด้วยข้อมูลที่ได้รับจาก API
            setPagination(response.data.pagination);
            
            if (formattedData.length > 0) {
                setOpenIndex(0); // ตั้งค่าให้รายการแรกเปิด
            }

            setFaqData(formattedData);
            setIsLoading(false);
        } catch (error) {
            // จัดการข้อผิดพลาดต่างๆ
            if (error.response) {
                // ข้อผิดพลาดจากเซิร์ฟเวอร์ (status code นอกช่วง 2xx)
                setError('ไม่สามารถโหลดข้อมูลได้: ' + (error.response.data.message || 'เกิดข้อผิดพลาดจากเซิร์ฟเวอร์'));
            } else if (error.request) {
                // ไม่ได้รับคำตอบจากเซิร์ฟเวอร์
                setError('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
            } else {
                // ข้อผิดพลาดในการตั้งคำขอ
                setError('เกิดข้อผิดพลาดในการโหลดข้อมูล');
            }
            setIsLoading(false);
        }
    };

    // Toggle function that ensures only one FAQ is open
    const toggleFAQ = (index) => {
        // Always open the clicked item, never close it
        setOpenIndex(index);
    };

    // ฟังก์ชันสำหรับเปลี่ยนหน้า
    const goToNextPage = () => {
        if (pagination.next !== null) {
            setOpenIndex(null); // รีเซ็ตคำถามที่เปิดอยู่
            setOffset(offset + limit);
        }
    };

    const goToPrevPage = () => {
        if (pagination.prev !== null) {
            setOpenIndex(null); // รีเซ็ตคำถามที่เปิดอยู่
            setOffset(Math.max(0, offset - limit)); // ป้องกันไม่ให้ offset เป็นค่าลบ
        }
    };

    // ฟังก์ชันสำหรับไปยังหน้าที่ต้องการโดยตรง
    const goToPage = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= pagination.totalPages) {
            setOpenIndex(null);
            setOffset((pageNumber - 1) * limit);
        }
    };

    return (
        <div>
            <div className="bg-[#0A2463] h-auto p-10 md:p-20">
                <div className="text-4xl font-bold text-white">กระทู้คำถาม</div>
                <div className="text-wrap max-w-3xl text-xl mt-5 text-white">คำถามทั่วไปเกี่ยวกับโปรแกรมการฝึกอบรม กระบวนการสมัคร และอื่นๆ ของเรา</div>
            </div>
            <div className="flex justify-center bg-[#F9FAFB]">
                <div className="w-full max-w-5xl py-4">
                    <div className=''>
                        <div className="w-full px-4 py-8">
                            {isLoading ? (
                                <div className="text-center py-10">
                                    <p className="text-lg">กำลังโหลดข้อมูล...</p>
                                </div>
                            ) : error ? (
                                <div className="text-center py-10 text-red-500">
                                    <p className="text-lg">{error}</p>
                                    <button 
                                        onClick={fetchFAQData}
                                        className="mt-4 px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        ลองใหม่
                                    </button>
                                </div>
                            ) : (
                                <div className="overflow-hidden">
                                    {faqData.length === 0 ? (
                                        <div className="text-center py-10">
                                            <p className="text-lg">ไม่พบข้อมูลกระทู้คำถาม</p>
                                        </div>
                                    ) : (
                                        faqData.map((faq, index) => (
                                            <div key={faq.id} className="bg-white my-6 rounded-lg shadow-sm">
                                                <button
                                                    className="w-full px-8 py-5 text-left flex justify-between items-center hover:bg-blue-50 transition-colors"
                                                    onClick={() => toggleFAQ(index)}
                                                >
                                                    <h3 className="font-medium text-[#0A2463] text-xl">{faq.question}</h3>
                                                    <svg
                                                        className={`w-6 h-6 text-blue-600 transform transition-transform ${
                                                            openIndex === index ? 'rotate-180' : ''
                                                        }`}
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </button>
                                                <div
                                                    className={`px-8 py-6 ${
                                                        openIndex === index ? 'block' : 'hidden'
                                                    }`}
                                                >
                                                    <div className="border-b border-gray-200 pb-4 mb-4">
                                                        <div className="flex justify-between items-center">
                                                            <div className="flex items-center">
                                                                <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                                                                    <span className="text-sm font-bold">{faq.postedBy.charAt(0)}</span>
                                                                </div>
                                                                <div className="text-[#0A2463] font-medium">โดย: {faq.postedBy}</div>
                                                            </div>
                                                            <div className="text-gray-500 text-sm">{faq.createdAt}</div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="space-y-6">
                                                        {faq.answers.map((answer, ansIdx) => (
                                                            <div key={answer.id} className="bg-gray-50 p-4 rounded-lg">
                                                                <div className="flex items-center mb-3">
                                                                    <div className="bg-green-100 text-green-800 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                                                                        <span className="text-sm font-bold">{answer.answeredBy.charAt(0)}</span>
                                                                    </div>
                                                                    <div className="font-medium text-[#0A2463]">คำตอบจาก: {answer.answeredBy}</div>
                                                                </div>
                                                                
                                                                <div className="pl-11 mb-3 text-base text-[#4B5563]">
                                                                    {answer.text}
                                                                </div>
                                                                
                                                                <div className="pl-11 text-right text-sm text-gray-500">
                                                                    {answer.createdAt}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                    
                                    {/* Pagination Controls */}
                                    {faqData.length > 0 && (
                                        <div className="flex flex-col items-center mt-8 space-y-4">
                                            <div className="flex items-center justify-between w-full">
                                                <button
                                                    onClick={goToPrevPage}
                                                    disabled={pagination.prev === null}
                                                    className={`px-4 py-2 flex items-center rounded-lg ${
                                                        pagination.prev === null
                                                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                                            : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                                    }`}
                                                >
                                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                                                    </svg>
                                                    หน้าก่อนหน้า
                                                </button>
                                                
                                                <div className="text-[#0A2463] font-medium">
                                                    หน้า {pagination.currentPage} จาก {pagination.totalPages}
                                                </div>
                                                
                                                <button
                                                    onClick={goToNextPage}
                                                    disabled={pagination.next === null}
                                                    className={`px-4 py-2 flex items-center rounded-lg ${
                                                        pagination.next === null
                                                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                                            : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                                    }`}
                                                >
                                                    หน้าถัดไป
                                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                            
                                            {/* Page Numbers */}
                                            {/* {pagination.totalPages > 1 && (
                                                <div className="flex space-x-2">
                                                    {[...Array(pagination.totalPages)].map((_, i) => (
                                                        <button
                                                            key={i}
                                                            onClick={() => goToPage(i + 1)}
                                                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                                                pagination.currentPage === i + 1
                                                                    ? 'bg-[#0A2463] text-white'
                                                                    : 'bg-white text-[#0A2463] border hover:bg-blue-50'
                                                            }`}
                                                        >
                                                            {i + 1}
                                                        </button>
                                                    ))}
                                                </div>
                                            )} */}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center bg-[#F9FAFB] items-center py-12 px-5">
                <div className="w-full max-w-2xl text-center">
                    <div className='text-center text-3xl font-bold text-[#0A2463]'>ยังมีคำถามใช่ไหม?</div>
                    <div className='text-base my-6 text-[#4B5563]'>หากคุณไม่พบคำตอบสำหรับคำถามของคุณ โปรดอย่าลังเลที่จะติดต่อเราโดยตรง ทีมงานของเรายินดีให้ความช่วยเหลือ</div>
                    <div className='flex justify-center gap-8 my-6'>
                        <button className='bg-[#39A9DB] px-6 py-4 rounded-lg text-white font-medium text-lg hover:bg-[#2D87AF] transition'>ติดต่อเรา</button>
                        <button className='px-6 py-4 text-[#0A2463] border border-[#0A2463] rounded-lg font-medium text-lg hover:bg-blue-50 transition'>อีเมลเรา</button>
                    </div>
                </div>
            </div>
        </div>
    );
}