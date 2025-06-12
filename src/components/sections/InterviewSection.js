import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCalendar, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const InterviewSection = ({
  interviewVideos = [],
  isInterviewVisible,
  videoPagination = { currentPage: 1, totalCount: 0, totalPages: 1, prev: false, next: false },
  videoPage,
  setVideoPage,
  handleVideoViewDetails
}) => {
  return (
    <div className="w-full bg-[#F9FAFB]">
      <div className="h-full px-4 py-8 md:px-8 lg:px-16 xl:px-24">
        <div className={`flex justify-between items-center text-[#0A2463] text-xl md:text-2xl font-bold transition-all duration-1000 ${isInterviewVisible ? 'opacity-100 translate-y-0' : 'translate-y-10'}`}>
          คลิปสัมภาษณ์ผู้เข้าอบรม
        </div>

        <div className="pt-6 md:pt-8 lg:pt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {interviewVideos.map((video, index) => (
              <div
                key={video.id}
                className={`h-full bg-white rounded-lg shadow-md transition-all duration-1000 ${isInterviewVisible ? 'opacity-100 translate-y-0' : 'translate-y-10'}`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-48 md:h-56 w-full rounded-t-lg overflow-hidden">
                  <iframe
                    src={video.embedUrl}
                    className="w-full h-full object-cover"
                    allow="autoplay"
                    allowFullScreen
                    title={video.title}
                  />
                </div>

                <div className="p-4 md:p-6 flex flex-col">
                  <div className="text-[#0A2463] text-base md:text-lg font-bold">
                    {video.title}
                  </div>

                  <div className="text-[#4B5563] text-sm md:text-base pt-3">
                    ผู้เข้าสัมภาษณ์: {video.interviewee}
                  </div>

                  <div className="text-[#4B5563] text-sm md:text-base pt-3 flex-grow line-clamp-3">
                    {video.description}
                  </div>

                  <div className="flex items-center gap-4 pt-4 text-[#4B5563] text-sm">
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon
                        icon={faClock}
                        style={{
                          color: "#0A2463",
                          width: "14px",
                          height: "14px",
                        }}
                      />
                      {video.duration}
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
                      {video.publishedDate}
                    </div>
                  </div>

                  <div className="text-blue-600 text-sm mt-4">
                    หมวดหมู่: {video.category}
                  </div>

                  <div
                    className="flex items-center pt-4 gap-2 text-sm md:text-base text-[#0A2463] font-bold cursor-pointer hover:text-[#39A9DB]"
                    onClick={() => handleVideoViewDetails(video.embedUrl)}
                  >
                    ดูคลิปเต็ม
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
          แสดง {((videoPagination?.currentPage - 1) * 6) + 1} - {Math.min(videoPagination?.currentPage * 6, videoPagination.totalCount)}
          จาก {videoPagination.totalCount} คลิป
        </div>
        <div className="flex justify-center items-center pt-8 gap-4 pb-8">
          <button
            onClick={() => setVideoPage((prev) => Math.max(prev - 1, 1))}
            disabled={!videoPagination.prev}
            className="px-6 py-2 bg-[#0A2463] text-white rounded-lg disabled:opacity-50 hover:bg-[#39A9DB]"
          >
            ก่อนหน้า
          </button>
          <div className="flex items-center gap-2">
            <span className="text-sm md:text-base text-[#0A2463] font-medium">
              หน้า {videoPagination?.currentPage} / {videoPagination.totalPages}
            </span>
          </div>
          <button
            onClick={() => setVideoPage((prev) => prev + 1)}
            disabled={!videoPagination.next}
            className="px-6 py-2 bg-[#0A2463] text-white rounded-lg disabled:opacity-50 hover:bg-[#39A9DB]"
          >
            ถัดไป
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewSection; 