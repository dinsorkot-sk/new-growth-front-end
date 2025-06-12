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
import axios from "axios";

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
    if (!(date instanceof Date)) return "-";
    const thaiMonths = [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
    ];
    const day = date.getDate();
    const month = thaiMonths[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const createThaiMonthRange = (startDate: any, endDate: any) => {
    const thaiMonths = [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
    ];

    if (!(startDate instanceof Date)) return "-";

    if (!(endDate instanceof Date)) {
      const day = startDate.getDate();
      const month = thaiMonths[startDate.getMonth()];
      const year = startDate.getFullYear();
      return `ตั้งแต่ ${day} ${month} ${year}`;
    }

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

  // State for batches from API
  const [batches, setBatches] = useState([]);
  const [activeBatchIdx, setActiveBatchIdx] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch batches from API
  useEffect(() => {
    const fetchBatches = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/admission`);
        // Convert date strings to Date objects and add computed fields
        const data = res.data.map((item: any) => {
          const startDate = item.startDate ? new Date(item.startDate) : null;
          const endDate = item.endDate ? new Date(item.endDate) : null;
          const selectionStartDate = item.selectionStartDate
            ? new Date(item.selectionStartDate)
            : null;
          const selectionEndDate = item.selectionEndDate
            ? new Date(item.selectionEndDate)
            : null;
          const trainingStartDate = item.trainingStartDate
            ? new Date(item.trainingStartDate)
            : null;
          // Compute trainingEndDate (2 months after trainingStartDate)
          const trainingEndDate = trainingStartDate
            ? new Date(
                trainingStartDate.getFullYear(),
                trainingStartDate.getMonth() + 2,
                trainingStartDate.getDate()
              )
            : null;
          return {
            ...item,
            startDate,
            endDate,
            selectionStartDate,
            selectionEndDate,
            trainingStartDate,
            trainingEndDate,
            application: createThaiMonthRange(startDate, endDate),
            selection: createThaiMonthRange(selectionStartDate, selectionEndDate),
            training: createThaiMonthRange(trainingStartDate, trainingEndDate),
          };
        });
        setBatches(data);
        // Set active batch to current
        const storedBatchTitle = sessionStorage.getItem('activeBatchTitle');
        if (storedBatchTitle) {
          const storedIdx = data.findIndex((batch: any) => batch.title === storedBatchTitle);
          if (storedIdx !== -1) {
            setActiveBatchIdx(storedIdx);
          } else {
            setActiveBatchIdx(getCurrentBatchIdx(data));
          }
        } else {
          setActiveBatchIdx(getCurrentBatchIdx(data));
        }
      } catch (e) {
        setBatches([]);
      }
      setLoading(false);
    };
    fetchBatches();
  }, []);

  // Find the current batch index
  const getCurrentBatchIdx = (batchArr: any) => {
    const currentDate = new Date();
    // Check application period
    for (let i = 0; i < batchArr.length; i++) {
      if (
        currentDate >= batchArr[i].startDate &&
        currentDate <= batchArr[i].endDate
      ) {
        return i;
      }
    }
    // Check selection period
    for (let i = 0; i < batchArr.length; i++) {
      if (
        currentDate > batchArr[i].endDate &&
        currentDate <= batchArr[i].selectionEndDate
      ) {
        return i;
      }
    }
    // Check training period
    for (let i = 0; i < batchArr.length; i++) {
      if (
        currentDate >= batchArr[i].trainingStartDate &&
        currentDate <= batchArr[i].trainingEndDate
      ) {
        return i;
      }
    }
    // Next future batch
    const future = batchArr.filter((b: any) => b.startDate > currentDate);
    if (future.length > 0) {
      return batchArr.indexOf(
        future.sort((a: any, b: any) => a.startDate - b.startDate)[0]
      );
    }
    // Latest batch
    return 0;
  };

  const getOverallBatchStatus = (batch: any) => {
    const currentDate = new Date();
    if (!batch) return "-";
    if (currentDate < batch.startDate) {
      return "กำลังจะเปิดรับสมัครเร็วๆ นี้";
    } else if ((currentDate >= batch.startDate && currentDate <= batch.endDate) || 
               (currentDate >= batch.startDate && !batch.endDate)) {
      return "เปิดรับสมัครอยู่";
    } else if (
      (currentDate > batch.endDate && currentDate <= batch.selectionEndDate) ||
      (currentDate > batch.endDate && !batch.selectionEndDate && batch.selectionStartDate && currentDate >= batch.selectionStartDate)
    ) {
      return "อยู่ในช่วงคัดเลือก";
    } else if (
      currentDate > batch.selectionEndDate &&
      currentDate < batch.trainingStartDate
    ) {
      return "กำลังจะเริ่มอบรม";
    } else if (
      currentDate >= batch.trainingStartDate &&
      currentDate <= batch.trainingEndDate
    ) {
      return "อยู่ในช่วงการอบรม";
    } else if (currentDate > batch.trainingEndDate) {
      return "สิ้นสุดแล้ว";
    } else {
      return "ไม่ระบุ";
    }
  };

  // New helper functions for individual card status
  const isApplicationOpen = (batch: any) => {
    const currentDate = new Date();
    if (!batch || !batch.startDate) return false; // Must have a start date
    return currentDate >= batch.startDate && (currentDate <= batch.endDate || !batch.endDate);
  };

  const isSelectionPhase = (batch: any) => {
    const currentDate = new Date();
    if (!batch || !batch.selectionStartDate) return false; // Must have a selection start date
    return currentDate >= batch.selectionStartDate && (currentDate <= batch.selectionEndDate || !batch.selectionEndDate);
  };

  const isTrainingPhase = (batch: any) => {
    const currentDate = new Date();
    if (!batch || !batch.trainingStartDate) return false; // Must have a training start date
    return currentDate >= batch.trainingStartDate && (currentDate <= batch.trainingEndDate || !batch.trainingEndDate);
  };

  const getStatusColor = (batch: any) => {
    const status = getOverallBatchStatus(batch);
    switch (status) {
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

  const isBatchActive = (batch: any) => {
    return (
      isApplicationOpen(batch) ||
      isSelectionPhase(batch) ||
      isTrainingPhase(batch)
    );
  };

  const getDaysRemaining = (batch: any) => {
    const currentDate = new Date();
    if (!batch) return "";
    if (currentDate < batch.startDate) {
      const daysUntilStart = Math.ceil(
        (batch.startDate.getTime() - currentDate.getTime()) /
          (1000 * 60 * 60 * 24)
      );
      return `เหลืออีก ${daysUntilStart} วันจะเปิดรับสมัคร`;
    } else if (currentDate >= batch.startDate && currentDate <= batch.endDate) {
      const daysUntilEnd = Math.ceil(
        (batch.endDate.getTime() - currentDate.getTime()) /
          (1000 * 60 * 60 * 24)
      );
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
          <div className="text-2xl sm:text-3xl font-bold text-white">
            การรับสมัคร
          </div>
          <div className="pt-4 sm:pt-6 text-base sm:text-lg text-white">
            เข้าร่วมโครงการฝึกอบรมชั้นนำของประเทศไทยสำหรับอุตสาหกรรม New Growth
            Engine ขณะนี้เปิดรับสมัครสำหรับกลุ่มปี 2024 แล้ว
          </div>
          <div className="pt-6 sm:pt-8">
            <a href={
                batches[batches.length - 1]?.link_register ||
                process.env.NEXT_PUBLIC_REGISTER}>
              <div className="flex justify-center sm:justify-center items-center w-[130px] h-[50px] rounded-md bg-[#39A9DB] text-white font-medium">
                {sessionStorage.getItem('activeBatchTitle') ? `สมัคร ${sessionStorage.getItem('activeBatchTitle')}` : 'สมัครเข้าร่วมโครงการ'}
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="w-full bg-white">
        <div className="px-4 py-10 sm:px-6 md:px-12 md:py-12">
          <div className="text-xl sm:text-2xl text-center text-[#0A2463] font-bold">
            กำหนดเวลาการสมัคร
          </div>
          {loading ? (
            <div className="text-center text-gray-500 py-8">
              กำลังโหลดข้อมูล...
            </div>
          ) : batches.length === 0 ? (
            <div className="text-center text-red-500 py-8">
              ไม่พบข้อมูลรุ่นการรับสมัคร
            </div>
          ) : (
            <>
              <div className="text-sm text-center text-gray-600 mt-2">
                สถานะปัจจุบัน:{" "}
                <span
                  className={`font-medium ${getStatusColor(
                    batches[activeBatchIdx]
                  )}`}
                >
                  {getOverallBatchStatus(batches[activeBatchIdx])}
                </span>
              </div>
              {getDaysRemaining(batches[activeBatchIdx]) && (
                <div className="text-sm text-center text-gray-600 mt-1">
                  {getDaysRemaining(batches[activeBatchIdx])}
                </div>
              )}
              <div className="flex justify-center mt-4 mb-6 gap-2 sm:gap-4 flex-wrap">
                {batches.map((batch, idx) => {
                  const isActive = isBatchActive(batch);
                  return (
                    <button
                      key={batch.id}
                      onClick={() => {
                        setActiveBatchIdx(idx);
                        sessionStorage.setItem('activeBatchTitle', batch.title);
                      }}
                      className={`px-3 py-2 sm:px-6 sm:py-2 rounded-md text-sm sm:text-base transition-all duration-200 ${
                        activeBatchIdx === idx
                          ? "bg-[#0A2463] text-white"
                          : "bg-gray-100 text-[#0A2463] hover:bg-gray-200"
                      } ${isActive ? "ring-2 ring-[#39A9DB]" : ""}`}
                    >
                      {batch.title}
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
                <div className={`grid ${
                  batches[activeBatchIdx]?.startDate && batches[activeBatchIdx]?.selectionStartDate && batches[activeBatchIdx]?.trainingStartDate
                    ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
                    : (batches[activeBatchIdx]?.startDate && batches[activeBatchIdx]?.selectionStartDate) || 
                      (batches[activeBatchIdx]?.startDate && batches[activeBatchIdx]?.trainingStartDate) ||
                      (batches[activeBatchIdx]?.selectionStartDate && batches[activeBatchIdx]?.trainingStartDate)
                    ? 'grid-cols-1 sm:grid-cols-2 max-w-6xl'
                    : 'grid-cols-1 max-w-3xl'
                } gap-6 mx-auto`}>
                  {/* กล่องระยะเวลาการรับสมัคร */}
                  {batches[activeBatchIdx]?.startDate && (
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
                          {batches[activeBatchIdx].application}
                        </div>
                        {isApplicationOpen(batches[activeBatchIdx]) && (
                          <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            เปิดรับสมัครอยู่
                          </div>
                        )}
                      </div>
                    )}
                  {/* กล่องคัดเลือก */}
                  {batches[activeBatchIdx]?.selectionStartDate && (
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
                          {batches[activeBatchIdx].selection}
                        </div>
                        {isSelectionPhase(batches[activeBatchIdx]) && (
                          <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            กำลังคัดเลือก
                          </div>
                        )}
                      </div>
                    )}
                  {/* กล่องเริ่มอบรม */}
                  {batches[activeBatchIdx]?.trainingStartDate && (
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
                        <div className="pt-1 text-xs sm:text-sm text-[#4B5563]">
                          ตั้งแต่ {new Date(batches[activeBatchIdx].trainingStartDate).toLocaleDateString('th-TH', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })} เป็นต้นไป
                        </div>
                        {isTrainingPhase(batches[activeBatchIdx]) && (
                          <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            กำลังอบรม
                          </div>
                        )}
                      </div>
                    )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ส่วนที่ 3 */}
      <div className="w-full bg-[#F9FAFB]">
        <div className="h-full md:p-20">
          <div className="text-xl md:text-2xl font-bold text-[#0A2463] text-center">
            คุณสมบัติผู้เข้าร่วม
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-8 md:gap-0 mt-6">
            <div className="text-base md:text-lg text-[#0A2463] font-bold pt-6 px-3">
              คุณสมบัติผู้สมัคร
              <div className="flex items-center gap-2 pt-4 text-xs text-[#000000]">
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  style={{
                    color: "#63E6BE",
                    width: "18px",
                    height: "18px",
                  }}
                />
                <div className="font-bold text-sm">อายุไม่ต่ำกว่า 18 ปี</div>
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
                  จบการศึกษาขั้นต่ำ ระดับมัธยมศึกษาตอนปลาย หรือเทียบเท่า
                </div>
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
                  ผู้ประกอบการ/วิสาหกิจด้านการปลูกผัก ขนาดย่อม หรือ ขนาดกลาง
                </div>
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
                  เจ้าของฟาร์มไฮโดรโปนิกส์
                </div>
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
                <div className="font-bold text-sm">เกษตรกรผู้ปลูกผัก</div>
              </div>
            </div>

            {/* ส่วนย่อยที่ 2  */}
            <div className=" text-lg  text-[#0A2463] font-bold pt-6 px-3 ">
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
                  ใบสมัครที่กรอกข้อมูลครบถ้วน
                </div>
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
                <div className="font-bold text-sm">สำเนาบัตรประชาชน</div>
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
                <div className="font-bold text-sm">สำเนาวุฒิการศึกษา</div>
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
                  รูปถ่ายหน้าตรง 1 นิ้ว 1 รูป
                </div>
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

                {/* ขั้นตอนใหม่จากรูป */}
                <div className="relative mb-16 flex flex-col md:flex-row items-center md:items-start text-[#0A2463]">
                  <div className="w-full md:w-1/2 text-center md:pr-12 ">
                    <h3 className="font-bold text-lg mb-2">
                      1. กรอกใบสมัครออนไลน์
                    </h3>
                    <p className="text-sm text-gray-600">
                      สมัครผ่านแบบฟอร์มออนไลน์ พร้อมแนบเอกสารที่เกี่ยวข้อง
                    </p>
                  </div>
                  <div className="hidden md:block z-10 mb-4 md:mb-0 md:absolute md:left-1/2 transform md:-translate-x-1/2">
                    <div className="bg-blue-400 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md">
                      1
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 text-center opacity-0"></div>
                </div>
                <div className="relative mb-16 flex flex-col md:flex-row items-center md:items-start text-[#0A2463]">
                  <div className="w-full md:w-1/2 text-center opacity-0"></div>
                  <div className="hidden md:block z-10 mb-4 md:mb-0 md:absolute md:left-1/2 transform md:-translate-x-1/2">
                    <div className="bg-blue-400 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md">
                      2
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 text-center md:pl-12">
                    <h3 className="font-bold text-lg mb-2">
                      2. ตรวจสอบคุณสมบัติ
                    </h3>
                    <p className="text-sm text-gray-600">
                      เจ้าหน้าที่ตรวจสอบคุณสมบัติและเอกสารของผู้สมัคร
                    </p>
                  </div>
                </div>
                <div className="relative mb-16 flex flex-col md:flex-row items-center md:items-start text-[#0A2463]">
                  <div className="w-full md:w-1/2 text-center md:pr-12 ">
                    <h3 className="font-bold text-lg mb-2">
                      3. ประกาศรายชื่อผู้มีสิทธิ์เข้าร่วม
                    </h3>
                    <p className="text-sm text-gray-600">
                      ประกาศรายชื่อผู้ผ่านการคัดเลือกทางเว็บไซต์หรือช่องทางที่กำหนด
                    </p>
                  </div>
                  <div className="hidden md:block z-10 mb-4 md:mb-0 md:absolute md:left-1/2 transform md:-translate-x-1/2">
                    <div className="bg-blue-400 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md">
                      3
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 text-center opacity-0"></div>
                </div>
                <div className="relative mb-16 flex flex-col md:flex-row items-center md:items-start text-[#0A2463]">
                  <div className="w-full md:w-1/2 text-center opacity-0"></div>
                  <div className="hidden md:block z-10 mb-4 md:mb-0 md:absolute md:left-1/2 transform md:-translate-x-1/2">
                    <div className="bg-blue-400 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md">
                      4
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 text-center md:pl-12">
                    <h3 className="font-bold text-lg mb-2">
                      4. ยืนยันสิทธิ์และเข้าร่วมอบรม
                    </h3>
                    <p className="text-sm text-gray-600">
                      ยืนยันสิทธิ์และเข้าร่วมอบรมตามวันเวลาที่กำหนด
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ส่วนที่ 5 */}
      <div className="h-full bg-[#39A9DB]">
        <div className="px-6 py-16 sm:px-10 md:px-20 text-center">
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
            พร้อมสมัครหรือยัง
          </div>

          <div className="pt-4 sm:pt-6 text-base sm:text-lg md:text-xl text-white">
            ก้าวแรกสู่อาชีพในอุตสาหกรรม New Growth Engine ของประเทศไทย
            เปิดรับสมัครสำหรับกลุ่มปี 2024 แล้ว
          </div>

          <div className="flex justify-center items-center pt-8 sm:pt-10">
            <a
              href={
                batches[batches.length - 1]?.link_register ||
                process.env.NEXT_PUBLIC_REGISTER
              }
            >
              <div className="flex justify-center items-center w-[200px] sm:w-[245px] h-[48px] sm:h-[52px] bg-white rounded-md text-[#0A2463] text-sm sm:text-base font-medium cursor-pointer hover:bg-gray-100 transition">
                {sessionStorage.getItem('activeBatchTitle') ? `สมัคร ${sessionStorage.getItem('activeBatchTitle')}` : 'สมัครเข้าร่วมโครงการ'}
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
