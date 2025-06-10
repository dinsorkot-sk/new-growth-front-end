import React, { useRef, useEffect } from 'react';
import Slider from 'react-slick'; // Assuming you're using react-slick
import Image from 'next/image';
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
    faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

// Custom Arrow Components
const CustomNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} custom-arrow right-4 z-10`}
            style={{
                ...style,
                right: 30,
            }}
            onClick={onClick}
        >

        </div>
    );
};

const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} custom-arrow left-4 z-10`}
            style={{
                ...style,
                left: 30,
            }}
            onClick={onClick}
        >

        </div>
    );
};

const Carousel = ({ registerUrl, backgroundImages = [] }) => {
    const videoRefs = useRef({});
    const hasImages = backgroundImages && backgroundImages.length > 0;
    // const registerUrl = process.env.NEXT_PUBLIC_REGISTER || "#";

    // Preload all videos when component mounts
    useEffect(() => {
        backgroundImages.forEach((url, index) => {
            if (isVideo(url)) {
                const video = videoRefs.current[`video-${index}`];
                if (video) {
                    video.load();
                }
            }
        });
    }, [backgroundImages]);

    const settings = {
        dots: false,
        infinite: hasImages,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: hasImages,
        autoplay: true,
        autoplaySpeed: 5000,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
    };

    const isVideo = (url) => {
        return url.match(/\.(mp4|webm|ogg)$/i);
    };

    const renderMedia = (url, index) => {
        if (isVideo(url)) {
            return (
                <div className="relative w-full h-full min-h-[400px] md:min-h-[500px] lg:min-h-[600px]">
                    <video
                        ref={el => videoRefs.current[`video-${index}`] = el}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        className="absolute inset-0 w-full h-full object-cover"
                    >
                        <source src={url} type={`video/${url.split('.').pop()}`} />
                        Your browser does not support the video tag.
                    </video>
                </div>
            );
        }
        return (
            <div className="relative w-full h-full min-h-[400px] md:min-h-[500px] lg:min-h-[600px]">
                <Image
                    src={url}
                    alt={`Slide ${index + 2}`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                />
            </div>
        );
    };

    // Default content when no images are provided
    const defaultContent = (
        <div className="relative min-h-[400px] md:min-h-[500px] lg:min-h-[600px] flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 md:p-16 lg:p-20 bg-gradient-to-b from-[#0A2463] to-[#1E5499]">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4">ไม่พบรูปภาพ</h2>
                <p className="text-white text-lg">กรุณาเพิ่มรูปภาพเพื่อแสดงผลในแกลเลอรี่</p>
            </div>
        </div>
    );

    return (
        <Slider {...settings}>
            <div>
                <div className="relative min-h-[400px] md:min-h-[500px] lg:min-h-[600px] flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 md:p-16 lg:p-20 bg-gradient-to-b from-[#0A2463] to-[#1E5499]">
                    {/* Logos Section */}
                    <div className="absolute left-6 top-10 sm:left-10 sm:top-12 md:left-16 md:top-10 lg:left-auto lg:top-20 lg:right-20 flex items-center space-x-4 ">
                        <div className="w-[80px] h-[80px] md:w-[100px] md:h-[100px]">
                            <Image
                                src="/img/MJU_LOGO.png"
                                width={100}
                                height={100}
                                className="w-full h-full object-contain"
                                alt="MJU Logo"
                            />
                        </div>
                        <div className="w-[80px] h-[80px] md:w-[100px] md:h-[100px]">
                            <Image
                                src="/img/Thai_MHESI.png"
                                width={100}
                                height={100}
                                className="w-full h-full object-contain"
                                alt="MHESI Logo"
                            />
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="mt-24 md:mt-16 lg:mt-0">
                        <p className="text-3xl font-bold sm:text-3xl md:text-4xl text-white drop-shadow-lg">
                            โครงการบัณฑิตผลิตพันธุ์ใหม่ (แม่โจ้) ปี 2567-2568
                        </p>
                        <p className="pt-4 sm:pt-4 text-base sm:text-lg md:text-xl opacity-90 max-w-2xl text-white drop-shadow">
                            หลักสูตรการส่งเสริมและพัฒนาการปลูกผักไฮโดรโปนิกส์ด้วยระบบ AI (AI-Hydroponics) อัจฉริยะเพื่อเพิ่มมูลค่าผลผลิต
                        </p>

                        {/* Buttons Section */}
                        <div className="flex flex-col sm:flex-row mt-8 gap-4 sm:gap-6">
                            <a href={registerUrl} className="px-6 h-12 bg-[#39A9DB] hover:bg-[#2d8ab6] transition-colors duration-300 rounded-md flex items-center justify-center text-white font-medium shadow-md">
                                <div className="flex justify-evenly items-center w-full text-center text-sm">
                                    สมัครเข้าร่วมโครงการ
                                </div>
                            </a>
                            <a href="#course-info" className="px-6 h-12 bg-white hover:bg-gray-100 transition-colors duration-300 rounded-md flex items-center justify-center font-medium shadow-md text-[#0A2463]">
                                ดูรายละเอียดเนื้อหา
                            </a>
                        </div>

                        {/* Badges Section */}
                        <div className="mt-6 flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                            <span className="bg-[#F9FAFB] text-[#0A2463] rounded px-3 py-1 text-xs font-bold shadow">
                                รับจำนวนจำกัด 40 ท่าน/รุ่น
                            </span>
                            <span className="bg-[#F9FAFB] text-[#0A2463] rounded px-3 py-1 text-xs font-bold shadow">
                                เรียนฟรี! ไม่มีค่าใช้จ่าย
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {hasImages && (
                backgroundImages.map((media, index) => (
                    <div key={index} className="relative w-full">
                        {renderMedia(media, index)}
                    </div>
                ))
            )}
        </Slider>
    );
};

export default Carousel;
