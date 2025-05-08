import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const cookieStore = cookies();
  const visitorTracked = cookieStore.get('visitor_tracked');
  
  // ถ้ายังไม่มี cookie แสดงว่าเป็นผู้เข้าชมใหม่
  if (!visitorTracked) {
    try {
      // เรียก API เพื่อบันทึกข้อมูลผู้เข้าชม
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          url: request.headers.get('referer') || 'unknown',
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to track visitor');
      }
      
      // ตั้งค่า cookie ที่หมดอายุใน 30 วัน
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 30);
      
      // สร้าง response พร้อมกับตั้งค่า cookie
      const responseWithCookie = NextResponse.json({ success: true, message: 'Visitor tracked' });
      responseWithCookie.cookies.set('visitor_tracked', 'true', { 
        expires: expiryDate,
        path: '/'
      });
      
      return responseWithCookie;
    } catch (error) {
      console.error('Error tracking visitor:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
  }
  
  // ถ้ามี cookie แล้ว แสดงว่าเป็นผู้เข้าชมเก่า
  return NextResponse.json({ success: true, message: 'Returning visitor' });
}