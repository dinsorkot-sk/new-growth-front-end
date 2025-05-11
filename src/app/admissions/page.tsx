"use client";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faUserCheck,
  faClock,
  faCircleCheck,
  faCircleDot,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const steps = [
    {
      number: 1,
      title: "1. การสมัครออนไลน์",
      description:
        "กรอกแบบฟอร์มใบสมัครออนไลน์และอัพโหลดเอกสารสำคัญเพื่อเป็นหลักฐานในการสมัครให้ครบถ้วน",
    },
    {
      number: 2,
      title: "2. การตรวจสอบการสมัคร",
      description:
        "ทีมรับสมัครตรวจสอบความถูกต้องของข้อมูลที่คุณกรอกมาตรวจสอบเอกสารและตรวจสอบคุณสมบัติ",
    },
    {
      number: 3,
      title: "3. แบบทดสอบประเมินผล",
      description:
        "ผู้สมัครที่ผ่านรอบคัดเลือกเบื้องต้นจะได้รับการทดสอบประเมินผลเพื่อวัดทักษะต่างๆตามหลักสูตรที่สมัคร",
    },
    {
      number: 4,
      title: "4. สัมภาษณ์",
      description:
        "ผู้สมัครที่ผ่านการคัดเลือกจะได้รับเชิญให้เข้ามาสัมภาษณ์แสดงวิสัยทัศน์ของตนเองต่อทิศทางการเรียนรู้ตามสาขาและกลุ่มการเรียน",
    },
    {
      number: 5,
      title: "5. การคัดเลือกรอบสุดท้าย",
      description:
        "การตัดสินขั้นสุดท้ายจะพิจารณาผู้ผ่านการกรอกฟอร์มโดยอิงเกณฑ์คุณภาพรวมและผลสัมภาษณ์กับแนวนำในการตอบเนียน",
    },
  ];

  // ฟังก์ชัน format วันที่เป็นภาษาไทย
const formatThaiDate = (date) => {
  // รายชื่อเดือนในภาษาไทย
  const thaiMonths = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ];

  const day = date.getDate();
  const month = thaiMonths[date.getMonth()];
  const year = date.getFullYear();
  
  return `${day} ${month} ${year}`;
};

// ฟังก์ชันสร้างช่วงเดือนในรูปแบบไทย
const createThaiMonthRange = (startDate, endDate) => {
  // รายชื่อเดือนในภาษาไทย
  const thaiMonths = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ];
  
  const startMonth = thaiMonths[startDate.getMonth()];
  const endMonth = thaiMonths[endDate.getMonth()];
  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();
  
  if (startYear === endYear) {
    return `${startMonth} - ${endMonth} ${startYear}`;
  } else {
    return `${startMonth} ${startYear} - ${endMonth} ${endYear}`;
  }
};
// const batchData = {
//     batch1: {
//       title: "รุ่นที่ 1",
//       application: "1 พฤศจิกายน 2023 - 15 มกราคม 2024",
//       selection: "20 มกราคม - 10 กุมภาพันธ์ 2024",
//       training: "กุมภาพันธ์ - มีนาคม 2024",
//       startDate: new Date("2023-11-01"),
//       endDate: new Date("2024-01-15"),
//       selectionStartDate: new Date("2024-01-20"),
//       selectionEndDate: new Date("2024-02-10"),
//       trainingStartDate: new Date("2024-02-15")
//     },
//     batch2: {
//       title: "รุ่นที่ 2",
//       application: "1 มกราคม - 15 มีนาคม 2025",
//       selection: "20 มีนาคม - 10 เมษายน 2025",
//       training: "เมษายน - มิถุนายน 2025",
//       startDate: new Date("2025-01-01"),
//       endDate: new Date("2025-03-15"),
//       selectionStartDate: new Date("2025-03-20"),
//       selectionEndDate: new Date("2025-04-10"),
//       trainingStartDate: new Date("2025-04-15")
//     },
//     batch3: {
//       title: "รุ่นที่ 3",
//       application: "1 กันยายน - 15 พฤศจิกายน 2025",
//       selection: "20 พฤศจิกายน - 10 ธันวาคม 2025",
//       training: "มกราคม - กุมภาพันธ์ 2026",
//       startDate: new Date("2025-09-01"),
//       endDate: new Date("2025-11-15"),
//       selectionStartDate: new Date("2025-11-20"),
//       selectionEndDate: new Date("2025-12-10"),
//       trainingStartDate: new Date("2026-01-10")
//     }
  
