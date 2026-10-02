import React, { useState, useId, useCallback } from "react";

export interface MatrixToggleProps {
  /** Controlled checked state */
  checked?: boolean;
  /** Uncontrolled initial state */
  defaultChecked?: boolean;
  /** Callback fired when state toggles */
  onChange?: (checked: boolean) => void;
  /** Disables interaction */
  disabled?: boolean;
  /** Accessible label displayed beside or above the switch */
  label?: string;
  /** Secondary technical description */
  description?: string;
  /** Additional custom container styling */
  className?: string;
  /** Unique ID for element linking */
  id?: string;
  /** Form submission field name */
  name?: string;
}

// 3x3 Grid Cell definitions with symmetric radial tiers
// Tier 0: Center (1,1) -> lights up first
// Tier 1: Cardinal cross (Top, Left, Right, Bottom) -> lights up second
// Tier 2: Diagonal corners -> lights up third
const MATRIX_CELLS = [
  { row: 0, col: 0, tier: 2 }, // Top-Left
  { row: 0, col: 1, tier: 1 }, // Top-Center
  { row: 0, col: 2, tier: 2 }, // Top-Right
  { row: 1, col: 0, tier: 1 }, // Mid-Left
  { row: 1, col: 1, tier: 0 }, // Center
  { row: 1, col: 2, tier: 1 }, // Mid-Right
  { row: 2, col: 0, tier: 2 }, // Bottom-Left
  { row: 2, col: 1, tier: 1 }, // Bottom-Center
  { row: 2, col: 2, tier: 2 }, // Bottom-Right
];

/**
 * MatrixToggle
 * 
 * An XUI technical matrix/grid toggle switch.
 * Features a unified 3x3 cell array that cascades symmetric activation
 * outward from the center node, forming a precision grid state.
 */
export const MatrixToggle: React.FC<MatrixToggleProps> = ({
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  disabled = false,
  label,
  description,
  className = "",
  id: providedId,
  name,
}) => {
  const generatedId = useId();
  const toggleId = providedId || `matrix-toggle-${generatedId}`;
  const labelId = `${toggleId}-label`;
  const descId = `${toggleId}-desc`;

  const isControlled = controlledChecked !== undefined;
  const [internalChecked, setInternalChecked] = useState<boolean>(defaultChecked);
  const isChecked = isControlled ? controlledChecked : internalChecked;

  const handleToggle = useCallback(() => {
    if (disabled) return;
    const nextState = !isChecked;
    if (!isControlled) {
      setInternalChecked(nextState);
    }
    onChange?.(nextState);
  }, [disabled, isChecked, isControlled, onChange]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) return;
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        handleToggle();
      }
    },
    [disabled, handleToggle]
  );

  return (
    <div
      className={`inline-flex flex-col gap-1.5 select-none ${
        disabled ? "opacity-40 cursor-not-allowed" : ""
      } ${className}`}
    >
      <div className="inline-flex items-center gap-3">
        {/* Unified 3x3 Matrix Button */}
        <button
          type="button"
          role="switch"
          id={toggleId}
          name={name}
          aria-checked={isChecked}
          aria-disabled={disabled}
          aria-labelledby={label ? labelId : undefined}
          aria-describedby={description ? descId : undefined}
          disabled={disabled}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          className={`group relative inline-flex items-center p-2 rounded-sm bg-[#05070D] border transition-all duration-200 outline-none
            ${
              isChecked
                ? "border-[#2F6BFF]/70 shadow-[inset_0_1px_3px_rgba(0,0,0,0.6),0_0_12px_rgba(47,107,255,0.2)]"
                : "border-[#1C2432] shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)]"
            }
            focus-visible:ring-2 focus-visible:ring-[#4D8DFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070D]
            ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
          `}
        >
          {/* 3x3 Grid Cells Container */}
          <div className="grid grid-cols-3 gap-1 p-1 bg-[#0A0D14] rounded-sm border border-[#1C2432]">
            {MATRIX_CELLS.map((cell) => {
              // Progressive timing:
              // ON: Center (Tier 0: 0ms) -> Cross (Tier 1: 50ms) -> Corners (Tier 2: 100ms)
              // OFF: Reverse: Corners (0ms) -> Cross (40ms) -> Center (80ms)
              const forwardDelay = cell.tier * 50;
              const reverseDelay = (2 - cell.tier) * 40;
              const delay = isChecked ? forwardDelay : reverseDelay;

              // Cell color configuration based on tier
              let activeBg = "bg-[#2F6BFF]";
              let activeBorder = "border-[#4D8DFF]";
              let activeShadow = "";

              if (cell.tier === 0) {
                // Center core
                activeBg = "bg-[#22D3EE]";
                activeBorder = "border-[#22D3EE]";
                activeShadow = "shadow-[0_0_6px_#22D3EE]";
              } else if (cell.tier === 1) {
                // Cardinal cross
                activeBg = "bg-[#4D8DFF]";
                activeBorder = "border-[#4D8DFF]";
                activeShadow = "shadow-[0_0_4px_rgba(77,141,255,0.6)]";
              } else {
                // Corners
                activeBg = "bg-[#1C2C4E]";
                activeBorder = "border-[#2F6BFF]/60";
              }

              return (
                <div
                  key={`${cell.row}-${cell.col}`}
                  className={`w-2.5 h-2.5 rounded-[1px] border transition-all duration-150 ease-out motion-reduce:transition-none ${
                    isChecked
                      ? `${activeBg} ${activeBorder} ${activeShadow} scale-100`
                      : "bg-[#0F131C] border-[#1C2432] scale-95"
                  }`}
                  style={{
                    transitionDelay: `${delay}ms`,
                  }}
                />
              );
            })}
          </div>

          {/* Technical Matrix Tag and Telemetry */}
          <div className="flex flex-col items-start pl-2.5 pr-1 gap-0.5">
            <span className="font-mono text-[8px] text-[#737C8D] uppercase tracking-wider">
              SYS.MTX
            </span>
            <span
              className={`font-mono text-[9px] font-semibold tracking-wider transition-colors duration-200 ${
                isChecked ? "text-[#22D3EE]" : "text-[#3B4352]"
              }`}
            >
              {isChecked ? "[ACTV]" : "[IDLE]"}
            </span>
          </div>
        </button>

        {/* Primary Label */}
        {label && (
          <label
            id={labelId}
            htmlFor={toggleId}
            onClick={handleToggle}
            className={`text-sm font-medium text-[#E7EAF0] select-none ${
              disabled ? "cursor-not-allowed text-[#737C8D]" : "cursor-pointer hover:text-white"
            }`}
          >
            {label}
          </label>
        )}
      </div>

      {/* Technical Secondary Description */}
      {description && (
        <p id={descId} className="text-xs text-[#737C8D] pl-0.5">
          {description}
        </p>
      )}
    </div>
  );
};

export default MatrixToggle;
