import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const NewsSection = ({ 
  newsList, 
  isNewsVisible, 
  newsPagination, 
  newsPage, 
  setNewsPage, 
  handleNewsViewDetails 
}) => {
  return (
    <div className="w-full bg-[#F9FAFB]">
      <div className="h-full p-4 sm:p-8 md:p-12 lg:p-20">
        <div className={`flex justify-between text-[#0A2463] text-2xl font-bold transition-all duration-1000 ${isNewsVisible ? 'opacity-100 translate-y-0' : 'translate-y-10'}`}>
          ข่าวและกิจกรรม
          <a href="/newandevent" className="text-[#39A9DB] text-xs cursor-pointer hover:underline transition-all duration-300 hover:text-[#0A2463]">ดูข่าวทั้งหมด</a>
        </div>

        <div className="pt-4 sm:pt-6 md:pt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 md:gap-12 lg:gap-20">
            {newsList.map((news, index) => (
              <div
                key={news.id}
                className={`h-full bg-[#ffffff] drop-shadow-xl rounded-lg flex flex-col transition-all duration-1000 hover:shadow-2xl hover:-translate-y-1 ${isNewsVisible ? 'opacity-100 translate-y-0' : 'translate-y-10'}`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
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

                  <div className="text-[#4B5563] text-xs pt-2 sm:pt-4 flex-grow">
                    {news.short_description}
                  </div>

                  <div className="text-blue-600 text-xs mt-3">
                    หมวดหมู่: {news.tagAssignments?.[0]?.tag?.name || "ทั่วไป"}
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

        <div className="text-center text-sm text-[#6B7280] mt-12">
          แสดง {((newsPagination.currentPage - 1) * 9) + 1} - {Math.min(newsPagination.currentPage * 9, newsPagination.totalCount)} 
          จาก {newsPagination.totalCount} ข่าว
        </div>
        <div className="flex justify-center items-center pt-8 gap-4 pb-8">
          <button
            onClick={() => setNewsPage((prev) => Math.max(prev - 1, 1))}
            disabled={!newsPagination.prev}
            className="px-4 py-2 bg-[#0A2463] text-white rounded-lg disabled:opacity-50 hover:bg-[#39A9DB] transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 disabled:hover:bg-[#0A2463]"
          >
            ก่อนหน้า
          </button>
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#0A2463] font-medium">
              หน้า {newsPagination.currentPage} / {newsPagination.totalPages}
            </span>
          </div>
          <button
            onClick={() => setNewsPage((prev) => prev + 1)}
            disabled={!newsPagination.next}
            className="px-4 py-2 bg-[#0A2463] text-white rounded-lg disabled:opacity-50 hover:bg-[#39A9DB] transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 disabled:hover:bg-[#0A2463]"
          >
            ถัดไป
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsSection; 