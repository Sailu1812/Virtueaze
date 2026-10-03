'use client';

import React from 'react';

export default function IsometricCutawayFloorPlan({ className = '', customImageUrl }) {
  if (customImageUrl) {
    return (
      <div className={`relative w-full h-full bg-[#0d1522] ${className}`}>
        <img
          src={customImageUrl}
          alt="3D Floor Plan Cutaway"
          className="w-full h-full object-cover object-center"
        />
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full bg-[#09111e] flex items-center justify-center overflow-hidden select-none ${className}`}>
      {/* CAD Blueprint Grid Pattern */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 240, 255, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 240, 255, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
        }}
      />
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 240, 255, 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 240, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '160px 160px',
        }}
      />

      {/* 3D Isometric Architectural Cutaway Model (SVG Render) */}
      <svg
        viewBox="0 0 1200 700"
        className="w-full h-full max-w-[1400px] object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.9)]"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Wall gradients */}
          <linearGradient id="wallTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="wallSide" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          <linearGradient id="floorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f1f38" />
            <stop offset="50%" stopColor="#132742" />
            <stop offset="100%" stopColor="#0a172a" />
          </linearGradient>
          <linearGradient id="garageFloor" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e2430" />
            <stop offset="100%" stopColor="#111622" />
          </linearGradient>
          <linearGradient id="grassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#064e3b" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#022c22" stopOpacity="0.8" />
          </linearGradient>

          {/* Glowing HUD Filters */}
          <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- 1. OUTER GROUNDS & DRIVEWAY --- */}
        {/* Stone Driveway & Front Steps */}
        <polygon points="560,540 1020,540 1140,680 440,680" fill="#1e293b" opacity="0.6" stroke="#00F0FF" strokeWidth="1" strokeOpacity="0.3" />
        {/* Driveway paver grid */}
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={`p-h-${i}`}
            x1={560 - i * 15}
            y1={540 + i * 18}
            x2={1020 + i * 15}
            y2={540 + i * 18}
            stroke="#00F0FF"
            strokeWidth="0.75"
            strokeOpacity="0.2"
          />
        ))}

        {/* Front Lawn / Landscape Buffer */}
        <polygon points="120,540 540,540 420,680 60,680" fill="url(#grassGrad)" stroke="#10b981" strokeWidth="1" strokeOpacity="0.3" />

        {/* --- 2. MAIN CUTAWAY FOUNDATION SLAB --- */}
        <polygon
          points="180,100 1020,100 1020,540 180,540"
          fill="url(#floorGrad)"
          stroke="#00F0FF"
          strokeWidth="2.5"
          filter="url(#cyanGlow)"
        />

        {/* Floor Plank Lines */}
        {Array.from({ length: 15 }).map((_, i) => (
          <line
            key={`fl-${i}`}
            x1={180}
            y1={130 + i * 27}
            x2={800}
            y2={130 + i * 27}
            stroke="#38bdf8"
            strokeWidth="0.5"
            strokeOpacity="0.15"
          />
        ))}

        {/* --- 3. ROOM PARTITIONS & THICK CUTAWAY WALLS --- */}
        {/* Garage Slab */}
        <polygon points="800,280 1010,280 1010,530 800,530" fill="url(#garageFloor)" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="6 3" />

        {/* External Perimeter Cutaway Wall (Thick architectural double-line) */}
        <rect x="180" y="100" width="840" height="440" fill="none" stroke="#00F0FF" strokeWidth="6" rx="4" />
        <rect x="188" y="108" width="824" height="424" fill="none" stroke="#00F0FF" strokeWidth="1.5" strokeOpacity="0.4" />

        {/* INTERIOR WALL DIVIDERS (Thick CAD walls) */}
        {/* Top-left: Bedroom 2 Wall */}
        <path d="M 380 100 L 380 250 L 180 250" fill="none" stroke="#00F0FF" strokeWidth="5" />

        {/* Bathroom 1 Wall */}
        <path d="M 180 340 L 360 340 L 360 250" fill="none" stroke="#00F0FF" strokeWidth="4" />

        {/* Bottom-left: Bedroom 3 Wall */}
        <path d="M 180 440 L 360 440" fill="none" stroke="#00F0FF" strokeWidth="4" />

        {/* Center-bottom: Bedroom 4 Wall */}
        <path d="M 360 540 L 360 340 L 500 340 L 500 540" fill="none" stroke="#00F0FF" strokeWidth="5" />

        {/* Kitchen/Dining Partition */}
        <path d="M 380 100 L 380 260 L 600 260 L 600 100" fill="none" stroke="#00F0FF" strokeWidth="5" />

        {/* Top-right: Bedroom 1 (Master Bedroom) */}
        <path d="M 600 100 L 600 260 L 800 260 L 800 100" fill="none" stroke="#00F0FF" strokeWidth="5" />

        {/* Ensuite & Bathroom 2 Wall */}
        <path d="M 600 260 L 600 340 L 800 340" fill="none" stroke="#00F0FF" strokeWidth="4" />

        {/* Garage Dividing Wall */}
        <path d="M 800 280 L 800 540" fill="none" stroke="#00F0FF" strokeWidth="6" />

        {/* --- 4. 3D CUTAWAY INTERIOR FURNITURE & FIXTURES --- */}
        {/* BEDROOM 2 (Top Left: 11' x 10') */}
        <g id="bedroom-2">
          {/* Bed */}
          <rect x="200" y="120" width="80" height="95" rx="4" fill="#1e293b" stroke="#38BDF8" strokeWidth="1.5" />
          {/* Pillows */}
          <rect x="208" y="126" width="28" height="16" rx="3" fill="#334155" stroke="#38BDF8" strokeWidth="1" />
          <rect x="244" y="126" width="28" height="16" rx="3" fill="#334155" stroke="#38BDF8" strokeWidth="1" />
          {/* Wardrobe */}
          <rect x="330" y="112" width="40" height="70" fill="#0f172a" stroke="#00F0FF" strokeWidth="1" />
          {/* Label */}
          <text x="290" y="170" fill="#E2E8F0" fontSize="13" fontWeight="700" textAnchor="middle" fontFamily="monospace">BEDROOM 2</text>
          <text x="290" y="188" fill="#00F0FF" fontSize="11" textAnchor="middle" fontFamily="monospace">11&apos; x 10&apos;</text>
        </g>

        {/* BATHROOM 1 (Mid Left: 9' x 5') */}
        <g id="bathroom-1">
          {/* Vanity & Sink */}
          <rect x="195" y="265" width="45" height="30" rx="3" fill="#1e293b" stroke="#38BDF8" strokeWidth="1" />
          <circle cx="217" cy="280" r="8" fill="none" stroke="#00F0FF" strokeWidth="1" />
          {/* Bathtub/Shower */}
          <rect x="280" y="265" width="70" height="40" rx="6" fill="#0f172a" stroke="#38BDF8" strokeWidth="1.5" />
          <text x="270" y="325" fill="#E2E8F0" fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="monospace">BATH</text>
          <text x="270" y="338" fill="#00F0FF" fontSize="10" textAnchor="middle" fontFamily="monospace">9&apos; x 5&apos;</text>
        </g>

        {/* BEDROOM 3 (Bottom Left: 11' x 10') */}
        <g id="bedroom-3">
          {/* Bed */}
          <rect x="200" y="420" width="80" height="95" rx="4" fill="#1e293b" stroke="#38BDF8" strokeWidth="1.5" />
          <rect x="208" y="490" width="28" height="16" rx="3" fill="#334155" stroke="#38BDF8" strokeWidth="1" />
          <rect x="244" y="490" width="28" height="16" rx="3" fill="#334155" stroke="#38BDF8" strokeWidth="1" />
          <text x="270" y="390" fill="#E2E8F0" fontSize="13" fontWeight="700" textAnchor="middle" fontFamily="monospace">BEDROOM 3</text>
          <text x="270" y="408" fill="#00F0FF" fontSize="11" textAnchor="middle" fontFamily="monospace">11&apos; x 10&apos;</text>
        </g>

        {/* BEDROOM 4 (Bottom Center: 11' x 10') */}
        <g id="bedroom-4">
          <rect x="375" y="420" width="80" height="95" rx="4" fill="#1e293b" stroke="#38BDF8" strokeWidth="1.5" />
          <rect x="383" y="490" width="28" height="16" rx="3" fill="#334155" stroke="#38BDF8" strokeWidth="1" />
          <rect x="419" y="490" width="28" height="16" rx="3" fill="#334155" stroke="#38BDF8" strokeWidth="1" />
          <text x="430" y="380" fill="#E2E8F0" fontSize="13" fontWeight="700" textAnchor="middle" fontFamily="monospace">BEDROOM 4</text>
          <text x="430" y="398" fill="#00F0FF" fontSize="11" textAnchor="middle" fontFamily="monospace">11&apos; x 10&apos;</text>
        </g>

        {/* KITCHEN (Top Center: 14' x 9') */}
        <g id="kitchen">
          {/* Kitchen Counter & Stovetop */}
          <rect x="395" y="112" width="190" height="40" fill="#1e293b" stroke="#00F0FF" strokeWidth="1.5" />
          <rect x="420" y="118" width="40" height="26" rx="2" fill="#0f172a" stroke="#38BDF8" strokeWidth="1" />
          {/* Kitchen Island */}
          <rect x="420" y="180" width="140" height="48" rx="4" fill="#1e293b" stroke="#00F0FF" strokeWidth="1.5" />
          {/* Barstools */}
          {[445, 475, 505, 535].map((cx, i) => (
            <circle key={`stool-${i}`} cx={cx} cy={240} r="7" fill="#334155" stroke="#38BDF8" strokeWidth="1" />
          ))}
          <text x="490" y="145" fill="#E2E8F0" fontSize="13" fontWeight="700" textAnchor="middle" fontFamily="monospace">KITCHEN</text>
          <text x="490" y="162" fill="#00F0FF" fontSize="11" textAnchor="middle" fontFamily="monospace">14&apos; x 9&apos;</text>
        </g>

        {/* DINING AREA (Center: 16' x 7') */}
        <g id="dining">
          {/* Dining Table */}
          <rect x="430" y="290" width="120" height="70" rx="6" fill="#1e293b" stroke="#38BDF8" strokeWidth="1.5" />
          {/* Chairs */}
          {[455, 490, 525].map((cx, i) => (
            <React.Fragment key={`chair-${i}`}>
              <rect x={cx - 12} y={270} width="24" height="14" rx="2" fill="#334155" stroke="#38BDF8" strokeWidth="1" />
              <rect x={cx - 12} y={366} width="24" height="14" rx="2" fill="#334155" stroke="#38BDF8" strokeWidth="1" />
            </React.Fragment>
          ))}
          <text x="490" y="325" fill="#E2E8F0" fontSize="13" fontWeight="700" textAnchor="middle" fontFamily="monospace">DINING</text>
          <text x="490" y="342" fill="#00F0FF" fontSize="11" textAnchor="middle" fontFamily="monospace">16&apos; x 7&apos;</text>
        </g>

        {/* MASTER BEDROOM 1 (Top Right: 14' x 10') */}
        <g id="bedroom-1">
          {/* Master King Bed */}
          <rect x="630" y="120" width="100" height="95" rx="4" fill="#1e293b" stroke="#00F0FF" strokeWidth="1.5" />
          <rect x="642" y="126" width="34" height="18" rx="3" fill="#334155" stroke="#38BDF8" strokeWidth="1" />
          <rect x="686" y="126" width="34" height="18" rx="3" fill="#334155" stroke="#38BDF8" strokeWidth="1" />
          {/* Nightstands */}
          <rect x="612" y="122" width="14" height="24" rx="2" fill="#1e293b" stroke="#38BDF8" strokeWidth="1" />
          <rect x="734" y="122" width="14" height="24" rx="2" fill="#1e293b" stroke="#38BDF8" strokeWidth="1" />
          <text x="680" y="180" fill="#E2E8F0" fontSize="13" fontWeight="700" textAnchor="middle" fontFamily="monospace">BEDROOM 1</text>
          <text x="680" y="198" fill="#00F0FF" fontSize="11" textAnchor="middle" fontFamily="monospace">14&apos; x 10&apos; (MASTER)</text>
        </g>

        {/* ENSUITE BATHROOM (Mid Right: 8' x 5') */}
        <g id="ensuite">
          <rect x="620" y="270" width="165" height="60" fill="#132742" stroke="#38BDF8" strokeWidth="1" />
          {/* Double Vanity */}
          <circle cx="650" cy="295" r="9" fill="none" stroke="#00F0FF" strokeWidth="1" />
          <circle cx="690" cy="295" r="9" fill="none" stroke="#00F0FF" strokeWidth="1" />
          {/* Walk-in Shower */}
          <rect x="730" y="275" width="45" height="50" rx="3" fill="none" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x="700" y="325" fill="#E2E8F0" fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="monospace">ENSUITE</text>
          <text x="700" y="338" fill="#00F0FF" fontSize="10" textAnchor="middle" fontFamily="monospace">8&apos; x 5&apos;</text>
        </g>

        {/* LIVING ROOM & SEATING */}
        <g id="living-room">
          {/* Modern Sectional Sofa */}
          <path d="M 540 420 L 640 420 L 640 500 L 600 500 L 600 460 L 540 460 Z" fill="#1e293b" stroke="#38BDF8" strokeWidth="1.5" />
          {/* Coffee Table */}
          <rect x="560" y="475" width="30" height="20" rx="2" fill="#334155" stroke="#00F0FF" strokeWidth="1" />
          {/* Media Console */}
          <rect x="540" y="525" width="80" height="10" fill="#0f172a" stroke="#38BDF8" strokeWidth="1" />
          <text x="670" y="460" fill="#E2E8F0" fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="monospace">LIVING ROOM</text>
        </g>

        {/* GARAGE WITH SILVER LUXURY SUV (Right: Attached Garage) */}
        <g id="garage">
          {/* Garage Wall Frame */}
          <rect x="805" y="285" width="200" height="245" fill="#111827" stroke="#38BDF8" strokeWidth="1.5" />
          
          {/* 3D Car Vector (Silver SUV Top-down Cutaway) */}
          {/* Car Shadow */}
          <ellipse cx="905" cy="425" rx="55" ry="85" fill="#000000" opacity="0.6" filter="url(#cyanGlow)" />
          {/* Car Body */}
          <rect x="860" y="350" width="90" height="150" rx="22" fill="#334155" stroke="#00F0FF" strokeWidth="2" />
          {/* Windshield */}
          <path d="M 870 380 Q 905 375 940 380 L 935 410 Q 905 405 875 410 Z" fill="#0f172a" stroke="#38BDF8" strokeWidth="1" />
          {/* Rear Window */}
          <path d="M 872 470 Q 905 465 938 470 L 935 485 Q 905 480 875 485 Z" fill="#0f172a" stroke="#38BDF8" strokeWidth="1" />
          {/* Sunroof */}
          <rect x="880" y="420" width="50" height="35" rx="4" fill="#1e293b" stroke="#00F0FF" strokeWidth="1" />
          {/* Headlights */}
          <ellipse cx="870" cy="355" rx="6" ry="3" fill="#00F0FF" />
          <ellipse cx="940" cy="355" rx="6" ry="3" fill="#00F0FF" />
          {/* Taillights */}
          <rect x="868" y="495" width="15" height="3" fill="#ef4444" />
          <rect x="927" y="495" width="15" height="3" fill="#ef4444" />

          {/* Garage Text */}
          <text x="905" y="325" fill="#E2E8F0" fontSize="14" fontWeight="700" textAnchor="middle" fontFamily="monospace">GARAGE</text>
          <text x="905" y="342" fill="#00F0FF" fontSize="11" textAnchor="middle" fontFamily="monospace">ATTACHED PARKING</text>
        </g>

        {/* FRONT PORCH & ENTRYWAY */}
        <g id="porch">
          {/* Porch steps */}
          <rect x="460" y="540" width="80" height="25" fill="#1e293b" stroke="#00F0FF" strokeWidth="1.5" />
          <rect x="470" y="565" width="60" height="15" fill="#334155" stroke="#38BDF8" strokeWidth="1" />
          {/* Entrance Door & Threshold */}
          <path d="M 500 540 L 530 515" stroke="#00F0FF" strokeWidth="2.5" />
          <path d="M 500 540 A 30 30 0 0 1 530 540" fill="none" stroke="#00F0FF" strokeWidth="1" strokeDasharray="3 3" />
          <text x="500" y="598" fill="#38BDF8" fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="monospace">PORCH / ENTRY</text>
        </g>

        {/* DIMENSION ANNOTATIONS & CAD SPECS */}
        {/* Top Total Width Dimension */}
        <line x1="180" y1="70" x2="1020" y2="70" stroke="#00F0FF" strokeWidth="1" />
        <line x1="180" y1="60" x2="180" y2="80" stroke="#00F0FF" strokeWidth="1" />
        <line x1="1020" y1="60" x2="1020" y2="80" stroke="#00F0FF" strokeWidth="1" />
        <text x="600" y="62" fill="#00F0FF" fontSize="12" textAnchor="middle" fontFamily="monospace">TOTAL WIDTH: 68&apos;-0&quot; [20.73m]</text>

        {/* Left Total Depth Dimension */}
        <line x1="140" y1="100" x2="140" y2="540" stroke="#00F0FF" strokeWidth="1" />
        <line x1="130" y1="100" x2="150" y2="100" stroke="#00F0FF" strokeWidth="1" />
        <line x1="130" y1="540" x2="150" y2="540" stroke="#00F0FF" strokeWidth="1" />
        <text x="130" y="325" fill="#00F0FF" fontSize="12" textAnchor="middle" fontFamily="monospace" transform="rotate(-90 130 325)">TOTAL DEPTH: 42&apos;-0&quot; [12.80m]</text>

        {/* Architectural Seal / Title Block (Bottom Right) */}
        <rect x="940" y="600" width="220" height="70" fill="#0b1320" stroke="#00F0FF" strokeWidth="1.5" />
        <text x="955" y="622" fill="#00F0FF" fontSize="10" fontWeight="700" fontFamily="monospace">PROJECT: MODERN VILLA</text>
        <text x="955" y="638" fill="#94A3B8" fontSize="9" fontFamily="monospace">DWG: 3D CUTAWAY FLOOR PLAN</text>
        <text x="955" y="654" fill="#38BDF8" fontSize="9" fontFamily="monospace">SCALE: 1:50 | STATUS: APPROVED</text>
      </svg>
    </div>
  );
}
