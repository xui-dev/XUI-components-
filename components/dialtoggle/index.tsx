import React, { useState, useId, useCallback } from "react";

export interface DialToggleProps {
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

// 12 ticks corresponding to clock hours 1 through 12 (30° increments)
const TICKS = [
  { hour: 12, angle: 0 },
  { hour: 1, angle: 30 },
  { hour: 2, angle: 60 },
  { hour: 3, angle: 90 },
  { hour: 4, angle: 120 },
  { hour: 5, angle: 150 },
  { hour: 6, angle: 180 },
  { hour: 7, angle: 210 },
  { hour: 8, angle: 240 },
  { hour: 9, angle: 270 },
  { hour: 10, angle: 300 },
  { hour: 11, angle: 330 },
];

/**
 * DialToggle
 * 
 * An XUI precision rotary instrument switch.
 * Employs a circular chassis, radial tick array, and rotating indicator pointer.
 * Toggles between 7 o'clock (OFF) and 1 o'clock (ON).
 */
export const DialToggle: React.FC<DialToggleProps> = ({
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
  const toggleId = providedId || `dial-toggle-${generatedId}`;
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

  // Rotation angles: 7 o'clock = 210°, 1 o'clock = 390° (or 30° with a clean 180° swing)
  // Rotating from 210deg to 390deg gives a natural clockwise arc transition
  const pointerRotation = isChecked ? 390 : 210;

  return (
    <div
      className={`inline-flex flex-col gap-1.5 select-none ${
        disabled ? "opacity-40 cursor-not-allowed" : ""
      } ${className}`}
    >
      <div className="inline-flex items-center gap-3">
        {/* Circular Dial Control */}
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
          className={`group relative flex items-center justify-center w-12 h-12 rounded-full bg-[#0A0D14] border transition-all duration-300 outline-none
            ${
              isChecked
                ? "border-[#2F6BFF]/70 shadow-[0_0_15px_rgba(47,107,255,0.25)]"
                : "border-[#1C2432] shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
            }
            focus-visible:ring-2 focus-visible:ring-[#4D8DFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#05070D]
            ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
          `}
        >
          {/* Radial Tick Array (12 Precision Marks) */}
          <div className="absolute inset-0 pointer-events-none">
            {TICKS.map(({ hour, angle }) => {
              // Highlight active range (between 7 o'clock = 210° clockwise through 12 to 1 o'clock = 30°)
              const isTurnOnArc =
                angle === 210 ||
                angle === 240 ||
                angle === 270 ||
                angle === 300 ||
                angle === 330 ||
                angle === 0 ||
                angle === 30;

              const isHighlighted = isChecked && isTurnOnArc;

              return (
                <div
                  key={hour}
                  className="absolute inset-0 flex justify-center items-start pt-[3px]"
                  style={{
                    transform: `rotate(${angle}deg)`,
                  }}
                >
                  <span
                    className={`w-[1px] rounded-full transition-colors duration-300 ${
                      angle === 30 || angle === 210
                        ? "h-[4.5px] w-[1.5px]" // Primary endpoints slightly larger
                        : "h-[3px]"
                    } ${
                      isHighlighted
                        ? angle === 30
                          ? "bg-[#22D3EE] shadow-[0_0_4px_#22D3EE]"
                          : "bg-[#4D8DFF]"
                        : "bg-[#1C2432]"
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* Inner Dial Face */}
          <div
            className={`relative flex items-center justify-center w-7 h-7 rounded-full bg-[#0F131C] border border-[#1C2432] transition-colors duration-300
              ${isChecked ? "border-[#4D8DFF]/40" : "border-[#1C2432]"}
            `}
          >
            {/* Rotating Indicator Pointer / Needle */}
            <div
              className="absolute inset-0 flex items-start justify-center pt-0.5 transition-transform duration-300 ease-out motion-reduce:transition-none pointer-events-none"
              style={{
                transform: `rotate(${pointerRotation}deg)`,
              }}
            >
              {/* Pointer Tip */}
              <div
                className={`w-[2px] h-3 rounded-full transition-colors duration-250 ${
                  isChecked
                    ? "bg-[#4D8DFF] shadow-[0_0_6px_rgba(77,141,255,0.8)]"
                    : "bg-[#737C8D]"
                }`}
              />
            </div>

            {/* Center Axis & Status LED */}
            <div
              className={`w-2.5 h-2.5 rounded-full border transition-all duration-300 z-10 ${
                isChecked
                  ? "bg-[#22D3EE] border-[#4D8DFF] shadow-[0_0_8px_#22D3EE]"
                  : "bg-[#1C2432] border-[#2A3447]"
              }`}
            />
          </div>

          {/* Exterior Position Guide Notation (Subtle 0 / I) */}
          <span className="absolute -bottom-4 font-mono text-[8px] font-semibold text-[#737C8D] tracking-widest opacity-0 group-hover:opacity-80 transition-opacity duration-200">
            {isChecked ? "PWR.1" : "PWR.0"}
          </span>
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

export default DialToggle;
