'use client'

import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Eye, Tag as TagIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Newandeventdetail({ params }: { params: string }) {
    console.log('params', params);
  const router = useRouter();
  const [newsData, setNewsData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/news/${params}`);
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
        <div className="relative w-full ">
          <img
            src={`http://localhost:3001/${newsData.image.image_path}`}
            alt={newsData.title}
            className="object-cover"
          />
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
            <div dangerouslySetInnerHTML={{ __html: newsData.content }} />
          </div>
        </div>
      </div>
    </div>
  );
}

