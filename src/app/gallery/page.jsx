'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, ChevronRight, ChevronLeft, Play } from 'lucide-react';

export default function AllPhotos() {
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [pagination, setPagination] = useState({ images: { total: 0, offset: 0, limit: 12 }, videos: { total: 0, offset: 0, limit: 12 } });
  const imagesPerPage = 12;
  
  // Fetch vibe images from API with pagination
  useEffect(() => {
    const fetchGalleryMedia = async () => {
      try {
        setLoading(true);
        const offset = (currentPage - 1) * imagesPerPage;
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API}/image/getAllImage/vibe?offset=${offset}&limit=${imagesPerPage}`
        );
        const data = await response.json();
        console.log(data);

        // Extract only the image paths from vibe-type images and detect media type
        const vibeMedia = data.images
          .map(image => ({
            path: image.image_path,
            type: getMediaType(image.image_path)
          }));
          
        setImages(vibeMedia);
        setVideos(data.videos || []);
        setPagination(data.pagination || { images: { total: 0, offset: 0, limit: imagesPerPage }, videos: { total: 0, offset: 0, limit: imagesPerPage } });
      } catch (error) {
        console.error('Error fetching gallery media:', error);
        setImages([]);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchGalleryMedia();
  }, [currentPage]); // Re-fetch when page changes

  // Determine if media is image or video based on file extension
  const getMediaType = (path) => {
    const extension = path.split('.').pop().toLowerCase();
    const videoExtensions = ['mp4', 'webm', 'mov', 'avi'];
    return videoExtensions.includes(extension) ? 'video' : 'image';
  };
  
  // Calculate total pages based on total images from API
  const totalPages = Math.ceil((pagination.images.total + pagination.videos.total) / imagesPerPage);
  
  // Pagination controls
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  
  // Handle media click
  const handleMediaClick = (media) => {
    setSelectedMedia(media);
    setShowModal(true);
    console.log(media);
    
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };
  
  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedMedia(null);
    // Re-enable body scrolling
    document.body.style.overflow = 'auto';
  };

  // Handle keyboard events for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showModal) {
        if (e.key === 'Escape') {
          closeModal();
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showModal]);

  // รวม images และ videos สำหรับแสดงผลใน grid เดียว
  const galleryMedia = [
    ...images.map(image => ({
      id: image.id,
      type: 'image',
      path: image.path,
      description: image.path,
    })),
    ...videos.map(video => ({
      id: video.id,
      type: 'video',
      title: video.title,
      description: video.description,
      // สมมติ video มีไฟล์หลักใน video.files[0]?.path หรือถ้าไม่มีให้ใช้ placeholder
      path: video.files && video.files.length > 0 ? video.files[0].file_path : '',
    })),
  ];

  function getVideoType(path) {
    const ext = path.split('.').pop().toLowerCase();
    if (["mp4", "webm", "ogg", "mov", "avi"].includes(ext)) return ext;
    return "mp4";
  }

  return (
    <div className="mx-auto py-8 px-4 md:px-14 xl:px-20 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-900">ภาพบรรยากาศทั้งหมด</h1>
        <button 
          onClick={() => router.back()}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md transition-colors duration-300 flex items-center cursor-pointer">
          <span className="mr-1">←</span> ย้อนกลับ
        </button>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {galleryMedia.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              ไม่พบรูปภาพหรือวิดีโอ
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                {galleryMedia.map((media, index) => (
                  <div 
                    key={media.type + '-' + media.id} 
                    className="rounded-lg overflow-hidden shadow-md cursor-pointer transform hover:scale-105 transition-transform duration-300"
                    onClick={() => handleMediaClick(media)}
                  >
                    <div className="relative pt-[75%]">
                      {media.type === 'image' ? (
                        <img 
                          src={`${process.env.NEXT_PUBLIC_IMG}${media.path.startsWith("/") ? "" : "/"}${media.path}`}
                          alt={media.description || `Program atmosphere ${(currentPage - 1) * imagesPerPage + index + 1}`}
                          className="absolute top-0 left-0 w-full h-full object-cover"
                        />
                      ) : (
                        <>
                          <video
                            className="absolute top-0 left-0 w-full h-full object-cover"
                            muted
                          >
                            <source src={`${process.env.NEXT_PUBLIC_IMG}/${media.path}`} type={`video/${getVideoType(media.path)}`} />
                            Your browser does not support the video tag.
                          </video>
                          <div className="absolute inset-0 flex items-center justify-center bg-[#00000080] pointer-events-none">
                            <Play className="text-white" size={48} />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Pagination controls */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 mb-8">
                  <button 
                    onClick={prevPage} 
                    disabled={currentPage === 1}
                    className={`p-2 rounded-md ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-100'}`}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  
                  {/* Page numbers */}
                  <div className="flex space-x-1">
                    {[...Array(totalPages)].map((_, i) => {
                      const pageNum = i + 1;
                      // Show current page, first page, last page, and one before and after current page
                      if (
                        pageNum === 1 || 
                        pageNum === totalPages || 
                        (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={i}
                            onClick={() => paginate(pageNum)}
                            className={`w-8 h-8 flex items-center justify-center rounded-md ${
                              currentPage === pageNum
                                ? 'bg-blue-500 text-white'
                                : 'hover:bg-blue-100 text-blue-600'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      }
                      
                      // Show ellipsis for skipped pages
                      if (
                        (pageNum === 2 && currentPage > 3) || 
                        (pageNum === totalPages - 1 && currentPage < totalPages - 2)
                      ) {
                        return <span key={i} className="w-8 h-8 flex items-center justify-center">...</span>;
                      }
                      
                      return null;
                    })}
                  </div>
                  
                  <button 
                    onClick={nextPage} 
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-md ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-100'}`}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
      
      {/* Media Modal */}
      {showModal && selectedMedia && (
        <div className="fixed inset-0 bg-[#00000080] z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div className="relative w-full max-w-4xl max-h-[90vh]" onClick={e => e.stopPropagation()}>
            <button 
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors bg-red-500 rounded-full p-2"
            >
              <X size={24} />
            </button>
            
            {selectedMedia.type === 'video' ? (
              <video 
                className="w-full h-auto max-h-[80vh] rounded-lg" 
                controls 
                autoPlay
              >
                <source src={`${process.env.NEXT_PUBLIC_IMG}/${selectedMedia.path}`} type="video/mp4" />
              </video>
            ) : (
              <img 
                src={`${process.env.NEXT_PUBLIC_IMG}/${selectedMedia.path}`} 
                alt="Selected media"
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg" 
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}