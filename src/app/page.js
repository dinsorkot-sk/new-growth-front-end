"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Carousel from '../components/carousel';
import NewsSection from '../components/sections/NewsSection';
import CourseSection from '../components/sections/CourseSection';
import InterviewSection from '../components/sections/InterviewSection';
import CtaSection from '../components/sections/CtaSection';
import InfoSection from '../components/sections/InfoSection';

// Constants
const NEWS_PER_PAGE = 9;
const COURSES_PER_PAGE = 6;
const VIDEOS_PER_PAGE = 6;

// Sample interview videos data
const sampleInterviewVideos = [
  {
    id: 1,
    title: "สัมภาษณ์ผู้เข้าอบรมรุ่นที่ 1",
    interviewee: "คุณกุญช์ชญา",
    description: "ประสบการณ์การเข้าร่วมโครงการและผลลัพธ์ที่ได้รับ",
    duration: "2:08",
    publishedDate: "2024-03-15",
    category: "สัมภาษณ์",
    embedUrl: "https://drive.google.com/file/d/1PvyybODszBvjpylAhXjChkU7z5GfRQzQ/preview"
  },
  {
    id: 2,
    title: "สัมภาษณ์ผู้เข้าอบรมรุ่นที่ 1",
    interviewee: "คุณลีลาวดี",
    description: "การนำความรู้ไปประยุกต์ใช้ในชีวิตจริง",
    duration: "0:51",
    publishedDate: "2024-03-20",
    category: "สัมภาษณ์",
    embedUrl: "https://drive.google.com/file/d/1y334XJkHeCp7HbBd1zPDyjLA2_g2G2Gb/preview"
  },
  {
    id: 3,
    title: "สัมภาษณ์ผู้เข้าอบรมรุ่นที่ 3",
    interviewee: "คุณสุริยา",
    description: "ความสำเร็จในการพัฒนาผลิตภัณฑ์ใหม่",
    duration: "1:39",
    publishedDate: "2024-03-25",
    category: "สัมภาษณ์",
    embedUrl: "https://drive.google.com/file/d/10vOI0EV7-NYJzmIyJWj70YbP2uS7dyln/preview"
  }
];

