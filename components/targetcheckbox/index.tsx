import React, { useId, useState } from 'react';

export interface CheckboxProps {
  id?: string;
  name?: string;
  value?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  required?: boolean;
  label?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

export const TargetCheckbox: React.FC<CheckboxProps> = ({
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
  const inputId = customId || `xui-target-${generatedId}`;
  const descriptionId = description ? `${inputId}-desc` : undefined;

  const [internalChecked, setInternalChecked] = useState<boolean>(defaultChecked);
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

      {/* Target Reticle Visual Housing */}
      <div
        aria-hidden="true"
        className="relative flex items-center justify-center size-5 shrink-0 mt-0.5 rounded-full bg-[#0A0D14] transition-all duration-300 peer-focus-visible:ring-2 peer-focus-visible:ring-[#2F6BFF] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[#05070D]"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="size-5 overflow-visible"
        >
          {/* Outer Crosshair Ring */}
          <circle
            cx="12"
            cy="12"
            r="9.5"
            stroke={isChecked ? '#2F6BFF' : '#1C2432'}
            strokeWidth="1.2"
            className={`transition-colors duration-300 ${
              !disabled && !isChecked ? 'group-hover:stroke-[#3B4352]' : ''
            }`}
          />

          {/* Internal Range Guide Ring */}
          <circle
            cx="12"
            cy="12"
            r="5.5"
            stroke={isChecked ? '#4D8DFF' : '#1C2432'}
            strokeWidth="0.8"
            strokeDasharray={isChecked ? 'none' : '1.5 1.5'}
            className="transition-all duration-300 opacity-60"
          />

          {/* Precision Cardinal Marks (Pinch inward on target lock) */}
          {/* Top Cardinal */}
          <line
            x1="12"
            y1="1.5"
            x2="12"
            y2={isChecked ? "5.5" : "4"}
            stroke={isChecked ? '#22D3EE' : '#3B4352'}
            strokeWidth="1.4"
            strokeLinecap="round"
            className={`transition-all duration-200 ease-out motion-reduce:transition-none ${
              isChecked ? 'drop-shadow-[0_0_2px_#22D3EE]' : ''
            }`}
          />

          {/* Bottom Cardinal */}
          <line
            x1="12"
            y1="22.5"
            x2="12"
            y2={isChecked ? "18.5" : "20"}
            stroke={isChecked ? '#22D3EE' : '#3B4352'}
            strokeWidth="1.4"
            strokeLinecap="round"
            className={`transition-all duration-200 ease-out motion-reduce:transition-none ${
              isChecked ? 'drop-shadow-[0_0_2px_#22D3EE]' : ''
            }`}
          />

          {/* Left Cardinal */}
          <line
            x1="1.5"
            y1="12"
            x2={isChecked ? "5.5" : "4"}
            y2="12"
            stroke={isChecked ? '#22D3EE' : '#3B4352'}
            strokeWidth="1.4"
            strokeLinecap="round"
            className={`transition-all duration-200 ease-out motion-reduce:transition-none ${
              isChecked ? 'drop-shadow-[0_0_2px_#22D3EE]' : ''
            }`}
          />

          {/* Right Cardinal */}
          <line
            x1="22.5"
            y1="12"
            x2={isChecked ? "18.5" : "20"}
            y2="12"
            stroke={isChecked ? '#22D3EE' : '#3B4352'}
            strokeWidth="1.4"
            strokeLinecap="round"
            className={`transition-all duration-200 ease-out motion-reduce:transition-none ${
              isChecked ? 'drop-shadow-[0_0_2px_#22D3EE]' : ''
            }`}
          />

          {/* Central Target Lock Node */}
          <circle
            cx="12"
            cy="12"
            r={isChecked ? 2.4 : 1.6}
            className={`transition-all duration-200 ease-out motion-reduce:transition-none ${
              isChecked
                ? 'fill-[#22D3EE] drop-shadow-[0_0_4px_#22D3EE]'
                : 'fill-[#3B4352]'
            } ${!disabled && !isChecked ? 'group-hover:fill-[#737C8D]' : ''}`}
            style={{ transformOrigin: '12px 12px' }}
          />

          {/* Inner Lock Pip */}
          {isChecked && (
            <circle
              cx="12"
              cy="12"
              r="1"
              fill="#FFFFFF"
              className="transition-opacity duration-150"
            />
          )}
        </svg>
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

export default TargetCheckbox;
