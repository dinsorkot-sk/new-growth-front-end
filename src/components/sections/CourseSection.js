import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCalendar, faUserGroup, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const CourseSection = ({
  courseList,
  isCourseVisible,
  coursePagination,
  coursePage,
  setCoursePage,
  handleCoureseViewDetails,
  dateFormatter
}) => {
  return (
    <div className="w-full bg-[#ffffff]">
      <div className="h-full p-4 sm:p-8 md:p-12 lg:p-20">
        <div className={`flex justify-between text-[#0A2463] text-xl sm:text-xl md:text-2xl font-bold transition-all duration-1000 ${isCourseVisible ? 'opacity-100 translate-y-0' : 'translate-y-10'}`}>
          เนื้อหาแนะนำ
          <a href="/courses" className="text-[#39A9DB] text-xs cursor-pointer hover:underline transition-all duration-300 hover:text-[#0A2463]">ดูเนื้อหาทั้งหมด</a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 md:gap-12 lg:gap-20">
          {courseList.map((course, index) => (
            <div key={course.id} className="pt-4 sm:pt-6 md:pt-8">
              <div className={`h-[396px] bg-white drop-shadow-xl rounded-lg flex flex-col overflow-hidden transition-all duration-1000 hover:shadow-2xl hover:-translate-y-1 ${isCourseVisible ? 'opacity-100 translate-y-0' : 'translate-y-10'}`}
                style={{ transitionDelay: `${index * 0.1}s` }}>
                <div className="relative h-[45%] w-full">
                  <Image
                    src={
                      course.image?.image_path
                        ? `${process.env.NEXT_PUBLIC_IMG}${course.image.image_path.startsWith("/") ? "" : "/"}${course.image.image_path}`
                        : "/fallback.jpg"
                    }
                    alt={course.name}
                    width={400}
                    height={160}
                    className="w-full h-40 object-cover rounded"
                  />
                </div>

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

      <div className="text-center text-sm text-[#6B7280] my-4">
        แสดง {((coursePagination.currentPage - 1) * 6) + 1} - {Math.min(coursePagination.currentPage * 6, coursePagination.totalCount)}
        จาก {coursePagination.totalCount} คอร์ส
      </div>
      <div className="flex justify-center items-center pt-8 gap-4 pb-8">
        <button
          onClick={() => setCoursePage((prev) => Math.max(prev - 1, 1))}
          disabled={!coursePagination.prev}
          className="px-4 py-2 bg-[#0A2463] text-white rounded-lg disabled:opacity-50 hover:bg-[#39A9DB] transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 disabled:hover:bg-[#0A2463]"
        >
          ก่อนหน้า
        </button>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#0A2463] font-medium">
            หน้า {coursePagination.currentPage} / {coursePagination.totalPages}
          </span>
        </div>
        <button
          onClick={() => setCoursePage((prev) => prev + 1)}
          disabled={!coursePagination.next}
          className="px-4 py-2 bg-[#0A2463] text-white rounded-lg disabled:opacity-50 hover:bg-[#39A9DB] transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 disabled:hover:bg-[#0A2463]"
        >
          ถัดไป
        </button>
      </div>
    </div>
  );
};

export default CourseSection; 