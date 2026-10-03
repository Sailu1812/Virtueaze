'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MoveDown } from 'lucide-react';

const EXTERIOR_IMAGE = '/Virtueaze Villa.png';
const BLUEPRINT_IMAGE = '/Virtueaze Villa Blueprint.png';

export default function HeroSection({ heroProgress = 0 }) {
  const heroRef = useRef(null);

  // Smooth brush physics state for hero building
  const [heroPos, setHeroPos] = useState({ x: -500, y: -500 });
  const [smoothHeroPos, setSmoothHeroPos] = useState({ x: -500, y: -500 });
  const [heroIntensity, setHeroIntensity] = useState(0);
  const heroHoverRef = useRef(false);
  const heroLastMoveTime = useRef(0);

  // Smooth animation loop for Hero brush follower & motion decay
  useEffect(() => {
    let animId;
    const updateLoop = () => {
      // Smooth lerp coordinates
      setSmoothHeroPos((prev) => ({
        x: prev.x + (heroPos.x - prev.x) * 0.22,
        y: prev.y + (heroPos.y - prev.y) * 0.22,
      }));

      // Smooth decay when motion stops
      const now = performance.now();
      const timeSinceMove = now - heroLastMoveTime.current;
      const isMoving = heroHoverRef.current && timeSinceMove < 280;

      setHeroIntensity((prev) => {
        const target = isMoving ? 1 : 0;
        const speed = isMoving ? 0.22 : 0.08;
        const next = prev + (target - prev) * speed;
        return Math.abs(next - target) < 0.005 ? target : next;
      });

      animId = requestAnimationFrame(updateLoop);
    };
    animId = requestAnimationFrame(updateLoop);
    return () => cancelAnimationFrame(animId);
  }, [heroPos]);

  // Handle Hero Mouse Move (Position tracking without tilt/wobble)
  const handleHeroMouseMove = (e) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setHeroPos({ x, y });
    heroLastMoveTime.current = performance.now();
    heroHoverRef.current = true;
  };

  const handleHeroMouseEnter = (e) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setHeroPos({ x, y });
    setSmoothHeroPos({ x, y });
    heroLastMoveTime.current = performance.now();
    heroHoverRef.current = true;
  };

  const handleHeroMouseLeave = () => {
    heroHoverRef.current = false;
  };

  // HEROCLONE ZOOM-OUT & SHRINK MATH:
  // Starts at scale 1.0 (fullscreen) -> shrinks to 0.48 -> fades & disappears as heroProgress reaches 1.0
  const clampedProgress = Math.max(0, Math.min(1, heroProgress));

  // Scale: 1.0 (at p=0) -> 0.5 (at p=0.7) -> 0.35 (at p=1.0)
  let heroScale = 1;
  if (clampedProgress <= 0.7) {
    heroScale = 1 - (clampedProgress / 0.7) * 0.5; // 1.0 -> 0.5
  } else {
    heroScale = 0.5 - ((clampedProgress - 0.7) / 0.3) * 0.15; // 0.5 -> 0.35
  }

  // Border Radius: 0px (at p=0) -> 36px (at p=0.6)
  const borderRadiusPx = Math.min(36, (clampedProgress / 0.6) * 36);

  // Y Translation: 0% (at p=0) -> -20% (at p=1.0)
  const heroYPercent = -clampedProgress * 20;

  // Opacity: 1.0 until p=0.65, then fades 1.0 -> 0.0 from p=0.65 to p=1.0
  let heroOpacity = 1;
  if (clampedProgress > 0.65) {
    heroOpacity = Math.max(0, 1 - (clampedProgress - 0.65) / 0.35);
  }

  const isCompletelyHidden = heroOpacity <= 0.005 || clampedProgress >= 1;

  return (
    <div
      className="fixed inset-0 w-full h-full z-20 overflow-hidden flex items-center justify-center pointer-events-none"
      style={{
        opacity: heroOpacity,
        visibility: isCompletelyHidden ? 'hidden' : 'visible',
      }}
    >
      {/* Background Ambient Blueprint Glows during zoom-out */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,240,255,0.08)_0%,rgba(14,165,233,0.03)_50%,transparent_80%)] pointer-events-none" />

      {/* HERO ARCHITECTURE BUILDING */}
      <div
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        onMouseEnter={handleHeroMouseEnter}
        onMouseLeave={handleHeroMouseLeave}
        style={{
          transform: `scale(${heroScale}) translateY(${heroYPercent}%)`,
          borderRadius: `${borderRadiusPx}px`,
          pointerEvents: isCompletelyHidden ? 'none' : 'auto',
        }}
        className="relative w-full h-full overflow-hidden shadow-[0_0_90px_rgba(0,0,0,0.95)] border border-cyan-500/20 select-none bg-black"
      >
        {/* Base Fullscreen Home Exterior Image */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            src={EXTERIOR_IMAGE}
            alt="Modern Architecture Exterior"
            className="w-full h-full object-cover object-center block select-none pointer-events-none"
          />
        </div>

        {/* Hover Mask Reveal Layer - 3D Blueprint Cutaway */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-150 overflow-hidden"
          style={{
            opacity: heroIntensity,
            maskImage:
              smoothHeroPos.x > -200
                ? `radial-gradient(ellipse 280px 160px at ${smoothHeroPos.x}px ${smoothHeroPos.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 45%, rgba(0,0,0,0.35) 75%, transparent 100%)`
                : 'none',
            WebkitMaskImage:
              smoothHeroPos.x > -200
                ? `radial-gradient(ellipse 280px 160px at ${smoothHeroPos.x}px ${smoothHeroPos.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 45%, rgba(0,0,0,0.35) 75%, transparent 100%)`
                : 'none',
          }}
        >
          <img
            src={BLUEPRINT_IMAGE}
            alt="3D Blueprint Cutaway"
            className="w-full h-full object-cover object-center block select-none pointer-events-none"
          />
        </div>

        {/* Soft Ambient Grey/Cyan Brush Glow & Shadow Follower */}
        {smoothHeroPos.x > -200 && (
          <div
            className="absolute pointer-events-none z-30 transition-transform duration-75 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[170px] rounded-[50%] blur-xl rotate-[-12deg] bg-[radial-gradient(ellipse,rgba(225,230,240,0.45)_0%,rgba(0,240,255,0.3)_50%,transparent_75%)] shadow-[0_12px_40px_rgba(0,0,0,0.85)]"
            style={{
              left: `${smoothHeroPos.x}px`,
              top: `${smoothHeroPos.y}px`,
              opacity: heroIntensity * 0.8,
            }}
          />
        )}

        {/* Subtle Gradient Overlays & Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

        {/* Scroll Indicator Down Cue (Swipe up to explore + arrow) */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/80 pointer-events-none z-20 transition-opacity duration-200 select-none"
          style={{
            opacity: Math.max(0, 1 - clampedProgress * 3),
          }}
        >
          <span className="text-[11px] font-mono tracking-widest uppercase text-cyan-300 font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            SWIPE UP TO EXPLORE
          </span>
          <MoveDown className="w-5 h-5 text-cyan-400 animate-bounce drop-shadow-[0_2px_8px_rgba(0,240,255,0.6)]" />
        </div>
      </div>
    </div>
  );
}
