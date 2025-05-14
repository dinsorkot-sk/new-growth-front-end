"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
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

// เพิ่ม interface สำหรับ error fields
interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    const errors: FormErrors = {};

    if (!formData.name.trim()) {
      errors.name = "กรุณาระบุชื่อ-นามสกุล";
    }

    if (!formData.email.trim()) {
      errors.email = "กรุณาระบุอีเมล";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "รูปแบบอีเมลไม่ถูกต้อง";
    }

    if (!formData.subject) {
      errors.subject = "กรุณาเลือกเรื่อง";
    }

    if (!formData.message.trim()) {
      errors.message = "กรุณาระบุข้อความ";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      setSubmitStatus(null);

      try {
        const payload = {
          sender: "napatone123@gmail.com",
          recipient: "napatone123@gmail.com",
          subject: "asdadaddddd",
          message: "asdddddddd",
        };
        // ส่งข้อมูลไปยัง API endpoint
        const response = await fetch("http://localhost:3001/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "เกิดข้อผิดพลาดในการส่งข้อความ");
        }

        // การส่งสำเร็จ
        setSubmitStatus("success");

        // รีเซ็ตฟอร์ม
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } catch (error) {
        console.error("Error submitting form:", error);
        setSubmitStatus("error");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const subjectOptions = [
    { value: "", label: "กรุณาเลือกเรื่อง" },
    { value: "general", label: "สอบถามทั่วไป" },
    { value: "service", label: "บริการ" },
    { value: "feedback", label: "ข้อเสนอแนะ" },
    { value: "complaint", label: "ร้องเรียน" },
  ];
  return (
    <div>
      {/* ส่วนเเรก */}
      <div className="w-full bg-[#0A2463]">
        <div className="p-6 sm:p-10 md:p-20 h-auto md:h-full">
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
            ติดต่อเรา
          </div>
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
                    <div className="text-base font-bold text-[#0A2463]">
                      สถานที่อบรม
                    </div>
                    <div className="pt-2 text-xs text-[#4B5563]">
                      มหาวิทยาลัยแม่โจ้
                      <br />
                      63 หมู่ 4 ต.หนองหาร อ.สันทราย จ.เชียงใหม่ 50290
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
                    <div className="text-base font-bold text-[#0A2463]">
                      Phone
                    </div>
                    <div className="pt-2 text-xs text-[#4B5563] ">
                      อ.ดร.พยุงศักดิ์ เกษมสำราญ: 084-150-0677
                      <br />
                      อ.ดร.สุดเขต สกุลทอง: 089-837-8992
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
                    <div className="text-base font-bold text-[#0A2463]">
                      Email
                    </div>
                    <div className="pt-2 text-xs text-[#4B5563]">
                      อ.ดร.พยุงศักดิ์: Payungsak.kae@gmail.com
                      <br />
                      อ.ดร.สุดเขต: sutkhet@mju.ac.th
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
                    <div className="text-base font-bold text-[#0A2463]">
                      เวลาทำการ
                    </div>
                    <div className="pt-2 text-xs text-[#4B5563]">
                      จันทร์ - ศุกร์: 8:30 - 16:30 น.
                      <br />
                      เสาร์ - อาทิตย์: ปิดทำการ
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full ">
              <div className="h-full px-4 py-5 sm:px-6 lg:px-20 lg:py-10">
                <div className="text-center text-[#0A2463] text-lg sm:text-xl font-bold">
                  ที่อยู่เรา
                </div>

                <div className="flex justify-center items-center pt-8">
                  <div className="w-full max-w-[1250px] h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] bg-gray-200 rounded-xl overflow-hidden">
                    <iframe
                      title="แผนที่มหาวิทยาลัยแม่โจ้"
                      src="https://www.google.com/maps?q=มหาวิทยาลัยแม่โจ้,เชียงใหม่&hl=th&z=16&output=embed"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
