"use client";

import React, { useState } from "react";
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
            <div className="flex justify-center sm:justify-center items-center w-[130px] h-[50px] rounded-md bg-[#39A9DB] text-white font-medium">
              เข้าร่วมกับเรา
            </div>
          </div>
        </div>
      </div>

      {/* ส่วนที่2 */}
      <div className="w-full bg-[#FFFFFF]">
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
