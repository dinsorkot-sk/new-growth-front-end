import Image from "next/image";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faUser } from "@fortawesome/free-regular-svg-icons";
import { faBullseye, faAward } from "@fortawesome/free-solid-svg-icons";
import { QRCodeSVG } from 'qrcode.react';

export default async function Home() {
  // Fetch admission data from API (server-side)
  let admission = null;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/admission`, { cache: 'no-store' });
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      admission = data[0];
    }
  } catch (error) {
    // handle error or leave admission as null
  }

  return (
    <div>
      <div className=" bg-[#0A2463] h-70  text-white p-10 md:p-20 ">
        <div className="text-3xl font-bold">
          เกี่ยวกับหลักสูตร AI-Hydroponics
        </div>
        <div className="text-wrap max-w-2xl text-lg mt-5">
          หลักสูตรส่งเสริมและพัฒนาการปลูกผักไฮโดรโปนิกส์ด้วยระบบ AI
          (AI-Hydroponics) อัจฉริยะเพื่อเพิ่มมูลค่าผลผลิตและทักษะเกษตรสมัยใหม่
        </div>
      </div>
      <div className=" bg-[#F9FAFB] p-10 md:p-20 grid grid-cols-1 md:grid-cols-2">
        <div className="pr-0 md:pr-10 ">
          <div className="text-2xl font-bold text-[#0A2463]">
            วัตถุประสงค์ของหลักสูตร
          </div>
          <ul className="mt-3 text-sm text-[#374151] list-disc pl-6">
            <li>ปลูกผักไฮโดรโปนิกส์แบบอัจฉริยะด้วยระบบ AI เพื่อเพิ่มมูลค่า</li>
            <li>
              เลือกและปรับใช้ความรู้ในการปลูกผักและผสมสารอาหารโดยใช้เทคโนโลยี AI
            </li>
            <li>
              วิเคราะห์ข้อมูลและควบคุมการปลูกผักไฮโดรโปนิกส์ให้เหมาะสมกับสภาพแวดล้อม
            </li>
            <li>ออกแบบและพัฒนาเทคโนโลยีเพื่อใช้ในการเกษตรสมัยใหม่</li>
            <li>
              พัฒนาทักษะการแก้ปัญหาและนวัตกรรมในระบบการปลูกผักไฮโดรโปนิกส์
            </li>
          </ul>
        </div>
        <div className="px-0 md:px-5  mt-5 md:mt-0 ">
          <div className="text-2xl font-bold text-[#0A2463]">
            ทักษะที่จะได้รับ
          </div>
          <ul className="mt-3 text-sm text-[#374151] list-disc pl-6">
            <li>
              จัดการและควบคุมระบบปลูกผักไฮโดรโปนิกส์ที่ใช้เทคโนโลยี AI
              ได้อย่างมีประสิทธิภาพ
            </li>
            <li>ปรับสูตรและผสมปุ๋ยตามสภาพแวดล้อมและความต้องการของตลาด</li>
            <li>
              วิเคราะห์ข้อมูลเชิงลึกและตัดสินใจเชิงเทคนิคในระบบปลูกผักไฮโดรโปนิกส์
            </li>
            <li>ออกแบบและพัฒนาเทคโนโลยีเพื่อใช้ในการเกษตร</li>
            <li>แก้ปัญหาและพัฒนานวัตกรรมในระบบการปลูกผักไฮโดรโปนิกส์</li>
          </ul>
        </div>
      </div>
      <div className="bg-[#F9FAFB] p-8 md:p-12 py-10 shadow-sm">
        <h2 className="text-center text-2xl font-bold text-blue-900 mb-8">
          สิ่งที่จะได้รับจากการอบรม
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-lg p-6 shadow-sm flex flex-col items-center bg-white">
            <span className="text-3xl text-[#39A9DB] font-bold">ฟรี!</span>
            <div className="text-lg font-bold text-[#0A2463] mt-2">
              ไม่มีค่าใช้จ่าย
            </div>
            <div className="text-xs text-[#4B5563] mt-1">ตลอดหลักสูตร</div>
          </div>
          <div className="border border-gray-200 rounded-lg p-6 shadow-sm flex flex-col items-center bg-white">
            <span className="text-2xl text-[#39A9DB]">🎓</span>
            <div className="text-lg font-bold text-[#0A2463] mt-2">
              ได้รับประกาศนียบัตร
            </div>
            <div className="text-xs text-[#4B5563] mt-1">หลังจบการอบรม</div>
          </div>
          <div className="border border-gray-200 rounded-lg p-6 shadow-sm flex flex-col items-center bg-white">
            <span className="text-2xl text-[#39A9DB]">🌱</span>
            <div className="text-lg font-bold text-[#0A2463] mt-2">
              ทักษะ AI-Hydroponics
            </div>
            <div className="text-xs text-[#4B5563] mt-1">
              ปลูกผักไฮโดรโปนิกส์ด้วยระบบอัจฉริยะ
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg p-6 shadow-sm flex flex-col items-center bg-white">
            <span className="text-2xl text-[#39A9DB]">🍽️</span>
            <div className="text-lg font-bold text-[#0A2463] mt-2">
              อาหารกลางวัน/อาหารว่าง
            </div>
            <div className="text-xs text-[#4B5563] mt-1">สำหรับผู้เข้าอบรม</div>
          </div>
          <div className="border border-gray-200 rounded-lg p-6 shadow-sm flex flex-col items-center bg-white">
            <span className="text-2xl text-[#39A9DB]">👥</span>
            <div className="text-lg font-bold text-[#0A2463] mt-2">
              รับจำนวนจำกัด 40 คน/รุ่น
            </div>
            <div className="text-xs text-[#4B5563] mt-1">
              สมัครก่อนมีสิทธิ์ก่อน
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#E1F2FE] py-10 px-4 md:px-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-2xl font-bold text-[#0A2463] mb-4">
            รายละเอียดหลักสูตร
          </div>
          <ul className="list-disc pl-6 text-[#0A2463] text-sm md:text-base mb-4">
            <li>
              ระยะเวลาอบรม 4 เดือน (285 ชั่วโมง) ทฤษฎี 60 ชั่วโมง ปฏิบัติ 225
              ชั่วโมง
            </li>
            <li>เริ่มอบรม กรกฎาคม - ตุลาคม 2568</li>
            <li>
              คุณสมบัติ: อายุ 18 ปีขึ้นไป, จบ ม.6 หรือเทียบเท่า,
              เกษตรกร/เจ้าของฟาร์ม/ผู้สนใจ
            </li>
            <li>สถานที่: มหาวิทยาลัยแม่โจ้</li>
            <li>
              หน่วยงานร่วม: มหาวิทยาลัยแม่โจ้, บริษัท อินคูซิชั่นโพสต์, บริษัท
              พีพีพี ฟู้ด
            </li>
          </ul>
          <div className="flex flex-col sm:flex-row gap-4 items-center mt-4">
            <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
              <span className="font-bold text-[#0A2463]">ติดต่อสอบถาม</span>
              <span className="text-xs text-[#0A2463]">
                โทร: 084-150-0677 (ดร. พิษณุศักดิ์)
              </span>
              <span className="text-xs text-[#0A2463]">
                โทร: 089-837-8992 (ดร. สุกเชษฐ์)
              </span>
              <span className="text-xs text-[#0A2463]">
                E-mail: Payungsak.kae@gmail.com
              </span>
              <span className="text-xs text-[#0A2463]">
                E-mail: sutkhet@mju.ac.th
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-[#0A2463] mb-2">
                สมัครออนไลน์
              </span>
              <div className="w-28 h-28 flex items-center justify-center bg-white border-2 border-[#39A9DB]">
                {admission?.link_register && (
                  <QRCodeSVG value={admission.link_register} size={100} />
                )}
              </div>
              <span className="text-xs text-[#0A2463] mt-1">
                สแกน QR เพื่อสมัคร
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
