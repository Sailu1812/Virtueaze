'use client';

import { useEffect, useRef, useState } from 'react';
import HeroSection from '@/components/HeroSection';
import { gsap } from 'gsap';

const MOBILE_BREAKPOINT = 768;
// Fraction of total scroll dedicated to the Hero Zoom-out / Shrink Stage (first 20%)
const HERO_SCROLL_FRACTION = 0.20;

const DESKTOP_SECTIONS = [
  { id: 'exterior', label: 'Tower Exterior', progress: 0.10, icon: 'building' },
  { id: 'floorplan', label: 'Floor Plan', progress: 0.30, icon: 'floorplan' },
  { id: 'balcony', label: 'Balcony View', progress: 0.37, icon: 'balcony' },
  { id: 'living', label: 'Living Area', progress: 0.55, icon: 'living' },
  { id: 'kitchen', label: 'Kitchen', progress: 0.64, icon: 'kitchen' },
  { id: 'pool', label: 'Infinite Pool', progress: 0.67, icon: 'pool' },
  { id: 'bedroom', label: 'Master Bedroom', progress: 0.75, icon: 'bedroom' },
  { id: 'bathroom', label: 'Luxury Bathroom', progress: 0.95, icon: 'bathroom' },
];

const MOBILE_SECTIONS = [
  { id: 'exterior', label: 'Tower Exterior', progress: 0.10, icon: 'building' },
  { id: 'waterfront', label: 'Waterfront Vista', progress: 0.35, icon: 'balcony' },
  { id: 'kitchen', label: 'Kitchen & Dining', progress: 0.62, icon: 'kitchen' },
  { id: 'living', label: 'Living Area', progress: 0.75, icon: 'living' },
  { id: 'bedroom', label: 'Master Suite', progress: 0.86, icon: 'bedroom' },
  { id: 'sunset', label: 'Sunset Vista', progress: 0.96, icon: 'pool' },
];

const SCENE_CONTENT = {
  exterior: {
    eyebrow: 'THE RESIDENCE',
    title: 'A new perspective on coming home.',
    description: 'Discover a contemporary residence shaped by thoughtful architecture and a sense of calm.',
    details: ['A distinctive first impression', 'Architecture in dialogue with its setting'],
  },
  floorplan: {
    eyebrow: 'THE FLOOR PLAN',
    title: 'Space, thoughtfully considered.',
    description: 'Explore how welcoming shared spaces and quieter private rooms come together in one considered plan.',
    details: ['An intuitive sense of flow', 'Space for gathering and retreat'],
  },
  balcony: {
    eyebrow: 'OPEN AIR',
    title: 'Let the outside in.',
    description: 'Step beyond the interior and take in the open-air perspective from the balcony.',
    details: ['A breath of fresh air', 'A wider view of home'],
  },
  waterfront: {
    eyebrow: 'THE WATERFRONT',
    title: 'A view that invites you to pause.',
    description: 'Take in the waterfront setting and let the horizon become part of the experience.',
    details: ['An expansive outlook', 'A moment of quiet'],
  },
  living: {
    eyebrow: 'THE LIVING AREA',
    title: 'Room to slow down.',
    description: 'A welcoming place to gather, unwind, and enjoy the natural rhythm of home.',
    details: ['Made for gathering', 'A softer place to land'],
  },
  kitchen: {
    eyebrow: 'THE KITCHEN',
    title: 'Made for everyday rituals.',
    description: 'A considered kitchen setting brings everyday moments and shared meals into focus.',
    details: ['A natural gathering point', 'Everyday moments, elevated'],
  },
  pool: {
    eyebrow: 'THE INFINITE POOL',
    title: 'Where the water meets the view.',
    description: 'Pause by the water and take in a more open perspective on the surrounding landscape.',
    details: ['A moment to reset', 'An open, unhurried outlook'],
  },
  bedroom: {
    eyebrow: 'THE MASTER SUITE',
    title: 'A retreat at the end of the day.',
    description: 'Find a quieter pace in a private suite designed as a place to rest and recharge.',
    details: ['A more private escape', 'Space to unwind'],
  },
  bathroom: {
    eyebrow: 'THE BATHROOM',
    title: 'Make space for a slower start.',
    description: 'A calm, considered setting turns the start and close of each day into a small ritual.',
    details: ['A moment of stillness', 'A considered daily routine'],
  },
  sunset: {
    eyebrow: 'THE EVENING VIEW',
    title: 'Stay for the last light.',
    description: 'As the day winds down, take one more moment to enjoy the changing light and the view.',
    details: ['The day, at a gentler pace', 'A view worth lingering over'],
  },
};

