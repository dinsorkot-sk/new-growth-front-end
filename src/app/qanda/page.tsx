'use client';
import React, { useState } from 'react';

export default function Home() {
    const faqData = [
        {
          question: "Who can apply to the Thailand 4.0 Graduate Training Program?",
          answer: "The program is open to recent graduates with a bachelor's degree or higher in relevant fields such as computer science, engineering, business, or science. Applicants must be Thai citizens or have the necessary permits to study and work in Thailand. Some courses may have specific prerequisites, which will be listed in the course details.",
          isOpen: true
        },
        {
          question: "How long are the training programs?",
          answer: "Training program durations vary depending on the specialization. Most programs range from 3 to 6 months of intensive training.",
          isOpen: false
        },
        {
          question: "Is there a fee to participate in the program?",
          answer: "Yes, there is a participation fee that varies by program. However, scholarships and financial aid options are available for qualified applicants. Some employer-sponsored positions may also cover the program costs.",
          isOpen: false
        },
        {
          question: "What is the application process like?",
          answer: "The application process includes submitting an online application form, uploading your resume and academic transcripts, completing a skills assessment, and participating in an interview if shortlisted.",
          isOpen: false
        },
        {
          question: "Do you offer job placement after completing the program?",
          answer: "Yes, we partner with leading technology companies and startups in Thailand to provide job placement opportunities. Our program has an 85% placement rate within three months of completion.",
          isOpen: false
        },
        {
          question: "Are the courses offered online or in-person?",
          answer: "We offer both online and in-person options. Our flagship programs are conducted in-person at our Bangkok campus, but we also provide hybrid and fully online alternatives for international students or those unable to attend in person.",
          isOpen: false
        },
        {
          question: "What certification will I receive upon completion?",
          answer: "Graduates receive an official Thailand 4.0 Digital Talent certification recognized by the Ministry of Digital Economy and Society. Additional industry-specific certifications may be available depending on your program track.",
          isOpen: false
        },
        {
          question: "Can international students apply?",
          answer: "Yes, international students can apply. However, they must obtain the necessary visa and work permits to participate in the program in Thailand. Our admissions team can provide guidance on the required documentation.",
          isOpen: false
        }
      ];
    
      // Toggle function to open/close FAQ items
      const [openIndex, setOpenIndex] = useState(0); // 0 means the first item is open by default

  // Toggle function that ensures only one FAQ is open
  const toggleFAQ = (index) => {
    // Always open the clicked item, never close it
    setOpenIndex(index);
  };

  return (
    <div>
    <div className=" bg-[#0A2463] h-70   p-10 md:p-20 ">
        <div className="text-3xl font-bold text-white">กระทู้คำถาม</div>
        <div className="text-wrap max-w-2xl text-lg mt-5 text-white">คำถามทั่วไปเกี่ยวกับโปรแกรมการฝึกอบรม กระบวนการสมัคร และอื่นๆ ของเรา</div>
    </div>
    <div className="flex justify-center bg-[#F9FAFB]">
    <div className="py-4 ">
    <div className=''>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="  overflow-hidden">
          {faqData.map((faq, index) => (
            <div key={index} className=" bg-white my-5  rounded-lg">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-blue-50 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="font-medium text-[#0A2463] text-lg">{faq.question}</h3>
                <svg
                  className={`w-5 h-5 text-blue-600 transform transition-transform ${
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
                className={`px-6 py-4 text-[#4B5563] ${
                  openIndex === index ? 'block' : 'hidden'
                }`}
              >
                <p className='text-[#4B5563] text-sm '>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
    </div>
    <div className="flex justify-center bg-[#F9FAFB] items-center py-8 px-5">
        <div>
        <div className='text-center text-2xl text-[#0A2463]'>ยังมีคำถามใช่ไหม?</div>
   
   <div className='text-sm my-5 text-[#4B5563]'> หากคุณไม่พบคำตอบสำหรับคำถามของคุณ โปรดอย่าลังเลที่จะติดต่อเราโดยตรง ทีมงานของเรายินดีให้ความช่วยเหลือ</div>
   
   <div className='flex justify-center gap-8 my-5'>
   <button className='bg-[#39A9DB] p-4 rounded-lg text-white'>ติดต่อเรา</button>
   <button className=' p-4 text-[#0A2463] rounded-lg'>อีเมลเรา</button>
   </div>
        </div>
    
    </div>
    
   
    </div>
  );
}


