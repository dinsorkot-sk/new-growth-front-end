"use client";

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCookie } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [consentState, setConsentState] = useState({
    analytics_storage: 'denied',
    ad_storage: 'denied',
    functionality_storage: 'denied',
    personalization_storage: 'denied',
    security_storage: 'granted'
  });

  useEffect(() => {
    // Check if user has already made a choice using cookie
    const hasConsent = Cookies.get('cookie_consent');
    if (!hasConsent) {
      setShowBanner(true);
    } else {
      // Apply saved consent state from cookie
      const savedState = JSON.parse(hasConsent);
      setConsentState(savedState);
      updateGtagConsent(savedState);
    }
  }, []);

  const updateGtagConsent = (state) => {
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        'analytics_storage': state.analytics_storage,
        'ad_storage': state.ad_storage,
        'functionality_storage': state.functionality_storage,
        'personalization_storage': state.personalization_storage,
        'security_storage': state.security_storage
      });
    }
  };

  const handleAcceptAll = () => {
    const newState = {
      analytics_storage: 'granted',
      ad_storage: 'granted',
      functionality_storage: 'granted',
      personalization_storage: 'granted',
      security_storage: 'granted'
    };
    setConsentState(newState);
    // Store consent in cookie with 1 year expiry
    Cookies.set('cookie_consent', JSON.stringify(newState), { 
      expires: 365,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production'
    });
    updateGtagConsent(newState);
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    const newState = {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      functionality_storage: 'denied',
      personalization_storage: 'denied',
      security_storage: 'granted'
    };
    setConsentState(newState);
    // Store consent in cookie with 1 year expiry
    Cookies.set('cookie_consent', JSON.stringify(newState), { 
      expires: 365,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production'
    });
    updateGtagConsent(newState);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-4 z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <FontAwesomeIcon icon={faCookie} className="text-[#0A2463] text-xl" />
          <div className="text-sm text-gray-700">
            <p className="font-medium">เราใช้คุกกี้เพื่อปรับปรุงประสบการณ์การใช้งานของคุณ</p>
            <p className="text-xs mt-1">โดยการใช้งานเว็บไซต์นี้ คุณยอมรับนโยบายคุกกี้ของเรา</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleRejectAll}
            className="px-4 py-2 text-sm text-[#0A2463] border border-[#0A2463] rounded-md hover:bg-gray-50 transition-colors cursor-pointer"
          >
            ปฏิเสธทั้งหมด
          </button>
          <button
            onClick={handleAcceptAll}
            className="px-4 py-2 text-sm text-white bg-[#0A2463] rounded-md hover:bg-[#0A2463]/90 transition-colors cursor-pointer"
          >
            ยอมรับทั้งหมด
          </button>
        </div>
      </div>
    </div>
  );
} 