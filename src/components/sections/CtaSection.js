const CtaSection = ({ isCtaVisible, admission }) => {
  return (
    <div className="w-full bg-[#39A9DB]">
      <div className="px-4 py-8 md:p-12 lg:p-20 h-full">
        <div className="flex flex-col justify-center items-center text-white">
          <div className={`font-bold text-xl sm:text-2xl transition-all duration-1000 ${isCtaVisible ? 'opacity-100 translate-y-0' : 'translate-y-10'}`}>
            พร้อมที่จะสร้างอนาคตประเทศไทยหรือยัง?
          </div>
          <div className={`text-center pt-2 px-2 sm:px-4 md:px-8 max-w-2xl transition-all duration-1000 ${isCtaVisible ? 'opacity-100 translate-y-0' : 'translate-y-10'}`}
            style={{ transitionDelay: '0.2s' }}>
            เข้าร่วมโปรแกรมของเราและเป็นส่วนหนึ่งของนักประดิษฐ์และผู้นำรุ่นต่อไปของประเทศไทยในอุตสาหกรรม
            New Growth Engine
          </div>
          <div className={`pt-4 md:pt-6 transition-all duration-1000 ${isCtaVisible ? 'opacity-100 translate-y-0' : 'translate-y-10'}`}
            style={{ transitionDelay: '0.4s' }}>
            <a href={admission?.link_register || process.env.NEXT_PUBLIC_REGISTER}>
              <div className="flex justify-center items-center w-[140px] sm:w-[160px] h-[40px] sm:h-[52px] bg-white text-[#0A2463] rounded-md cursor-pointer transition-all duration-300 hover:bg-gray-100 hover:scale-105">
                เข้าร่วม
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CtaSection; 