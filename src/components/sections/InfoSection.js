import { QRCodeSVG } from 'qrcode.react';

const InfoSection = ({ isInfoVisible, admission }) => {
  return (
    <div id="course-info" className="w-full bg-[#E1F2FE] py-10 px-4 md:px-20">
      <div className="max-w-4xl mx-auto">
        <div className={`text-2xl font-bold text-[#0A2463] mb-4 transition-all duration-1000 ${isInfoVisible ? 'opacity-100 translate-y-0' : 'translate-y-10'}`}>
          รายละเอียดหลักสูตร
        </div>
        <ul className="list-disc pl-6 text-[#0A2463] text-sm md:text-base mb-4">
          {[
            'ระยะเวลาอบรม 4 เดือน (285 ชั่วโมง) ทฤษฎี 60 ชั่วโมง ปฏิบัติ 225 ชั่วโมง',
            'เริ่มอบรม กรกฎาคม - ตุลาคม 2568',
            'คุณสมบัติ: อายุ 18 ปีขึ้นไป, จบ ม.6 หรือเทียบเท่า, เกษตรกร/เจ้าของฟาร์ม/ผู้สนใจ',
            'สถานที่: มหาวิทยาลัยแม่โจ้',
            'หน่วยงานร่วม: มหาวิทยาลัยแม่โจ้, บริษัท อินคูซิชั่นโพสต์, บริษัท พีพีพี ฟู้ด'
          ].map((item, index) => (
            <li key={index} className={`transition-all duration-1000 ${isInfoVisible ? 'opacity-100 translate-y-0' : 'translate-y-10'}`}
              style={{ transitionDelay: `${index * 0.1}s` }}>
              {item}
            </li>
          ))}
        </ul>
        <div className="flex flex-col sm:flex-row gap-4 items-center mt-4">
          <div className={`bg-white rounded-lg shadow p-4 flex flex-col items-center transition-all duration-1000 hover:shadow-xl hover:-translate-y-1 ${isInfoVisible ? 'opacity-100 translate-y-0' : 'translate-y-10'}`}
            style={{ transitionDelay: '0.6s' }}>
            <span className="font-bold text-[#0A2463]">ติดต่อสอบถาม</span>
            <span className="text-xs text-[#0A2463]">โทร: 084-150-0677 (อ.ดร.พยุงศักดิ์)</span>
            <span className="text-xs text-[#0A2463]">โทร: 089-837-8992 (อ.ดร.สุดเขต)</span>
            <span className="text-xs text-[#0A2463]">E-mail: Payungsak.kae@gmail.com</span>
            <span className="text-xs text-[#0A2463]">E-mail: sutkhet@mju.ac.th</span>
          </div>
          {admission?.link_register && (
            <div className={`flex flex-col items-center transition-all duration-1000 ${isInfoVisible ? 'opacity-100 translate-y-0' : 'translate-y-10'}`}
              style={{ transitionDelay: '0.8s' }}>
              <span className="font-bold text-[#0A2463] mb-2">สมัครออนไลน์</span>
              <div className="w-28 h-28 flex items-center justify-center bg-white border-2 border-[#39A9DB] rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105">
                {admission?.link_register && (
                  <QRCodeSVG value={admission.link_register} size={100} />
                )}
              </div>
              <span className="text-xs text-[#0A2463] mt-1">สแกน QR เพื่อสมัคร</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoSection; 