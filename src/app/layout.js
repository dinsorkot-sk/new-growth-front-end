import "./globals.css";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import VisitorTracker from "../components/VisitorTracker";
import CookieConsent from "../components/CookieConsent";
import Script from 'next/script';

import 'quill/dist/quill.snow.css'
import './globals.css'   

export const metadata = {
  title: "โครงการผลิตบัณฑิตพันธ์ใหม่ (แม่โจ้)",
  description: "โครงการผลิตบัณฑิตพันธ์ใหม่ (แม่โจ้)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./favicon.png" sizes="32x32" />
        <link href="https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.snow.css" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.css" rel="stylesheet" />
        <Script
          src="https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.js"
          strategy="beforeInteractive"
        />
        <Script src="https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.js" strategy="beforeInteractive" />
        {/* Google Consent Mode v2 */}
        <Script id="google-consent-mode" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'functionality_storage': 'denied',
              'personalization_storage': 'denied',
              'security_storage': 'granted'
            });
          `}
        </Script>
      </head>
      <body>
        <VisitorTracker />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}


