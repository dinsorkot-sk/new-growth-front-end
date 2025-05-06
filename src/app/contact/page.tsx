'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from 'react';
import {
  faLocationDot,
  faPhone,
  faEnvelope,
  faClock,
  faComment,
} from "@fortawesome/free-solid-svg-icons";

import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'กรุณาระบุชื่อ-นามสกุล';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'กรุณาระบุอีเมล';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'รูปแบบอีเมลไม่ถูกต้อง';
    }
    
    if (!formData.subject) {
      errors.subject = 'กรุณาเลือกเรื่อง';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'กรุณาระบุข้อความ';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      setSubmitStatus(null);
      
      try {
        const payload = {
          sender: 'napatone123@gmail.com',
          recipient: 'napatone123@gmail.com',
          subject: "asdadaddddd",
          message: "asdddddddd",
        };
        // ส่งข้อมูลไปยัง API endpoint
        const response = await fetch('http://localhost:3001/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
        
        const result = await response.json();
        
        if (!response.ok) {
          throw new Error(result.error || 'เกิดข้อผิดพลาดในการส่งข้อความ');
        }
        
        // การส่งสำเร็จ
        setSubmitStatus('success');
        
        // รีเซ็ตฟอร์ม
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
      } catch (error) {
        console.error('Error submitting form:', error);
        setSubmitStatus('error');
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  const subjectOptions = [
    { value: '', label: 'กรุณาเลือกเรื่อง' },
    { value: 'general', label: 'สอบถามทั่วไป' },
    { value: 'service', label: 'บริการ' },
    { value: 'feedback', label: 'ข้อเสนอแนะ' },
    { value: 'complaint', label: 'ร้องเรียน' }
  ];
  return (
    <div>
      {/* ส่วนเเรก */}
      <div className="w-full bg-[#0A2463]">
        <div className="p-6 sm:p-10 md:p-20 h-auto md:h-full">
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">ติดต่อเรา</div>
          <div className="pt-4 sm:pt-5 md:pt-6 text-base sm:text-lg text-white">
            มีคำถามเกี่ยวกับโปรแกรมของเราหรือไม่
            ทีมงานของเรายินดีให้ความช่วยเหลือคุณ
          </div>
        </div>
      </div>

    {/* ส่วนที่2 */}
      <div className="w-full bg-[#F9FAFB]">
        <div className="h-full">
          <div className="grid grid-cols-1  md:grid-cols-1 lg:grid-cols-2 gap-4 p-6 md:p-20">
            <div className="text-3xl text-[#0A2463] font-bold">
              ติดต่อเรา
              <div className="pt-10">
                <div className="flex gap-4">
                  <div className="flex justify-center items-center w-[48px] h-[48px] bg-[#E1F2FE] rounded-full">
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      style={{
                        color: "#0A2463",
                        width: "18px",
                        height: "18px",
                      }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-base font-bold text-[#0A2463]">Location</div>
                    <div className="pt-2 text-xs text-[#4B5563]">
                      123 Education Building Bangkok University Bangkok,
                      Thailand 10110
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-10">
                <div className="flex gap-4">
                  <div className="flex justify-center items-center w-[48px] h-[48px] bg-[#E1F2FE] rounded-full">
                    <FontAwesomeIcon
                      icon={faPhone}
                      style={{
                        color: "#0A2463",
                        width: "18px",
                        height: "18px",
                      }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-base font-bold text-[#0A2463]">Phone</div>
                    <div className="pt-2 text-xs text-[#4B5563] ">
                      Main Office: +66 2 123 4567 <br />
                      Admissions: +66 2 123 4568
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-10">
                <div className="flex gap-4">
                  <div className="flex justify-center items-center w-[48px] h-[48px] bg-[#E1F2FE] rounded-full">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      style={{
                        color: "#0A2463",
                        width: "18px",
                        height: "18px",
                      }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-base font-bold text-[#0A2463]">Email</div>
                    <div className="pt-2 text-xs text-[#4B5563]">
                      General Inquiries: info@thailand40edu.th
                      <br />
                      Admissions: admissions@thailand40edu.th
                      <br />
                      Support: support@thailand40edu.th
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-10">
                <div className="flex gap-4">
                  <div className="flex justify-center items-center w-[48px] h-[48px] bg-[#E1F2FE] rounded-full">
                    <FontAwesomeIcon
                      icon={faClock}
                      style={{
                        color: "#0A2463",
                        width: "18px",
                        height: "18px",
                      }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-base font-bold text-[#0A2463]">Office Hours</div>
                    <div className="pt-2 text-xs text-[#4B5563]">
                      Monday - Friday: 8:30 AM - 4:30 PM
                      <br />
                      Saturday: 9:00 AM - 12:00 PM
                      <br />
                      Sunday: Closed
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-10 text-base">ติดต่อกับเรา</div>
              <div className="flex gap-4 pt-6">
                <div className="flex justify-center items-center w-[44px] h-[44px] bg-[#0A2463] rounded-full">
                  <FontAwesomeIcon
                    icon={faFacebook}
                    style={{
                      color: "#ffffff",
                      width: "18px",
                      height: "18px",
                    }}
                  />
                </div>

                <div className="flex justify-center items-center w-[44px] h-[44px] bg-[#0A2463] rounded-full">
                  <FontAwesomeIcon
                    icon={faTwitter}
                    style={{
                      color: "#ffffff",
                      width: "18px",
                      height: "18px",
                    }}
                  />
                </div>

                <div className="flex justify-center items-center w-[44px] h-[44px] bg-[#0A2463] rounded-full">
                  <FontAwesomeIcon
                    icon={faInstagram}
                    style={{
                      color: "#ffffff",
                      width: "18px",
                      height: "18px",
                    }}
                  />
                </div>

                <div className="flex justify-center items-center w-[44px] h-[44px] bg-[#0A2463] rounded-full">
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    style={{
                      color: "#ffffff",
                      width: "18px",
                      height: "18px",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="w-full ">
        <div className="h-full px-4 py-5 sm:px-6 lg:px-20 lg:py-10">
          <div className="text-center text-[#0A2463] text-lg sm:text-xl font-bold">
            ที่อยู่เรา
          </div>

          <div className="flex justify-center items-center pt-8">
            <div className="w-full max-w-[1250px] h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] bg-gray-200 rounded-xl">
              <div className="flex items-center justify-center h-full px-4 text-center text-xs text-gray-500 ">
                Map would be displayed here
              </div>
            </div>
          </div>
        </div>
      </div>
            {/* <div className="text-3xl text-[#0A2463] font-bold ">
              ส่งข้อความถึงเรา
              <div className="flex gap-6">
                <div className="flex flex-col">
                  <div className="flex pt-10 text-xs text-[#374151] gap-2">
                    ชื่อ-นามสกุล <div className="text-[red]">*</div>
                  </div>
                  <div className="pt-2">
                    <input
                      className="w-full h-[40px] bg-[#FFFFFF] border border-[#D1D5DB] "
                      type="text"
                    />
                  </div>
                </div>

                <div className="flex">
                  <div className="flex flex-col">
                    <div className="flex pt-10 text-xs text-[#374151] gap-2">
                      ที่อยู่อีเมล์ <div className="text-[red]">*</div>
                    </div>
                    <div className="pt-2">
                      <input
                        className="w-full h-[40px] bg-[#FFFFFF] border border-[#D1D5DB]"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <div className="text-[#374151] text-xs">
                  เบอร์โทรศัพท์
                  <div className="pt-2">
                    <input
                      className="pt-2 w-full h-[42px] bg-[#ffffff]  border border-[#D1D5DB] rounded-lg"
                      type="text"
                    />
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <div className="flex">
                  <div className="flex flex-col">
                    <div className="flex text-[#374151] text-xs gap-2">
                      เรื่อง <div className="text-[red]">*</div>
                    </div>
                    <div className="pt-2">
                      <select
                        className="pt-2 w-full h-[42px] bg-[#ffffff] border border-[#D1D5DB] text-black text-lg font-thin rounded-lg"
                        name=""
                        id=""
                      >
                        <option>select a subject</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <div className="flex text-[#374151] text-xs gap-2">
                  ข้อความ <div className="text-[red]">*</div>
                </div>
                <div className="pt-2">
                  <input
                    className="w-full h-[140px] bg-white border border-[#D1D5DB] rounded-lg text-black text-lg"
                    type="text"
                  />
                </div>
              </div>
              <div className="pt-6">
                <div className="flex items-center justify-around md:justify-around gap-2 p-4 w-full md:w-[180px] h-[50px] bg-[#39A9DB] rounded-lg cursor-pointer">
                  <div className="">
                    <FontAwesomeIcon
                      icon={faComment}
                      style={{
                        color: "#ffffff",
                        width: "18px",
                        height: "18px",
                      }}
                    />
                  </div>
                  <div className="text-[#ffffff] text-xs">ส่งข้อความ</div>
                </div>
              </div>
            </div> */}

{/* <div className="w-full max-w-2xl mx-auto   rounded-lg">
      <h1 className="text-3xl text-blue-900 font-bold mb-6">ส่งข้อความถึงเรา</h1>
      
      <div>
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="flex flex-col flex-1">
            <label className="flex text-xs text-gray-700 mb-2">
              ชื่อ-นามสกุล <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full h-10 px-3 border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
            />
            {formErrors.name && (
              <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
            )}
          </div>
          
          <div className="flex flex-col flex-1">
            <label className="flex text-xs text-gray-700 mb-2">
              ที่อยู่อีเมล์ <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full h-10 px-3 border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
            />
            {formErrors.email && (
              <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
            )}
          </div>
        </div>
        
        <div className="mb-6">
          <label className="text-xs text-gray-700 mb-2 block">
            เบอร์โทรศัพท์
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full h-10 px-3 border border-gray-300 rounded-lg"
          />
        </div>
        
        <div className="mb-6">
          <label className="flex text-xs text-gray-700 mb-2">
            เรื่อง <span className="text-red-500 ml-1">*</span>
          </label>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={`w-full h-10 px-3 border ${formErrors.subject ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
          >
            {subjectOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {formErrors.subject && (
            <p className="text-red-500 text-xs mt-1">{formErrors.subject}</p>
          )}
        </div>
        
        <div className="mb-6">
          <label className="flex text-xs text-gray-700 mb-2">
            ข้อความ <span className="text-red-500 ml-1">*</span>
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className={`w-full h-36 p-3 border ${formErrors.message ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
          />
          {formErrors.message && (
            <p className="text-red-500 text-xs mt-1">{formErrors.message}</p>
          )}
        </div>
        
        {submitStatus === 'success' && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
            ส่งข้อความเรียบร้อยแล้ว ขอบคุณที่ติดต่อเรา
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            เกิดข้อผิดพลาดในการส่งข้อความ กรุณาลองใหม่อีกครั้ง
          </div>
        )}
        
        <div
          onClick={handleSubmit}
          className={`flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg ${isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-600 cursor-pointer'} transition-colors`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>กำลังส่ง...</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span>ส่งข้อความ</span>
            </>
          )}
        </div>
      </div>
    </div> */}
          </div>
        </div>
      </div>

    {/* ส่วนที่3 */}
     
      
    </div>
  );
}
