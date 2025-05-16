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
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;600;700&family=Prompt:wght@100;300;400;600;700&display=swap"
          rel="stylesheet"
        />
        
        <link href="https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.snow.css" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/quill@2.0.3/dist/quill.js"></script>

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


