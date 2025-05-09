"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from 'react';
import Navbar from "../components/Navbar";
import { useRouter } from 'next/navigation';
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGreaterThan,
  faBookOpen,
  faUserGroup,
  faAward,
  faMicrochip,
  faBrain,
  faLightbulb,
  faClock,
  faCalendar,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const backgroundImages = [
  "./img/images.jpg",
  "./img/360_F_255226859_Rhqr5hflr2esVXHQE1sS1bWxmZxs0gWI.jpg",
  "./img/premium_photo-1661767552224-ef72bb6b671f.jpg",
];

export default function Home() {
  const [newsList, setNewsList] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API}/news`)
      .then((res) => {
        setNewsList(res.data.data); // เข้าถึงข้อมูลจาก API
        console.log(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API}/course`)
      .then((res) => {
        setCourseList(res.data.data); // เข้าถึงข้อมูลจาก API
        console.log(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
      });
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentImageIndex(
  //       (prevIndex) => (prevIndex + 1) % backgroundImages.length
  //     );
  //   }, 5000); // เปลี่ยนทุก 5 วินาที

  //   return () => clearInterval(interval);
  // }, []);

  const dateFormatter = (p_date) => {
    const date = new Date(p_date);
    const formatter = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    return formatter.format(date);
  };

  const [coursePage, setCoursePage] = useState(1);
  const coursesPerPage = 6;
  const paginatedCourses = courseList.slice(
    (coursePage - 1) * coursesPerPage,
    coursePage * coursesPerPage
  );
  const totalCoursePages = Math.ceil(courseList.length / coursesPerPage);

  // Pagination สำหรับข่าว
  const [newsPage, setNewsPage] = useState(1);
  const newsPerPage = 4;
  const paginatedNews = newsList.slice(
    (newsPage - 1) * newsPerPage,
    newsPage * newsPerPage
  );
  const totalNewsPages = Math.ceil(newsList.length / newsPerPage);


  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);
  const startXRef = useRef(null);
  
  // Sample background images
  const backgroundImages = [
    "./img/images.jpg",
  "./img/360_F_255226859_Rhqr5hflr2esVXHQE1sS1bWxmZxs0gWI.jpg",
  "./img/premium_photo-1661767552224-ef72bb6b671f.jpg",
  ];
  
  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? backgroundImages.length - 1 : prevIndex - 1
    );
  };
  
  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % backgroundImages.length
    );
  };

  // Start dragging (both touch and mouse)
  const handleDragStart = (clientX) => {
    startXRef.current = clientX;
    setIsDragging(true);
  };

  // End dragging and calculate slide direction
  const handleDragEnd = (clientX) => {
    if (!isDragging || startXRef.current === null) return;
    
    const diffX = startXRef.current - clientX;
    // If dragged right -> show previous image, if dragged left -> show next image
    if (Math.abs(diffX) > 50) { // Set minimum drag distance (threshold)
      if (diffX > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }
    
    setIsDragging(false);
    startXRef.current = null;
  };

  // Touch Events
  const handleTouchStart = (e) => {
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (startXRef.current === null) return;
    handleDragEnd(e.changedTouches[0].clientX);
  };

  // Mouse Events
  const handleMouseDown = (e) => {
    handleDragStart(e.clientX);
  };

  const handleMouseUp = (e) => {
    if (startXRef.current === null) return;
    handleDragEnd(e.clientX);
  };

  const handleMouseLeave = (e) => {
    if (isDragging) {
      handleDragEnd(e.clientX);
    }
  };

  // Prevent text selection during dragging
  useEffect(() => {
    const preventDefault = (e) => {
      if (isDragging) {
        e.preventDefault();
      }
    };

    document.addEventListener('selectstart', preventDefault);
    return () => {
      document.removeEventListener('selectstart', preventDefault);
    };
  }, [isDragging]);

  const router = useRouter();
  const handleCoureseViewDetails = (courseId) => {
    router.push(`/courses/${courseId}`);
  };
  const handleNewsViewDetails = (newId) => {
    router.push(`/newandevent/${newId}`);
  };
  return (
    <div>
      <div
  ref={sliderRef}
  className="w-full bg-cover bg-center transition-all duration-1000 relative select-none"
  style={{
    backgroundImage: `url(${backgroundImages[currentImageIndex]})`,
    cursor: isDragging ? 'grabbing' : 'grab',
    position: 'relative', // เพิ่ม position relative เพื่อให้ absolute element ทำงานได้ถูกต้อง
  }}
  onTouchStart={handleTouchStart}
  onTouchEnd={handleTouchEnd}
  onMouseDown={handleMouseDown}
  onMouseUp={handleMouseUp}
  onMouseLeave={handleMouseLeave}
>
  {/* เพิ่มชั้น overlay สำหรับทำให้พื้นหลังโปร่งแสง */}
  <div 
    className="absolute inset-0" 
    style={{ 
      backgroundColor: 'rgba(0, 0, 0, 0.4)', // ปรับความเข้มได้ตามต้องการ (0.4 = 40% opacity)
    }}
  ></div>
  
  {/* เนื้อหาข้อความ (จะทับชั้น overlay) */}
  <div className="relative z-10 flex min-h-[400px] md:min-h-[500px] lg:min-h-[600px] flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 md:p-16 lg:p-20">
    <p className="text-4xl font-bold sm:text-3xl md:text-4xl text-white">
      โครงการผลิตบัณฑิตพันธุ์ใหม่
      <br className="hidden sm:block" /> 2567
    </p>
    <p className="pt-4 sm:pt-4 text-base sm:text-lg md:text-xl opacity-90 max-w-2xl text-white">
      สร้างคนที่มีสมรรถนะสูงสำหรับอุตสาหกรรม New Growth Engine ตามนโยบาย
      Thailand 4.0 <br className="hidden sm:block" />
      และปฏิรูปการอุดมศึกษาไทย
    </p>

    <div className="flex flex-col sm:flex-row mt-8 gap-4 sm:gap-6">
      <div className="px-6 h-12 bg-[#39A9DB] hover:bg-[#2d8ab6] transition-colors duration-300 rounded-md flex items-center justify-center text-white font-medium shadow-md">
        <a href={`${process.env.NEXT_PUBLIC_REGISTER}`}>
          <div className="flex justify-evenly items-center w-full text-center text-sm">
            เข้าร่วมโครงการ
            <FontAwesomeIcon
              icon={faGreaterThan}
              style={{ color: "#ffffff", width: "13px", height: "13px" }}
            />
          </div>
        </a>
      </div>
      <div className="px-6 h-12 bg-[#ffffff] hover:bg-[#2d8ab6] transition-colors duration-300 rounded-md flex items-center justify-center text-white font-medium shadow-md">
        <div className="flex justify-evenly items-center w-full text-center text-sm text-[#0A2463]">
          ดูรายละเอียด
        </div>
      </div>
    </div>
  </div>
</div>

      {/* ส่วนที่2 */}
      <div className="w-full bg-[#0A2463] md:px-6 lg:px-8">
        <div className="flex flex-col justify-center items-center py-12 md:py-16 lg:h-[272px] max-w-4xl mx-auto">
          <div className="text-2xl font-bold ">เป้าหมายของเรา</div>
          <p className="pt-8 md:pt-8 text-center text-sm md:text-base">
            เพื่อสร้างบุคลากรที่มีประสิทธิภาพสูงในอุตสาหกรรม New Growth Engine
            ตามนโยบายไทยแลนด์ 4.0
            <br className="hidden md:block" />{" "}
            และปฏิรูปการศึกษาระดับอุดมศึกษาของไทย
            โดยพัฒนาบัณฑิตให้มีทักษะที่ล้ำสมัย
            <br className="hidden md:block" />
            พร้อมที่จะขับเคลื่อนการสร้างสรรค์นวัตกรรมและการเติบโตทางเศรษฐกิจ
          </p>
        </div>
      </div>

      {/* ส่วนที่3 */}
      <div className="w-full bg-[#F9FAFB]">
        <div className="py-12 h-full md:px-6 lg:px-8">
          <div className="text-center md:pb-12 text-xl md:text-2xl font-bold text-[#0A2463]">
            สิ่งที่จะได้รับจากโครงการ
          </div>

          {/* กรอบ */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 w-full px-4 sm:px-6 py-6 md:px-10 lg:px-20 max-w-7xl mx-auto">
            {/* การ์ดที่ 1 */}
            <div className=" h-auto bg-[#ffffff] rounded-lg drop-shadow-lg p-4 md:p-6">
              <div className="flex justify-center items-center w-[56px] h-[56px] rounded-full bg-[#E1F2FE]">
                <FontAwesomeIcon
                  icon={faBookOpen}
                  style={{ color: "#0A2463", width: "22px", height: "22px" }}
                />
              </div>
              <div className="pt-4 text-[#0A2463] font-bold text-base">
                หลักสูตรที่ขับเคลื่อนโดยอุตสาหกรรม
              </div>
              <div className="pt-4 text-[#0A2463] text-xs">
                หลักสูตรที่ออกแบบร่วมกับผู้นำในอุตสาหกรรมเพื่อตอบสนองความต้องการของโลกแห่งความเป็นจริงและเตรียมนักศึกษาให้พร้อมสำหรับการจ้างงานทันที
              </div>
            </div>

            {/* การ์ดที่ 2 */}
            <div className=" h-auto bg-[#ffffff] rounded-lg drop-shadow-lg p-4 md:p-6">
              <div className="flex justify-center items-center w-[56px] h-[56px] rounded-full bg-[#E1F2FE]">
                <FontAwesomeIcon
                  icon={faUserGroup}
                  style={{ color: "#0A2463", width: "22px", height: "22px" }}
                />
              </div>
              <div className="pt-4 text-[#0A2463] font-bold text-base">
                อบรมโดยผู้เชี่ยวชาญ
              </div>
              <div className="pt-4 text-[#0A2463] text-xs">
                เเรียนรู้จากผู้เชี่ยวชาญและนักวิชาการชั้นนำที่มีประสบการณ์มากมายในภาคเทคโนโลยีที่กำลังเติบโตของประเทศไทย
              </div>
            </div>

            {/* การ์ดที่ 3 */}
            <div className=" h-auto bg-[#ffffff] rounded-lg drop-shadow-lg p-4 md:p-6">
              <div className="flex justify-center items-center w-[56px] h-[56px] rounded-full bg-[#E1F2FE]">
                <FontAwesomeIcon
                  icon={faAward}
                  style={{ color: "#0A2463", width: "22px", height: "22px" }}
                />
              </div>
              <div className="pt-4 text-[#0A2463] font-bold text-base">
                ได้รับ ประกาศนียบัตร
              </div>
              <div className="pt-4 text-[#0A2463] text-xs">
                ได้รับการยอมรับในอุตสาหกรรมซึ่งช่วยเพิ่มโอกาสการจ้างงานของคุณในภาคส่วนที่มีนวัตกรรมมากที่สุดของประเทศไทย
              </div>
            </div>

            {/* การ์ดที่ 4 */}
            <div className=" h-auto bg-[#ffffff] rounded-lg drop-shadow-lg p-4 md:p-6">
              <div className="flex justify-center items-center w-[56px] h-[56px] rounded-full bg-[#E1F2FE]">
                <FontAwesomeIcon
                  icon={faMicrochip}
                  style={{ color: "#0A2463", width: "22px", height: "22px" }}
                />
              </div>
              <div className="pt-4 text-[#0A2463] font-bold text-base">
                เทคโนโลยีล้ำสมัย
              </div>
              <div className="pt-4 text-[#0A2463] text-xs">
                ได้รับประสบการณ์จริงกับเทคโนโลยีล่าสุดที่ขับเคลื่อนการเปลี่ยนแปลงทางเศรษฐกิจของประเทศไทย
              </div>
            </div>

            {/* การ์ดที่ 5 */}
            <div className=" h-auto bg-[#ffffff] rounded-lg drop-shadow-lg p-4 md:p-6">
              <div className="flex justify-center items-center w-[56px] h-[56px] rounded-full bg-[#E1F2FE]">
                <FontAwesomeIcon
                  icon={faBrain}
                  style={{ color: "#0A2463", width: "22px", height: "22px" }}
                />
              </div>
              <div className="pt-4 text-[#0A2463] font-bold text-base">
                การเรียนรู้เชิงปฏิบัติ
              </div>
              <div className="pt-4 text-[#0A2463] text-xs">
                มุ่งเน้นการเรียนรู้ผ่านโครงการที่จำลองสถานการณ์จริงในที่ทำงาน
                เพื่อพัฒนาทักษะและสร้างพอร์ตโฟลิโอให้โดดเด่น
              </div>
            </div>

            {/* การ์ดที่ 6 */}
            <div className=" h-auto bg-[#ffffff] rounded-lg drop-shadow-lg p-4 md:p-6">
              <div className="flex justify-center items-center w-[56px] h-[56px] rounded-full bg-[#E1F2FE]">
                <FontAwesomeIcon
                  icon={faLightbulb}
                  style={{ color: "#0A2463", width: "22px", height: "22px" }}
                />
              </div>
              <div className="pt-4 text-[#0A2463] font-bold text-base">
                แนวคิดเชิงนวัตกรรม
              </div>
              <div className="pt-4 text-[#0A2463] text-xs">
                พัฒนาทักษะการคิดวิเคราะห์และการแก้ปัญหาซึ่งจำเป็นต่อการขับเคลื่อนการสร้างสรรค์นวัตกรรมในทุก
                ๆ ทักษะที่จำเป็นต่อ การขับเคลื่อนการสร้างสรรค์นวัตกรรมในทุก ๆ
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ส่วนที่ 4 */}
      <div className="w-full bg-[#ffffff]">
        <div className="h-full p-4 sm:p-8 md:p-12 lg:p-20">
          <div className="flex justify-between text-[#0A2463] text-xl sm:text-xl md:text-2xl font-bold">
            หลักสูตรเเนะนำ
            <div className="text-[#39A9DB] text-xs">ดูหลักสูตร ทั้งหมด</div>
          </div>
          {/* การ์ด */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 md:gap-12 lg:gap-20">
            {paginatedCourses.map((course) => {
              return (
                <div key={course.id} className="pt-4 sm:pt-6 md:pt-8">
                  <div className="h-[396px] bg-white drop-shadow-xl rounded-lg flex flex-col overflow-hidden">
                    {/* ส่วนรูปภาพ 40% */}
                    <div className="relative h-[45%] w-full">
                      <img
                        src={
                          course.image?.image_path
                            ? `${process.env.NEXT_PUBLIC_IMG}/${course.image.image_path}`
                            : "/fallback.jpg"
                        }
                        alt={course.title}
                        className="w-full h-40 object-cover rounded"
                      />
                    </div>

                    {/* ส่วนข้อความ 60% */}
                    <div className="h-[60%] p-4">
                      <div className="text-[#0A2463] text-base font-bold">
                        {course.name}
                      </div>
                      <div className="text-[#4B5563] text-xs pt-4">
                        {course.description}
                      </div>
                      <div className="flex flex-wrap sm:flex-nowrap gap-3 sm:gap-5 pt-4 text-[#4B5563] text-xs">
                        <div className="flex items-center gap-1">
                          <FontAwesomeIcon
                            icon={faClock}
                            style={{
                              color: "#0A2463",
                              width: "14px",
                              height: "14px",
                            }}
                          />
                          12 weeks
                        </div>
                        <div className="flex items-center gap-1">
                          <FontAwesomeIcon
                            icon={faCalendar}
                            style={{
                              color: "#0A2463",
                              width: "12px",
                              height: "12px",
                            }}
                          />
                          {dateFormatter(course.updated_at)}
                        </div>
                        <div className="flex items-center gap-1">
                          <FontAwesomeIcon
                            icon={faUserGroup}
                            style={{
                              color: "#0A2463",
                              width: "12px",
                              height: "12px",
                            }}
                          />
                          120 student
                        </div>
                      </div>

                      <div className="flex items-center pt-4 gap-2 text-sm text-[#0A2463]" onClick={() => handleCoureseViewDetails(course.id)}>
                        View Details{" "}
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          style={{
                            color: "#0A2463",
                            width: "12px",
                            height: "12px",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center pt-8 gap-2 pb-8">
          <button
            onClick={() => setCoursePage((prev) => Math.max(prev - 1, 1))}
            disabled={coursePage === 1}
            className="px-3 py-1 bg-[#0A2463] text-white rounded disabled:opacity-50"
          >
            ก่อนหน้า
          </button>
          <span className="px-2 text-sm text-[#0A2463] font-medium">
            หน้า {coursePage} / {totalCoursePages}
          </span>
          <button
            onClick={() =>
              setCoursePage((prev) => Math.min(prev + 1, totalCoursePages))
            }
            disabled={coursePage === totalCoursePages}
            className="px-3 py-1 bg-[#0A2463] text-white rounded disabled:opacity-50"
          >
            ถัดไป
          </button>
        </div>
      </div>

      {/* ส่วนที่5 */}
      <div className="w-full bg-[#F9FAFB]">
        <div className="h-full p-4 sm:p-8 md:p-12 lg:p-20">
          <div className="flex justify-between text-[#0A2463] text-2xl font-bold">
            ข่าวเเละกิจกรรม
            <div className="text-[#39A9DB] text-xs">ดูข่าว ทั้งหมด</div>
          </div>

          {/* ใช้ grid นอก loop */}
          <div className="pt-4 sm:pt-6 md:pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2  gap-6 sm:gap-8 md:gap-12 lg:gap-20">
              {paginatedNews.map((news) => {
                const decodedContent = news.content.replace(/\\"/g, '"');
                const imgMatch = decodedContent.match(
                  /<img[^>]+src="([^">]+)"/
                );
                const imageFromContent = imgMatch ? imgMatch[1] : null;
                const cleanedContent = decodedContent.replace(
                  /<img[^>]*>/g,
                  ""
                );

                return (
                  <div
                    key={news.id}
                    className="h-full bg-[#ffffff] drop-shadow-xl rounded-lg"
                  >
                    {/* รูปภาพ */}
                    <div className="relative h-48 sm:h-56 md:h-48 lg:h-48 w-full">
                      <img
                        src={
                          news.image?.image_path
                            ? `${process.env.NEXT_PUBLIC_IMG}/${news.image.image_path}`
                            : "/fallback.jpg"
                        }
                        alt={news.title}
                        className="w-full h-40 object-cover rounded"
                      />
                    </div>

                    {/* เนื้อหา */}
                    <div className="h-[50%] p-4">
                      <div className="flex items-center gap-1 text-xs text-[#6B7280]">
                        <FontAwesomeIcon
                          icon={faCalendar}
                          style={{
                            color: "#0A2463",
                            width: "14px",
                            height: "14px",
                          }}
                        />
                        {new Date(news.published_date).toLocaleDateString()}
                      </div>

                      <div className="text-[#0A2463] text-sm sm:text-base font-bold pt-2 sm:pt-4">
                        {news.title}
                      </div>

                      <div
                        className="text-[#4B5563] text-xs pt-2 sm:pt-4"
                        dangerouslySetInnerHTML={{ __html: cleanedContent }}
                      />

                      <div className="text-blue-600 text-xs mt-3">
                        หมวดหมู่:{" "}
                        {news.tagAssignments?.[0]?.tag?.name || "ทั่วไป"}
                      </div>

                      <div className="flex items-center pt-4 gap-2 text-sm text-[#0A2463] font-bold" onClick={() => handleNewsViewDetails(news.id)}>
                        Read More
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          style={{
                            color: "#0A2463",
                            width: "12px",
                            height: "12px",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-8 gap-2 pb-8">
          <button
            onClick={() => setCoursePage((prev) => Math.max(prev - 1, 1))}
            disabled={coursePage === 1}
            className="px-3 py-1 bg-[#0A2463] text-white rounded disabled:opacity-50"
          >
            ก่อนหน้า
          </button>
          <span className="px-2 text-sm text-[#0A2463] font-medium">
            หน้า {coursePage} / {totalCoursePages}
          </span>
          <button
            onClick={() =>
              setCoursePage((prev) => Math.min(prev + 1, totalCoursePages))
            }
            disabled={coursePage === totalCoursePages}
            className="px-3 py-1 bg-[#0A2463] text-white rounded disabled:opacity-50"
          >
            ถัดไป
          </button>
        </div>
      </div>

      <div>
        {/* {newsList.map((news) => (
            <div key={news.id} className="bg-white rounded-lg shadow-md p-4">
              <img
                src={
                  news.image?.image_path
                    ? `http://localhost:3001/${news.image.image_path}`
                    : "/fallback.jpg"
                }
                alt={news.title}
                className="w-full h-40 object-cover rounded"
              />

              <div className="mt-4 text-xs text-gray-500">
                {new Date(news.published_date).toLocaleDateString()}
              </div>
              <div className="text-lg font-bold text-blue-900 mt-2">
                {news.title}
              </div>
              <div
                className="text-sm text-gray-700 mt-1"
                dangerouslySetInnerHTML={{ __html: news.content }}
              />
              <div className="text-blue-600 text-xs mt-3">
                หมวดหมู่: {news.tagAssignments?.[0]?.tag?.name || "ทั่วไป"}
              </div>
            </div>
          ))} */}
        {/* 
          {newsList.map((news) => {
            const decodedContent = news.content.replace(/\\"/g, '"');
            const imgMatch = decodedContent.match(/<img[^>]+src="([^">]+)"/);
            const imageFromContent = imgMatch ? imgMatch[1] : null;
            const cleanedContent = decodedContent.replace(/<img[^>]*>/g, "");

            console.log("✅ extracted image:", imageFromContent);
            console.log("🧾 image path:", news.image?.image_path);

            return (
              <div key={news.id} className="bg-white rounded-lg shadow-md p-4">
                <img 
                  src={
                    news.image?.image_path
                      ? `http://localhost:3001/${news.image.image_path}`
                      : "/fallback.jpg"
                  }
                  alt={news.title}
                  className="w-full h-40 object-cover rounded"
                />

                <div className="mt-4 text-xs text-gray-500">
                  {new Date(news.published_date).toLocaleDateString()}
                </div>

                <div className="text-lg font-bold text-blue-900 mt-2">
                  {news.title}
                </div>

                <div
                  className="text-sm text-gray-700 mt-1"
                  dangerouslySetInnerHTML={{ __html: cleanedContent }}
                />

                <div className="text-blue-600 text-xs mt-3">
                  หมวดหมู่: {news.tagAssignments?.[0]?.tag?.name || "ทั่วไป"}
                </div>
              </div>
            );
          })}
         */}
      </div>

      {/* ส่วนที่6 */}
      <div className="w-full bg-[#39A9DB]">
        <div className="px-4 py-8 md:p-12 lg:p-20 h-full">
          <div className="flex flex-col justify-center items-center">
            <div className="font-bold text-xl sm:text-2xl">
              พร้อมที่จะสร้างอนาคตประเทศไทยหรือยัง?
            </div>
            <div className="text-center pt-2 px-2 sm:px-4 md:px-8 max-w-2xl">
              เข้าร่วมโปรแกรมของเราและเป็นส่วนหนึ่งของนักประดิษฐ์และผู้นำรุ่นต่อไปของประเทศไทยในอุตสาหกรรม
              New Growth Engine
            </div>
            <div className="pt-4 md:pt-6">
              <a href={`${process.env.NEXT_PUBLIC_REGISTER}`}>
                <div className="flex justify-center items-center w-[140px] sm:w-[160px] h-[40px] sm:h-[52px] bg-white text-[#0A2463] rounded-md cursor-pointer hover:bg-gray-100 transition-all">
                  เข้าร่วม
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
