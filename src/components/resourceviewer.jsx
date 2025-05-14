'use client'

import React from "react";
import { ArrowLeft, PlayCircle, FileText } from "lucide-react";

// ResourceViewer Component - แสดงรายละเอียดทรัพยากรเมื่อคลิก
const ResourceViewer = ({ resource, onBack }) => {
    console.log({resource})
  if (!resource) return null;
  
  const isPDF = resource.url?.toLowerCase().endsWith('.pdf') || resource.type === 'Document';
  const isVideo = resource.type === 'Video' || resource.url?.toLowerCase().endsWith('.mp4');
  const formatResourceUrl = (url) => {
    if (!url) return '';
    
    // จัดการกับรูปแบบ URL ที่มี localhost:3001 ด้านหน้า
    if (url.includes('localhost:3001/')) {
      // ใช้ regex เพื่อตัดส่วนระหว่าง 3001/ จนถึง video/
      return url.replace(/localhost:3001\/.*?(?=video\/)/i, 'localhost:3001/');
    }
    
    // ใช้ Regular Expression เพื่อจับรูปแบบต่างๆ ของพาธในเครื่อง
    // จับทั้งรูปแบบ /D:/ และ /C:/ หรือไดร์ฟอื่นๆ
    const drivePathRegex = /\/[A-Z]:(\/|\\).+(\\|\/)new-growth-api(\\|\/)/i;
    
    if (drivePathRegex.test(url)) {
      // ตัดส่วนของพาธในเครื่องจนถึง new-growth-api ออก และเปลี่ยนเป็น /
      return url.replace(drivePathRegex, '/');
    }
    
    // รองรับรูปแบบเฉพาะเจาะจงเพิ่มเติม
    if (url.includes('/D:/Project_Profile/growth/new-growth-api/')) {
      return url.replace('/D:/Project_Profile/growth/new-growth-api/', '/');
    }
    
    if (url.includes('/C:/Work/Project_Payung/API/new-growth-api/')) {
      return url.replace('/C:/Work/Project_Payung/API/new-growth-api/', '/');
    }
    
    return url;
  };
  
  const formattedUrl = formatResourceUrl(resource.url);
  console.log(formattedUrl)
  return (
    <div className="w-full max-w-7xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex items-center">
        <button 
          onClick={onBack}
          className="mr-4 text-blue-600 hover:text-blue-800 flex items-center"
        >
          <ArrowLeft size={20} className="mr-1" />
          <span>ย้อนกลับ</span>
        </button>
        <h2 className="text-xl font-semibold flex-1">{resource.title || "ทรัพยากร"}</h2>
        
      </div>
      
      <div className="p-4">
        {isVideo ? (
          <div className="space-y-4">
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
                
              <video 
                controls 
                className="w-full h-full"
                // poster="/api/placeholder/640/360"
              >
                Your browser does not support video playback.
                <source
                          src={formattedUrl}
                          type="video/mp4"
                        />
              </video>
              
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-bold">{resource.title}</h3>
              {resource.date && (
                <p className="text-sm text-gray-600">
                  เผยแพร่เมื่อ: {resource.date}
                </p>
              )}
              {resource.duration && (
                <p className="text-sm text-gray-600">
                  ความยาว: {resource.duration}
                </p>
              )}
              {resource.description && (
                <div className="mt-4">
                  <h4 className="text-md font-semibold mb-1">รายละเอียด</h4>
                  <p className="text-gray-700">{resource.description}</p>
                </div>
              )}
            </div>
          </div>
        ) : isPDF ? (
          <div className="h-screen max-h-[70vh]">
            <iframe 
              src={resource.url} 
              className="w-full h-full border-0 rounded-lg" 
              title={resource.title || "PDF Document"}
            />
          </div>
        ) : (
          <div className="text-center py-8">
            <p>ไม่สามารถแสดงผลประเภทไฟล์นี้ได้ภายในหน้าเว็บ</p>
            <a 
              href={resource.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              เปิดในแท็บใหม่
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceViewer;