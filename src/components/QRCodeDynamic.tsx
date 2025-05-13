"use client";
import { QRCodeSVG } from "qrcode.react";

export default function QRCodeDynamic({ value }: { value: string }) {
  return <QRCodeSVG value={value} size={100} />;
}
