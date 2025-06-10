"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import ResourceViewer from "../../components/resourceviewer";

export default function ResourcesPage() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showType, setShowType] = useState("Video");
  
  const paginationRef = useRef({
    video: {
      total: 0,
      offset: 0,
      limit: 10,
    },
    document: {
      total: 0,
      offset: 0,
      limit: 10,
    }
  });

  const [paginationVideo, setPaginationVideo] = useState({
    total: 0,
    offset: 0,
    limit: 10,
  });
  const [paginationDocument, setPaginationDocument] = useState({
    total: 0,
    offset: 0,
    limit: 10,
  });

  const [selectedResource, setSelectedResource] = useState(null);

  const fetchResources = useCallback(async () => {
    try {
      setLoading(true);
      const currentPagination = showType === "Video" 
        ? paginationVideo 
        : paginationDocument;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/document/getallDocumentAndResouceVideo?offset=${currentPagination.offset}&limit=${currentPagination.limit}&type=${showType}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setResources(data.data);

      if (showType === "Video") {
        setPaginationVideo(prev => ({
          ...prev,
          total: data.pagination.total,
        }));
      } else {
        setPaginationDocument(prev => ({
          ...prev,
          total: data.pagination.total,
        }));
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching resources:", error);
      setError("Failed to load resources. Please try again later.");
      setLoading(false);
    }
  }, [showType, paginationVideo, paginationDocument]);

  useEffect(() => {
    const timeoutId = setTimeout(fetchResources, 300);
    return () => clearTimeout(timeoutId);
  }, [fetchResources]);

  const processedResources = resources.map((item) => {
    const icon = item.type.toLowerCase().includes("video")
      ? "video"
      : "document";

    const file = item.files && item.files.length > 0 ? item.files[0] : null;
    const fileUrl = file
      ? `${process.env.NEXT_PUBLIC_IMG}/${file.file_path.replace(/\\/g, "/")}`
      : "";

    const date = new Date(item.published_date).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return {
      id: item.id,
      title: item.title,
      description: item.description,
      type: file ? file.file_type : item.type,
      duration: item.duration ? `${item.duration} minutes` : null,
      pages: item.pages,
      author: item.author || "Unknown",
      date: date,
      icon: icon,
      url: fileUrl,
      isDownloadable: file ? file.is_downloadable : false,
      fileType: file ? file.file_type : null,
    };
  });

  const filteredResources = processedResources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const renderIcon = (iconType) => {
    switch (iconType) {
      case "video":
        return <span className="text-blue-500">🎬</span>;
      case "document":
      default:
        return <span className="text-blue-500">📄</span>;
    }
  };

  const [downloadingId, setDownloadingId] = useState(null);
  const handleDownload = async (url: string, defaultFileName: string) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`ดาวน์โหลดล้มเหลว: ${response.status}`);
      }

      const blob = await response.blob();

      const contentType = response.headers.get("content-type");
      let fileName = defaultFileName;

      if (!fileName) {
        const urlParts = url.split("/");
        const urlFileName = urlParts[urlParts.length - 1].split("?")[0];

        if (urlFileName && urlFileName.includes(".")) {
          fileName = urlFileName;
        } else {
          if (contentType) {
            if (contentType.includes("video")) {
              fileName = "video.mp4";
            } else if (contentType.includes("pdf")) {
              fileName = "document.pdf";
            } else if (contentType.includes("image")) {
              fileName = "image.jpg";
            } else if (contentType.includes("audio")) {
              fileName = "audio.mp3";
            } else {
              fileName = "downloaded_file";
            }
          } else {
            fileName = "downloaded_file";
          }
        }
      }

      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);

      return { success: true, fileName, contentType };
    } catch (error) {
      console.error("ดาวน์โหลดล้มเหลว:", error);
      return { success: false, error: error.message };
    }
  };

  const downloadResource = async (resource) => {
    setDownloadingId(resource.id);

    try {
      const downloadUrl =
        resource.type === "Video"
          ? `${process.env.NEXT_PUBLIC_API}/video/downloadVideo/${resource.id}`
          : `${process.env.NEXT_PUBLIC_API}/document/downloadDocument/${resource.id}`;

      const result = await handleDownload(
        downloadUrl,
        `${resource.title}.${resource.fileType || (resource.type === "Video" ? "mp4" : "pdf")}`
      );

      if (result.success) {
        console.log(`ดาวน์โหลด ${resource.title} สำเร็จ`);
      }
    } catch (error) {
      console.error(`เกิดข้อผิดพลาดในการดาวน์โหลด: ${error.message}`);
    } finally {
      setDownloadingId(null);
    }
  };

  const renderActionButton = (resource: any) => {
    const handleClick = () => {
      setSelectedResource(resource);
    };

    // Check if the file type is a video format or PDF
    const videoFormats = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv', 'webm', 'm4v', 'mpeg', 'mpg', '3gp'];
    const isViewable = videoFormats.includes(resource.fileType?.toLowerCase()) || resource.fileType?.toLowerCase() === 'pdf';

    if (!isViewable) {
      return null;
    }

    return (
      <button
        onClick={handleClick}
        className="bg-blue-500 text-white rounded-md px-4 py-2 flex items-center hover:bg-blue-600 transition-colors cursor-pointer"
      >
        <span className="mr-2">
          {resource.icon === "video" ? "▶️" : "📄"}
        </span>
        <span>
          {resource.icon === "video" ? "ดูวิดีโอ" : "ดูเอกสาร"}
        </span>
      </button>
    );
  };

  const handleCloseViewer = () => {
    setSelectedResource(null);
  };

  if (selectedResource) {
    return (
      <ResourceViewer resource={selectedResource} onBack={handleCloseViewer} />
    );
  }

  const handleNextPage = () => {
    if (showType === "Video") {
      if (paginationVideo.offset + paginationVideo.limit < paginationVideo.total) {
        setPaginationVideo(prev => ({
          ...prev,
          offset: prev.offset + prev.limit,
        }));
      }
    } else {
      if (paginationDocument.offset + paginationDocument.limit < paginationDocument.total) {
        setPaginationDocument(prev => ({
          ...prev,
          offset: prev.offset + prev.limit,
        }));
      }
    }
  };

  const handlePrevPage = () => {
    if (showType === "Video") {
      if (paginationVideo.offset - paginationVideo.limit >= 0) {
        setPaginationVideo(prev => ({
          ...prev,
          offset: prev.offset - prev.limit,
        }));
      }
    } else {
      if (paginationDocument.offset - paginationDocument.limit >= 0) {
        setPaginationDocument(prev => ({
          ...prev,
          offset: prev.offset - prev.limit,
        }));
      }
    }
  };

  return (
    <div className="mx-auto">
      <div className="bg-[#0A2463] md:h-50 text-white py-10 px-10">
        <div className="text-3xl font-bold text-white">
          แหล่งข้อมูลการเรียนรู้แบบออนไลน์
        </div>
        <div className="text-wrap max-w-2xl text-base mt-5 text-white">
          เข้าถึงวิดีโอการฝึกอบรม เอกสารประกอบ แบบฝึกหัด
          และสื่อการเรียนรู้เพื่อสนับสนุนการศึกษาของคุณ
        </div>
      </div>

      <div className="w-full bg-white text-[black] py-8 px-10">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <input
            type="text"
            placeholder="ค้นหาข้อมูล..."
            className="w-full border border-gray-300 rounded-md py-2 px-4"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="flex gap-2 mb-2 md:mb-0">
            <button
              onClick={() => setShowType("Video")}
              className={`flex items-center px-4 py-2 rounded-md border transition-colors text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer
                ${
                  showType === "Video"
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-blue-500 border-blue-500 hover:bg-blue-50"
                }`}
            >
              <span className="mr-2">🎬</span>
              วิดีโอ
            </button>
            <button
              onClick={() => setShowType("Document")}
              className={`flex items-center px-4 py-2 rounded-md border transition-colors text-base font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer
                ${
                  showType === "Document"
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-blue-500 border-blue-500 hover:bg-blue-50"
                }`}
            >
              <span className="mr-2">📄</span>
              เอกสาร
            </button>
          </div>
        </div>
      </div>

      <div className="pt-6 pb-10 bg-[#F9FAFB] px-10">
        <h1 className="text-xl font-bold text-[#0A2463] mb-6">
          {showType === "Video" ? "วิดีโอทั้งหมด" : "เอกสารทั้งหมด"}
        </h1>

        {loading && (
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-600">กำลังโหลดข้อมูล...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {!loading && !error && (
          <>
            {filteredResources.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-600">ไม่พบข้อมูลที่ค้นหา</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredResources.map((resource) => (
                  <div
                    key={resource.id}
                    className="bg-white rounded-lg shadow-md p-6"
                  >
                    <div className="md:flex justify-between">
                      <div className="md:flex items-start space-x-4">
                        <div className="mt-1 text-lg text-center my-3 md:my-0">
                          {renderIcon(resource.icon)}
                        </div>
                        <div>
                          <h3 className="font-bold text-[#0A2463]">
                            {resource.title}
                          </h3>
                          <p className="text-[#4B5563] text-sm mt-1">
                            {resource.description}
                          </p>

                          <div className="flex flex-wrap gap-x-8 gap-y-2 mt-3 text-xs text-[#6B7280]">
                            <div>
                              <span className="font-semibold">ประเภท:</span>{" "}
                              {resource.type}
                            </div>
                            {resource.duration && (
                              <div>
                                <span className="font-semibold">ความยาว:</span>{" "}
                                {resource.duration}
                              </div>
                            )}
                            {resource.pages && (
                              <div>
                                <span className="font-semibold">หน้า:</span>{" "}
                                {resource.pages}
                              </div>
                            )}
                            <div>
                              <span className="font-semibold">วันที่:</span>{" "}
                              {resource.date}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-center justify-center space-y-3 mt-3 md:mt-0">
                        {resource.url && renderActionButton(resource)}
                        {resource.isDownloadable && resource.url && (
                          <button
                            onClick={() => downloadResource(resource)}
                            disabled={downloadingId === resource.id}
                            className={`flex items-center justify-center transition-colors text-sm cursor-pointer ${
                              downloadingId === resource.id
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:text-blue-500"
                            }`}
                          >
                            <span className="mr-2">
                              {downloadingId === resource.id ? "⏳" : "⬇️"}
                            </span>
                            <span className="text-[#374151]">
                              {downloadingId === resource.id
                                ? "กำลังดาวน์โหลด..."
                                : "ดาวน์โหลด"}
                            </span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col md:flex-row items-center justify-between mt-6 gap-4">
              <div className="text-sm text-gray-600">
                {showType === "Video" ? (
                  <>
                    แสดง {paginationVideo.offset + 1}-
                    {Math.min(
                      paginationVideo.offset + filteredResources.length,
                      paginationVideo.total
                    )}{" "}
                    จากทั้งหมด {paginationVideo.total} รายการ
                  </>
                ) : (
                  <>
                    แสดง {paginationDocument.offset + 1}-
                    {Math.min(
                      paginationDocument.offset + filteredResources.length,
                      paginationDocument.total
                    )}{" "}
                    จากทั้งหมด {paginationDocument.total} รายการ
                  </>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handlePrevPage}
                  disabled={
                    showType === "Video"
                      ? paginationVideo.offset === 0
                      : paginationDocument.offset === 0
                  }
                  className={`px-4 py-2 border rounded ${
                    (
                      showType === "Video"
                        ? paginationVideo.offset === 0
                        : paginationDocument.offset === 0
                    )
                      ? "bg-gray-100 text-gray-400"
                      : "bg-white text-blue-500 hover:bg-blue-50"
                  }`}
                >
                  ก่อนหน้า
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={
                    showType === "Video"
                      ? paginationVideo.offset + paginationVideo.limit >=
                        paginationVideo.total
                      : paginationDocument.offset + paginationDocument.limit >=
                        paginationDocument.total
                  }
                  className={`px-4 py-2 border rounded ${
                    (
                      showType === "Video"
                        ? paginationVideo.offset + paginationVideo.limit >=
                          paginationVideo.total
                        : paginationDocument.offset +
                            paginationDocument.limit >=
                          paginationDocument.total
                    )
                      ? "bg-gray-100 text-gray-400"
                      : "bg-white text-blue-500 hover:bg-blue-50"
                  }`}
                >
                  ถัดไป
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
