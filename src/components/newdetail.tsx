'use client'

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Eye, Tag as TagIcon, Play, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Newandeventdetail({ params }: { params: string }) {
    console.log('params', params);
  const router = useRouter();
  const [newsData, setNewsData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<any>(null);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/news/${params}`);
        console.log('response', response);
        if (!response.ok) {
          throw new Error('Failed to fetch news details');
        }
        const data = await response.json();
        console.log('data', data);
        setNewsData(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    if (params) {
      fetchNewsDetail();
    }
  }, [params]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('th-TH', options);
  };

  const handleGoBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6 bg-red-50 rounded-lg">
          <h2 className="text-xl font-bold text-red-600 mb-2">เกิดข้อผิดพลาด</h2>
          <p className="text-gray-700">{error}</p>
          <button 
            onClick={handleGoBack}
            className="mt-4 flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition cursor-pointer"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            กลับไปหน้าข่าว
          </button>
        </div>
      </div>
    );
  }

  if (!newsData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6 bg-yellow-50 rounded-lg">
          <h2 className="text-xl font-bold text-yellow-600 mb-2">ไม่พบข้อมูลข่าว</h2>
          <button 
            onClick={handleGoBack}
            className="mt-4 flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition cursor-pointer"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            กลับไปหน้าข่าว
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header with back button */}
      <div className="mb-6">
        <button 
          onClick={handleGoBack}
          className="flex items-center text-blue-600 hover:text-blue-800 transition cursor-pointer"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          <span className="font-medium">กลับไปหน้าข่าว</span>
        </button>
      </div>

      {/* News Content */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Featured Image */}
        <div className="relative w-full">
          {newsData.image ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_IMG}/${newsData.image.image_path}`}
              alt={newsData.title}
              className="object-cover"
              width={1200}
              height={600}
              layout="responsive"
              priority
            />
          ) : newsData.images && newsData.images.length > 0 ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_IMG}/${newsData.images[0].image_path}`}
              alt={newsData.title || newsData.images[0].description || 'Featured Image'}
              className="object-cover"
              width={1200}
              height={600}
              layout="responsive"
              priority
            />
          ) : (
            <div className="w-full h-[400px] bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">ไม่มีรูปภาพ</span>
            </div>
          )}
        </div>

        {/* Content Container */}
        <div className="p-6">
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{newsData.title}</h1>
          
          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-6 mb-6 text-gray-500">
            {/* Date */}
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{formatDate(newsData.published_date)}</span>
            </div>
            
            {/* View Count */}
            <div className="flex items-center">
              <Eye className="h-4 w-4 mr-2" />
              <span>{newsData.view_count} ครั้ง</span>
            </div>
            
            {/* Tags */}
            {newsData.tagAssignments && newsData.tagAssignments.length > 0 && (
              <div className="flex items-center flex-wrap gap-2">
                <TagIcon className="h-4 w-4 mr-1" />
                {newsData.tagAssignments.map((tagAssignment) => (
                  <span 
                    key={tagAssignment.id}
                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                  >
                    {tagAssignment.tag.name}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          {/* Short Description */}
          <div className="mb-6">
            <p className="text-lg font-medium text-gray-700 italic">
              {newsData.short_description}
            </p>
          </div>
          
          {/* Main Content */}
          <div className="prose max-w-none">
            {/* ในกรณีที่ content อาจเป็น HTML สามารถใช้ dangerouslySetInnerHTML */}
            <div className='ql-editor' dangerouslySetInnerHTML={{ __html: newsData.content }} />
          </div>

          {/* Video Resources Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">วิดีโอที่เกี่ยวข้อง</h2>
            {newsData.resources && newsData.resources.filter(r => r.type === 'video').length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {newsData.resources.map((resource) => (
                  resource.type === 'video' && resource.files && resource.files.length > 0 && (
                    <div 
                      key={resource.id} 
                      className="bg-gray-50 p-4 rounded-lg cursor-pointer hover:bg-gray-100 transition"
                      onClick={() => setSelectedVideo(resource)}
                    >
                      <div className="relative aspect-video mb-3">
                        <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
                          <Play className="w-12 h-12 text-white" />
                        </div>
                        <video
                          className="w-full h-full object-cover rounded-lg"
                          preload="metadata"
                          muted
                          playsInline
                        >
                          <source
                            src={`${process.env.NEXT_PUBLIC_IMG}/${resource.files[0].file_path}`}
                            type="video/mp4"
                          />
                        </video>
                      </div>
                      {resource.description && (
                         <p className="text-gray-600 text-sm">วันที่เพิ่ม: {formatDate(resource.published_date)}</p>
                      )}
                      <h3 className="text-lg mb-2 line-clamp-2 text-gray-600">{resource.description}</h3>
                     

                    </div>
                  )
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-500">ไม่มีวิดีโอที่เกี่ยวข้อง</p>
              </div>
            )}
          </div>

          {/* Image Gallery Section */}
          {newsData.images && newsData.images.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">รูปภาพที่เกี่ยวข้อง</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {newsData.images.map((image) => (
                  <div 
                    key={image.id} 
                    className="bg-gray-50 p-4 rounded-lg cursor-pointer hover:bg-gray-100 transition"
                    onClick={() => setSelectedImage(image)}
                  >
                    <div className="relative aspect-square mb-3">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMG}/${image.image_path}`}
                        alt={image.description || 'Related Image'}
                        className="rounded-lg object-cover"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    {image.created_at && (
                      <p className="text-gray-600 text-sm">วันที่เพิ่ม: {formatDate(image.created_at)}</p>
                    )}
                    <h3 className="text-lg mb-2 line-clamp-2 text-gray-600">{image.description || 'ไม่มีคำอธิบาย'}</h3>
                    
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Video Modal */}
          {selectedVideo && (
            <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg w-full max-w-4xl">
                <div className="p-4 border-b flex justify-between items-center">
                  <h3 className="text-xl font-semibold">{selectedVideo.title}</h3>
                  <button 
                    onClick={() => setSelectedVideo(null)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="p-4">
                  <video 
                    className="w-full h-full object-cover"
                    controls
                    preload="metadata"
                    playsInline
                  >
                    <source
                      src={`${process.env.NEXT_PUBLIC_IMG}/${selectedVideo.files[0].file_path}`}
                      type="video/mp4"
                    />
                    ขอโทษค่ะ เบราว์เซอร์ของคุณไม่รองรับแท็กวิดีโอ
                  </video>
                  {selectedVideo.description && (
                    <p className="mt-4 text-gray-600">{selectedVideo.description}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Image Modal */}
          {selectedImage && (
            <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg w-full max-w-4xl">
                <div className="p-4 border-b flex justify-between items-center">
                  <h3 className="text-xl font-semibold">{selectedImage.description || 'ไม่มีคำอธิบาย'}</h3>
                  <button 
                    onClick={() => setSelectedImage(null)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="p-4">
                  <div className="relative aspect-video w-full">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMG}/${selectedImage.image_path}`}
                      alt={selectedImage.description || 'Related Image'}
                      className="rounded-lg object-contain"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  {selectedImage.description && (
                    <p className="mt-4 text-gray-600">{selectedImage.description}</p>
                  )}
                  {selectedImage.created_at && (
                    <p className="mt-2 text-gray-600 text-sm">วันที่เพิ่ม: {formatDate(selectedImage.created_at)}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

