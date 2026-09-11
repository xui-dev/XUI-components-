"use client";

import React, { useState } from "react";
import { Home, Compass, Layers, Sparkles, Settings } from "lucide-react";

const NAV_ITEMS = [
  { icon: Home, label: "Home" },
  { icon: Compass, label: "Explore" },
  { icon: Layers, label: "Components" },
  { icon: Sparkles, label: "Showcase" },
  { icon: Settings, label: "Settings" },
];

export default function FloatingLiquidDock() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <nav className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-[#121218]/80 backdrop-blur-2xl border border-white/[0.15] shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
      {NAV_ITEMS.map((item, i) => {
        const Icon = item.icon;
        const isHovered = hovered === i;
        return (
          <button
            key={item.label}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="relative p-2.5 rounded-xl text-neutral-400 hover:text-white hover:bg-white/[0.1] transition-all duration-200 cursor-pointer group"
          >
            <Icon
              className={`w-5 h-5 transition-transform duration-200 ${
                isHovered ? "scale-125 text-blue-400" : ""
              }`}
            />
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/90 text-white text-[10px] px-2 py-0.5 rounded border border-white/10 pointer-events-none whitespace-nowrap">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
