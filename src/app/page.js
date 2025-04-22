import Image from "next/image";
import Navbar from "../components/Navbar";
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
} from "@fortawesome/free-solid-svg-icons";
export default function Home() {
  return (
    <div>
      <div className="w-full bg-[#7d7d7e]">
        <div className="flex h-[600px] flex-col justify-center p-20 ">
          <p className="text-4xl font-bold">
            โครงการผลิตบัณฑิตพันธุ์ใหม่
            <br /> 2567
          </p>
          <p className="pt-4 text-lg">
            สร้างคนที่มีสมรรถนะสูงสำหรับอุตสาหกรรม New Growth Engine ตามนโยบาย
            Thailand 4.0 <br />
            และปฏิรูปการอุดมศึกษาไทย
          </p>

          {/* button */}
          <div className="flex pt-8 gap-6">
            <div className="w-[185px] h-[48px] bg-[#39A9DB] rounded-md flex items-center justify-center">
              <div className="flex justify-evenly items-center w-full text-center text-sm">
                เข้าร่วมโครงการ
                <FontAwesomeIcon
                  icon={faGreaterThan}
                  style={{ color: "#ffffff", width: "13px", height: "13px" }}
                />
              </div>
            </div>
            <div className="w-[128px] h-[48px] bg-white rounded-md flex items-center justify-center">
              <div className="flex justify-evenly items-center w-full text-center text-sm text-[#0A2463]">
                ดูรายละเอียด
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ส่วนที่2 */}
      <div className="w-full bg-[#0A2463]">
        <div className="flex flex-col justify-center items-center  h-[272px]">
          <div className="text-2xl font-bold ">เป้าหมายของเรา</div>
          <p className="pt-8 text-center text-base">
            เพื่อสร้างบุคลากรที่มีประสิทธิภาพสูงในอุตสาหกรรม New Growth Engine
            ตามนโยบายไทยแลนด์ 4.0
            <br /> และปฏิรูปการศึกษาระดับอุดมศึกษาของไทย
            โดยพัฒนาบัณฑิตให้มีทักษะที่ล้ำสมัย
            <br />
            พร้อมที่จะขับเคลื่อนการสร้างสรรค์นวัตกรรมและการเติบโตทางเศรษฐกิจ
          </p>
        </div>
      </div>

      {/* ส่วนที่3 */}
      <div className="w-full bg-[#F9FAFB]">
        <div className="h-[708px]">
          <div className="text-center py-12 text-2xl font-bold text-[#0A2463]">
            สิ่งที่จะได้รับจากโครงการ
          </div>

          {/* กรอบ */}
          <div className="grid grid-cols-3 gap-10  w-full px-20">
            {/* การ์ดที่ 1 */}
            <div className=" h-[232px] bg-[#ffffff] rounded-lg drop-shadow-lg p-6">
              <div className="flex justify-center items-center w-[56px] h-[56px] rounded-full bg-[#E1F2FE]">
                <FontAwesomeIcon
                  icon={faBookOpen}
                  style={{ color: "#0A2463", width: "22px", height: "22px" }}
                />
              </div>
              <div className="pt-4 text-[#0A2463] font-bold text-base">
                หลักสูตรที่ขับเคลื่อนโดยอุตสาหกรรม
              </div>
              <div className="pt-4 text-[#0A2463] text-xs">
                หลักสูตรที่ออกแบบร่วมกับผู้นำในอุตสาหกรรมเพื่อตอบสนองความต้องการของโลกแห่งความเป็นจริงและเตรียมนักศึกษาให้พร้อมสำหรับการจ้างงานทันที
              </div>
            </div>

            {/* การ์ดที่ 2 */}
            <div className=" h-[232px] bg-[#ffffff] rounded-lg drop-shadow-lg p-6">
              <div className="flex justify-center items-center w-[56px] h-[56px] rounded-full bg-[#E1F2FE]">
                <FontAwesomeIcon
                  icon={faUserGroup}
                  style={{ color: "#0A2463", width: "22px", height: "22px" }}
                />
              </div>
              <div className="pt-4 text-[#0A2463] font-bold text-base">
                อบรมโดยผู้เชี่ยวชาญ
              </div>
              <div className="pt-4 text-[#0A2463] text-xs">
                เเรียนรู้จากผู้เชี่ยวชาญและนักวิชาการชั้นนำที่มีประสบการณ์มากมายในภาคเทคโนโลยีที่กำลังเติบโตของประเทศไทย
              </div>
            </div>

            {/* การ์ดที่ 3 */}
            <div className=" h-[232px] bg-[#ffffff] rounded-lg drop-shadow-lg p-6">
              <div className="flex justify-center items-center w-[56px] h-[56px] rounded-full bg-[#E1F2FE]">
                <FontAwesomeIcon
                  icon={faAward}
                  style={{ color: "#0A2463", width: "22px", height: "22px" }}
                />
              </div>
              <div className="pt-4 text-[#0A2463] font-bold text-base">
                ได้รับ ประกาศนียบัตร
              </div>
              <div className="pt-4 text-[#0A2463] text-xs">
                ได้รับการยอมรับในอุตสาหกรรมซึ่งช่วยเพิ่มโอกาสการจ้างงานของคุณในภาคส่วนที่มีนวัตกรรมมากที่สุดของประเทศไทย
              </div>
            </div>

            {/* การ์ดที่ 4 */}
            <div className=" h-[232px] bg-[#ffffff] rounded-lg drop-shadow-lg p-6">
              <div className="flex justify-center items-center w-[56px] h-[56px] rounded-full bg-[#E1F2FE]">
                <FontAwesomeIcon
                  icon={faMicrochip}
                  style={{ color: "#0A2463", width: "22px", height: "22px" }}
                />
              </div>
              <div className="pt-4 text-[#0A2463] font-bold text-base">
                เทคโนโลยีล้ำสมัย
              </div>
              <div className="pt-4 text-[#0A2463] text-xs">
                ได้รับประสบการณ์จริงกับเทคโนโลยีล่าสุดที่ขับเคลื่อนการเปลี่ยนแปลงทางเศรษฐกิจของประเทศไทย
              </div>
            </div>

            {/* การ์ดที่ 5 */}
            <div className=" h-[232px] bg-[#ffffff] rounded-lg drop-shadow-lg p-6">
              <div className="flex justify-center items-center w-[56px] h-[56px] rounded-full bg-[#E1F2FE]">
                <FontAwesomeIcon
                  icon={faBrain}
                  style={{ color: "#0A2463", width: "22px", height: "22px" }}
                />
              </div>
              <div className="pt-4 text-[#0A2463] font-bold text-base">
                การเรียนรู้เชิงปฏิบัติ
              </div>
              <div className="pt-4 text-[#0A2463] text-xs">
                มุ่งเน้นการเรียนรู้ผ่านโครงการที่จำลองสถานการณ์จริงในที่ทำงาน
                เพื่อพัฒนาทักษะและสร้างพอร์ตโฟลิโอให้โดดเด่น
              </div>
            </div>

            {/* การ์ดที่ 6 */}
            <div className=" h-[232px] bg-[#ffffff] rounded-lg drop-shadow-lg p-6">
              <div className="flex justify-center items-center w-[56px] h-[56px] rounded-full bg-[#E1F2FE]">
                <FontAwesomeIcon
                  icon={faLightbulb}
                  style={{ color: "#0A2463", width: "22px", height: "22px" }}
                />
              </div>
              <div className="pt-4 text-[#0A2463] font-bold text-base">
                แนวคิดเชิงนวัตกรรม
              </div>
              <div className="pt-4 text-[#0A2463] text-xs">
                พัฒนาทักษะการคิดวิเคราะห์และการแก้ปัญหาซึ่งจำเป็นต่อการขับเคลื่อนการสร้างสรรค์นวัตกรรมในทุก
                ๆ ทักษะที่จำเป็นต่อ การขับเคลื่อนการสร้างสรรค์นวัตกรรมในทุก ๆ
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ส่วนที่ 4 */}
      <div className="w-full bg-[#ffffff] ">
        <div className="h-[600px] p-20">
          <div className="flex  justify-between text-[#0A2463] text-2xl font-bold">
            หลักสูตรเเนะนำ
            <div className="text-[#39A9DB] text-xs">ดูหลักสูตร ทั้งหมด</div>
          </div>
          {/* การ์ด */}
          <div className="pt-8">
            <div className="grid grid-cols-3 gap-20 ">
              <div className="h-[396px] bg-white drop-shadow-xl rounded-lg flex flex-col overflow-hidden">
                {/* ส่วนรูปภาพ 40% */}
                <div className="relative h-[45%] w-full">
                  <Image
                    src="/Img_Homepage/pig1.jpg"
                    alt="รูปภาพตัวอย่าง"
                    fill
                    className="object-cover"
                  />

                  <div className="absolute p-4">
                    <div className="flex justify-center items-center w-[100px] h-[30px] rounded-[9999px] bg-[#39A9DB]">
                      <p className="text-white text-[10px]">AI & DATA</p>
                    </div>
                  </div>
                </div>

                {/* ส่วนข้อความ 60% */}
                <div className="h-[60%] p-4 ">
                  <div className="text-[#0A2463] text-base font-bold">
                    Artificial Intelligence and Machine <br /> Learning
                  </div>
                  <div className="text-[#4B5563] text-xs pt-4">
                    Instructor: Dr. Somchai Jaidee
                  </div>
                  <div className="flex gap-5 pt-4 text-[#4B5563] text-xs">
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
                      feb 15,2024
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
                      120 student
                    </div>
                  </div>

                  <div className="flex items-center pt-4 gap-2 text-sm text-[#0A2463]">
                    View Details{" "}
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      style={{
                        color: "#0A2463",
                        width: "12px",
                        height: "12px",
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="h-[396px] bg-white drop-shadow-xl rounded-lg flex flex-col overflow-hidden">
                {/* ส่วนรูปภาพ 40% */}

                <div className="relative h-[45%] w-full">
                  <Image
                    src="/Img_Homepage/pig1.jpg"
                    alt="รูปภาพตัวอย่าง"
                    fill
                    className="object-cover "
                  />

                  <div className="absolute p-4">
                    <div className="flex justify-center items-center w-[100px] h-[30px] rounded-[9999px] bg-[#39A9DB]">
                      <p className="text-white text-[10px]">Robotics</p>
                    </div>
                  </div>
                </div>

                {/* ส่วนข้อความ 60% */}
                <div className="h-[60%] p-4 ">
                  <div className="text-[#0A2463] text-base font-bold">
                    Artificial Intelligence and Machine <br /> Learning
                  </div>
                  <div className="text-[#4B5563] text-xs pt-4">
                    Instructor: Dr. Somchai Jaidee
                  </div>
                  <div className="flex gap-5 pt-4 text-[#4B5563] text-xs">
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
                      feb 15,2024
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
                      120 student
                    </div>
                  </div>

                  <div className="flex items-center pt-4 gap-2 text-sm text-[#0A2463]">
                    View Details{" "}
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      style={{
                        color: "#0A2463",
                        width: "12px",
                        height: "12px",
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="h-[396px] bg-white drop-shadow-xl rounded-lg flex flex-col overflow-hidden">
                {/* ส่วนรูปภาพ 40% */}
                <div className="relative h-[45%] w-full">
                  <Image
                    src="/Img_Homepage/pig1.jpg"
                    alt="รูปภาพตัวอย่าง"
                    fill
                    className="object-cover"
                  />

                  <div className="absolute p-4">
                    <div className="flex justify-center items-center w-[100px] h-[30px] rounded-[9999px] bg-[#39A9DB]">
                      <p className="text-white text-[10px]">Business</p>
                    </div>
                  </div>
                </div>

                {/* ส่วนข้อความ 60% */}
                <div className="h-[60%] p-4 ">
                  <div className="text-[#0A2463] text-base font-bold">
                    Artificial Intelligence and Machine <br /> Learning
                  </div>
                  <div className="text-[#4B5563] text-xs pt-4">
                    Instructor: Dr. Somchai Jaidee
                  </div>
                  <div className="flex gap-5 pt-4 text-[#4B5563] text-xs">
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
                      feb 15,2024
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
                      120 student
                    </div>
                  </div>
                  <div className="flex items-center pt-4 gap-2 text-sm text-[#0A2463]">
                    View Details{" "}
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      style={{
                        color: "#0A2463",
                        width: "12px",
                        height: "12px",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ส่วนที่5 */}
      <div className="w-full bg-[#F9FAFB]">
        <div className="h-[580px] p-20">
          <div className="flex  justify-between text-[#0A2463] text-2xl font-bold">
            ข่าวเเละกิจกรรม
            <div className="text-[#39A9DB] text-xs">ดูข่าว ทั้งหมด</div>
          </div>

          <div className="pt-8">
            <div className="grid grid-cols-2 gap-20">
              <div className="h-[376px] bg-[#ffffff] drop-shadow-xl rounded-lg ">
                {/* ส่วนรูปภาพ 40% */}
                <div className="relative h-[50%] w-full">
                  <Image
                    src="/Img_Homepage/pig1.jpg"
                    alt="รูปภาพตัวอย่าง"
                    fill
                    className="object-cover"
                  />

                  <div className="absolute p-4">
                    <div className="flex justify-center items-center w-[100px] h-[30px] rounded-[9999px] bg-[#0A2463]">
                      <p className="text-white text-[10px]">Partnership</p>
                    </div>
                  </div>
                </div>

                {/* ส่วนข้อความ 60% */}
                <div className="h-[50%] p-4 ">
                  <div className="flex items-center gap-1 text-xs text-[#6B7280]">
                    <FontAwesomeIcon
                      icon={faCalendar}
                      style={{
                        color: "#0A2463",
                        width: "14px",
                        height: "14px",
                      }}
                    />
                    December 10, 2023
                  </div>
                  <div className="text-[#0A2463] text-base font-bold pt-4">
                    Thailand 4.0 Program Partners with Leading Tech Companies
                  </div>
                  <div className="text-[#4B5563] text-xs pt-4">
                    New partnership provides students with internship
                    opportunities at top tech firms in Thailand.
                  </div>

                  <div className="flex items-center pt-4 gap-2 text-sm text-[#0A2463] font-bold">
                    Read More
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      style={{
                        color: "#0A2463",
                        width: "12px",
                        height: "12px",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* การ์ด2 */}
              <div className="h-[376px] bg-[#ffffff] drop-shadow-xl rounded-lg ">
                {/* ส่วนรูปภาพ 40% */}
                <div className="relative h-[50%] w-full">
                  <Image
                    src="/Img_Homepage/pig1.jpg"
                    alt="รูปภาพตัวอย่าง"
                    fill
                    className="object-cover"
                  />

                  <div className="absolute p-4">
                    <div className="flex justify-center items-center w-[100px] h-[30px] rounded-[9999px] bg-[#0A2463]">
                      <p className="text-white text-[10px]">Event</p>
                    </div>
                  </div>
                </div>

                {/* ส่วนข้อความ 60% */}
                <div className="h-[50%] p-4 ">
                  <div className="flex items-center gap-1 text-xs text-[#6B7280]">
                    <FontAwesomeIcon
                      icon={faCalendar}
                      style={{
                        color: "#0A2463",
                        width: "14px",
                        height: "14px",
                      }}
                    />
                    November 28, 2023
                  </div>
                  <div className="text-[#0A2463] text-base font-bold pt-4">
                    Graduates Showcase Innovative Projects at Tech Expo 2023{" "}
                  </div>
                  <div className="text-[#4B5563] text-xs pt-4">
                    Students presented their final projects to industry leaders
                    and potential employers.{" "}
                  </div>

                  <div className="flex items-center pt-4 gap-2 text-sm text-[#0A2463] font-bold">
                    Read More
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      style={{
                        color: "#0A2463",
                        width: "12px",
                        height: "12px",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ส่วนที่6 */}
      <div className="w-full bg-[#39A9DB]">
        <div className="p-20 h-[328]">
          <div className="flex flex-col justify-center items-center">
            <div className=" font-bold text-2xl">
              พร้อมที่จะสร้างอนาคตประเทศไทยหรือยัง?
            </div>
            <div className="pt- ">
              เข้าร่วมโปรแกรมของเราและเป็นส่วนหนึ่งของนักประดิษฐ์และผู้นำรุ่นต่อไปของประเทศไทยในอุตสาหกรรม
              New Growth Engine
            </div>
            <div className="pt-6">
              <div className="flex justify-center items-center w-[160px] h-[52px] bg-white text-[#0A2463] rounded-md">
                เข้าร่วม
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
