'use client'

import React, { useState, useEffect } from "react";
import { ArrowLeft, PlayCircle, FileText } from "lucide-react";

// ResourceViewer Component - แสดงรายละเอียดทรัพยากรเมื่อคลิก
const ResourceViewer = ({ resource, onBack }) => {
  const [documentData, setDocumentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocument = async () => {
      if (!resource || resource.icon === "video") return;
      
      try {
        setLoading(true);
        // เพิ่ม fallback URL และ timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API}/document/getDocumentById/${resource.id}`,
          { signal: controller.signal }
        );
        
        clearTimeout(timeoutId);
        
        if (!response.ok) throw new Error('Failed to fetch document');
        const data = await response.json();
        setDocumentData(data);
      } catch (err) {
        console.error('Error fetching document:', err);
        setError(err.name === 'AbortError' ? 'Connection timeout' : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, [resource]);

  if (!resource) return null;
  
  const isVideo = resource.icon === "video";
  const isPDF = resource.fileType === "pdf" || resource.url?.toLowerCase().endsWith('.pdf');
  const isImage = resource.fileType === "image" || 
    resource.url?.toLowerCase().match(/\.(jpg|jpeg|png|gif|webp)$/);
  const isDocument = !isVideo && !isPDF && !isImage;

  const formatResourceUrl = (url) => {
    if (!url) return '';
    
    // ถ้าเป็น URL ที่ขึ้นต้นด้วย http หรือ https ให้ใช้ตามนั้นเลย
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }

    // ถ้าเป็น URL ที่ขึ้นต้นด้วย / ให้ต่อกับ base URL
    if (url.startsWith('/')) {
      return `${process.env.NEXT_PUBLIC_IMG}${url}`;
    }

    // กรณีอื่นๆ ให้ต่อกับ base URL
    return `${process.env.NEXT_PUBLIC_IMG}/${url}`;
  };
  
  const formattedUrl = formatResourceUrl(resource.url);

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-auto">
      <div className="container mx-auto px-4 py-4 max-w-6xl">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <span className="mr-2">←</span>
            กลับ
          </button>
          <h2 className="text-xl font-semibold">{resource.title}</h2>
        </div>

        <div className="bg-white rounded-lg shadow-lg">
          {isVideo ? (
            <div className="space-y-4">
              <div className="aspect-w-16 aspect-h-9">
                <video
                  src={formattedUrl}
                  controls
                  className="w-full h-full rounded-lg"
                  title={resource.title}
                />
              </div>
              <div className="p-4 space-y-2">
                {resource.date && (
                  <p className="text-sm text-gray-600">
                    เผยแพร่เมื่อ: {resource.date}
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
          ) : loading ? (
            <div className="flex justify-center items-center h-[calc(100vh-200px)]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-500 mb-4">เกิดข้อผิดพลาดในการโหลดเอกสาร</p>
              <button
                onClick={() => window.open(formattedUrl, '_blank')}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                เปิดในแท็บใหม่
              </button>
            </div>
          ) : isPDF ? (
            <div className="h-[calc(100vh-200px)]">
              <iframe 
                src={`${process.env.NEXT_PUBLIC_IMG}/${documentData?.data?.files[0]?.file_path}`}
                className="w-full h-full border-0 rounded-lg" 
                title={resource.title || "PDF Document"}
              />
            </div>
          ) : isImage ? (
            <div className="max-w-4xl mx-auto">
              <img 
                src={formattedUrl} 
                alt={resource.title}
                className="w-full h-auto rounded-lg"
              />
              <div className="p-4 space-y-2">
                {resource.description && (
                  <p className="text-gray-700">{resource.description}</p>
                )}
              </div>
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="mb-4">ไม่สามารถแสดงผลประเภทไฟล์นี้ได้ภายในหน้าเว็บ</p>
              <div className="space-y-4">
                <a 
                  href={formattedUrl}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  เปิดในแท็บใหม่
                </a>
                <div>
                  <a 
                    href={`${process.env.NEXT_PUBLIC_API}/document/downloadDocument/${resource.id}`}
                    className="inline-block px-4 py-2 text-blue-600 hover:text-blue-800"
                  >
                    ดาวน์โหลดไฟล์
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceViewer;