
'use client'

import React from 'react';
import { useParams } from 'next/navigation';
import NewandeventdetailComponent from '../../../components/newdetail';

export default function Newandeventdetail() {
  // Use the Next.js hook to get params
  const params = useParams();
  const id = params.id as string;
  
  return <NewandeventdetailComponent params={id} />;
}