//   };
// ข้อมูลรุ่นที่ปรับปรุงใหม่
const batchData = {
  batch1: {
    title: "รุ่นที่ 1",
    startDate: new Date("2023-11-01"),
    endDate: new Date("2024-01-15"),
    selectionStartDate: new Date("2024-01-20"),
    selectionEndDate: new Date("2024-02-10"),
    trainingStartDate: new Date("2024-02-15"),
    // สร้างข้อความแบบไทยโดยอัตโนมัติจากวันที่
    get application() { return `${formatThaiDate(this.startDate)} - ${formatThaiDate(this.endDate)}`; },
    get selection() { return `${formatThaiDate(this.selectionStartDate)} - ${formatThaiDate(this.selectionEndDate)}`; },
    get training() {
      // คำนวณวันสิ้นสุดการอบรม (ประมาณ 2 เดือนหลังจากวันเริ่มอบรม)
      const trainingEndDate = new Date(this.trainingStartDate.getFullYear(), 
                                      this.trainingStartDate.getMonth() + 2, 
                                      this.trainingStartDate.getDate());
      return createThaiMonthRange(this.trainingStartDate, trainingEndDate);
    }
  },
  batch2: {
    title: "รุ่นที่ 2",
    startDate: new Date("2025-01-01"),
    endDate: new Date("2025-03-15"),
    selectionStartDate: new Date("2025-03-20"),
    selectionEndDate: new Date("2025-04-10"),
    trainingStartDate: new Date("2025-04-15"),
    // สร้างข้อความแบบไทยโดยอัตโนมัติจากวันที่
    get application() { return `${formatThaiDate(this.startDate)} - ${formatThaiDate(this.endDate)}`; },
    get selection() { return `${formatThaiDate(this.selectionStartDate)} - ${formatThaiDate(this.selectionEndDate)}`; },
    get training() {
      const trainingEndDate = new Date(this.trainingStartDate.getFullYear(), 
                                      this.trainingStartDate.getMonth() + 2, 
                                      this.trainingStartDate.getDate());
      return createThaiMonthRange(this.trainingStartDate, trainingEndDate);
    }
  },
  batch3: {
    title: "รุ่นที่ 3",
    startDate: new Date("2025-09-01"),
    endDate: new Date("2025-11-15"),
    selectionStartDate: new Date("2025-11-20"),
    selectionEndDate: new Date("2025-12-10"),
    trainingStartDate: new Date("2026-01-10"),
    // สร้างข้อความแบบไทยโดยอัตโนมัติจากวันที่
    get application() { return `${formatThaiDate(this.startDate)} - ${formatThaiDate(this.endDate)}`; },
    get selection() { return `${formatThaiDate(this.selectionStartDate)} - ${formatThaiDate(this.selectionEndDate)}`; },
    get training() {
      const trainingEndDate = new Date(this.trainingStartDate.getFullYear(), 
                                      this.trainingStartDate.getMonth() + 2, 
                                      this.trainingStartDate.getDate());
      return createThaiMonthRange(this.trainingStartDate, trainingEndDate);
    }
  }
};

  // ฟังก์ชั่นตรวจสอบรุ่นที่อยู่ในช่วงเวลาปัจจุบัน
 const getCurrentBatch = () => {
  const currentDate = new Date(); // วันที่ปัจจุบัน (11 พฤษภาคม 2025)
  
  // ตรวจสอบรุ่นที่กำลังรับสมัครอยู่
  for (const [batchKey, batchInfo] of Object.entries(batchData)) {
    if (currentDate >= batchInfo.startDate && currentDate <= batchInfo.endDate) {
      return batchKey;
    }
  }
  
  // ตรวจสอบรุ่นที่อยู่ในช่วงคัดเลือก
  for (const [batchKey, batchInfo] of Object.entries(batchData)) {
    if (currentDate > batchInfo.endDate && currentDate <= batchInfo.selectionEndDate) {
      return batchKey;
    }
  }
  
  // ตรวจสอบรุ่นที่อยู่ในช่วงอบรม
  for (const [batchKey, batchInfo] of Object.entries(batchData)) {
    // คำนวณวันสิ้นสุดการอบรม (ประมาณ 2 เดือนหลังจากวันเริ่มอบรม)
    const trainingEndDate = new Date(batchInfo.trainingStartDate.getFullYear(), 
                                    batchInfo.trainingStartDate.getMonth() + 2, 
                                    batchInfo.trainingStartDate.getDate());
    
    if (currentDate >= batchInfo.trainingStartDate && currentDate <= trainingEndDate) {
      return batchKey;
    }
  }
  
  // ถ้าไม่มีรุ่นที่กำลังดำเนินการ ให้ตรวจสอบรุ่นที่ใกล้จะเริ่มมากที่สุด
  const futureBatches = Object.entries(batchData)
    .filter(([_, batchInfo]) => batchInfo.startDate > currentDate)
    .sort((a, b) => a[1].startDate - b[1].startDate);
  
  if (futureBatches.length > 0) {
    return futureBatches[0][0];
  }
  
  // ถ้าไม่มีรุ่นในอนาคต ให้แสดงรุ่นล่าสุด (รุ่นที่เริ่มเร็วที่สุด)
  const allBatches = Object.entries(batchData)
    .sort((a, b) => b[1].startDate - a[1].startDate);
  
  return allBatches[0][0];
};

  // กำหนดค่าเริ่มต้นให้เป็นรุ่นที่อยู่ในช่วงเวลาปัจจุบัน
  const [activeBatch, setActiveBatch] = useState("batch1");
  