export default function Home() {
  // State declarations
  const [newsList, setNewsList] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [admission, setAdmission] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [backgroundImages, setBackgroundImages] = useState([]);
  const [interviewVideos, setInterviewVideos] = useState([]);

  // Pagination states
  const [newsPage, setNewsPage] = useState(1);
  const [coursePage, setCoursePage] = useState(1);
  const [videoPage, setVideoPage] = useState(1);
  const [newsPagination, setNewsPagination] = useState({
    totalCount: 0,
    currentPage: 1,
    totalPages: 1,
    prev: null,
    next: null
  });
  const [coursePagination, setCoursePagination] = useState({
    totalCount: 0,
    currentPage: 1,
    totalPages: 1,
    prev: null,
    next: null
  });
  const [videoPagination, setVideoPagination] = useState({
    totalCount: 0,
    currentPage: 1,
    totalPages: 1,
    prev: null,
    next: null
  });

  // Animation states
  const [isNewsVisible, setIsNewsVisible] = useState(false);
  const [isCourseVisible, setIsCourseVisible] = useState(false);
  const [isCtaVisible, setIsCtaVisible] = useState(false);
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [isInterviewVisible, setIsInterviewVisible] = useState(false);

  // Refs
  const newsSectionRef = useRef(null);
  const courseSectionRef = useRef(null);
  const ctaSectionRef = useRef(null);
  const infoSectionRef = useRef(null);
  const interviewSectionRef = useRef(null);
  const sliderRef = useRef(null);
  const startXRef = useRef(null);

  const router = useRouter();

  // Helper functions
  const dateFormatter = (p_date) => {
    const date = new Date(p_date);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  // API calls
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await Promise.all([
          fetchMedia(),
          fetchNews(),
          fetchCourses(),
          fetchAdmission(),
          fetchInterviewVideos()
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [newsPage, coursePage, videoPage]); // Add dependencies for pagination

  const fetchMedia = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/image/getAllImage/board?offset=0&limit=10`);
      if (response.data) {
        const imageUrls = response.data.images.map(item => 
          `${process.env.NEXT_PUBLIC_IMG}/${item.image_path.replace(/\\/g, "/")}`
        );
        setBackgroundImages(imageUrls);
      }
    } catch (error) {
      console.error('Error fetching media:', error);
    }
  };

  const fetchNews = async () => {
    try {
      const offset = (newsPage - 1) * NEWS_PER_PAGE;
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/news?offset=${offset}&limit=${NEWS_PER_PAGE}&search=`
      );
      setNewsList(response.data.data);
      setNewsPagination(response.data.pagination);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const offset = (coursePage - 1) * COURSES_PER_PAGE;
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/course?offset=${offset}&limit=${COURSES_PER_PAGE}&search=`
      );
      setCourseList(response.data.data);
      setCoursePagination(response.data.pagination);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchAdmission = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/admission`);
      if (Array.isArray(response.data) && response.data.length > 0) {
        setAdmission(response.data[0]);
      }
    } catch (error) {
      console.error("Error fetching admission:", error);
    }
  };

  const fetchInterviewVideos = async () => {
    try {
      const startIndex = (videoPage - 1) * VIDEOS_PER_PAGE;
      const endIndex = startIndex + VIDEOS_PER_PAGE;
      const paginatedVideos = sampleInterviewVideos.slice(startIndex, endIndex);

      setInterviewVideos(paginatedVideos);
      setVideoPagination({
        totalCount: sampleInterviewVideos.length,
        currentPage: videoPage,
        totalPages: Math.ceil(sampleInterviewVideos.length / VIDEOS_PER_PAGE),
        prev: videoPage > 1 ? videoPage - 1 : null,
        next: videoPage < Math.ceil(sampleInterviewVideos.length / VIDEOS_PER_PAGE) ? videoPage + 1 : null
      });
    } catch (error) {
      console.error("Error fetching interview videos:", error);
    }
  };

  // Event handlers
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

  const handleVideoViewDetails = (videoId) => {
    router.push(`/interviews/${videoId}`);
  };

  // Intersection Observer setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === newsSectionRef.current) setIsNewsVisible(true);
            else if (entry.target === courseSectionRef.current) setIsCourseVisible(true);
            else if (entry.target === interviewSectionRef.current) setIsInterviewVisible(true);
            else if (entry.target === ctaSectionRef.current) setIsCtaVisible(true);
            else if (entry.target === infoSectionRef.current) setIsInfoVisible(true);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
      }
    );

    const sections = [
      newsSectionRef.current,
      courseSectionRef.current,
      interviewSectionRef.current,
      ctaSectionRef.current,
      infoSectionRef.current
    ];

    sections.forEach(section => section && observer.observe(section));

    return () => sections.forEach(section => section && observer.unobserve(section));
  }, []);

  return (
    <div>
      <div ref={sliderRef} className="w-full bg-cover bg-center transition-all duration-1000 relative select-none">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div>
          </div>
        )}
        <div className="absolute inset-0"></div>
        <Carousel 
          registerUrl={admission?.link_register || process.env.NEXT_PUBLIC_REGISTER} 
          backgroundImages={backgroundImages} 
        />
      </div>

      <NewsSection
        newsList={newsList}
        isNewsVisible={isNewsVisible}
        newsPagination={newsPagination}
        newsPage={newsPage}
        setNewsPage={setNewsPage}
        handleNewsViewDetails={handleNewsViewDetails}
      />

      <CourseSection
        courseList={courseList}
        isCourseVisible={isCourseVisible}
        coursePagination={coursePagination}
        coursePage={coursePage}
        setCoursePage={setCoursePage}
        handleCoureseViewDetails={handleCoureseViewDetails}
        dateFormatter={dateFormatter}
      />

      <InterviewSection
        interviewVideos={interviewVideos}
        isInterviewVisible={isInterviewVisible}
        videoPagination={videoPagination}
        videoPage={videoPage}
        setVideoPage={setVideoPage}
        handleVideoViewDetails={handleVideoViewDetails}
      />

      <CtaSection
        isCtaVisible={isCtaVisible}
        admission={admission}
      />

      <InfoSection
        isInfoVisible={isInfoVisible}
        admission={admission}
      />
    </div>
  );
}
