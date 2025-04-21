import Image from "next/image";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGreaterThan } from "@fortawesome/free-solid-svg-icons";
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

      <div className="w-full bg-[#0A2463]">
        <div className="flex flex-col justify-center items-center  h-[272px]">
          <div className="text-2xl font-bold ">เป้าหมายของเรา</div>
          <p className="pt-8 text-center text-base">
            เพื่อสร้างบุคลากรที่มีประสิทธิภาพสูงในอุตสาหกรรม New Growth Engine
            ตามนโยบายไทยแลนด์ 4.0<br /> และปฏิรูปการศึกษาระดับอุดมศึกษาของไทย
            โดยพัฒนาบัณฑิตให้มีทักษะที่ล้ำสมัย<br />
            พร้อมที่จะขับเคลื่อนการสร้างสรรค์นวัตกรรมและการเติบโตทางเศรษฐกิจ
          </p>
        </div>
      </div>
    </div>
  );
}