// อัพเดทค่า activeBatch เมื่อคอมโพเนนต์ถูกโหลด
useEffect(() => {
  setActiveBatch(getCurrentBatch());
}, []);

  // คำอธิบายสถานะรุ่นที่ครอบคลุมทุกสถานะ
const getBatchStatus = (batchKey) => {
  const currentDate = new Date(); // วันที่ปัจจุบัน (11 พฤษภาคม 2025)
  const batch = batchData[batchKey];
  
  // คำนวณวันสิ้นสุดการอบรม (ประมาณ 2 เดือนหลังจากวันเริ่มอบรม)
  const trainingEndDate = new Date(batch.trainingStartDate.getFullYear(), 
                                  batch.trainingStartDate.getMonth() + 2, 
                                  batch.trainingStartDate.getDate());
  
  // ตรวจสอบสถานะของรุ่น
  if (currentDate < batch.startDate) {
    return "กำลังจะเปิดรับสมัครเร็วๆ นี้";
  } else if (currentDate >= batch.startDate && currentDate <= batch.endDate) {
    return "เปิดรับสมัครอยู่";
  } else if (currentDate > batch.endDate && currentDate <= batch.selectionEndDate) {
    return "อยู่ในช่วงคัดเลือก";
  } else if (currentDate > batch.selectionEndDate && currentDate < batch.trainingStartDate) {
    return "กำลังจะเริ่มอบรม";
  } else if (currentDate >= batch.trainingStartDate && currentDate <= trainingEndDate) {
    return "อยู่ในช่วงการอบรม";
  } else if (currentDate > trainingEndDate) {
    return "สิ้นสุดแล้ว";
  } else {
    return "ไม่ระบุ"; // กรณีพิเศษ
  }
};

 // สีสถานะที่แตกต่างกันตามสถานะ
