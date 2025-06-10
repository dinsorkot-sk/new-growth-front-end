"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
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
import 'animate.css';
import { QRCodeSVG } from 'qrcode.react';
import Carousel from '../components/carousel';

export default function Home() {
  const [newsList, setNewsList] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [admission, setAdmission] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchMedia();
  }, []);
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

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API}/admission`)
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setAdmission(res.data[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching admission:", error);
      });
  }, []);

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

  // สำหรับ fade up animation
  const cardRefs = useRef([]);
  const [cardVisible, setCardVisible] = useState([false, false, false, false, false]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    const observers = [];
    cardRefs.current.forEach((ref, idx) => {
      if (!ref) return;
      const observer = new window.IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setCardVisible((prev) => {
                if (prev[idx]) return prev;
                const updated = [...prev];
                updated[idx] = true;
                return updated;
              });
              observer.disconnect();
            }
          });
        },
        { threshold: 0.2 }
      );
      observer.observe(ref);
      observers.push(observer);
    });
    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [isClient]);

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? backgroundImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % backgroundImages.length
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
    if (Math.abs(diffX) > 50) {
      // Set minimum drag distance (threshold)
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

    document.addEventListener("selectstart", preventDefault);
    return () => {
      document.removeEventListener("selectstart", preventDefault);
    };
  }, [isDragging]);

  const router = useRouter();
  const handleCoureseViewDetails = (courseId) => {
    const course = courseList.find(c => c.id === courseId);
    if (course) {
      axios.put(`${process.env.NEXT_PUBLIC_API}/course/view/${courseId}`, {
        view_count: (course.view_count || 0) + 1
      }, {
        headers: { 'Content-Type': 'application/json' }
      }).catch(() => { });
    }
    router.push(`/courses/${courseId}`);
  };
  const handleNewsViewDetails = (newId) => {
    const news = newsList.find(n => n.id === newId);
    if (news) {
      axios.put(`${process.env.NEXT_PUBLIC_API}/news/view/${newId}`, {
        view_count: (news.view_count || 0) + 1
      }, {
        headers: { 'Content-Type': 'application/json' }
      }).catch(() => { });
    }
    router.push(`/newandevent/${newId}`);
  };

  // เพิ่ม state สำหรับเก็บ URL รูปภาพสำหรับ background
  const [backgroundImages, setBackgroundImages] = useState([]);

  // ในส่วนของ useEffect ให้เรียกใช้ fetchMedia เมื่อ component mount
  const fetchMedia = async () => {
    try {
      console.log('กำลังดึงข้อมูลรูปภาพ...');

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/image/getAllImage/board?offset=0&limit=10`);
      console.log(response.data);
      // Update the backgroundImages state with the retrieved images
      if (response.data) {
        const imageUrls = response.data.images.map(item => {
          return `${process.env.NEXT_PUBLIC_IMG}/${item.image_path.replace(/\\/g, "/")}`
        });
        console.log(imageUrls);
        setBackgroundImages(imageUrls);
      }

    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการดึงข้อมูลรูปภาพ:', error);
      // Keep using default images in case of error
    } finally {
      setIsLoading(false);
    }
  };

  // เพิ่ม state สำหรับแสดง loading
  const [isLoading, setIsLoading] = useState(true);

  // เพิ่ม refs สำหรับ scroll animations
  const newsSectionRef = useRef(null);
  const courseSectionRef = useRef(null);
  const ctaSectionRef = useRef(null);
  const infoSectionRef = useRef(null);

  // เพิ่ม state สำหรับ scroll animations
  const [isNewsVisible, setIsNewsVisible] = useState(false);
  const [isCourseVisible, setIsCourseVisible] = useState(false);
  const [isCtaVisible, setIsCtaVisible] = useState(false);
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  // เพิ่ม useEffect สำหรับ scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === newsSectionRef.current) {
              setIsNewsVisible(true);
            } else if (entry.target === courseSectionRef.current) {
              setIsCourseVisible(true);
            } else if (entry.target === ctaSectionRef.current) {
              setIsCtaVisible(true);
            } else if (entry.target === infoSectionRef.current) {
              setIsInfoVisible(true);
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
      }
    );

    // Store refs in variables to avoid stale values in cleanup
    const newsSection = newsSectionRef.current;
    const courseSection = courseSectionRef.current;
    const ctaSection = ctaSectionRef.current;
    const infoSection = infoSectionRef.current;

    if (newsSection) observer.observe(newsSection);
    if (courseSection) observer.observe(courseSection);
    if (ctaSection) observer.observe(ctaSection);
    if (infoSection) observer.observe(infoSection);

    return () => {
      if (newsSection) observer.unobserve(newsSection);
      if (courseSection) observer.unobserve(courseSection);
      if (ctaSection) observer.unobserve(ctaSection);
      if (infoSection) observer.unobserve(infoSection);
    };
  }, []);

  return (
    <div>
      <div
        ref={sliderRef}
        className="w-full bg-cover bg-center transition-all duration-1000 relative select-none"
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div>
          </div>
        )}
        {/* เพิ่มชั้น overlay สำหรับทำให้พื้นหลังโปร่งแสง */}
        <div
          className="absolute inset-0"
        ></div>
        <Carousel registerUrl={admission.link_register || process.env.NEXT_PUBLIC_REGISTER} backgroundImages={backgroundImages} />
      </div>

      {/* ส่วนที่5 */}
      <div className="w-full bg-[#F9FAFB]" ref={newsSectionRef}>
        <div className="h-full p-4 sm:p-8 md:p-12 lg:p-20">
          <div className={`flex justify-between text-[#0A2463] text-2xl font-bold transition-all duration-1000 ${isNewsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            ข่าวและกิจกรรม
            <div className="text-[#39A9DB] text-xs cursor-pointer hover:underline transition-all duration-300 hover:text-[#0A2463]">ดูข่าวทั้งหมด</div>
          </div>

          <div className="pt-4 sm:pt-6 md:pt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 md:gap-12 lg:gap-20">
              {paginatedNews.map((news, index) => (
                <div
                  key={news.id}
                  className={`h-full bg-[#ffffff] drop-shadow-xl rounded-lg flex flex-col transition-all duration-1000 hover:shadow-2xl hover:-translate-y-1 ${isNewsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  {/* รูปภาพ */}
                  <div className="relative h-48 sm:h-56 md:h-48 lg:h-48 w-full">
                    <Image
                      src={
                        news.image?.image_path
                          ? `${process.env.NEXT_PUBLIC_IMG}/${news.image.image_path}`
                          : "/fallback.jpg"
                      }
                      alt={news.title}
                      width={400}
                      height={160}
                      className="w-full h-40 object-cover rounded"
                    />
                  </div>

                  {/* เนื้อหา */}
                  <div className="h-full p-4 flex flex-col">
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
                      className="text-[#4B5563] text-xs pt-2 sm:pt-4 flex-grow"
                    >{news.short_description}</div>

                    <div className="text-blue-600 text-xs mt-3">
                      หมวดหมู่:{" "}
                      {news.tagAssignments?.[0]?.tag?.name || "ทั่วไป"}
                    </div>

                    <div
                      className="flex items-center pt-4 gap-2 text-sm text-[#0A2463] font-bold cursor-pointer hover:underline hover:text-[#39A9DB] transition-colors duration-200"
                      onClick={() => handleNewsViewDetails(news.id)}
                    >
                      อ่านเพิ่มเติม
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        style={{ color: "#0A2463", width: "12px", height: "12px" }}
                      />
                    </div>
                  </div>
                </div>
              ))}
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

      {/* ส่วนที่ 4 */}
      <div className="w-full bg-[#ffffff]" ref={courseSectionRef}>
        <div className="h-full p-4 sm:p-8 md:p-12 lg:p-20">
          <div className={`flex justify-between text-[#0A2463] text-xl sm:text-xl md:text-2xl font-bold transition-all duration-1000 ${isCourseVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            เนื้อหาแนะนำ
            <div className="text-[#39A9DB] text-xs cursor-pointer hover:underline transition-all duration-300 hover:text-[#0A2463]">ดูเนื้อหาทั้งหมด</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 md:gap-12 lg:gap-20">
            {paginatedCourses.map((course, index) => (
              <div key={course.id} className="pt-4 sm:pt-6 md:pt-8">
                <div className={`h-[396px] bg-white drop-shadow-xl rounded-lg flex flex-col overflow-hidden transition-all duration-1000 hover:shadow-2xl hover:-translate-y-1 ${isCourseVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${index * 0.1}s` }}>
                  {/* ส่วนรูปภาพ 40% */}
                  <div className="relative h-[45%] w-full">
                    <Image
                      src={
                        course.image?.image_path
                          ? `${process.env.NEXT_PUBLIC_IMG}${course.image.image_path.startsWith("/") ? "" : "/"
                          }${course.image.image_path}`
                          : "/fallback.jpg"
                      }
                      alt={course.name}
                      width={400}
                      height={160}
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
                        {course.view_count} ผู้เข้าชม
                      </div>
                    </div>

                    <div
                      className="flex items-center pt-4 gap-2 text-sm text-[#0A2463] cursor-pointer hover:underline hover:text-[#39A9DB] transition-colors duration-200"
                      onClick={() => handleCoureseViewDetails(course.id)}
                    >
                      ดูรายละเอียด
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        style={{ color: "#0A2463", width: "12px", height: "12px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
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

      {/* ส่วนที่6 */}
      <div className="w-full bg-[#39A9DB]" ref={ctaSectionRef}>
        <div className="px-4 py-8 md:p-12 lg:p-20 h-full">
          <div className="flex flex-col justify-center items-center text-white">
            <div className={`font-bold text-xl sm:text-2xl transition-all duration-1000 ${isCtaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              พร้อมที่จะสร้างอนาคตประเทศไทยหรือยัง?
            </div>
            <div className={`text-center pt-2 px-2 sm:px-4 md:px-8 max-w-2xl transition-all duration-1000 ${isCtaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: '0.2s' }}>
              เข้าร่วมโปรแกรมของเราและเป็นส่วนหนึ่งของนักประดิษฐ์และผู้นำรุ่นต่อไปของประเทศไทยในอุตสาหกรรม
              New Growth Engine
            </div>
            <div className={`pt-4 md:pt-6 transition-all duration-1000 ${isCtaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: '0.4s' }}>
              <a href={admission.link_register ||
                process.env.NEXT_PUBLIC_REGISTER}>
                <div className="flex justify-center items-center w-[140px] sm:w-[160px] h-[40px] sm:h-[52px] bg-white text-[#0A2463] rounded-md cursor-pointer transition-all duration-300 hover:bg-gray-100 hover:scale-105">
                  เข้าร่วม
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div id="course-info" className="w-full bg-[#E1F2FE] py-10 px-4 md:px-20" ref={infoSectionRef}>
        <div className="max-w-4xl mx-auto">
          <div className={`text-2xl font-bold text-[#0A2463] mb-4 transition-all duration-1000 ${isInfoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            รายละเอียดหลักสูตร
          </div>
          <ul className="list-disc pl-6 text-[#0A2463] text-sm md:text-base mb-4">
            {[
              'ระยะเวลาอบรม 4 เดือน (285 ชั่วโมง) ทฤษฎี 60 ชั่วโมง ปฏิบัติ 225 ชั่วโมง',
              'เริ่มอบรม กรกฎาคม - ตุลาคม 2568',
              'คุณสมบัติ: อายุ 18 ปีขึ้นไป, จบ ม.6 หรือเทียบเท่า, เกษตรกร/เจ้าของฟาร์ม/ผู้สนใจ',
              'สถานที่: มหาวิทยาลัยแม่โจ้',
              'หน่วยงานร่วม: มหาวิทยาลัยแม่โจ้, บริษัท อินคูซิชั่นโพสต์, บริษัท พีพีพี ฟู้ด'
            ].map((item, index) => (
              <li key={index} className={`transition-all duration-1000 ${isInfoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 0.1}s` }}>
                {item}
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row gap-4 items-center mt-4">
            <div className={`bg-white rounded-lg shadow p-4 flex flex-col items-center transition-all duration-1000 hover:shadow-xl hover:-translate-y-1 ${isInfoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: '0.6s' }}>
              <span className="font-bold text-[#0A2463]">ติดต่อสอบถาม</span>
              <span className="text-xs text-[#0A2463]">โทร: 084-150-0677 (อ.ดร.พยุงศักดิ์)</span>
              <span className="text-xs text-[#0A2463]">โทร: 089-837-8992 (อ.ดร.สุดเขต)</span>
              <span className="text-xs text-[#0A2463]">E-mail: Payungsak.kae@gmail.com</span>
              <span className="text-xs text-[#0A2463]">E-mail: sutkhet@mju.ac.th</span>
            </div>
            {admission?.link_register && (
              <div className={`flex flex-col items-center transition-all duration-1000 ${isInfoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: '0.8s' }}>
                <span className="font-bold text-[#0A2463] mb-2">สมัครออนไลน์</span>
                <div className="w-28 h-28 flex items-center justify-center bg-white border-2 border-[#39A9DB] rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105">
                  {admission?.link_register && (
                    <QRCodeSVG value={admission.link_register} size={100} />
                  )}
                </div>
                <span className="text-xs text-[#0A2463] mt-1">สแกน QR เพื่อสมัคร</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
