'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { Search, ArrowRight, Calendar, X, Play } from 'lucide-react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';

interface TagAssignment {
  tag: {
    name: string;
  };
}

interface NewsItem {
  id: number;
  title: string;
  short_description?: string;
  published_date: string;
  image?: {
    image_path: string;
  };
  tagAssignments?: TagAssignment[];
  view_count: number;
}

interface Pagination {
  totalCount: number;
  currentPage: number;
  totalPages: number;
  prev: string | null;
  next: string | null;
}

interface VideoFile {
  id: number;
  file_path: string;
  file_type: string;
  is_downloadable: boolean;
}

interface Video {
  id: number;
  title: string;
  description: string;
  type: string;
  duration: string | null;
  author: string;
  published_date: string;
  files: VideoFile[];
}

interface Image {
  id: number;
  ref_id: number | null;
  ref_type: string;
  image_path: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  description: string | null;
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<Pagination>({
    totalCount: 0,
    currentPage: 0,
    totalPages: 0,
    prev: null,
    next: null
  });
  const [images, setImages] = useState<Image[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [combinedMedia, setCombinedMedia] = useState([]);
  const [mediaPagination, setMediaPagination] = useState({
    totalCount: 0,
    currentPage: 1,
    totalPages: 1,
    prev: null,
    next: null
  });

  const router = useRouter();

  const fetchMedia = useCallback(async () => {
    try {
      console.log('กำลังดึงข้อมูลมีเดีย...');
      const offset = (mediaPagination.currentPage - 1) * 10; // 10 items per page
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/image/getAllImage/vibe?offset=${offset}&limit=10`
      );

      console.log('Media API response:', response.data);

      if (response.data && typeof response.data === 'object') {
        const responseImages = Array.isArray(response.data.images) ? response.data.images : [];
        const responseVideos = Array.isArray(response.data.videos) ? response.data.videos : [];

        console.log(`พบรูปภาพ ${responseImages.length} รายการ และวิดีโอ ${responseVideos.length} รายการ`);

        setImages(responseImages);
        setVideos(responseVideos);

        // Update pagination based on the new response format
        const totalItems = (response.data.pagination?.images?.total || 0) +
          (response.data.pagination?.videos?.total || 0);
        const totalPages = Math.ceil(totalItems / 10) - 1;

        setMediaPagination({
          totalCount: totalItems,
          currentPage: mediaPagination.currentPage,
          totalPages: totalPages,
          prev: mediaPagination.currentPage > 1,
          next: mediaPagination.currentPage < totalPages
        });
      } else {
        console.error('รูปแบบข้อมูลจาก API ไม่ถูกต้อง:', response.data);
        setImages([]);
        setVideos([]);
      }
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการดึงข้อมูลมีเดีย:', error);
      setImages([]);
      setVideos([]);
    }
  }, [mediaPagination.currentPage]);

  const closeModal = () => {
    setShowModal(false);
    setSelectedMedia(null);
  };

  // Fetch news from API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/news?offset=0&limit=9`);
        const data = response.data;
        setNewsItems(data.data);
        setPagination(data.pagination);

        await fetchMedia();
        setLoading(false);
      } catch (err: any) {
        setError(err.message || 'เกิดข้อผิดพลาดในการโหลดข้อมูล');
        setLoading(false);
      }
    };
    fetchNews();
  }, [fetchMedia]);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  // Load more news function
  const loadMoreNews = async () => {
    if (!pagination.next) return;
    try {
      setLoading(true);
      const response = await axios.get(pagination.next);
      const data = response.data;
      setNewsItems(prev => [...prev, ...data.data]);
      setPagination(data.pagination);
      setLoading(false);
    } catch (err: any) {
      setError(err.message || 'เกิดข้อผิดพลาดในการโหลดข้อมูลเพิ่มเติม');
      setLoading(false);
    }
  };

  // Extract all unique tags from news items
  const getAllTags = (): string[] => {
    const tagSet = new Set<string>();
    tagSet.add('All');
    newsItems.forEach(item => {
      if (item.tagAssignments && item.tagAssignments.length > 0) {
        item.tagAssignments.forEach(tagAssignment => {
          if (tagAssignment.tag && tagAssignment.tag.name) {
            tagSet.add(tagAssignment.tag.name);
          }
        });
      }
    });
    return Array.from(tagSet);
  };

  const categories: string[] = getAllTags();

  // Filter news based on search query and selected tag
  const filteredNews = newsItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.short_description && item.short_description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = filter === 'All' ||
      (item.tagAssignments &&
        item.tagAssignments.some(tagAssignment =>
          tagAssignment.tag && tagAssignment.tag.name === filter
        ));
    return matchesSearch && matchesFilter;
  });

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Example upcoming events (static)
  const events = [
    {
      id: 1,
      title: 'Open House: Explore Thailand 4.0 Program',
      description: 'Join us for an informative session about our training programs, meet instructors, and tour our facilities. Registration required.',
      date: 'January 15, 2024',
    },
    {
      id: 2,
      title: 'Industry Talk: Future of AI in Thailand',
      description: 'A panel discussion with industry experts on the growing role of artificial intelligence in Thailand s economic development.',
      date: 'February 5, 2024',
    },
    {
      id: 3,
      title: 'Workshop: Introduction to Robotics',
      description: 'A hands-on workshop introducing basic robotics concepts and applications. Open to prospective students and the general public.',
      date: 'February 20, 2024',
    },
    {
      id: 4,
      title: 'Career Fair: Thailand 4.0 Industries',
      description: 'Connect with potential employers from Thailand s leading technology and innovation companies. Bring your resume and portfolio.',
      date: 'March 10, 2024',
    }
  ];

  const [displayCount, setDisplayCount] = useState(12);

  // ใช้ useCallback เพื่อไม่ให้ combineAndSortMedia เปลี่ยน reference ทุก render
  const combineAndSortMedia = useCallback((images: Image[], videos: Video[]) => {
    // แปลงรูปภาพให้อยู่ในรูปแบบเดียวกับที่จะใช้แสดงผล
    const formattedImages = images.map(img => ({
      id: `img-${img.id}`,
      type: 'image',
      path: img.image_path,
      description: img.description,
      date: new Date(img.created_at),
      originalData: img
    }));

    // แปลงวิดีโอให้อยู่ในรูปแบบเดียวกับที่จะใช้แสดงผล
    const formattedVideos = videos.map(vid => ({
      id: `vid-${vid.id}`,
      type: 'video',
      path: vid.files && vid.files.length > 0 ? vid.files[0].file_path : null,
      title: vid.title,
      date: new Date(vid.published_date),
      originalData: vid
    })).filter(vid => vid.path !== null); // กรองวิดีโอที่ไม่มีไฟล์ออก

    // รวมข้อมูลและเรียงตามวันที่ล่าสุด
    const combined = [...formattedImages, ...formattedVideos];
    combined.sort((a, b) => b.date.getTime() - a.date.getTime());
    // จำกัดจำนวนที่จะแสดง
    return combined.slice(0, displayCount);
  }, [displayCount]);

  useEffect(() => {
    // เรียกฟังก์ชั่นเพื่อรวมและเรียงข้อมูล
    const sortedMedia = combineAndSortMedia(images, videos);
    setCombinedMedia(sortedMedia);
  }, [images, videos, displayCount, combineAndSortMedia]);

  const handleViewAllGallery = () => {
    router.push('/gallery');
  };

  const handleViewDetails = (newId: number, view_count: number) => {
    axios.put(`${process.env.NEXT_PUBLIC_API}/news/view/${newId}`, {
      view_count: view_count + 1
    }, {
      headers: { 'Content-Type': 'application/json' }
    }).catch(() => { });
    router.push(`/newandevent/${newId}`);
  };

  const getVideoType = (path: string) => {
    if (!path) return 'mp4';
    const extension = path.split('.').pop().toLowerCase();
    return extension || 'mp4';
  };

  return (
    <div className="bg-gradient-to-b from-[#0A2463] via-[#F9FAFB] to-white min-h-screen">
      {/* Header */}
      <div className="bg-[#0A2463] md:h-50 text-white py-10 px-10">
        <div className="text-3xl font-bold text-white">ข่าวสารและกิจกรรม</div>
        <div className="text-wrap max-w-2xl text-base mt-5 text-white">
          ติดตามข่าวสาร กิจกรรม และความสำเร็จล่าสุดจากโครงการฝึกอบรมบัณฑิตไทยแลนด์ 4.0
        </div>
      </div>

      {/* News Section */}
      <div className="bg-[#F9FAFB] p-4 md:p-10">
        <div className="mx-auto max-w-7xl">
          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="ค้นหาข่าว..."
                className="w-full border border-gray-300 rounded-lg py-3 px-5 pl-12 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm bg-white text-gray-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-4 top-3 h-6 w-6 text-gray-400" />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto justify-center md:justify-end">
              <select
                className="border border-gray-300 rounded-lg py-3 px-5 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm bg-white text-gray-800"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          {/* News Header */}
          <h1 className="text-3xl font-bold text-blue-900 mb-8 tracking-tight">ข่าวสารและกิจกรรมล่าสุด</h1>

          {/* Loading and Error States */}
          {loading && <div className="text-center py-12 text-lg text-blue-700 animate-pulse">กำลังโหลดข้อมูล...</div>}
          {error && <div className="text-center text-red-500 py-12 text-lg">เกิดข้อผิดพลาด: {error}</div>}

          {/* News Grid */}
          {!loading && !error && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredNews.map(news => (
                  <div key={news.id} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col transition-transform hover:scale-105 hover:shadow-2xl duration-200 cursor-pointer" onClick={() => handleViewDetails(news.id, news.view_count)}>
                    <div className="relative">
                      <Image
                        src={news.image?.image_path ? `${process.env.NEXT_PUBLIC_IMG}/${news.image.image_path}` : (images.length > 0 ? `${process.env.NEXT_PUBLIC_IMG}/${images[0].image_path}` : '/placeholder-image.jpg')}
                        alt={news.title}
                        className="w-full h-56 object-cover object-center bg-gray-100"
                        width={600}
                        height={224}
                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                      />
                      {news.tagAssignments && news.tagAssignments.length > 0 && (
                        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                          {news.tagAssignments.map((tagAssignment, index) => (
                            <span key={index} className="bg-blue-600/90 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                              {tagAssignment.tag.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <p className="text-xs text-gray-400 mb-2 flex items-center gap-1"><Calendar className="w-4 h-4 inline-block mr-1" />{formatDate(news.published_date)}</p>
                      <h3 className="text-lg font-bold text-blue-900 mb-2 line-clamp-2">{news.title}</h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-grow">{news.short_description}</p>
                      <div className="mt-2">
                        <button className="flex items-center text-blue-600 font-semibold text-sm hover:text-blue-800 transition-colors cursor-pointer" onClick={() => handleViewDetails(news.id, news.view_count)}>
                          อ่านเพิ่มเติม
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Pagination / Load More Button */}
              {pagination.next && (
                <div className="flex justify-center mt-10">
                  <button
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg"
                    onClick={loadMoreNews}
                    disabled={loading}
                  >
                    {loading ? 'กำลังโหลด...' : 'โหลดเพิ่มเติม'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Gallery Section */}
      <div className="bg-[#F9FAFB]  p-4 md:p-10">
        <div className='mx-auto max-w-7xl'>
          <h1 className="text-3xl font-bold text-blue-900 mb-10 tracking-tight ">บรรยากาศโครงการ</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {combinedMedia.length > 0 ? (
              combinedMedia.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  onClick={() => {
                    setSelectedMedia({
                      type: item.type,
                      path: item.path,
                      title: item.type === 'video' ? item.title : item.description,
                      date: item.date,
                      description: item.type === 'video' ? item.description : item.description
                    });
                    setShowModal(true);
                  }}
                >
                  <div className="relative h-52">
                    {item.type === 'video' ? (
                      <>
                        <video
                          className="w-full h-full object-cover"
                          muted
                          playsInline
                          preload="metadata"
                        >
                          <source src={`${process.env.NEXT_PUBLIC_IMG}/${item.path}`} type={`video/${getVideoType(item.path)}`} />
                          Your browser does not support the video tag.
                        </video>
                        <div className="absolute inset-0 flex items-center justify-center bg-[#00000080] opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="relative w-16 h-16">
                            <div className="absolute inset-0 bg-white/30 rounded-full"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-1"></div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMG}/${item.path}`}
                        alt={item.description || ""}
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                        className="object-cover object-center"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-blue-900 mb-2 line-clamp-2">
                      {item.type === 'video' ? item.title : (item.description || 'รูปภาพ')}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {formatDate(item.date.toISOString())}
                    </p>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {item.description || (item.type === 'video' ? 'วิดีโอจากโครงการ' : 'รูปภาพจากโครงการ')}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-1 md:col-span-2 lg:col-span-4 text-center py-6 text-gray-500">
                ไม่พบข้อมูลมีเดีย
              </div>
            )}
          </div>
        </div>
      </div>
      {showModal && selectedMedia && (
        <div className="fixed inset-0 bg-[#00000080] z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={closeModal}
                className="text-gray-600 hover:text-gray-800 transition-colors bg-white rounded-full p-2 shadow-lg"
              >
                <X size={24} />
              </button>
            </div>

            <div className="relative">
              {selectedMedia.type === 'video' ? (
                <video
                  className="w-full h-auto max-h-[70vh] object-contain bg-black"
                  controls
                  autoPlay
                >
                  <source src={`${process.env.NEXT_PUBLIC_IMG}/${selectedMedia.path}`} type="video/mp4" />
                </video>
              ) : (
                <div className="relative w-full h-auto max-h-[70vh]">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMG}/${selectedMedia.path}`}
                    alt={selectedMedia.title || "Selected media"}
                    width={1200}
                    height={800}
                    style={{ objectFit: 'contain' }}
                    className="w-full h-auto max-h-[70vh] object-contain"
                  />
                </div>
              )}
            </div>

            <div className="p-6 bg-white">
              <h3 className="text-xl font-semibold text-blue-900 mb-2">
                {selectedMedia.title || (selectedMedia.type === 'video' ? 'วิดีโอ' : 'รูปภาพ')}
              </h3>
              <p className="text-gray-500 mb-3">
                {formatDate(new Date().toISOString())}
              </p>
              <p className="text-gray-600">
                {selectedMedia.description || (selectedMedia.type === 'video' ? 'วิดีโอจากโครงการ' : 'รูปภาพจากโครงการ')}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center gap-4 my-8">
        <div className="text-center text-sm text-[#6B7280]">
          แสดง {((mediaPagination.currentPage - 1) * 10) + 1} - {Math.min(mediaPagination.currentPage * 10, mediaPagination.totalCount)}
          จาก {mediaPagination.totalCount} รายการ
        </div>
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={() => setMediaPagination(prev => ({
              ...prev,
              currentPage: Math.max(prev.currentPage - 1, 1)
            }))}
            disabled={!mediaPagination.prev}
            className="px-4 py-2 bg-[#0A2463] text-white rounded-lg disabled:opacity-50 hover:bg-[#39A9DB] transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 disabled:hover:bg-[#0A2463]"
          >
            ก่อนหน้า
          </button>
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#0A2463] font-medium">
              หน้า {mediaPagination.currentPage} / {mediaPagination.totalPages}
            </span>
          </div>
          <button
            onClick={() => setMediaPagination(prev => ({
              ...prev,
              currentPage: prev.currentPage + 1
            }))}
            disabled={!mediaPagination.next}
            className="px-4 py-2 bg-[#0A2463] text-white rounded-lg disabled:opacity-50 hover:bg-[#39A9DB] transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 disabled:hover:bg-[#0A2463]"
          >
            ถัดไป
          </button>
        </div>
      </div>
    </div>
  );
}