const getStatusColor = (batchKey) => {
  const status = getBatchStatus(batchKey);
  
  switch(status) {
    case "เปิดรับสมัครอยู่":
      return "text-green-600";
    case "อยู่ในช่วงคัดเลือก":
      return "text-yellow-600";
    case "กำลังจะเริ่มอบรม":
      return "text-orange-600";
    case "อยู่ในช่วงการอบรม":
      return "text-purple-600";
    case "กำลังจะเปิดรับสมัครเร็วๆ นี้":
      return "text-blue-600";
    default:
      return "text-gray-600";
  }
};
  // ตรวจสอบว่ารุ่นนี้กำลังดำเนินการอยู่หรือไม่
const isBatchActive = (batchKey) => {
  const currentDate = new Date(); // วันที่ปัจจุบัน (11 พฤษภาคม 2025)
  const batch = batchData[batchKey];
  
  // คำนวณวันสิ้นสุดการอบรม
  const trainingEndDate = new Date(batch.trainingStartDate.getFullYear(), 
                                  batch.trainingStartDate.getMonth() + 2, 
                                  batch.trainingStartDate.getDate());
  
  // ตรวจสอบว่ารุ่นนี้อยู่ในช่วงรับสมัคร, คัดเลือก, หรืออบรม
  return (currentDate >= batch.startDate && currentDate <= trainingEndDate);
};

  // คำนวณจำนวนวันที่เหลือในการรับสมัคร
