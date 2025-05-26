import React from 'react';
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
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#fff",
                borderRadius: "50%",
                width: 40,
                height: 40,
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                right: 20,
            }}
            onClick={onClick}
        >
            <FontAwesomeIcon icon={faArrowRight} color="#0A2463" size="lg" />
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
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#fff",
                borderRadius: "50%",
                width: 40,
                height: 40,
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                left: 20,
            }}
            onClick={onClick}
        >
            <FontAwesomeIcon icon={faArrowLeft} color="#0A2463" size="lg" />
        </div>
    );
};

const Carousel = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 1000,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
    };

    return (
        <Slider {...settings}>
            <div>
                <div className="relative min-h-[400px] md:min-h-[500px] lg:min-h-[600px] flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 md:p-16 lg:p-20">
                    {/* Logos Section */}
                    <div className="absolute left-6 top-10 sm:left-10 sm:top-12 md:left-16 md:top-10 lg:left-auto lg:top-20 lg:right-20 flex items-center space-x-4">
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
                            โครงการบัณฑิตผลิตพันธุ์รู้ใหม่ (แม่โจ้) ปี 2567-2568
                        </p>
                        <p className="pt-4 sm:pt-4 text-base sm:text-lg md:text-xl opacity-90 max-w-2xl text-white drop-shadow">
                            หลักสูตรการส่งเสริมและพัฒนาการปลูกผักไฮโดรโปนิกส์ด้วยระบบ AI (AI-Hydroponics) อัจฉริยะเพื่อเพิ่มมูลค่าผลผลิต
                        </p>

                        {/* Buttons Section */}
                        <div className="flex flex-col sm:flex-row mt-8 gap-4 sm:gap-6">
                            <a href="#" className="px-6 h-12 bg-[#39A9DB] hover:bg-[#2d8ab6] transition-colors duration-300 rounded-md flex items-center justify-center text-white font-medium shadow-md">
                                <div className="flex justify-evenly items-center w-full text-center text-sm">
                                    สมัครเข้าร่วมโครงการ
                                    <FontAwesomeIcon icon={faGreaterThan} className="text-white w-[13px] h-[13px]" />
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
            <div>
                <Image src="/img/image2.jpg" alt="Slide 2" width={100} height={100} />
            </div>
            <div>
                <Image src="/img/image3.jpg" alt="Slide 3" width={100} height={100} />
            </div>
            {/* Add more slides as needed */}
        </Slider>
    );
};

export default Carousel;
