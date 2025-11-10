import { useState, useEffect } from 'react';

export interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isTouchDevice: boolean;
  pixelRatio: number;
  viewportWidth: number;
  viewportHeight: number;
  aspectRatio: '9:16' | '16:9' | 'other';
  prefersReducedMotion: boolean;
}

export function useDeviceDetection(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(() => {
    if (typeof window === 'undefined') {
      return {
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        isTouchDevice: false,
        pixelRatio: 1,
        viewportWidth: 1920,
        viewportHeight: 1080,
        aspectRatio: '16:9',
        prefersReducedMotion: false
      };
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    const ratio = width / height;
    
    return {
      isMobile: width < 768,
      isTablet: width >= 768 && width < 1024,
      isDesktop: width >= 1024,
      isTouchDevice: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
      pixelRatio: window.devicePixelRatio || 1,
      viewportWidth: width,
      viewportHeight: height,
      aspectRatio: ratio < 0.75 ? '9:16' : ratio > 1.5 ? '16:9' : 'other',
      prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    };
  });

  useEffect(() => {
    const updateDeviceInfo = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const ratio = width / height;

      setDeviceInfo({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        isTouchDevice: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
        pixelRatio: window.devicePixelRatio || 1,
        viewportWidth: width,
        viewportHeight: height,
        aspectRatio: ratio < 0.75 ? '9:16' : ratio > 1.5 ? '16:9' : 'other',
        prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
      });
    };

    let timeoutId: NodeJS.Timeout;
    const debouncedUpdate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateDeviceInfo, 120);
    };

    window.addEventListener('resize', debouncedUpdate);
    window.addEventListener('orientationchange', updateDeviceInfo);

    const motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = () => updateDeviceInfo();
    motionMediaQuery.addEventListener('change', handleMotionChange);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', debouncedUpdate);
      window.removeEventListener('orientationchange', updateDeviceInfo);
      motionMediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  return deviceInfo;
}