const getDaysRemaining = (batchKey) => {
  const currentDate = new Date(); // วันที่ปัจจุบัน (11 พฤษภาคม 2025)
  const batch = batchData[batchKey];
  
  if (currentDate < batch.startDate) {
    const daysUntilStart = Math.ceil((batch.startDate - currentDate) / (1000 * 60 * 60 * 24));
    return `เหลืออีก ${daysUntilStart} วันจะเปิดรับสมัคร`;
  } else if (currentDate >= batch.startDate && currentDate <= batch.endDate) {
    const daysUntilEnd = Math.ceil((batch.endDate - currentDate) / (1000 * 60 * 60 * 24));
    return `เหลือเวลาสมัครอีก ${daysUntilEnd} วัน`;
  } else {
    return "";
  }
};
  return (
    <div>
      {/* ส่วนเเรก */}
      <div className="w-full bg-[#0A2463]">
        <div className="h-full px-4 py-10 sm:px-6 md:px-20 md:py-20">
          <div className="text-2xl sm:text-3xl font-bold text-white">การรับสมัคร</div>
          <div className="pt-4 sm:pt-6 text-base sm:text-lg text-white">
            เข้าร่วมโครงการฝึกอบรมชั้นนำของประเทศไทยสำหรับอุตสาหกรรม New Growth
            Engine ขณะนี้เปิดรับสมัครสำหรับกลุ่มปี 2024 แล้ว
          </div>
          <div className="pt-6 sm:pt-8">
          <a href={`${process.env.NEXT_PUBLIC_REGISTER}`}>
            <div className="flex justify-center sm:justify-center items-center w-[130px] h-[50px] rounded-md bg-[#39A9DB] text-white font-medium">
              เข้าร่วมกับเรา
            </div>
            </a>
          </div>
        </div>
      </div>

      {/* ส่วนที่2 */}
      {/* <div className="w-full bg-[#FFFFFF]">
        <div className="px-4 py-10 sm:px-6 md:px-12 md:py-12">
          <div className="text-xl sm:text-2xl text-center text-[#0A2463] font-bold">
            กำหนดเวลาการสมัคร
          </div>

          <div className="pt-2">
            <div className="grid grid-cols-1 pt-6 sm:grid-cols-2 md:grid-cols-3  gap-6">
              <div className="flex flex-col items-center text-center w-full h-[205px] bg-[#F9FAFB] rounded-lg p-6">
                <div className="flex justify-center items-center w-[56px] h-[56px] rounded-full bg-[#E1F2FE] ">
                  <FontAwesomeIcon
                    icon={faCalendar}
                    style={{
                      color: "#0A2463",
                      width: "18px",
                      height: "18px",
                    }}
                  />
                </div>
                <div className="pt-4 text-base sm:text-lg text-[#0A2463] font-bold">
                  ระยะเวลาการรับสมัคร
                </div>
                <div className="pt-2 text-xs text-[#4B5563] ">
                  November 1, 2023 - January 15, 2024
                </div>
              </div>

              <div className="flex flex-col items-center text-center w-full h-[205px] bg-[#F9FAFB] rounded-lg p-6">
                <div className="flex justify-center items-center w-[56px] h-[56px] rounded-full bg-[#E1F2FE] ">
                  <FontAwesomeIcon
                    icon={faUserCheck}
                    style={{
                      color: "#0A2463",
                      width: "18px",
                      height: "18px",
                    }}
                  />
                </div>
                <div className="pt-4 text-base sm:text-lg text-[#0A2463] font-bold">
                  คัดเลือก
                </div>
                <div className="pt-2 text-xs text-[#4B5563] ">
                  January 20 - February 10, 2024
                </div>
              </div>

              <div className="flex flex-col items-center text-center w-full h-[205px] bg-[#F9FAFB] rounded-lg p-6">
                <div className="flex justify-center items-center w-[56px] h-[56px] rounded-full bg-[#E1F2FE] ">
                  <FontAwesomeIcon
                    icon={faClock}
                    style={{
                      color: "#0A2463",
                      width: "18px",
                      height: "18px",
                    }}
                  />
                </div>
                <div className="pt-4 text-base sm:text-lg text-[#0A2463] font-bold">
                  เริ่มอบรม
                </div>
                <div className="pt-2 text-xs text-[#4B5563] ">
                  February - March 2024 (varies by course)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="w-full bg-white">
      <div className="px-4 py-10 sm:px-6 md:px-12 md:py-12">
        <div className="text-xl sm:text-2xl text-center text-[#0A2463] font-bold">
          กำหนดเวลาการสมัคร
        </div>
        <div className="text-sm text-center text-gray-600 mt-2">
          สถานะปัจจุบัน: <span className={`font-medium ${getStatusColor(activeBatch)}`}>
            {getBatchStatus(activeBatch)}
          </span>
        </div>
        
        {/* แสดงจำนวนวันที่เหลือ (ถ้ามี) */}
        {getDaysRemaining(activeBatch) && (
          <div className="text-sm text-center text-gray-600 mt-1">
            {getDaysRemaining(activeBatch)}
          </div>
        )}

        {/* ปุ่มเลือกรุ่น */}
        <div className="flex justify-center mt-4 mb-6 gap-2 sm:gap-4 flex-wrap">
          {Object.keys(batchData).map((batchKey) => {
            // ตรวจสอบว่ารุ่นนี้กำลังดำเนินการอยู่หรือไม่
            const isActive = isBatchActive(batchKey);
            
            return (
              <button
                key={batchKey}
                onClick={() => setActiveBatch(batchKey)}
                className={`px-3 py-2 sm:px-6 sm:py-2 rounded-md text-sm sm:text-base transition-all duration-200 ${
                  activeBatch === batchKey
                    ? "bg-[#0A2463] text-white"
                    : "bg-gray-100 text-[#0A2463] hover:bg-gray-200"
                } ${isActive ? "ring-2 ring-[#39A9DB]" : ""}`}
              >
                {batchData[batchKey].title}
                {isActive && (
                  <span className="ml-1 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    ปัจจุบัน
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="pt-2">
          <div className="grid grid-cols-1 pt-6 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* กล่องระยะเวลาการรับสมัคร */}
            <div className="flex flex-col items-center text-center w-full h-full min-h-[205px] bg-[#F9FAFB] rounded-lg p-6">
              <div className="flex justify-center items-center w-[56px] h-[56px] rounded-full bg-[#E1F2FE]">
                <FontAwesomeIcon
                  icon={faCalendar}
                  style={{
                    color: "#0A2463",
                    width: "18px",
                    height: "18px",
                  }}
                />
              </div>
              <div className="pt-4 text-base sm:text-lg text-[#0A2463] font-bold">
                ระยะเวลาการรับสมัคร
              </div>
              <div className="pt-2 text-xs sm:text-sm text-[#4B5563]">
                {batchData[activeBatch].application}
              </div>
              {/* สถานะการรับสมัคร */}
              {getBatchStatus(activeBatch) === "เปิดรับสมัครอยู่" && (
                <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  เปิดรับสมัครอยู่
                </div>
              )}
            </div>

            {/* กล่องคัดเลือก */}
            <div className="flex flex-col items-center text-center w-full h-full min-h-[205px] bg-[#F9FAFB] rounded-lg p-6">
              <div className="flex justify-center items-center w-[56px] h-[56px] rounded-full bg-[#E1F2FE]">
                <FontAwesomeIcon
                  icon={faUserCheck}
                  style={{
                    color: "#0A2463",
                    width: "18px",
                    height: "18px",
                  }}
                />
              </div>
              <div className="pt-4 text-base sm:text-lg text-[#0A2463] font-bold">
                คัดเลือก
              </div>
              <div className="pt-2 text-xs sm:text-sm text-[#4B5563]">
                {batchData[activeBatch].selection}
              </div>
              {/* สถานะการคัดเลือก */}
              {getBatchStatus(activeBatch) === "อยู่ในช่วงคัดเลือก" && (
                <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  กำลังคัดเลือก
                </div>
              )}
            </div>

            {/* กล่องเริ่มอบรม */}
            <div className="flex flex-col items-center text-center w-full h-full min-h-[205px] bg-[#F9FAFB] rounded-lg p-6">
              <div className="flex justify-center items-center w-[56px] h-[56px] rounded-full bg-[#E1F2FE]">
                <FontAwesomeIcon
                  icon={faClock}
                  style={{
                    color: "#0A2463",
                    width: "18px",
                    height: "18px",
                  }}
                />
              </div>
              <div className="pt-4 text-base sm:text-lg text-[#0A2463] font-bold">
                เริ่มอบรม
              </div>
              <div className="pt-2 text-xs sm:text-sm text-[#4B5563]">
                {batchData[activeBatch].training}
              </div>
              {/* สถานะการอบรม */}
              {(getBatchStatus(activeBatch) === "อยู่ในช่วงการอบรม") && (
                <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  กำลังอบรม
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>

      {/* ส่วนที่ 3 */}
      <div className="w-full bg-[#F9FAFB]">
        <div className="h-full md:p-20">
          <div className="text-xl md:text-2xl font-bold text-[#0A2463]">
            คุณสมบัติผู้เข้าร่วม
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-8 md:gap-0 mt-6">
            <div className="text-base md:text-lg text-[#0A2463] font-bold pt-6">
              คุณสมบัติทั่วไป
              <div className="flex items-center gap-2 pt-4 text-xs text-[#000000]">
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  style={{
                    color: "#63E6BE",
                    width: "18px",
                    height: "18px",
                  }}
                />
                <div className="font-bold text-sm">ปริญญาตรี:</div>
                สำเร็จการศึกษาในระดับปริญญาตรีหรือสูงกว่าในสาขาที่เกี่ยวข้อง(ข้อกำหนดเฉพาะแตกต่างกันไปในแต่ละหลักสูตร)
              </div>
              <div className="flex items-center gap-2 pt-4 text-xs text-[#000000]">
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  style={{
                    color: "#63E6BE",
                    width: "18px",
                    height: "18px",
                  }}
                />
                <div className="font-bold text-sm">
                  สำเร็จการศึกษาเมื่อไม่นานนี้:
                </div>
                สำเร็จการศึกษาภายใน 3 ปีที่ผ่านมาหรืออยู่ในปีสุดท้ายของการศึกษา
              </div>
              <div className="flex items-center gap-2 pt-4 text-xs text-[#000000]">
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  style={{
                    color: "#63E6BE",
                    width: "18px",
                    height: "18px",
                  }}
                />
                <div className="font-bold text-sm">ความสามารถทางภาษา:</div>
                แสดงความสามารถทางภาษาไทย และ/หรือ ภาษาอังกฤษ
                (ขึ้นอยู่กับหลักสูตร)
              </div>
              <div className="flex items-center gap-2 pt-4 text-xs text-[#000000]">
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  style={{
                    color: "#63E6BE",
                    width: "18px",
                    height: "18px",
                  }}
                />
                <div className="font-bold text-sm">ความมุ่งมั่น:</div>
                สามารถมุ่งมั่นกับโปรแกรมได้เต็มเวลาตลอดระยะเวลาที่ดำเนินไป
              </div>
              <div className="pt-4 w-full ">
                <div className="flex items-center border-l-4 border-[#FACC15] bg-[#FEFCE8] h-auto w-auto p-4 gap-2 md:max-w-[600px]">
                  <FontAwesomeIcon
                    icon={faCircleDot}
                    style={{
                      color: "#CA8A04",
                      width: "16px",
                      height: "16px",
                    }}
                  />
                  <div className="text-xs text-[#A16207]">
                    หลักสูตรบางหลักสูตรอาจมีข้อกำหนดเฉพาะเพิ่มเติม
                    โปรดดูรายละเอียดในหน้าหลักสูตร แต่ละหลักสูตร
                  </div>
                </div>
              </div>
            </div>

            {/* ส่วนย่อยที่ 2  */}
            <div className=" text-lg  text-[#0A2463] font-bold pt-6 ">
              เอกสารที่ต้องการ
              <div className="flex items-center gap-2 pt-4 text-xs text-[#000000]">
                <FontAwesomeIcon
                  icon={faFileLines}
                  style={{
                    color: "#39A9DE",
                    width: "18px",
                    height: "18px",
                  }}
                />
                <div className="font-bold text-sm">
                  แบบฟอร์มใบสมัครที่สมบูรณ์:
                </div>
                กรอกแบบฟอร์มใบสมัครออนไลน์ให้ครบถ้วน
              </div>
              <div className="flex items-center gap-2 pt-4 text-xs text-[#000000]">
                <FontAwesomeIcon
                  icon={faFileLines}
                  style={{
                    color: "#39A9DE",
                    width: "18px",
                    height: "18px",
                  }}
                />
                <div className="font-bold text-sm">CV/Resume:</div>
                ประวัติย่อล่าสุดที่เน้นย้ำถึงการศึกษา ทักษะ
                และประสบการณ์ที่เกี่ยวข้องของคุณ
              </div>
              <div className="flex items-center gap-2 pt-4 text-xs text-[#000000]">
                <FontAwesomeIcon
                  icon={faFileLines}
                  style={{
                    color: "#39A9DE",
                    width: "18px",
                    height: "18px",
                  }}
                />
                <div className="font-bold text-sm">
                  สำเนาผลการเรียนทางวิชาการ:{" "}
                </div>
                สำเนาผลการเรียนอย่างเป็นทางการจากมหาวิทยาลัยของคุณ
              </div>
              <div className="flex items-center gap-2 pt-4 text-xs text-[#000000]">
                <FontAwesomeIcon
                  icon={faFileLines}
                  style={{
                    color: "#39A9DE",
                    width: "18px",
                    height: "18px",
                  }}
                />
                <div className="font-bold text-sm">
                  สำเนาบัตรประชาชน/หนังสือเดินทาง:
                </div>
                เอกสารยืนยันตัวตนที่ยังไม่หมดอายุ
              </div>
              <div className="flex items-center gap-2 pt-4 text-xs text-[#000000]">
                <FontAwesomeIcon
                  icon={faFileLines}
                  style={{
                    color: "#39A9DE",
                    width: "18px",
                    height: "18px",
                  }}
                />
                <div className="font-bold text-sm">คำชี้แจงส่วนตัว:</div>
                คำชี้แจงที่อธิบายถึงความสนใจของคุณในโปรแกรมและว่าโปรแกรมนี้
                <br />
                สอดคล้องกับเป้าหมายอาชีพของคุณอย่างไร (500-800 คำ)
              </div>
              <div className="flex items-center gap-2 pt-4 text-xs text-[#000000]">
                <FontAwesomeIcon
                  icon={faFileLines}
                  style={{
                    color: "#39A9DE",
                    width: "18px",
                    height: "18px",
                  }}
                />
                <div className="font-bold text-sm">จดหมายอ้างอิง:</div>
                จดหมายรับรองอย่างน้อยหนึ่งฉบับจากผู้อ้างอิงทางวิชาการหรือวิชาชีพ
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ส่วนที่ 4 */}
      <div className="h-full bg-[#ffffff]">
        <div className="px-4 sm:px-6 md:px-20 py-12">
          <div className="text-center text-[#0A2463] text-2xl font-bold">
            ขั้นตอนการสมัคร
          </div>
          <div className="pt-6">
            <div className="max-w-4xl mx-auto p-6 bg-white">
              <div className="relative">
                {/* Vertical line */}
                <div className=" hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-200"></div>

                {steps.map((step, index) => (
                  <div
                    key={step.number}
                    className={`relative mb-16 flex flex-col md:flex-row items-center md:items-start text-[#0A2463]`}
                  >
                    {/* Left side content */}
                    <div
                      className={`w-full md:w-1/2 text-center ${
                        index % 2 === 0 ? "pr-12 " : "opacity-0"
                      }`}
                    >
                      {index % 2 === 0 && (
                        <>
                          <h3 className="font-bold text-lg mb-2">
                            {step.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {step.description}
                          </p>
                        </>
                      )}
                    </div>

                    {/* Circle in center */}
                    <div className="hidden md:block z-10 mb-4 md:mb-0 md:absolute md:left-1/2 transform md:-translate-x-1/2">
                      <div className="bg-blue-400 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md">
                        {step.number}
                      </div>
                    </div>

                    {/* Right side content */}
                    <div
                      className={`w-full md:w-1/2 text-center ${
                        index % 2 === 1 ? "pl-12" : "opacity-0"
                      }`}
                    >
                      {index % 2 === 1 && (
                        <>
                          <h3 className="font-bold text-lg mb-2">
                            {step.title}
                          </h3>
                          <p className="text-sm text-gray-600 text-[#4B5563]">
                            {step.description}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ส่วนที่ 5 */}
      <div className="h-full bg-[#39A9DB]">
        <div className="px-6 py-16 sm:px-10 md:px-20 text-center">
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">พร้อมสมัครหรือยัง</div>

          <div className="pt-4 sm:pt-6 text-base sm:text-lg md:text-xl text-white">
            ก้าวแรกสู่อาชีพในอุตสาหกรรม New Growth Engine ของประเทศไทย
            เปิดรับสมัครสำหรับกลุ่มปี 2024 แล้ว
          </div>

          <div className="flex justify-center items-center pt-8 sm:pt-10">
            <div className="flex justify-center items-center w-[200px] sm:w-[245px] h-[48px] sm:h-[52px] bg-white rounded-md text-[#0A2463] text-sm sm:text-base font-medium cursor-pointer hover:bg-gray-100 transition">
              เริ่มต้นการสมัครของคุณ
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
