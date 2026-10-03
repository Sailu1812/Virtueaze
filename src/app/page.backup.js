'use client';

import { useEffect, useRef, useState } from 'react';

const MOBILE_BREAKPOINT = 768;

export default function Home() {
  const videoRef = useRef(null);
  const spacerRef = useRef(null);
  const [spacerHeight, setSpacerHeight] = useState('500vh');
  const [videoSrc, setVideoSrc] = useState('/BGV.mp4');

  // Listen for screen size changes to switch video source between mobile and desktop
  useEffect(() => {
    const handleScreenSizeChange = () => {
      const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
      const targetSrc = isMobile ? '/BGM.mp4' : '/BGV.mp4';
      setVideoSrc((prev) => (prev !== targetSrc ? targetSrc : prev));
    };

    handleScreenSizeChange();
    window.addEventListener('resize', handleScreenSizeChange);
    return () => window.removeEventListener('resize', handleScreenSizeChange);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Explicitly pause video to ensure scrub mode doesn't conflict with playback
    video.pause();

    let targetTime = 0;
    let animId = null;

    const getDocHeight = () => {
      return (
        document.documentElement.scrollHeight ||
        document.body.scrollHeight ||
        1
      );
    };

    const updateScrollHeight = () => {
      if (video.duration > 0) {
        const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
        const multiplier = isMobile ? 12 : 15;
        const calculatedHeight = Math.max(
          300,
          Math.min(1200, Math.round(video.duration * multiplier))
        );
        setSpacerHeight(`${calculatedHeight}vh`);
      }
    };

    const handleScroll = () => {
      if (!video.duration) return;
      const scrollY =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        0;
      const maxScroll = getDocHeight() - window.innerHeight;

      if (maxScroll > 0) {
        const scrollFraction = Math.max(0, Math.min(1, scrollY / maxScroll));
        targetTime = scrollFraction * video.duration;
      }
    };

    const renderLoop = () => {
      if (video.duration && !isNaN(targetTime)) {
        if (Math.abs(video.currentTime - targetTime) > 0.01) {
          video.currentTime = targetTime;
        }
      }
      animId = requestAnimationFrame(renderLoop);
    };

    const onLoadedMetadata = () => {
      updateScrollHeight();
      handleScroll();
      if (!isNaN(targetTime)) {
        video.currentTime = targetTime;
      }
    };

    video.addEventListener('loadedmetadata', onLoadedMetadata);

    if (video.readyState >= 1) {
      onLoadedMetadata();
    }

    const onResize = () => {
      updateScrollHeight();
      handleScroll();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', onResize);

    animId = requestAnimationFrame(renderLoop);

    return () => {
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', onResize);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [videoSrc]);

  return (
    <main>
      {/* Background Video Container */}
      <div className="video-container">
        <video
          key={videoSrc}
          ref={videoRef}
          className="bg-video"
          playsInline
          muted
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          src={videoSrc}
        />
      </div>

      {/* Foreground Content */}
      <div className="content-layer"></div>

      {/* Scroll Height Spacer Container */}
      <div
        ref={spacerRef}
        className="scroll-spacer"
        style={{ height: spacerHeight }}
      />
    </main>
  );
}


