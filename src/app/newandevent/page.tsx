'use client'

import React, { useState, useEffect } from 'react';
import { Search, ArrowRight, Calendar, X, Play} from 'lucide-react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

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

const closeModal = () => {
  setShowModal(false);
  setSelectedMedia(null);
};

  const router = useRouter();

  // Fetch news from API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/news?offset=0&limit=10`);
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
  }, []);

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

const fetchMedia = async () => {
  try {
    console.log('กำลังดึงข้อมูลมีเดีย...');
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/image/getAllImage/vibe?offset=0&limit=10`);
    
    // แสดงข้อมูลที่ได้จาก API เพื่อการตรวจสอบ
    console.log('Media API response:', response.data);
    
    // ตรวจสอบว่า response มีรูปแบบตามที่คาดหวังหรือไม่
    if (response.data && typeof response.data === 'object') {
      // ตรวจสอบและกำหนดค่าอย่างชัดเจน - อย่าใช้ || [] เพราะอาจเป็น array ว่าง
      const responseImages = Array.isArray(response.data.images) ? response.data.images : [];
      const responseVideos = Array.isArray(response.data.videos) ? response.data.videos : [];
      
      console.log(`พบรูปภาพ ${responseImages.length} รายการ และวิดีโอ ${responseVideos.length} รายการ`);
      
      // ตรวจสอบโครงสร้างข้อมูลวิดีโอ
      if (responseVideos.length > 0) {
        console.log('ตัวอย่างข้อมูลวิดีโอแรก:', responseVideos[0]);
        console.log('มีไฟล์วิดีโอหรือไม่:', responseVideos[0].files && responseVideos[0].files.length > 0);
      }
      
      setImages(responseImages);
      setVideos(responseVideos);
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
};


  const handleViewAllGallery = () => {
    router.push('/gallery');
  };

  const handleViewDetails = (newId: number, view_count: number) => {
    axios.put(`${process.env.NEXT_PUBLIC_API}/news/view/${newId}`, {
      view_count: view_count + 1
    }, {
      headers: { 'Content-Type': 'application/json' }
    }).catch(() => {});
    router.push(`/newandevent/${newId}`);
  };

  const getVideoType = (path) => {
    if (!path) return 'mp4';
    const extension = path.split('.').pop().toLowerCase();
    return extension || 'mp4';
  };

  const combineAndSortMedia = (images, videos) => {
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
    combined.sort((a, b) => b.date - a.date);
    // จำกัดจำนวนที่จะแสดง
    return combined.slice(0, displayCount);
  };
 
  useEffect(() => {
    // เรียกฟังก์ชั่นเพื่อรวมและเรียงข้อมูล
    const sortedMedia = combineAndSortMedia(images, videos);
    setCombinedMedia(sortedMedia);
  }, [images, videos, displayCount]);

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
                  <div key={news.id} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col transition-transform hover:scale-105 hover:shadow-2xl duration-200 cursor-pointer"  onClick={() => handleViewDetails(news.id, news.view_count)}>
                    <div className="relative">
                      <img
                        src={`${process.env.NEXT_PUBLIC_IMG}/${news.image?.image_path}`}
                        alt={news.title}
                        className="w-full h-56 object-cover object-center bg-gray-100"
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
      <h1 className="text-3xl font-bold text-blue-900 mb-10 tracking-tight">บรรยากาศโครงการ</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {combinedMedia.length > 0 ? (
          combinedMedia.map((item) => (
            <div
              key={item.id}
              className="rounded-xl overflow-hidden h-52 shadow bg-white hover:shadow-lg transition-shadow cursor-pointer relative"
              onClick={() => {
                setSelectedMedia({
                  type: item.type,
                  path: item.path
                });
                setShowModal(true);
              }}
            >
              {item.type === 'video' ? (
                <>
                  <div className="relative w-full h-full">
                    <video
                      className="absolute top-0 left-0 w-full h-full object-cover"
                      muted
                      playsInline
                      preload="metadata"
                    >
                      <source src={`${process.env.NEXT_PUBLIC_IMG}/${item.path}`} type={`video/${getVideoType(item.path)}`} />
                      Your browser does not support the video tag.
                    </video>
                    <div className="absolute inset-0 flex items-center justify-center bg-[#00000080] pointer-events-none">
                      <Play className="text-white" size={48} />
                    </div>
                  </div>
                </>
              ) : (
                <img
                  src={`${process.env.NEXT_PUBLIC_IMG}/${item.path}`}
                  alt={item.description || ""}
                  className="w-full h-full object-cover object-center"
                />
              )}
              
            </div>
          ))
        ) : (
          <div className="col-span-1 md:col-span-2 lg:col-span-4 text-center py-6 text-gray-500">
            ไม่พบข้อมูลมีเดีย
          </div>
        )}
      </div>
      
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
      
      {(images.length > 0 || videos.length > 0)  && ( //&& combinedMedia.length >= displayCount
        <div className="flex justify-center">
          <button
            onClick={handleViewAllGallery}
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-10 rounded-lg font-semibold text-lg transition-colors shadow-lg cursor-pointer">
            ดูเพิ่มเติม
          </button>
        </div>
      )}
    </div>

    </div>
  );
}