function NavIcon({ name }) {
  switch (name) {
    case 'building':
      return (
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
          <line x1="9" y1="6" x2="9" y2="6.01" />
          <line x1="15" y1="6" x2="15" y2="6.01" />
          <line x1="9" y1="10" x2="9" y2="10.01" />
          <line x1="15" y1="10" x2="15" y2="10.01" />
          <line x1="9" y1="14" x2="9" y2="14.01" />
          <line x1="15" y1="14" x2="15" y2="14.01" />
          <line x1="9" y1="18" x2="15" y2="18" />
        </svg>
      );
    case 'floorplan':
      return (
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 21V9" />
        </svg>
      );
    case 'balcony':
      return (
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      );
    case 'living':
      return (
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 11V9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2" />
          <path d="M2 14v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" />
          <line x1="6" y1="18" x2="6" y2="21" />
          <line x1="18" y1="18" x2="18" y2="21" />
        </svg>
      );
    case 'kitchen':
      return (
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2v20M2 12h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2v10zM6 2v6M10 2v6" />
        </svg>
      );
    case 'pool':
      return (
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
        </svg>
      );
    case 'bedroom':
      return (
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 4v16M2 8h20v12M2 17h20M6 8v9" />
        </svg>
      );
    case 'bathroom':
      return (
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 6h6a2 2 0 0 1 2 2v1H7V8a2 2 0 0 1 2-2zM4 11h16a1 1 0 0 1 1 1v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3a1 1 0 0 1 1-1zM6 19v2M18 19v2" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Home() {
  const videoRef = useRef(null);
  const spacerRef = useRef(null);
  const [spacerHeight, setSpacerHeight] = useState('650vh');
  const [videoSrc, setVideoSrc] = useState('/BGV.mp4');
  const [isMobileView, setIsMobileView] = useState(false);

  // Two-phase scroll tracking:
  // 1. heroProgress: 0.0 -> 1.0 (Hero section zoom-out and shrink)
  // 2. videoProgress: 0.0 -> 1.0 (Background video tour scrub)
  const [heroProgress, setHeroProgress] = useState(0);
  const [videoProgress, setVideoProgress] = useState(0);
  const [displayedSceneId, setDisplayedSceneId] = useState('exterior');
  const sceneStoryRef = useRef(null);

  // Listen for screen size changes to switch video source between mobile and desktop
  useEffect(() => {
    const handleScreenSizeChange = () => {
      const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
      setIsMobileView(isMobile);
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

    video.pause();

    let targetTime = 0;
    let smoothTime = 0;
    let isSeeking = false;
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
        const multiplier = isMobile ? 8 : 10;
        const calculatedHeight = Math.max(
          350,
          Math.min(1100, Math.round(video.duration * multiplier) + 180)
        );
        setSpacerHeight(`${calculatedHeight}vh`);
      }
    };

    const handleScroll = () => {
      const scrollY =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        0;
      const maxScroll = getDocHeight() - window.innerHeight;

      if (maxScroll > 0) {
        const totalFraction = Math.max(0, Math.min(1, scrollY / maxScroll));

        // 1. HERO STAGE (0 to HERO_SCROLL_FRACTION):
        const currentHeroProg = Math.min(1, totalFraction / HERO_SCROLL_FRACTION);
        setHeroProgress(currentHeroProg);

        // 2. VIDEO STAGE (HERO_SCROLL_FRACTION to 1.0):
        if (totalFraction <= HERO_SCROLL_FRACTION) {
          // Video stays at start frame while hero zooms out
          targetTime = 0;
          setVideoProgress(0);
        } else {
          // Video scrubs across remaining scroll
          const currentVidProg = (totalFraction - HERO_SCROLL_FRACTION) / (1 - HERO_SCROLL_FRACTION);
          const clampedVidProg = Math.max(0, Math.min(1, currentVidProg));
          setVideoProgress(clampedVidProg);
          if (video.duration) {
            targetTime = clampedVidProg * video.duration;
          }
        }
      }
    };

    const performSeek = () => {
      if (!video || !video.duration) return;
      if (Math.abs(video.currentTime - smoothTime) > 0.01) {
        isSeeking = true;
        video.currentTime = smoothTime;
      }
    };

    const onSeeked = () => {
      isSeeking = false;
      if (Math.abs(video.currentTime - smoothTime) > 0.02) {
        performSeek();
      }
    };

    const renderLoop = () => {
      if (video.duration && !isNaN(targetTime)) {
        const diff = targetTime - smoothTime;
        if (Math.abs(diff) > 0.0005) {
          smoothTime += diff * 0.12;
        } else {
          smoothTime = targetTime;
        }

        if (!isSeeking) {
          performSeek();
        }
      }
      animId = requestAnimationFrame(renderLoop);
    };

    const onLoadedMetadata = () => {
      updateScrollHeight();
      handleScroll();
      smoothTime = targetTime;
      if (!isNaN(targetTime)) {
        video.currentTime = targetTime;
      }
    };

    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('seeked', onSeeked);

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
      video.removeEventListener('seeked', onSeeked);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', onResize);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [videoSrc]);

  // Smooth Navigation Jump Handler
  const handleJumpToSection = (sectionProg) => {
    const docHeight =
      document.documentElement.scrollHeight ||
      document.body.scrollHeight ||
      1;
    const maxScroll = docHeight - window.innerHeight;

    if (maxScroll > 0) {
      // Map section progress into the video phase [HERO_SCROLL_FRACTION -> 1.0]
      const targetTotalFraction = HERO_SCROLL_FRACTION + sectionProg * (1 - HERO_SCROLL_FRACTION);
      const targetScrollY = targetTotalFraction * maxScroll;
      window.scrollTo({
        top: targetScrollY,
        behavior: 'smooth',
      });
    }
  };

  const sections = isMobileView ? MOBILE_SECTIONS : DESKTOP_SECTIONS;

  // Determine active section based on videoProgress
  let activeSection = sections[0];
  let minDiff = Infinity;
  sections.forEach((sec) => {
    const diff = Math.abs(videoProgress - sec.progress);
    if (diff < minDiff) {
      minDiff = diff;
      activeSection = sec;
    }
  });

  const isVideoPhase = heroProgress >= 0.85;
  const sceneContent = SCENE_CONTENT[displayedSceneId] || SCENE_CONTENT.exterior;

  useEffect(() => {
    const story = sceneStoryRef.current;
    if (!story || !isVideoPhase) return undefined;

    const revealItems = story.querySelectorAll('.scene-story__reveal');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set([story, ...revealItems], { autoAlpha: 1, y: 0 });
      return undefined;
    }

    gsap.set(story, { autoAlpha: 0, y: 18 });

    const context = gsap.context(() => {
      gsap.to(story, {
        autoAlpha: 1,
        y: 0,
        duration: 0.65,
        ease: 'power3.out',
      });
      gsap.fromTo(
        revealItems,
        { autoAlpha: 0, y: 14 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.08,
          ease: 'power2.out',
          delay: 0.08,
        }
      );
    }, story);

    return () => context.revert();
  }, [displayedSceneId, isVideoPhase]);

  useEffect(() => {
    const story = sceneStoryRef.current;
    if (!story || !isVideoPhase || activeSection?.id === displayedSceneId) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayedSceneId(activeSection.id);
      return undefined;
    }

    const transition = gsap.to(story, {
      autoAlpha: 0,
      y: -14,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => setDisplayedSceneId(activeSection.id),
    });

    return () => transition.kill();
  }, [activeSection?.id, displayedSceneId, isVideoPhase]);

  return (
    <main className="relative w-full min-h-screen bg-[#050b14]">
      {/* 1. STAGE 1: Hero Section with Zoom-Out / Shrink Effect from heroclone */}
      <HeroSection heroProgress={heroProgress} />

      {/* 2. Top Left Brand Logo (Hidden during Hero Section, appears just after hero zoom out) */}
      <button
        type="button"
        className="brand-logo-container"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        title="Virtueaze - Scroll to Top"
        style={{
          opacity: isVideoPhase ? 1 : 0,
          transform: isVideoPhase ? 'translateY(0)' : 'translateY(-10px)',
          pointerEvents: isVideoPhase ? 'auto' : 'none',
        }}
      >
        <img
          src="/logo.png"
          alt="Virtueaze Logo"
          className="brand-logo-img"
        />
      </button>

      {/* 3. STAGE 2: Background Video Container (Starts after hero zoom-out) */}
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

      {/* 4. Top Header Bar (Scene Indicator - Fades in as Hero completes zoom-out) */}
      <header
        className="top-header-bar"
        style={{
          opacity: isVideoPhase ? 1 : 0,
          transform: isVideoPhase ? 'translateY(0)' : 'translateY(-10px)',
          pointerEvents: isVideoPhase ? 'auto' : 'none',
        }}
      >
        <span className="brand-title">Virtueaze Tower</span>
        <div className="current-scene-badge">
          <span className="scene-dot" />
          <span>{activeSection?.label || 'Explore'}</span>
        </div>
      </header>

      {/* 5. Foreground Content Layer */}
      <div className="content-layer" />

      {/* Scene-specific editorial content follows the active video chapter. */}
      <section
        ref={sceneStoryRef}
        className="scene-story"
        aria-label={`${activeSection?.label || 'Residence'} details`}
        aria-live="polite"
        aria-atomic="true"
        aria-hidden={!isVideoPhase}
        style={{
          opacity: isVideoPhase ? undefined : 0,
          visibility: isVideoPhase ? undefined : 'hidden',
        }}
      >
        <div className="scene-story__eyebrow scene-story__reveal">
          <span className="scene-story__eyebrow-text">{sceneContent.eyebrow}</span>
          <span className="scene-story__rule" aria-hidden="true" />
          <span className="scene-story__chapter">
            {String(sections.findIndex((section) => section.id === displayedSceneId) + 1).padStart(2, '0')}
          </span>
        </div>
        <h1 className="scene-story__title scene-story__reveal">{sceneContent.title}</h1>
        <p className="scene-story__description scene-story__reveal">{sceneContent.description}</p>
        <ul className="scene-story__details scene-story__reveal">
          {sceneContent.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      </section>

      {/* 6. Interactive Navigation Panel (Fades in when video phase is active) */}
      <nav
        className="nav-panel-wrapper"
        aria-label="Scene navigation"
        style={{
          opacity: isVideoPhase ? 1 : 0,
          transform: isVideoPhase ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(20px)',
          pointerEvents: isVideoPhase ? 'auto' : 'none',
        }}
      >
        <div className="nav-panel">
          {sections.map((section) => {
            const isActive = activeSection?.id === section.id;
            return (
              <button
                key={section.id}
                type="button"
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => handleJumpToSection(section.progress)}
                title={`Jump to ${section.label}`}
              >
                <NavIcon name={section.icon} />
                <span className="nav-label">{section.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* 7. Scroll Height Spacer Container */}
      <div
        ref={spacerRef}
        className="scroll-spacer"
        style={{ height: spacerHeight }}
      />
    </main>
  );
}
