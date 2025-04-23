'use client'

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  
  // Sample resource data
  const resources = [
    {
      id: 1,
      title: 'Introduction to AI and Machine Learning',
      description: 'A comprehensive introduction to AI concepts and machine learning fundamentals.',
      type: 'Video',
      duration: '45 minutes',
      pages: null,
      author: 'Dr. Somchai Jaidee',
      date: 'October 15, 2023',
      icon: 'video'
    },
    {
      id: 2,
      title: 'Python Programming for Data Science',
      description: 'Learn the basics of Python programming for data analysis and machine learning.',
      type: 'Tutorial',
      duration: null,
      pages: '32',
      author: 'Prof. Apinya Thongchai',
      date: 'September 20, 2023',
      icon: 'document'
    },
    {
      id: 3,
      title: 'Robotics Lab Exercises - Part 1',
      description: 'Hands-on exercises for programming basic robot movements and sensors.',
      type: 'Exercise',
      duration: null,
      pages: '18',
      author: 'Dr. Chai Wattana',
      date: 'November 5, 2023',
      icon: 'document'
    },
    {
      id: 4,
      title: 'Digital Innovation Case Studies',
      description: 'Analysis of successful digital transformation projects in Thailand.',
      type: 'Document',
      duration: null,
      pages: '45',
      author: 'Dr. Siriwan Maneethai',
      date: 'August 12, 2023',
      icon: 'document'
    },
    {
      id: 5,
      title: 'Building IoT Applications - Workshop Recording',
      description: 'Recording of the hands-on workshop on developing IoT applications.',
      type: 'Video',
      duration: '120 minutes',
      pages: null,
      author: 'Prof. Thaksin Wongprasert',
      date: 'October 28, 2023',
      icon: 'video'
    },
    {
      id: 6,
      title: 'Blockchain Technology Fundamentals',
      description: 'Introduction to blockchain concepts and applications in various industries.',
      type: 'Tutorial',
      duration: null,
      pages: '28',
      author: 'Dr. Malee Suwannathon',
      date: 'November 15, 2023',
      icon: 'document'
    },
    {
      id: 7,
      title: 'Data Visualization with Tableau',
      description: 'Step-by-step guide to creating effective data visualizations using Tableau.',
      type: 'Tutorial',
      duration: '60 minutes',
      pages: null,
      author: 'Dr. Sonchai Jaidee',
      date: 'September 5, 2023',
      icon: 'video'
    },
    {
      id: 8,
      title: 'Advanced Machine Learning Algorithms',
      description: 'Detailed explanation of advanced ML algorithms with practical examples.',
      type: 'Document',
      duration: null,
      pages: '52',
      author: 'Prof. Apinya Thongchai',
      date: 'October 19, 2023',
      icon: 'document'
    },
  ];

  // Filter resources based on search query
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'All' || resource.type === filterType;
    return matchesSearch && matchesType;
  });

  // Function to render the appropriate icon
  const renderIcon = (iconType) => {
    switch(iconType) {
      case 'video':
        return <span className="text-blue-500">🎬</span>;
      case 'document':
      default:
        return <span className="text-blue-500">📄</span>;
    }
  };

  // Function to render the appropriate action button
  const renderActionButton = (type) => {
    if (type === 'Video') {
      return (
        <button className="bg-blue-500 text-white rounded-md px-4 py-2 flex items-center">
          <span className="mr-2">▶️</span>
          <span>Watch Video</span>
        </button>
      );
    } else {
      return (
        <button className="bg-blue-500 text-white rounded-md px-4 py-2 flex items-center">
          <span className="mr-2">📄</span>
          <span>View Document</span>
        </button>
      );
    }
  };

   // Learning paths structure for display
   const learningPaths = [
    {
      title: 'AI & Machine Learning Path',
      description: 'A structured learning path covering the fundamental of AI, machine learning algorithms, and practical applications.',
      topics: [
        { title: 'Introduction to AI', count: 4 },
        { title: 'Machine Learning Basics', count: 6 },
        { title: 'Advanced ML Techniques', count: 5 },
        { title: 'Practical Projects', count: 3 }
      ]
    },
    {
      title: 'Robotics & Automation Path',
      description: 'Learn about robotics principles, programming robots, and automation systems for industrial applications.',
      topics: [
        { title: 'Robotics Fundamentals', count: 5 },
        { title: 'Robot Programming', count: 4 },
        { title: 'Sensors & Control Systems', count: 3 },
        { title: 'Industrial Automation', count: 4 }
      ]
    },
    {
      title: 'Digital Innovation Path',
      description: 'Explore digital transformation strategies, business model innovation, and entrepreneurship in the digital economy.',
      topics: [
        { title: 'Digital Transformation', count: 3 },
        { title: 'Business Model Innovation', count: 5 },
        { title: 'Digital Marketing', count: 4 },
        { title: 'Tech Entrepreneurship', count: 3 }
      ]
    }
  ];

  // Additional resources sections
  const additionalResources = [
    {
      title: 'การเรียนรู้ภายนอก',
      items: [
        { title: 'Coursera - Data Science Specialization', icon: 'external' },
        { title: 'edX - Robotics MicroMasters', icon: 'external' },
        { title: 'Udacity - AI for Business', icon: 'external' },
        { title: 'LinkedIn Learning - Digital Marketing', icon: 'external' }
      ]
    },
    {
      title: 'ข่าวสาร',
      items: [
        { title: 'Thailand 4.0 Economic Model Overview', icon: 'document' },
        { title: 'Digital Economy in Southeast Asia', icon: 'document' },
        { title: 'AI Adoption in Thai Industries', icon: 'document' },
        { title: 'S-Curve Industries Growth Forecast', icon: 'document' }
      ]
    },
    {
      title: 'Software & Tools',
      items: [
        { title: 'Python Development Environment Setup', icon: 'download' },
        { title: 'Robot Simulation Software', icon: 'download' },
        { title: 'Data Visualization Tools', icon: 'download' },
        { title: 'IoT Development Kits Guide', icon: 'download' }
      ]
    }
  ];

  // Icons
  const DocumentIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  );

  const ExternalIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );

  const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );

  const PathIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    </svg>
  );

  // Get icon component based on icon type
  const getIconComponent = (iconType) => {
    switch (iconType) {
      case 'document':
        return <DocumentIcon />;
      case 'external':
        return <ExternalIcon />;
      case 'download':
        return <DownloadIcon />;
      default:
        return <DocumentIcon />;
    }
  };

  // Group resources by type
  const videoResources = resources.filter(resource => resource.icon === 'video');
  const documentResources = resources.filter(resource => resource.icon === 'document');
  return (
    <div className="container mx-auto  ">
        <div className=" bg-[#0A2463] md:h-50  text-white py-10  px-10  ">
        <div className="text-3xl font-bold text-white">แหล่งข้อมูลการเรียนรู้แบบออนไลน์</div>
        <div className="text-wrap max-w-2xl text-base mt-5 text-white">เข้าถึงวิดีโอการฝึกอบรม เอกสารประกอบ แบบฝึกหัด และสื่อการเรียนรู้เพื่อสนับสนุนการศึกษาของคุณ</div>
    </div>
      {/* Search and filter bar */}
      <div className="w-full bg-white py-8 md:flex items-center justify-between space-x-4 px-10 ">
        <input
          type="text"
          placeholder="Search resources..."
          className="flex-grow border rounded-md py-2 px-4 w-full "
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className='flex justify-center'>

        <select 
          className="border rounded-md py-2 px-4 my-3 md:my-0 items-center"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Video">Videos</option>
          <option value="Tutorial">Tutorials</option>
          <option value="Document">Documents</option>
          <option value="Exercise">Exercises</option>
        </select>
        </div>
        
      </div>

      {/* Main content */}
      <div className="pt-6 pb-10 bg-[#F9FAFB] px-10">
        
        <h1 className="text-xl font-bold text-[#0A2463] mb-6">ทั้งหมด</h1>
        
        {/* Resources list */}
        <div className="space-y-4">
          {filteredResources.map(resource => (
            <div key={resource.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="md:flex justify-between">
                <div className="md:flex items-start space-x-4">
                  <div className="mt-1 text-lg text-center my-3 md:my-0">
                    {renderIcon(resource.icon)}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0A2463]">{resource.title}</h3>
                    <p className="text-[#4B5563] text-sm mt-1">{resource.description}</p>
                    
                    <div className="flex flex-wrap gap-x-8 gap-y-2 mt-3 text-xs text-[#6B7280]">
                      <div><span className="font-semibold">Type:</span> {resource.type}</div>
                      {resource.duration && (
                        <div><span className="font-semibold">Duration:</span> {resource.duration}</div>
                      )}
                      {resource.pages && (
                        <div><span className="font-semibold">Pages:</span> {resource.pages}</div>
                      )}
                      <div><span className="font-semibold">Author:</span> {resource.author}</div>
                      <div><span className="font-semibold">Date:</span> {resource.date}</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center  space-y-3 mt-3 md:mt-0">
                  {renderActionButton(resource.type)}
                  <button className="flex  items-center  text-white hover:text-blue-500 transition-colors text-sm">
                    <span className="mr-2 ">⬇️</span>
                    <span className='text-[#374151]'>Download</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto  py-8 px-10 ">
      {/* Learning Paths */}
      <h1 className="text-2xl font-bold text-[#0A2463] mb-8">เส้นทางการเรียนรู้ที่โดดเด่น</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {learningPaths.map((path, index) => (
          <div key={index} className="bg-[#F9FAFB] p-6 rounded-lg shadow-sm">
             <div className=" p-2 inline-block"><div className=" bg-blue-100 p-4 rounded-full"><FontAwesomeIcon icon={faBook} className="bg-blue-100" style={{color: "#002594" , width: "30px", height: "30px"}} /></div></div>
            <div className="flex items-center mb-4">
              
              <h2 className="ml-2 text-lg font-semibold text-[#0A2463]">{path.title}</h2>
            </div>
            <p className="text-[#4B5563] text-sm mb-6 ">
              {path.description}
            </p>
            <ul className="space-y-3 mb-6">
              {path.topics.map((topic, idx) => (
                <li key={idx} className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-blue-500">•</div>
                  <div className="ml-2">
                    <span className="text-[#4B5563]">{topic.title}</span>
                    <span className="text-[#4B5563] text-sm"> ({topic.count} resources)</span>
                  </div>
                </li>
              ))}
            </ul>
            <div>
              <button className="inline-flex items-center text-[#0A2463] font-medium ">
                Start Learning Path 
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Resources */}
      
    </div>

<div className='bg-[#F9FAFB] px-10 pt-4 pb-6'>
<h2 className="text-2xl font-bold text-blue-900 mb-4">แหล่งข้อมูลเพิ่มเติม</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        {additionalResources.map((section, index) => (
          <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">{section.title}</h3>
            <ul className="space-y-3">
              {section.items.map((item, idx) => (
                <li key={idx} className="flex items-center">
                  {getIconComponent(item.icon)}
                  <span className="ml-2 text-gray-700 text-sm">{item.title}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

</div>
    
    </div>
  );
}

