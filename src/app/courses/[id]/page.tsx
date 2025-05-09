'use client'

import React from 'react';
import { useParams } from 'next/navigation';
import CourseDetail from '../../../components/coursedetail';

export default function CourseDetailPage() {
    const params = useParams();
    const id = params.id as string;
  return <CourseDetail params={id} />;
}