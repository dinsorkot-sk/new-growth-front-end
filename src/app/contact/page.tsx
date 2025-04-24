import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhone,
  faEnvelope,
  faClock,
  faComment,
} from "@fortawesome/free-solid-svg-icons";

import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

export default function Home() {
  return (
    <div>
      {/* ส่วนเเรก */}
      <div className="w-full bg-[#0A2463]">
        <div className="h-[260px] p-20">
          <div className="text-3xl font-bold text-white">ติดต่อเรา</div>
          <div className="pt-6 text-lg">
            มีคำถามเกี่ยวกับโปรแกรมของเราหรือไม่
            ทีมงานของเรายินดีให้ความช่วยเหลือคุณ
          </div>
        </div>
      </div>
    {/* ส่วนที่2 */}
      <div className="w-full bg-[#F9FAFB]">
        <div className="h-[785]">
          <div className="grid grid-cols-2 gap-4 p-20">
            <div className="text-3xl text-[#0A2463] font-bold">
              ติดต่อเรา
              <div className="pt-10">
                <div className="flex gap-4">
                  <div className="flex justify-center items-center w-[48px] h-[48px] bg-[#E1F2FE] rounded-full">
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      style={{
                        color: "#0A2463",
                        width: "18px",
                        height: "18px",
                      }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-base font-thin">Location</div>
                    <div className="pt-2 text-xs text-[#4B5563]">
                      123 Education Building Bangkok University Bangkok,
                      Thailand 10110
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-10">
                <div className="flex gap-4">
                  <div className="flex justify-center items-center w-[48px] h-[48px] bg-[#E1F2FE] rounded-full">
                    <FontAwesomeIcon
                      icon={faPhone}
                      style={{
                        color: "#0A2463",
                        width: "18px",
                        height: "18px",
                      }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-base font-thin">Phone</div>
                    <div className="pt-2 text-xs text-[#4B5563] ">
                      Main Office: +66 2 123 4567 <br />
                      Admissions: +66 2 123 4568
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-10">
                <div className="flex gap-4">
                  <div className="flex justify-center items-center w-[48px] h-[48px] bg-[#E1F2FE] rounded-full">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      style={{
                        color: "#0A2463",
                        width: "18px",
                        height: "18px",
                      }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-base font-thin">Email</div>
                    <div className="pt-2 text-xs text-[#4B5563]">
                      General Inquiries: info@thailand40edu.th
                      <br />
                      Admissions: admissions@thailand40edu.th
                      <br />
                      Support: support@thailand40edu.th
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-10">
                <div className="flex gap-4">
                  <div className="flex justify-center items-center w-[48px] h-[48px] bg-[#E1F2FE] rounded-full">
                    <FontAwesomeIcon
                      icon={faClock}
                      style={{
                        color: "#0A2463",
                        width: "18px",
                        height: "18px",
                      }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-base font-thin">Office Hours</div>
                    <div className="pt-2 text-xs text-[#4B5563]">
                      Monday - Friday: 8:30 AM - 4:30 PM
                      <br />
                      Saturday: 9:00 AM - 12:00 PM
                      <br />
                      Sunday: Closed
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-10 text-base">ติดต่อกับเรา</div>
              <div className="flex gap-4 pt-6">
                <div className="flex justify-center items-center w-[44px] h-[44px] bg-[#0A2463] rounded-full">
                  <FontAwesomeIcon
                    icon={faFacebook}
                    style={{
                      color: "#ffffff",
                      width: "18px",
                      height: "18px",
                    }}
                  />
                </div>

                <div className="flex justify-center items-center w-[44px] h-[44px] bg-[#0A2463] rounded-full">
                  <FontAwesomeIcon
                    icon={faTwitter}
                    style={{
                      color: "#ffffff",
                      width: "18px",
                      height: "18px",
                    }}
                  />
                </div>

                <div className="flex justify-center items-center w-[44px] h-[44px] bg-[#0A2463] rounded-full">
                  <FontAwesomeIcon
                    icon={faInstagram}
                    style={{
                      color: "#ffffff",
                      width: "18px",
                      height: "18px",
                    }}
                  />
                </div>

                <div className="flex justify-center items-center w-[44px] h-[44px] bg-[#0A2463] rounded-full">
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    style={{
                      color: "#ffffff",
                      width: "18px",
                      height: "18px",
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="text-3xl text-[#0A2463] font-bold">
              ส่งข้อความถึงเรา
              <div className="flex gap-6">
                <div className="flex flex-col">
                  <div className="flex pt-10 text-xs text-[#374151] gap-2">
                    ชื่อ-นามสกุล <div className="text-[red]">*</div>
                  </div>
                  <div className="pt-2">
                    <input
                      className="w-[288px] h-[40px] bg-[#FFFFFF] border border-[#D1D5DB] "
                      type="text"
                    />
                  </div>
                </div>

                <div className="flex">
                  <div className="flex flex-col">
                    <div className="flex pt-10 text-xs text-[#374151] gap-2">
                      ที่อยู่อีเมล์ <div className="text-[red]">*</div>
                    </div>
                    <div className="pt-2">
                      <input
                        className="w-[288px] h-[40px] bg-[#FFFFFF] border border-[#D1D5DB]"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <div className="text-[#374151] text-xs">
                  เบอร์โทรศัพท์
                  <div className="pt-2">
                    <input
                      className="pt-2 w-[600px] h-[42px] bg-[#ffffff]  border border-[#D1D5DB] rounded-lg"
                      type="text"
                    />
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <div className="flex">
                  <div className="flex flex-col">
                    <div className="flex text-[#374151] text-xs gap-2">
                      เรื่อง <div className="text-[red]">*</div>
                    </div>
                    <div className="pt-2">
                      <select
                        className="pt-2 w-[600px] h-[42px] bg-[#ffffff] border border-[#D1D5DB] text-black text-lg font-thin rounded-lg"
                        name=""
                        id=""
                      >
                        <option>select a subject</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <div className="flex text-[#374151] text-xs gap-2">
                  ข้อความ <div className="text-[red]">*</div>
                </div>
                <div className="pt-2">
                  <input
                    className="w-[600px] h-[140px] bg-white border border-[#D1D5DB] rounded-lg text-black text-lg"
                    type="text"
                  />
                </div>
              </div>
              <div className="pt-6">
                <div className="flex items-center gap-10 p-6 w-[180px] h-[50px] bg-[#39A9DB] rounded-lg">
                  <div className="">
                    <FontAwesomeIcon
                      icon={faComment}
                      style={{
                        color: "#ffffff",
                        width: "18px",
                        height: "18px",
                      }}
                    />
                  </div>
                  <div className="text-[#ffffff] text-xs">ส่งข้อความ</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    {/* ส่วนที่3 */}
      <div className="w-full bg-[#FFFFFF]">
        <div className="h-[580px] p-20">
          <div className="text-center text-[#0A2463] text-xl font-bold">
            ที่อยู่เรา
          </div>

          <div className="flex justify-center items-center pt-8">
            <div className=" w-[1250px] h-[385px] bg-[#E5E7EB] rounded-xl">
              <div className="text-center text-xs text-[#6B7280] p-40 ">
                Map would be displayed here
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
