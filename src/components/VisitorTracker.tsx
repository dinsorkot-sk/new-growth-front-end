"use client"; // ⭐ บอกว่าเป็น Client Component

import { useEffect } from "react";
import axios from "axios";

export default function VisitorTracker() {
  useEffect(() => {
    if (!localStorage.getItem("visited")) {
      axios.post(`${process.env.NEXT_PUBLIC_IMG}/api/user`); // หรือ endpoint นับ
      localStorage.setItem("visited", "yes");
    }
  }, []);

  return null; // ไม่แสดงอะไร
}
