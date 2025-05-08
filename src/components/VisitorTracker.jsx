"use client";

import { useEffect } from 'react';

const VisitorTracker = () => {
  useEffect(() => {
    const trackVisit = async () => {
      try {
        await fetch('/api/track-visitor', {
          method: 'POST',
          cache: 'no-store'
        });
      } catch (error) {
        console.error('Error triggering visitor tracking:', error);
      }
    };

    trackVisit();
  }, []);

  return null;
};

export default VisitorTracker;