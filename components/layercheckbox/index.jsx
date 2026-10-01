import React, { useId, useState } from 'react';

export const LayerCheckbox: React.FC<CheckboxProps> = ({
  id: customId,
  name,
  value,
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  required = false,
  label,
  description,
  className = '',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
}) => {
  const generatedId = useId();
  const inputId = customId || `xui-layer-${generatedId}`;
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
      className={`group relative inline-flex items-start gap-3 select-none ${
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

      {/* Layered Interface Stack Control */}
      <div
        aria-hidden="true"
        className="relative size-5 shrink-0 mt-0.5 peer-focus-visible:ring-2 peer-focus-visible:ring-[#2F6BFF] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[#05070D] rounded-[4px]"
      >
        {/* Layer 3: Rearmost Base Panel */}
        <div
          className={`absolute inset-0 rounded-[3px] border bg-[#0A0D14] transition-all duration-300 ease-out motion-reduce:transition-none pointer-events-none ${
            isChecked
              ? 'translate-x-0 translate-y-0 opacity-20 border-[#2F6BFF]/40'
              : disabled
              ? 'translate-x-1 -translate-y-1 opacity-30 border-[#1C2432]'
              : 'translate-x-1 -translate-y-1 opacity-40 border-[#1C2432] group-hover:translate-x-[2px] group-hover:-translate-y-[2px] group-hover:border-[#2F6BFF]/30'
          }`}
        />

        {/* Layer 2: Mid-tier Panel */}
        <div
          className={`absolute inset-0 rounded-[3px] border bg-[#0A0D14] transition-all duration-300 ease-out motion-reduce:transition-none pointer-events-none ${
            isChecked
              ? 'translate-x-0 translate-y-0 opacity-40 border-[#2F6BFF]/60'
              : disabled
              ? 'translate-x-0.5 -translate-y-0.5 opacity-60 border-[#1C2432]'
              : 'translate-x-0.5 -translate-y-0.5 opacity-70 border-[#1C2432] group-hover:translate-x-[1px] group-hover:-translate-y-[1px] group-hover:border-[#2F6BFF]/40'
          }`}
        />

        {/* Layer 1: Front Primary Panel with Check Indicator */}
        <div
          className={`relative size-full rounded-[3px] border flex items-center justify-center transition-all duration-300 ease-out motion-reduce:transition-none ${
            disabled
              ? 'border-[#1C2432] bg-[#0A0D14]'
              : isChecked
              ? 'border-[#2F6BFF] bg-[#0F131C] shadow-[0_0_8px_rgba(47,107,255,0.2)]'
              : 'border-[#1C2432] bg-[#0A0D14] group-hover:border-[#3B4352]'
          }`}
        >
          {/* Micro Geometric Check Indicator */}
          <svg
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`w-3 h-3 transition-all duration-200 ease-out motion-reduce:transition-none ${
              isChecked
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-75'
            }`}
          >
            <path
              d="M3.5 8.5L6.5 11.5L12.5 4.5"
              stroke={isChecked ? '#4D8DFF' : 'transparent'}
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={isChecked ? 'drop-shadow-[0_0_2px_#22D3EE]' : ''}
            />
          </svg>
        </div>
      </div>

      {/* Label and Description */}
      {(label || description) && (
        <div className="flex flex-col text-left">
          {label && (
            <span
              className={`text-sm font-medium leading-tight transition-colors duration-200 ${
                disabled
                  ? 'text-[#3B4352]'
                  : isChecked
                  ? 'text-[#E7EAF0]'
                  : 'text-[#E7EAF0]/90 group-hover:text-[#E7EAF0]'
              }`}
            >
              {label}
            </span>
          )}
          {description && (
            <span
              id={descriptionId}
              className={`text-xs mt-1 leading-normal ${
                disabled ? 'text-[#3B4352]' : 'text-[#737C8D]'
              }`}
            >
              {description}
            </span>
          )}
        </div>
      )}
    </label>
  );
};

export default LayerCheckbox;