"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import ResourceViewer from "../../components/resourceviewer";

// Types
interface FileData {
  file_path: string;
  file_type: string;
  is_downloadable: boolean;
}

interface ResourceData {
  id: string;
  title: string;
  description: string;
  type: string;
  duration?: number;
  pages?: number;
  author?: string;
  published_date: string;
  files?: FileData[];
}

interface ProcessedResource {
  id: string;
  title: string;
  description: string;
  type: string;
  duration: string | null;
  pages?: number;
  author: string;
  date: string;
  icon: "video" | "document";
  url: string;
  isDownloadable: boolean;
  fileType: string | null;
}

interface Pagination {
  total: number;
  offset: number;
  limit: number;
}

type ResourceType = "Video" | "Document";

export default function ResourcesPage() {
  // State management
  const [resources, setResources] = useState<ResourceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showType, setShowType] = useState<ResourceType>("Video");
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [selectedResource, setSelectedResource] = useState<ProcessedResource | null>(null);

  // Pagination state
  const [paginationVideo, setPaginationVideo] = useState<Pagination>({
    total: 0,
    offset: 0,
    limit: 10,
  });
  
  const [paginationDocument, setPaginationDocument] = useState<Pagination>({
    total: 0,
    offset: 0,
    limit: 10,
  });

  // Get current pagination based on selected type
  const currentPagination = useMemo(() => 
    showType === "Video" ? paginationVideo : paginationDocument,
    [showType, paginationVideo, paginationDocument]
  );

  const setPagination = useCallback((updateFn: (prev: Pagination) => Pagination) => {
    if (showType === "Video") {
      setPaginationVideo(updateFn);
    } else {
      setPaginationDocument(updateFn);
    }
  }, [showType]);

  // Fetch resources from API
  const fetchResources = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/document/getallDocumentAndResouceVideo?offset=${currentPagination.offset}&limit=${currentPagination.limit}&type=${showType}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Update pagination
      setPagination(prev => ({
        ...prev,
        total: data.pagination?.total || 0,
      }));
      
      setResources(data.data || []);
    } catch (error) {
      console.error("Error fetching resources:", error);
      setError("ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่อีกครั้ง");
      setResources([]);
    } finally {
      setLoading(false);
    }
  }, [showType, currentPagination.offset, currentPagination.limit, setPagination]);

  // Effects
  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  // Reset pagination when changing resource type
  useEffect(() => {
    setPagination(prev => ({ ...prev, offset: 0 }));
  }, [showType, setPagination]);

  // Process resources for display
  const processedResources = useMemo(() => {
    return resources.map((item): ProcessedResource => {
      const icon = item.type.toLowerCase().includes("video") ? "video" : "document";
      const file = item.files?.[0] || null;
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
        type: file?.file_type || item.type,
        duration: item.duration ? `${item.duration} นาที` : null,
        pages: item.pages,
        author: item.author || "ไม่ระบุผู้เขียน",
        date,
        icon,
        url: fileUrl,
        isDownloadable: file?.is_downloadable || false,
        fileType: file?.file_type || null,
      };
    });
  }, [resources]);

  // Filter resources based on search query
  const filteredResources = useMemo(() => {
    if (!searchQuery.trim()) return processedResources;
    
    const query = searchQuery.toLowerCase();
    return processedResources.filter((resource) =>
      resource.title.toLowerCase().includes(query) ||
      resource.description.toLowerCase().includes(query) ||
      resource.author.toLowerCase().includes(query)
    );
  }, [processedResources, searchQuery]);

  // Download functionality
  const handleDownload = useCallback(async (url: string, fileName: string) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`ดาวน์โหลดล้มเหลว: ${response.status}`);
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);

      return { success: true };
    } catch (error) {
      console.error("ดาวน์โหลดล้มเหลว:", error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }, []);

  const downloadResource = useCallback(async (resource: ProcessedResource) => {
    setDownloadingId(resource.id);

    try {
      const downloadUrl = resource.icon === "video"
        ? `${process.env.NEXT_PUBLIC_API}/video/downloadVideo/${resource.id}`
        : `${process.env.NEXT_PUBLIC_API}/document/downloadDocument/${resource.id}`;

      const fileName = `${resource.title}.${resource.fileType || (resource.icon === "video" ? "mp4" : "pdf")}`;
      const result = await handleDownload(downloadUrl, fileName);

      if (!result.success) {
        setError("ไม่สามารถดาวน์โหลดไฟล์ได้");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการดาวน์โหลด:", error);
      setError("เกิดข้อผิดพลาดในการดาวน์โหลด");
    } finally {
      setDownloadingId(null);
    }
  }, [handleDownload]);

  // Pagination handlers
  const handleNextPage = useCallback(() => {
    if (currentPagination.offset + currentPagination.limit < currentPagination.total) {
      setPagination(prev => ({
        ...prev,
        offset: prev.offset + prev.limit,
      }));
    }
  }, [currentPagination, setPagination]);

  const handlePrevPage = useCallback(() => {
    if (currentPagination.offset > 0) {
      setPagination(prev => ({
        ...prev,
        offset: Math.max(0, prev.offset - prev.limit),
      }));
    }
  }, [currentPagination, setPagination]);

  // Render functions
  const renderIcon = (iconType: "video" | "document") => {
    return iconType === "video" 
      ? <span className="text-blue-500 text-2xl">🎬</span>
      : <span className="text-blue-500 text-2xl">📄</span>;
  };

  const renderActionButton = (resource: ProcessedResource) => {
    const videoFormats = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv', 'webm', 'm4v', 'mpeg', 'mpg', '3gp'];
    const isViewable = videoFormats.includes(resource.fileType?.toLowerCase() || '') || 
                       resource.fileType?.toLowerCase() === 'pdf';

    if (!isViewable || !resource.url) return null;

    return (
      <button
        onClick={() => setSelectedResource(resource)}
        className="bg-blue-500 text-white rounded-lg px-4 py-2 flex items-center hover:bg-blue-600 transition-colors duration-200 shadow-sm"
        aria-label={`ดู${resource.icon === "video" ? "วิดีโอ" : "เอกสาร"}: ${resource.title}`}
      >
        <span className="mr-2 text-lg">
          {resource.icon === "video" ? "▶️" : "📄"}
        </span>
        <span className="font-medium">
          {resource.icon === "video" ? "ดูวิดีโอ" : "ดูเอกสาร"}
        </span>
      </button>
    );
  };

  const renderResourceCard = (resource: ProcessedResource) => (
    <div key={resource.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 p-6 border border-gray-100">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
        <div className="flex items-start space-x-4 flex-1">
          <div className="flex-shrink-0 mt-1">
            {renderIcon(resource.icon)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-[#0A2463] text-lg mb-2 line-clamp-2">
              {resource.title}
            </h3>
            <p className="text-[#4B5563] text-sm mb-3 line-clamp-3">
              {resource.description}
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#6B7280]">
              <div className="flex items-center">
                <span className="font-semibold mr-1">ประเภท:</span>
                <span className="bg-gray-100 px-2 py-1 rounded">{resource.type}</span>
              </div>
              {resource.pages && (
                <div>
                  <span className="font-semibold">หน้า:</span> {resource.pages}
                </div>
              )}
              <div>
                <span className="font-semibold">วันที่:</span> {resource.date}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-3 flex-shrink-0">
          {renderActionButton(resource)}
          {resource.isDownloadable && resource.url && (
            <button
              onClick={() => downloadResource(resource)}
              disabled={downloadingId === resource.id}
              className={`flex items-center justify-center px-4 py-2 rounded-lg border transition-colors duration-200 ${
                downloadingId === resource.id
                  ? "opacity-50 cursor-not-allowed bg-gray-100"
                  : "hover:bg-gray-50 hover:border-blue-300 bg-white border-gray-300"
              }`}
              aria-label={`ดาวน์โหลด: ${resource.title}`}
            >
              <span className="mr-2 text-lg">
                {downloadingId === resource.id ? "⏳" : "⬇️"}
              </span>
              <span className="text-[#374151] font-medium">
                {downloadingId === resource.id ? "กำลังดาวน์โหลด..." : "ดาวน์โหลด"}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );

  // Handle resource viewer
  if (selectedResource) {
    return (
      <ResourceViewer 
        resource={selectedResource} 
        onBack={() => setSelectedResource(null)} 
      />
    );
  }

  const canGoPrev = currentPagination.offset > 0;
  const canGoNext = currentPagination.offset + currentPagination.limit < currentPagination.total;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#0A2463] to-[#1e3a8a] text-white py-12 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            แหล่งข้อมูลการเรียนรู้แบบออนไลน์
          </h1>
          <p className="text-lg lg:text-xl max-w-3xl opacity-90">
            เข้าถึงวิดีโอการฝึกอบรม เอกสารประกอบ แบบฝึกหัด และสื่อการเรียนรู้เพื่อสนับสนุนการศึกษาของคุณ
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white shadow-sm ">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="w-full lg:max-w-md">
              <input
                type="text"
                placeholder="ค้นหาข้อมูล..."
                className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {(["Video", "Document"] as ResourceType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setShowType(type)}
                  className={`flex items-center px-6 py-3 rounded-lg border transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    showType === type
                      ? "bg-blue-500 text-white border-blue-500 shadow-md"
                      : "bg-white text-blue-500 border-blue-500 hover:bg-blue-50"
                  }`}
                >
                  <span className="mr-2 text-lg">{type === "Video" ? "🎬" : "📄"}</span>
                  {type === "Video" ? "วิดีโอ" : "เอกสาร"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#0A2463]">
            {showType === "Video" ? "วิดีโอทั้งหมด" : "เอกสารทั้งหมด"}
          </h2>
          {!loading && (
            <p className="text-sm text-gray-600">
              พบ {currentPagination.total} รายการ
            </p>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            <div className="flex items-center">
              <span className="text-red-500 mr-2">⚠️</span>
              <span>{error}</span>
              <button 
                onClick={() => setError(null)}
                className="ml-auto text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-600">กำลังโหลดข้อมูล...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Resources List */}
            {filteredResources.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4 opacity-50">🔍</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">ไม่พบข้อมูลที่ค้นหา</h3>
                <p className="text-gray-500">ลองเปลี่ยนคำค้นหาหรือเลือกประเภทข้อมูลอื่น</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredResources.map(renderResourceCard)}
              </div>
            )}

            {/* Pagination */}
            {filteredResources.length > 0 && (
              <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-4 bg-white p-4 rounded-lg shadow-sm">
                <div className="text-sm text-gray-600">
                  แสดง {currentPagination.offset + 1}-
                  {Math.min(currentPagination.offset + filteredResources.length, currentPagination.total)} 
                  จากทั้งหมด {currentPagination.total} รายการ
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handlePrevPage}
                    disabled={!canGoPrev}
                    className={`px-4 py-2 border rounded-lg font-medium transition-colors duration-200 ${
                      canGoPrev
                        ? "bg-white text-blue-500 border-blue-500 hover:bg-blue-50"
                        : "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed"
                    }`}
                  >
                    ← ก่อนหน้า
                  </button>
                  <button
                    onClick={handleNextPage}
                    disabled={!canGoNext}
                    className={`px-4 py-2 border rounded-lg font-medium transition-colors duration-200 ${
                      canGoNext
                        ? "bg-white text-blue-500 border-blue-500 hover:bg-blue-50"
                        : "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed"
                    }`}
                  >
                    ถัดไป →
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}