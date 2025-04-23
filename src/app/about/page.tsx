import Image from "next/image";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck,faUser} from '@fortawesome/free-regular-svg-icons';
import { faBullseye,faAward } from '@fortawesome/free-solid-svg-icons';
export default function Home() {
  return (
    <div>
    <div className=" bg-[#0A2463] h-70  text-white p-10 md:p-20 ">
        <div className="text-3xl font-bold">เกี่ยวกับโครงการของเรา</div>
        <div className="text-wrap max-w-2xl text-lg mt-5">สร้างกำลังแรงงานแห่งอนาคตของประเทศไทยผ่านการศึกษาเชิงนวัตกรรมและความร่วมมือทางอุตสาหกรรม</div>
    </div>
    <div className=" bg-[#F9FAFB] p-10 md:p-20 grid grid-cols-1 md:grid-cols-2">
        <div className="pr-0 md:pr-10 ">
            <div className="text-2xl font-bold text-[#0A2463]">เป้าหมายของเรา</div>
            <div className="mt-3 text-sm text-[#374151]" >โครงการฝึกอบรมบัณฑิต Thailand 4.0 มีเป้าหมายเพื่อสร้างบุคลากรที่มีประสิทธิภาพสูงในอุตสาหกรรม New Growth Engine ตามนโยบาย Thailand 4.0 และปฏิรูปการศึกษาระดับอุดมศึกษาของไทย เรามุ่งมั่นที่จะเชื่อมช่องว่างระหว่างความรู้ทางวิชาการและความต้องการของอุตสาหกรรมโดยจัดให้มีการฝึกอบรมภาคปฏิบัติเกี่ยวกับเทคโนโลยีที่ล้ำสมัยและแนวทางปฏิบัติทางธุรกิจ</div>
            <div className="text-sm mt-3 text-[#374151]">โครงการของเราได้รับการออกแบบมาเพื่อผลิตบัณฑิตที่ไม่เพียงแต่เชี่ยวชาญด้านเทคนิคเท่านั้น แต่ยังมีความสามารถด้านการคิดวิเคราะห์ การแก้ปัญหา และการเป็นผู้ประกอบการที่จำเป็นในการขับเคลื่อนการสร้างสรรค์นวัตกรรมและการเติบโตทางเศรษฐกิจในอุตสาหกรรมหลักของประเทศไทยอีกด้วย</div>
        </div>
        <div className="px-0 md:px-5  mt-5 md:mt-0 ">
        <div className="text-2xl font-bold text-[#0A2463]">วิสัยทัศน์ของเรา</div>
        <div className="mt-3 text-sm text-[#374151]">เราตั้งเป้าว่าประเทศไทยจะเป็นศูนย์กลางนวัตกรรมและความก้าวหน้าทางเทคโนโลยีในภูมิภาคเอเชียตะวันออกเฉียงใต้ โดยมีแรงงานที่มีทักษะสูงที่ขับเคลื่อนการเติบโตทางเศรษฐกิจและการพัฒนาอย่างยั่งยืนใน ทุกภาคส่วน</div>
        <div className="text-sm mt-3 text-[#374151]">ด้วยโครงการของเราตั้งเป้าที่จะมีส่วนสนับสนุนการเปลี่ยนแปลงประเทศไทยให้เป็นเศรษฐกิจที่ขับเคลื่อนด้วย คุณค่าซึ่งขับเคลื่อนด้วยนวัตกรรม เทคโนโลยี และความคิดสร้างสรรค์ สอดคล้องกับโมเดลเศรษฐกิจไทยแลนด์ 4.0 ของรัฐบาล</div>
        </div>
    </div>
    <div className="bg-[#F9FAFB] p-8 md:p-12 py-10 rounded-lg shadow-sm">
      <h2 className="text-center text-2xl font-bold text-blue-900 mb-8">Program Objectives</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Objective 1 */}
        <div className="border border-gray-200 rounded-lg p-6 shadow-sm flex gap-2 ">
          {/* <div className="flex items-center mb-3">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              1
            </div>
            <h3 className="font-bold text-blue-800">Develop Industry-Ready Skills</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Equip graduates with practical skills and knowledge that align with the 
            needs of Thailand's targeted S-Curve industries, ensuring immediate 
            employability and value addition to employers.
          </p> */}
          <div className=" p-2"><div className="bg-blue-100 p-2 rounded-full"><FontAwesomeIcon icon={faBullseye} className="bg-blue-100" style={{color: "#002594" , width: "20px", height: "20px"}} /></div></div>
          <div>
            <div className="text-lg font-bold text-[#0A2463]">พัฒนาทักษะให้พร้อมสำหรับอุตสาหกรรม</div>
            <div className="my-2 text-sm text-[#4B5563]">เสริมทักษะและความรู้เชิงปฏิบัติให้แก่บัณฑิตที่สอดคล้องกับความต้องการของอุตสาหกรรม 
            S-Curve เป้าหมายของประเทศไทย เพื่อให้มั่นใจได้ว่าจะมีการจ้างงานได้ทันทีและ เพิ่มมูลค่าให้กับนายจ้าง</div>
            </div>
        </div>
        
        {/* Objective 2 */}
        <div className="border border-gray-200 rounded-lg p-6 shadow-sm flex gap-2">
          {/* <div className="flex items-center mb-3">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              2
            </div>
            <h3 className="font-bold text-blue-800">Foster Innovation</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Cultivate a mindset of innovation and entrepreneurship among 
            participants, encouraging them to develop new solutions to real-world 
            problems and create value-added products and services.
          </p> */}
          <div className=" p-2"><div className="bg-blue-100 p-2 rounded-full"><FontAwesomeIcon icon={faCircleCheck} className="bg-blue-100" style={{color: "#002594" , width: "20px", height: "20px"}} /></div></div>
          <div>
            <div className="text-lg font-bold text-[#0A2463]">ส่งเสริมนวัตกรรม</div>
            <div className="my-2 text-sm text-[#4B5563]">ปลูกฝังทัศนคติด้านนวัตกรรมและการเป็นผู้ประกอบการให้กับผู้เข้าร่วม โดยส่งเสริมให้พวกเขาพัฒนาโซลูชั่นใหม่ๆ เพื่อแก้ไขปัญหาในโลกแห่งความเป็นจริง และสร้างผลิตภัณฑ์และบริการที่มีมูลค่าเพิ่ม</div>
            </div>
        </div>
        
        {/* Objective 3 */}
        <div className="border border-gray-200 rounded-lg p-6 shadow-sm flex gap-2">
          
          <div className=" p-2"><div className="bg-blue-100 p-2 rounded-full"><FontAwesomeIcon icon={faUser} className="bg-blue-100" style={{color: "#002594" , width: "20px", height: "20px"}} /></div></div>
          <div>
            <div className="text-lg font-bold text-[#0A2463]">เสริมสร้างความร่วมมือระหว่างอุตสาหกรรมและสถาบันการศึกษา</div>
            <div className="my-2 text-sm text-[#4B5563]"> สร้างความร่วมมือที่แข็งแกร่งระหว่างสถาบันการศึกษาและผู้เล่นในอุตสาหกรรมเพื่อให้แน่ใจว่าหลักสูตรมีความเกี่ยวข้องและมอบประสบการณ์จริงให้กับนักศึกษาผ่านการฝึกงานและโครงการความร่วมมือ</div>
            </div>
        </div>
        
        {/* Objective 4 */}
        <div className="border border-gray-200 rounded-lg p-6 shadow-sm flex gap-2">
          {/* <div className="flex items-center mb-3">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              4
            </div>
            <h3 className="font-bold text-blue-800">Support Economic Transformation</h3>
          </div>
          <p className="text-gray-600 text-sm">
            Contribute to Thailand's economic transformation by producing skilled 
            professionals who can drive growth in high-value industries and help 
            the country escape the middle-income trap.
          </p> */}
            <div className=" p-2"><div className="bg-blue-100 p-2 rounded-full"><FontAwesomeIcon icon={faAward} className="bg-blue-100" style={{color: "#002594" , width: "20px", height: "20px"}} /></div></div>
          <div>
            <div className="text-lg font-bold text-[#0A2463]">สนับสนุนการเปลี่ยนแปลงทางเศรษฐกิจ</div>
            <div className="my-2 text-sm text-[#4B5563]"> มีส่วนร่วมในการเปลี่ยนแปลงทางเศรษฐกิจของประเทศไทยโดยผลิตบุคลากรที่มีทักษะซึ่งสามารถขับเคลื่อนการเติบโตในอุตสาหกรรมที่มีมูลค่าสูง และช่วยให้ประเทศหลุด พ้นจากกับดักรายได้ปานกลาง</div>
            </div>
        </div>
      </div>
    </div>
    <div className=" bg-[#F9FAFB] p-10 md:p-20 ">
    <h2 className="text-center text-2xl font-bold text-[#0A2463] mb-8">Program Sponsors</h2>
    <div className="flex flex-wrap justify-center">
    <div className="text-center w-55 h-32 p-5 bg-white shadow-md rounded-lg m-4 flex items-center justify-center">
      <div className="text-[#6B7280]">Ministry of Education</div>
    </div>
    
    <div className="text-center w-55 h-32 p-5 bg-white shadow-md rounded-lg m-4 flex items-center justify-center">
      <div className="text-[#6B7280]">Ministry of Digital Economy</div>
    </div>
    
    <div className="text-center w-55 h-32 p-5 bg-white shadow-md rounded-lg m-4 flex items-center justify-center">
      <div className="text-[#6B7280]">National Science and Technology Development Agency</div>
    </div>
    
    <div className="text-center w-55 h-32 p-5 bg-white shadow-md rounded-lg m-4 flex items-center justify-center">
      <div className="text-[#6B7280]">Digital Economy Promotion Agency</div>
    </div>
    
    <div className="text-center w-55 h-32 p-5 bg-white shadow-md rounded-lg m-4 flex items-center justify-center">
      <div className="text-[#6B7280]">Thailand Board of Investment</div>
    </div>
  </div>
    </div>
    {/* <div className="bg-[#F9FAFB] container mx-auto px-4 py-8">
  <h2 className="text-center text-blue-800 text-2xl font-bold mb-10">Our History</h2>
  
  <div className="relative max-w-3xl mx-auto">
   
    <div className="absolute left-6 top-6 bottom-40 md:bottom-20 w-1 bg-blue-200"></div>
    
   
    <div className="relative mb-12">
      <div className="flex items-start">
        <div className="absolute left-6 transform -translate-x-1/2 mt-1.5">
          <div className="w-6 h-6 bg-blue-400 rounded-full"></div>
        </div>
        <div className="ml-16">
          <h3 className="text-lg font-semibold text-blue-800">2020: Program Inception</h3>
          <p className="text-gray-500 text-sm">January 2020</p>
          <p className="mt-2 text-gray-700">
            The Thailand 4.0 Graduate Training Program was established as part of the government's initiative to reform higher 
            education and prepare graduates for the changing job market driven by technological advancement.
          </p>
        </div>
      </div>
    </div>
    
    
    <div className="relative mb-12">
      <div className="flex items-start">
        <div className="absolute left-6 transform -translate-x-1/2 mt-1.5">
          <div className="w-6 h-6 bg-blue-400 rounded-full"></div>
        </div>
        <div className="ml-16">
          <h3 className="text-lg font-semibold text-blue-800">2021: First Cohort</h3>
          <p className="text-gray-500 text-sm">June 2021</p>
          <p className="mt-2 text-gray-700">
            The program welcomed its first cohort of 200 students across five universities in Thailand, offering courses in Artificial
            Intelligence, Robotics, and Digital Innovation.
          </p>
        </div>
      </div>
    </div>
    
   
    <div className="relative mb-12">
      <div className="flex items-start">
        <div className="absolute left-6 transform -translate-x-1/2 mt-1.5">
          <div className="w-6 h-6 bg-blue-400 rounded-full"></div>
        </div>
        <div className="ml-16">
          <h3 className="text-lg font-semibold text-blue-800">2022: Industry Partnerships</h3>
          <p className="text-gray-500 text-sm">March 2022</p>
          <p className="mt-2 text-gray-700">
            The program established partnerships with over 50 leading companies in Thailand's technology sector, creating internship
            opportunities and collaborative research projects for students.
          </p>
        </div>
      </div>
    </div>
    
    
    <div className="relative mb-12">
      <div className="flex items-start">
        <div className="absolute left-6 transform -translate-x-1/2 mt-1.5">
          <div className="w-6 h-6 bg-blue-400 rounded-full"></div>
        </div>
        <div className="ml-16">
          <h3 className="text-lg font-semibold text-blue-800">2023: Program Expansion</h3>
          <p className="text-gray-500 text-sm">September 2023</p>
          <p className="mt-2 text-gray-700">
            The program expanded to include 10 universities nationwide and introduced new courses in Biotechnology, Smart
            Electronics, and Advanced Agriculture to support all S-Curve industries.
          </p>
        </div>
      </div>
    </div>
  </div>
</div> */}
    </div>
  );
}


