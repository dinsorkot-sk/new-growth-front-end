'use client'

import React from 'react';
import CourseDetail from '../../../components/coursedetail';

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  return <CourseDetail params={params.id} />;
}