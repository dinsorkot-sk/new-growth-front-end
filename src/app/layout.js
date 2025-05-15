
import "./globals.css";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import VisitorTracker from "../components/VisitorTracker";

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
      </head>
      <body>
        <VisitorTracker />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}


