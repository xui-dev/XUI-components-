import React, { useId, useState } from 'react';

export const TerminalCheckbox: React.FC<CheckboxProps> = ({
  id: customId,
  name,
  value,
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  required = false,
  label = 'enable_feature',
  description,
  className = '',
  promptSymbol = '>',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
}) => {
  const generatedId = useId();
  const inputId = customId || `xui-terminal-${generatedId}`;
  const descriptionId = description ? `${inputId}-desc` : undefined;

  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isChecked = checked !== undefined ? checked : internalChecked;

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const nextState = e.target.checked;
    if (checked === undefined) {
      setInternalChecked(nextState);
    }
    onChange?.(nextState);
  };

  return (
    <label
      htmlFor={inputId}
      className={`group relative flex flex-col gap-1 w-full max-w-md select-none font-mono text-xs sm:text-sm ${
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
      } ${className}`}
    >
      {/* Hidden Native Checkbox for Screen Readers & Keyboard Access */}
      <input
        type="checkbox"
        id={inputId}
        name={name}
        value={value}
        checked={isChecked}
        onChange={handleToggle}
        disabled={disabled}
        required={required}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby || descriptionId}
        className="sr-only peer"
      />

      {/* Terminal Command Row Container */}
      <div
        className={`relative flex items-center justify-between gap-3 px-3 py-2 rounded-[4px] border bg-[#0A0D14] transition-all duration-200 ${
          disabled
            ? 'border-[#1C2432] bg-[#0A0D14]'
            : isChecked
            ? 'border-[#1C2432] bg-[#0F131C] group-hover:border-[#2F6BFF]/50 group-hover:bg-[#0F131C]'
            : 'border-[#1C2432] group-hover:border-[#2F6BFF]/30 group-hover:bg-[#0F131C]/60'
        } peer-focus-visible:ring-1 peer-focus-visible:ring-[#22D3EE] peer-focus-visible:border-[#22D3EE] peer-focus-visible:outline-none`}
      >
        {/* Left Side: Terminal Prompt Glyph + Command Identifier */}
        <div className="flex items-center gap-2 min-w-0">
          <span
            aria-hidden="true"
            className={`font-mono font-semibold transition-colors duration-200 select-none ${
              disabled
                ? 'text-[#3B4352]'
                : isChecked
                ? 'text-[#22D3EE] drop-shadow-[0_0_4px_#22D3EE]'
                : 'text-[#737C8D] group-hover:text-[#E7EAF0]'
            }`}
          >
            {promptSymbol}
          </span>

          <span
            className={`truncate font-mono tracking-tight transition-colors duration-200 ${
              disabled
                ? 'text-[#3B4352]'
                : isChecked
                ? 'text-[#E7EAF0] group-hover:text-[#FFFFFF]'
                : 'text-[#E7EAF0]/80 group-hover:text-[#E7EAF0]'
            }`}
          >
            {label}
          </span>
        </div>

        {/* Right Side: Integrated Terminal Status Bracket [ ] vs [✓] */}
        <div
          aria-hidden="true"
          className="flex items-center shrink-0 font-mono text-xs select-none"
        >
          <span className={`transition-colors ${disabled ? 'text-[#3B4352]' : isChecked ? 'text-[#4D8DFF]' : 'text-[#737C8D]'}`}>
            [
          </span>

          <div className="relative inline-flex items-center justify-center w-4 h-4 mx-0.5">
            {/* Terminal Checkmark with Typewriter Reveal Animation */}
            <svg
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`w-3.5 h-3.5 transition-all duration-200 ease-out motion-reduce:transition-none ${
                isChecked
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-50 pointer-events-none'
              }`}
            >
              <path
                d="M3.5 8.5L6.5 11.5L12.5 4.5"
                stroke="#22D3EE"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`${isChecked ? 'drop-shadow-[0_0_3px_#22D3EE]' : ''}`}
              />
            </svg>

            {/* Inactive Space Holder */}
            {!isChecked && (
              <span
                className={`w-1.5 h-0.5 rounded-[1px] bg-transparent ${
                  !disabled && 'group-hover:bg-[#3B4352]/60'
                } transition-colors`}
              />
            )}
          </div>

          <span className={`transition-colors ${disabled ? 'text-[#3B4352]' : isChecked ? 'text-[#4D8DFF]' : 'text-[#737C8D]'}`}>
            ]
          </span>
        </div>
      </div>

      {/* Terminal Style Comment Description */}
      {description && (
        <div
          id={descriptionId}
          className={`pl-5 text-[11px] leading-tight font-mono tracking-tight ${
            disabled ? 'text-[#3B4352]' : 'text-[#737C8D]'
          }`}
        >
          <span className="opacity-60 select-none mr-1">#</span>
          {description}
        </div>
      )}
    </label>
  );
};

export default TerminalCheckbox;