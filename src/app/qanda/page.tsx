'use client';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();
    const [faqData, setFaqData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openIndex, setOpenIndex] = useState(null);
    const [replyError, setReplyError] = useState(null);
    const [replySuccess, setReplySuccess] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [replyName, setReplyName] = useState("");
    // New states for question creation
    const [showModal, setShowModal] = useState(false);
    const [newQuestion, setNewQuestion] = useState({
        text: '',
        posted_by: ''
    });
    const [questionError, setQuestionError] = useState(null);
    const [isSubmittingQuestion, setIsSubmittingQuestion] = useState(false);
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

    const fetchFAQData = useCallback(async () => {
        try {
            // เรียก API โดยใช้ค่าจาก environment variable หรือค่าเริ่มต้น
            const apiUrl = `${process.env.NEXT_PUBLIC_API}/topic?order=asc`;

            const response = await axios.get(
                apiUrl,
                {
                    params: {
                        offset: offset,  // ส่งค่า offset ที่อัปเดตแล้ว
                        limit: limit
                    }
                }
            );
            console.log(response.data.data)
            // แปลงข้อมูลตามโครงสร้าง API ที่ได้รับมา
            const formattedData = response.data.data.map((item) => ({
                id: item.id,
                question: item.title,
                postedBy: item.posted_by,
                status: item.status,
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
                    status: ans.status,
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
            console.log(formattedData)
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
    }, [offset, limit]);

    useEffect(() => {
        fetchFAQData();
    }, [fetchFAQData]);

    // ฟังก์ชันส่งคำตอบไปยัง API
    const submitReply = async (topicId) => {
        console.log(topicId, replyName, replyText)
        // ตรวจสอบว่ามีข้อความที่จะส่งหรือไม่
        if (!replyText.trim()) {
            setReplyError('กรุณากรอกคำตอบของคุณ');
            return;
        }

        setIsSubmitting(true);
        setReplyError(null);

        try {
            const apiUrl = `${process.env.NEXT_PUBLIC_API}/answer`;

            // สมมติว่าเรามีข้อมูลของผู้ใช้ปัจจุบัน (ในกรณีจริงอาจได้จาก context หรือ session)
            const currentUser = 'ผู้ใช้งาน'; // ตัวอย่างค่าเริ่มต้น (ควรเปลี่ยนเป็นข้อมูลจริง)

            // ส่งข้อมูลไปยัง API
            await axios.post(apiUrl, {
                topic_id: topicId,
                answer_text: replyText,
                answered_by: replyName,
                status: "hidden"
            });

            // อัปเดต UI เมื่อส่งสำเร็จ
            setReplySuccess(true);
            setReplyText('');

            // โหลดข้อมูลใหม่เพื่อแสดงคำตอบที่เพิ่งส่ง
            setTimeout(() => {
                fetchFAQData();
                setReplySuccess(false);
            }, 2000);

        } catch (error) {
            console.error('Error submitting reply:', error);
            if (error.response) {
                setReplyError('ไม่สามารถส่งคำตอบได้: ' + (error.response.data.message || 'เกิดข้อผิดพลาดจากเซิร์ฟเวอร์'));
            } else if (error.request) {
                setReplyError('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
            } else {
                setReplyError('เกิดข้อผิดพลาดในการส่งคำตอบ');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    // Toggle function that ensures only one FAQ is open
    const toggleFAQ = (index: number) => {
        // Toggle the clicked FAQ: close if it's already open, open otherwise
        setOpenIndex((prev: number | null) => prev === index ? null : index);
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

    // Add new function for handling question creation
    const handleSaveQuestion = async () => {
        if (!newQuestion.text.trim() || !newQuestion.posted_by.trim()) {
            setQuestionError('กรุณากรอกข้อมูลให้ครบถ้วน');
            return;
        }

        setIsSubmittingQuestion(true);
        setQuestionError(null);

        try {
            const apiUrl = `${process.env.NEXT_PUBLIC_API}/admin/topic`;
            await axios.post(apiUrl, {
                title: newQuestion.text,
                posted_by: newQuestion.posted_by,
                answers: []
            });

            // Reset form and close modal
            setNewQuestion({ text: '', posted_by: '' });
            setShowModal(false);
            
            // Refresh the data
            fetchFAQData();
        } catch (error) {
            console.error('Error creating question:', error);
            if (error.response) {
                setQuestionError('ไม่สามารถสร้างคำถามได้: ' + (error.response.data.message || 'เกิดข้อผิดพลาดจากเซิร์ฟเวอร์'));
            } else if (error.request) {
                setQuestionError('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
            } else {
                setQuestionError('เกิดข้อผิดพลาดในการสร้างคำถาม');
            }
        } finally {
            setIsSubmittingQuestion(false);
        }
    };

    return (
        <div>
            <div className="bg-[#0A2463] h-auto p-10 md:p-20">
                <div className="text-4xl font-bold text-white">กระทู้คำถาม</div>
                <div className="text-wrap max-w-3xl text-xl mt-5 text-white">คำถามทั่วไปเกี่ยวกับโปรแกรมการฝึกอบรม กระบวนการสมัคร และอื่นๆ ของเรา</div>
            </div>

            {/* Question Creation Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4">
                        <h2 className="text-2xl font-bold text-[#0A2463] mb-6">สร้างคำถามใหม่</h2>
                        
                        {questionError && (
                            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg mb-4">
                                {questionError}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="questionName" className="block text-sm font-medium text-gray-700 mb-1">
                                    ชื่อของคุณ
                                </label>
                                <input
                                    type="text"
                                    id="questionName"
                                    value={newQuestion.posted_by}
                                    onChange={(e) => setNewQuestion({ ...newQuestion, posted_by: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="กรอกชื่อของคุณ"
                                    disabled={isSubmittingQuestion}
                                />
                            </div>

                            <div>
                                <label htmlFor="questionText" className="block text-sm font-medium text-gray-700 mb-1">
                                    คำถามของคุณ
                                </label>
                                <textarea
                                    id="questionText"
                                    value={newQuestion.text}
                                    onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg p-3 min-h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="เขียนคำถามของคุณที่นี่..."
                                    disabled={isSubmittingQuestion}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4 mt-6">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                                disabled={isSubmittingQuestion}
                            >
                                ยกเลิก
                            </button>
                            <button
                                onClick={handleSaveQuestion}
                                disabled={isSubmittingQuestion}
                                className={`px-6 py-3 rounded-lg text-white font-medium ${
                                    isSubmittingQuestion
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-[#39A9DB] hover:bg-[#2D87AF] transition'
                                }`}
                            >
                                {isSubmittingQuestion ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        กำลังส่ง...
                                    </span>
                                ) : 'สร้างคำถาม'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex justify-center bg-[#F9FAFB]">
                <div className="w-full max-w-5xl py-4">
                    <div className=''>
                        <div className="w-full px-4 py-8">
                            <div className="flex justify-end mb-6">
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="px-6 py-3 bg-[#39A9DB] text-white rounded-lg hover:bg-[#2D87AF] transition"
                                >
                                    สร้างคำถามใหม่
                                </button>
                            </div>
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
                                            <p className="text-lg text-[black]">ไม่พบข้อมูลกระทู้คำถาม</p>
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
                                                        className={`w-6 h-6 text-blue-600 transform transition-transform ${openIndex === index ? 'rotate-180' : ''
                                                            }`}
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </button>
                                                <div
                                                    className={`px-8 py-6 transition-all duration-300 ease-in-out  ${openIndex === index ? 'block' : 'hidden'
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
                                                        {faq.answers.filter(answer => answer.status === "show").map((answer, ansIdx) => (
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

                                                    <div className="mt-8 border-t border-gray-200 pt-6">
                                                        <h4 className="text-lg font-medium text-[#0A2463] mb-4">ตอบคำถามนี้</h4>

                                                        {replySuccess && (
                                                            <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-lg mb-4 flex items-center">
                                                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                                                </svg>
                                                                ส่งคำตอบเรียบร้อยแล้ว
                                                            </div>
                                                        )}

                                                        {replyError && (
                                                            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg mb-4">
                                                                {replyError}
                                                            </div>
                                                        )}

                                                        <div className="flex flex-col">
                                                            {/* เพิ่มฟิลด์กรอกชื่อ */}
                                                            <div className="mb-4 text-[black]">
                                                                <label htmlFor="replyName" className="block text-sm font-medium text-gray-700 mb-1">ชื่อของคุณ</label>
                                                                <input
                                                                    type="text"
                                                                    id="replyName"
                                                                    value={replyName}
                                                                    onChange={(e) => setReplyName(e.target.value)}
                                                                    placeholder="กรอกชื่อของคุณ"
                                                                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                                    disabled={isSubmitting}
                                                                />
                                                            </div>

                                                            <textarea
                                                                value={replyText}
                                                                onChange={(e) => setReplyText(e.target.value)}
                                                                placeholder="เขียนคำตอบของคุณที่นี่..."
                                                                className="w-full text-[black] border border-gray-300 rounded-lg p-4 min-h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                                disabled={isSubmitting}
                                                            ></textarea>

                                                            <div className="flex justify-end mt-4">
                                                                <button
                                                                    onClick={() => submitReply(faq.id)}
                                                                    disabled={isSubmitting}
                                                                    className={`px-6 py-3 rounded-lg text-white font-medium cursor-pointer ${isSubmitting
                                                                            ? 'bg-gray-400 cursor-not-allowed'
                                                                            : 'bg-[#39A9DB] hover:bg-[#2D87AF] transition'
                                                                        }`}
                                                                >
                                                                    {isSubmitting ? (
                                                                        <span className="flex items-center">
                                                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                            </svg>
                                                                            กำลังส่ง...
                                                                        </span>
                                                                    ) : 'ส่งคำตอบ'}
                                                                </button>
                                                            </div>
                                                        </div>
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
                                                    className={`px-4 py-2 flex items-center rounded-lg ${pagination.prev === null
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
                                                    className={`px-4 py-2 flex items-center rounded-lg ${pagination.next === null
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
                        <button className='bg-[#39A9DB] px-6 py-4 rounded-lg text-white font-medium text-lg hover:bg-[#2D87AF] transition cursor-pointer' onClick={() => router.push('/contact')}>ติดต่อเรา</button>
                        <button className='px-6 py-4 text-[#0A2463] border border-[#0A2463] rounded-lg font-medium text-lg hover:bg-blue-50 transition cursor-pointer' onClick={() => router.push('/contact')}>อีเมลเรา</button>
                    </div>
                </div>
            </div>
        </div>
    );
}