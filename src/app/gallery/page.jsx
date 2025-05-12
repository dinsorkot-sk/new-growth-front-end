// 'use client'
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// export default function AllPhotos() {
//   const router = useRouter();
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   // Fetch all vibe images from API
//   useEffect(() => {
//     const fetchAllVibeImages = async () => {
//       try {
//         setLoading(true);
//         // Use a larger limit to fetch all images
//         const response = await fetch(`${process.env.NEXT_PUBLIC_API}/image/getAllImage/vibe?offset=0&limit=100`);
//         const data = await response.json();
        
//         // Extract only the image paths from vibe-type images
//         const vibeImages = data.images
//           .filter(image => image.ref_type === 'vibe')
//           .map(image => image.image_path);
          
//         setImages(vibeImages);
//       } catch (error) {
//         console.error('Error fetching all vibe images:', error);
//         setImages([]); // Set empty array as fallback
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     fetchAllVibeImages();
//   }, []);

//   return (
//     <div className="mx-auto py-8 px-4 md:px-14 xl:px-20 bg-gray-50 min-h-screen">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-blue-900">ภาพบรรยากาศทั้งหมด</h1>
//         <button 
//           onClick={() => router.back()}
//           className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md transition-colors duration-300 flex items-center">
//           <span className="mr-1">←</span> ย้อนกลับ
//         </button>
//       </div>
      
//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//       ) : (
//         <>
//           {images.length === 0 ? (
//             <div className="text-center py-12 text-gray-500">
//               ไม่พบรูปภาพ
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
//               {images.map((image, index) => (
//                 <div key={index} className="rounded-lg overflow-hidden shadow-md">
//                   <div className="relative pt-[75%]">
//                     <img 
//                       src={`${process.env.NEXT_PUBLIC_IMG}/${image}`}
//                       alt={`Program atmosphere ${index + 1}`}
//                       className="absolute top-0 left-0 w-full h-full object-cover"
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// }

'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, ChevronRight, ChevronLeft, Play } from 'lucide-react';

export default function AllPhotos() {
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [totalImages, setTotalImages] = useState(0);
  const imagesPerPage = 12;
  
  // Fetch vibe images from API with pagination
  useEffect(() => {
    const fetchVibeImages = async () => {
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
          .filter(image => image.ref_type === 'vibe')
          .map(image => ({
            path: image.image_path,
            type: getMediaType(image.image_path)
          }));
          
        setImages(vibeMedia);
        setTotalImages(data.total);
      } catch (error) {
        console.error('Error fetching vibe images:', error);
        setImages([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchVibeImages();
  }, [currentPage]); // Re-fetch when page changes

  // Determine if media is image or video based on file extension
  const getMediaType = (path) => {
    const extension = path.split('.').pop().toLowerCase();
    const videoExtensions = ['mp4', 'webm', 'mov', 'avi'];
    return videoExtensions.includes(extension) ? 'video' : 'image';
  };
  
  // Calculate total pages based on total images from API
  const totalPages = Math.ceil(totalImages / imagesPerPage);
  
  // Pagination controls
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  
  // Handle media click
  const handleMediaClick = (media) => {
    setSelectedMedia(media);
    setShowModal(true);
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

  return (
    <div className="mx-auto py-8 px-4 md:px-14 xl:px-20 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-900">ภาพบรรยากาศทั้งหมด</h1>
        <button 
          onClick={() => router.back()}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md transition-colors duration-300 flex items-center">
          <span className="mr-1">←</span> ย้อนกลับ
        </button>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {images.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              ไม่พบรูปภาพ
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                {images.map((media, index) => (
                  <div 
                    key={index} 
                    className="rounded-lg overflow-hidden shadow-md cursor-pointer transform hover:scale-105 transition-transform duration-300"
                    onClick={() => handleMediaClick(media)}
                  >
                    <div className="relative pt-[75%]">
                      <img 
                        src={`${process.env.NEXT_PUBLIC_IMG}/${media.path}`}
                        alt={`Program atmosphere ${(currentPage - 1) * imagesPerPage + index + 1}`}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                      />
                      {media.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                          <Play className="text-white" size={48} />
                        </div>
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
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div className="relative w-full max-w-4xl max-h-[90vh]" onClick={e => e.stopPropagation()}>
            <button 
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X size={24} />
            </button>
            
            {selectedMedia.type === 'video' ? (
              <video 
                src={`${process.env.NEXT_PUBLIC_IMG}/${selectedMedia.path}`} 
                className="w-full h-auto max-h-[80vh] rounded-lg" 
                controls 
                autoPlay
              />
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