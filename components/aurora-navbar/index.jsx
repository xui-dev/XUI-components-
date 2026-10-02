import React, { useState, useRef, useEffect, useCallback, useId } from "react";
import { Compass, Menu, X, ArrowUpRight, Radio } from "lucide-react";

const DEFAULT_AURORA_ITEMS: AuroraNavItem[] = [
  { id: "ecosystem", label: "Ecosystem", href: "#ecosystem" },
  { id: "lumina", label: "Lumina Engine", href: "#lumina" },
  { id: "resonance", label: "Resonance", href: "#resonance" },
  { id: "nodes", label: "Atmospheres", href: "#atmospheres", badge: "Live" },
  { id: "docs", label: "Manifesto", href: "#manifesto" },
];

/**
 * AuroraNavbar
 *
 * An airy, atmospheric navigation bar inspired by northern lights and organic luminescence.
 * Features a dynamic gliding emerald backlight behind the active item, organic circular branding,
 * and an expansive layout with pure deep emerald tones.
 */
export const AuroraNavbar: React.FC<AuroraNavbarProps> = ({
  items = DEFAULT_AURORA_ITEMS,
  logo,
  action,
  onItemClick,
  activeIndex: controlledActiveIndex,
  defaultActiveIndex = 0,
  statusLabel = "AURORA MESH ACTIVE",
  className = "",
}) => {
  const generatedId = useId();
  const [internalActiveIndex, setInternalActiveIndex] = useState(defaultActiveIndex);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeIdx = controlledActiveIndex !== undefined ? controlledActiveIndex : internalActiveIndex;
  const navContainerRef = useRef(null);
  const itemRefs = useRef([]);

  // Sliding backlight state (coords & dimensions)
  const [backlightStyle, setBacklightStyle] = useState({ left: 0, width: 0, opacity: 0 });

  const currentHighlightIdx = hoveredIndex !== null ? hoveredIndex : activeIdx;

  // Recalculate the position of the atmospheric gliding highlight
  const updateBacklight = useCallback(() => {
    if (navContainerRef.current && itemRefs.current[currentHighlightIdx]) {
      const parentRect = navContainerRef.current.getBoundingClientRect();
      const targetRect = itemRefs.current[currentHighlightIdx]!.getBoundingClientRect();
      setBacklightStyle({
        left: targetRect.left - parentRect.left,
        width: targetRect.width,
        opacity: 1,
      });
    }
  }, [currentHighlightIdx]);

  useEffect(() => {
    updateBacklight();
    window.addEventListener("resize", updateBacklight);
    return () => window.removeEventListener("resize", updateBacklight);
  }, [updateBacklight]);

  // Handle ESC key for mobile drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const handleItemSelect = (item: AuroraNavItem, idx: number, e: React.MouseEvent) => {
    if (item.disabled) {
      e.preventDefault();
      return;
    }
    if (controlledActiveIndex === undefined) {
      setInternalActiveIndex(idx);
    }
    onItemClick?.(item, idx, e);
    setMobileMenuOpen(false);
  };

  return (
    <header
      role="banner"
      className={`w-full bg-[#06110E] border-b border-[#18352D] relative z-40 transition-colors duration-300 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between gap-6">
        {/* Organic Aurora Brand Mark */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {logo ? (
            logo
          ) : (
            <a
              href="#home"
              aria-label="Aurora Home"
              className="group flex items-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-[#A7F3D0] rounded-full"
            >
              {/* Minimal organic circular mark with breathing inner glow */}
              <div className="relative w-8 h-8 rounded-full bg-[#0A1814] border border-[#18352D] flex items-center justify-center transition-all duration-300 group-hover:border-[#34D399]/60 shadow-[0_0_12px_rgba(52,211,153,0.15)]">
                <div className="w-3 h-3 rounded-full bg-[#34D399] transition-transform duration-300 group-hover:scale-125 shadow-[0_0_10px_#34D399]" />
                <div className="absolute inset-0 rounded-full border border-[#84CC16]/30 animate-ping opacity-20 pointer-events-none" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium tracking-widest text-[#ECFDF5] uppercase">
                  Aurora
                </span>
                <span className="text-[10px] tracking-wider text-[#71958A] font-mono -mt-0.5">
                  ATMOSPHERE
                </span>
              </div>
            </a>
          )}
        </div>

        {/* Wide, Airy Desktop Navigation with Sliding Atmospheric Light */}
        <nav
          aria-label="Aurora Primary Navigation"
          className="hidden md:flex items-center relative"
        >
          <div
            ref={navContainerRef}
            onMouseLeave={() => setHoveredIndex(null)}
            className="relative flex items-center gap-2 p-1.5 rounded-full bg-[#0A1814]/80 border border-[#18352D]/80"
          >
            {/* The Gliding Soft Aurora Backlight (Passes smoothly behind links) */}
            <div
              style={{
                transform: `translateX(${backlightStyle.left}px)`,
                width: `${backlightStyle.width}px`,
                opacity: backlightStyle.opacity,
              }}
              className="absolute top-1.5 bottom-1.5 left-0 rounded-full transition-all duration-300 ease-out pointer-events-none
                bg-[#122A22] border border-[#1F493D] shadow-[0_0_14px_rgba(52,211,153,0.18)]"
            >
              {/* Subtle upper emerald aurora ray */}
              <div className="absolute -top-[1px] left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#A7F3D0] to-transparent opacity-80" />
            </div>

            {items.map((item, idx) => {
              const isSelected = activeIdx === idx;
              return (
                <a
                  key={item.id || item.href || idx}
                  ref={(el) => (itemRefs.current[idx] = el)}
                  href={item.href}
                  id={`aurora-link-${generatedId}-${idx}`}
                  aria-current={isSelected ? "page" : undefined}
                  aria-disabled={item.disabled}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onClick={(e) => handleItemSelect(item, idx, e)}
                  className={`relative z-10 flex items-center gap-2 px-5 py-2 rounded-full text-xs tracking-wide transition-colors duration-200 outline-none
                    focus-visible:ring-1 focus-visible:ring-[#A7F3D0]
                    ${
                      item.disabled
                        ? "opacity-40 cursor-not-allowed text-[#71958A]"
                        : isSelected
                        ? "text-[#A7F3D0] font-semibold"
                        : "text-[#71958A] hover:text-[#ECFDF5] font-normal"
                    }
                  `}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#84CC16]/15 text-[#84CC16] border border-[#84CC16]/30 font-mono">
                      {item.badge}
                    </span>
                  )}
                </a>
              );
            })}
          </div>
        </nav>

        {/* Right Status / Telemetry Action Area */}
        <div className="hidden md:flex items-center gap-4 flex-shrink-0">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0A1814] border border-[#18352D] text-[11px] font-mono text-[#71958A]">
            <Radio className="w-3 h-3 text-[#34D399] animate-pulse" />
            <span className="tracking-tight">{statusLabel}</span>
          </div>

          {action ? (
            action
          ) : (
            <a
              href="#launch"
              className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#122E25] hover:bg-[#183D31] text-[#A7F3D0] border border-[#235345] hover:border-[#34D399] text-xs font-medium tracking-wide transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#A7F3D0] shadow-[0_0_12px_rgba(52,211,153,0.12)] active:scale-95"
            >
              <span>Explore Portal</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )}
        </div>

        {/* Mobile Hamburger / Toggle Trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-controls={`aurora-mobile-menu-${generatedId}`}
            aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-[#0A1814] border border-[#18352D] text-[#A7F3D0] outline-none focus-visible:ring-2 focus-visible:ring-[#A7F3D0] active:scale-95"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Full-width Expanding Mobile Navigation Panel */}
      {mobileMenuOpen && (
        <div
          id={`aurora-mobile-menu-${generatedId}`}
          role="dialog"
          aria-modal="true"
          aria-label="Aurora Mobile Navigation"
          className="md:hidden w-full bg-[#06110E]/98 backdrop-blur-xl border-b border-[#18352D] px-6 py-6 animate-in slide-in-from-top-2 duration-200"
        >
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#18352D]">
            <div className="flex items-center gap-2 text-xs font-mono text-[#71958A]">
              <div className="w-2 h-2 rounded-full bg-[#34D399] shadow-[0_0_6px_#34D399]" />
              <span>{statusLabel}</span>
            </div>
            <span className="text-[10px] text-[#84CC16] font-mono tracking-widest uppercase">
              GRID READY
            </span>
          </div>

          <nav aria-label="Mobile Navigation List" className="flex flex-col gap-2">
            {items.map((item, idx) => {
              const isSelected = activeIdx === idx;
              return (
                <a
                  key={item.id || item.href || idx}
                  href={item.href}
                  aria-current={isSelected ? "page" : undefined}
                  onClick={(e) => handleItemSelect(item, idx, e)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm tracking-wide transition-all ${
                    isSelected
                      ? "bg-[#0A1814] text-[#A7F3D0] font-semibold border border-[#1F493D] shadow-[0_0_12px_rgba(52,211,153,0.1)]"
                      : "text-[#71958A] hover:text-[#ECFDF5] hover:bg-[#0A1814]/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isSelected ? "bg-[#84CC16]" : "bg-transparent border border-[#71958A]"
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#84CC16]/20 text-[#84CC16] font-mono">
                      {item.badge}
                    </span>
                  )}
                </a>
              );
            })}
          </nav>

          <div className="mt-6 pt-5 border-t border-[#18352D] flex flex-col gap-3">
            {action ? (
              action
            ) : (
              <a
                href="#launch"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#122E25] text-[#A7F3D0] border border-[#235345] text-xs font-medium tracking-wider uppercase transition-colors"
              >
                <span>Launch Aurora Portal</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
};