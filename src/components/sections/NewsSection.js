import Image from "next/image";
import Link from "next/link";
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
      <div className="h-full px-4 py-8 md:px-8 lg:px-16 xl:px-24">
        <div className={`flex justify-between items-center text-[#0A2463] text-xl md:text-2xl font-bold transition-all duration-1000 ${isNewsVisible ? 'opacity-100 translate-y-0' : 'translate-y-10'}`}>
          ข่าวและกิจกรรม
          <Link href="/newandevent" className="text-[#39A9DB] text-sm md:text-base cursor-pointer hover:text-[#0A2463]">ดูข่าวทั้งหมด</Link>
        </div>

        <div className="pt-6 md:pt-8 lg:pt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {newsList.map((news, index) => (
              <div
                key={news.id}
                className={`h-full bg-white rounded-lg shadow-md transition-all duration-1000 ${isNewsVisible ? 'opacity-100 translate-y-0' : 'translate-y-10'}`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-48 md:h-56 w-full">
                  <Image
                    src={
                      news.image?.image_path
                        ? `${process.env.NEXT_PUBLIC_IMG}/${news.image.image_path}`
                        : "/fallback.jpg"
                    }
                    alt={news.title}
                    width={400}
                    height={160}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </div>

                <div className="p-4 md:p-6 flex flex-col h-auto">
                  <div className="flex items-center gap-2 text-sm text-[#6B7280]">
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

                  <div className="text-[#0A2463] text-base md:text-lg font-bold pt-3">
                    {news.title}
                  </div>

                  <div className="text-[#4B5563] text-sm md:text-base pt-3 flex-grow">
                    {news.short_description}
                  </div>

                  <div className="text-blue-600 text-sm mt-4">
                    หมวดหมู่: {news.tagAssignments?.[0]?.tag?.name || "ทั่วไป"}
                  </div>

                  <div
                    className="flex items-center pt-4 gap-2 text-sm md:text-base text-[#0A2463] font-bold cursor-pointer hover:text-[#39A9DB]"
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

        <div className="text-center text-sm md:text-base text-[#6B7280] mt-12">
          แสดง {((newsPagination.currentPage - 1) * 9) + 1} - {Math.min(newsPagination.currentPage * 9, newsPagination.totalCount)} 
          จาก {newsPagination.totalCount} ข่าว
        </div>
        <div className="flex justify-center items-center pt-8 gap-4 pb-8">
          <button
            onClick={() => setNewsPage((prev) => Math.max(prev - 1, 1))}
            disabled={!newsPagination.prev}
            className="px-6 py-2 bg-[#0A2463] text-white rounded-lg disabled:opacity-50 hover:bg-[#39A9DB]"
          >
            ก่อนหน้า
          </button>
          <div className="flex items-center gap-2">
            <span className="text-sm md:text-base text-[#0A2463] font-medium">
              หน้า {newsPagination.currentPage} / {newsPagination.totalPages}
            </span>
          </div>
          <button
            onClick={() => setNewsPage((prev) => prev + 1)}
            disabled={!newsPagination.next}
            className="px-6 py-2 bg-[#0A2463] text-white rounded-lg disabled:opacity-50 hover:bg-[#39A9DB]"
          >
            ถัดไป
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsSection; 