import Image from "next/image";
import Link from "next/link";
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
    <div className="w-full bg-white">
      <div className="h-full px-4 py-8 md:px-8 lg:px-16 xl:px-24">
        <div className={`flex justify-between items-center text-[#0A2463] text-xl md:text-2xl font-bold transition-all duration-1000 ${isCourseVisible ? 'opacity-100 translate-y-0' : 'translate-y-10'}`}>
          เนื้อหาแนะนำ
          <Link href="/courses" className="text-[#39A9DB] text-sm md:text-base cursor-pointer hover:text-[#0A2463]">ดูเนื้อหาทั้งหมด</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 lg:gap-10 pt-6 md:pt-8 lg:pt-12">
          {courseList.map((course, index) => (
            <div key={course.id}>
              <div className={`h-full bg-white rounded-lg shadow-md transition-all duration-1000 ${isCourseVisible ? 'opacity-100 translate-y-0' : 'translate-y-10'}`}
                style={{ transitionDelay: `${index * 0.1}s` }}>
                <div className="relative h-48 md:h-56 w-full">
                  <Image
                    src={
                      course.image?.image_path
                        ? `${process.env.NEXT_PUBLIC_IMG}${course.image.image_path.startsWith("/") ? "" : "/"}${course.image.image_path}`
                        : "/fallback.jpg"
                    }
                    alt={course.name}
                    width={400}
                    height={160}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </div>

                <div className="p-4 md:p-6">
                  <div className="text-[#0A2463] text-base md:text-lg font-bold">
                    {course.name}
                  </div>
                  <div className="text-[#4B5563] text-sm md:text-base pt-3">
                    {course.description}
                  </div>
                  <div className="flex flex-wrap gap-4 pt-4 text-[#4B5563] text-sm">
                    <div className="flex items-center gap-2">
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
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon
                        icon={faCalendar}
                        style={{
                          color: "#0A2463",
                          width: "14px",
                          height: "14px",
                        }}
                      />
                      {dateFormatter(course.updated_at)}
                    </div>
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon
                        icon={faUserGroup}
                        style={{
                          color: "#0A2463",
                          width: "14px",
                          height: "14px",
                        }}
                      />
                      {course.view_count} ผู้เข้าชม
                    </div>
                  </div>

                  <div
                    className="flex items-center pt-4 gap-2 text-sm md:text-base text-[#0A2463] font-bold cursor-pointer hover:text-[#39A9DB]"
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

      <div className="text-center text-sm md:text-base text-[#6B7280] mt-12">
        แสดง {((coursePagination.currentPage - 1) * 6) + 1} - {Math.min(coursePagination.currentPage * 6, coursePagination.totalCount)}
        จาก {coursePagination.totalCount} คอร์ส
      </div>
      <div className="flex justify-center items-center pt-8 gap-4 pb-8">
        <button
          onClick={() => setCoursePage((prev) => Math.max(prev - 1, 1))}
          disabled={!coursePagination.prev}
          className="px-6 py-2 bg-[#0A2463] text-white rounded-lg disabled:opacity-50 hover:bg-[#39A9DB]"
        >
          ก่อนหน้า
        </button>
        <div className="flex items-center gap-2">
          <span className="text-sm md:text-base text-[#0A2463] font-medium">
            หน้า {coursePagination.currentPage} / {coursePagination.totalPages}
          </span>
        </div>
        <button
          onClick={() => setCoursePage((prev) => prev + 1)}
          disabled={!coursePagination.next}
          className="px-6 py-2 bg-[#0A2463] text-white rounded-lg disabled:opacity-50 hover:bg-[#39A9DB]"
        >
          ถัดไป
        </button>
      </div>
    </div>
  );
};

export default CourseSection; 