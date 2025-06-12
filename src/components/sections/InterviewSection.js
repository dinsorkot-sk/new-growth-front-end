import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCalendar, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const InterviewSection = ({
  interviewVideos,
  isInterviewVisible,
  videoPagination,
  videoPage,
  setVideoPage,
  handleVideoViewDetails
}) => {
  return (
    <div className="w-full bg-[#F9FAFB]">
      <div className="h-full p-4 sm:p-8 md:p-12 lg:p-20">
        <div className={`flex justify-between text-[#0A2463] text-xl sm:text-xl md:text-2xl font-bold transition-all duration-1000 ${isInterviewVisible ? 'opacity-100 translate-y-0' : 'translate-y-10'}`}>
          คลิปสัมภาษณ์ผู้เข้าอบรม
        </div>

        <div className="pt-4 sm:pt-6 md:pt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 md:gap-12 lg:gap-20">
            {interviewVideos.map((video, index) => (
              <div
                key={video.id}
                className={`h-full bg-[#ffffff] drop-shadow-xl rounded-lg flex flex-col transition-all duration-1000 hover:shadow-2xl hover:-translate-y-1 ${isInterviewVisible ? 'opacity-100 translate-y-0' : 'translate-y-10'}`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-48 sm:h-56 md:h-48 lg:h-48 w-full rounded-t-lg overflow-hidden">
                  <iframe
                    src={video.embedUrl}
                    className="w-full h-full object-cover"
                    allow="autoplay"
                    allowFullScreen
                    title={video.title}
                  />
                </div>

                <div className="h-full p-4 flex flex-col">
                  <div className="text-[#0A2463] text-sm sm:text-base font-bold">
                    {video.title}
                  </div>

                  <div className="text-[#4B5563] text-xs pt-2 sm:pt-3">
                    ผู้เข้าสัมภาษณ์: {video.interviewee}
                  </div>

                  <div className="text-[#4B5563] text-xs pt-2 flex-grow line-clamp-3">
                    {video.description}
                  </div>

                  <div className="flex items-center gap-4 pt-3 text-[#4B5563] text-xs">
                    <div className="flex items-center gap-1">
                      <FontAwesomeIcon
                        icon={faClock}
                        style={{
                          color: "#0A2463",
                          width: "12px",
                          height: "12px",
                        }}
                      />
                      {video.duration}
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
                      {video.publishedDate}
                    </div>
                  </div>

                  <div className="text-blue-600 text-xs mt-2">
                    หมวดหมู่: {video.category}
                  </div>

                  <div
                    className="flex items-center pt-3 gap-2 text-sm text-[#0A2463] font-bold cursor-pointer hover:underline hover:text-[#39A9DB] transition-colors duration-200"
                    onClick={() => handleVideoViewDetails(video.id)}
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

        <div className="text-center text-sm text-[#6B7280] mt-15">
          แสดง {((videoPagination.currentPage - 1) * 6) + 1} - {Math.min(videoPagination.currentPage * 6, videoPagination.totalCount)}
          จาก {videoPagination.totalCount} คลิป
        </div>
        <div className="flex justify-center items-center pt-8 gap-4 pb-8">
          <button
            onClick={() => setVideoPage((prev) => Math.max(prev - 1, 1))}
            disabled={!videoPagination.prev}
            className="px-4 py-2 bg-[#0A2463] text-white rounded-lg disabled:opacity-50 hover:bg-[#39A9DB] transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 disabled:hover:bg-[#0A2463]"
          >
            ก่อนหน้า
          </button>
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#0A2463] font-medium">
              หน้า {videoPagination.currentPage} / {videoPagination.totalPages}
            </span>
          </div>
          <button
            onClick={() => setVideoPage((prev) => prev + 1)}
            disabled={!videoPagination.next}
            className="px-4 py-2 bg-[#0A2463] text-white rounded-lg disabled:opacity-50 hover:bg-[#39A9DB] transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 disabled:hover:bg-[#0A2463]"
          >
            ถัดไป
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewSection; 