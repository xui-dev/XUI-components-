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

export const OrbitCheckbox: React.FC<CheckboxProps> = ({
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
  const inputId = customId || `xui-orbit-${generatedId}`;
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

      {/* Orbital Visual Control */}
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
          {/* Outer Boundary Orbit */}
          <circle
            cx="12"
            cy="12"
            r="10.5"
            stroke={isChecked ? '#2F6BFF' : '#1C2432'}
            strokeWidth="1.2"
            className={`transition-colors duration-300 ${
              !disabled && !isChecked ? 'group-hover:stroke-[#3B4352]' : ''
            }`}
          />

          {/* Secondary Inactive / Active Track */}
          <circle
            cx="12"
            cy="12"
            r="6.8"
            stroke={isChecked ? '#4D8DFF' : '#1C2432'}
            strokeWidth="0.8"
            strokeDasharray={isChecked ? 'none' : '1.5 2'}
            className="transition-all duration-300 opacity-60"
          />

          {/* Additional Outer Glow Ring (Revealed when checked) */}
          <circle
            cx="12"
            cy="12"
            r="8.8"
            stroke="#22D3EE"
            strokeWidth="0.6"
            className={`transition-all duration-500 ${
              isChecked
                ? 'opacity-40 scale-100'
                : 'opacity-0 scale-75'
            } motion-reduce:transition-none`}
            style={{ transformOrigin: '12px 12px' }}
          />

          {/* Central Planetary Node */}
          <circle
            cx="12"
            cy="12"
            r={isChecked ? 2.5 : 2}
            className={`transition-all duration-300 ${
              isChecked
                ? 'fill-[#4D8DFF] drop-shadow-[0_0_5px_#2F6BFF]'
                : 'fill-[#3B4352]'
            } ${!disabled && !isChecked ? 'group-hover:scale-110 group-hover:fill-[#737C8D]' : ''} motion-reduce:transition-none`}
            style={{ transformOrigin: '12px 12px' }}
          />

          {/* Tiny Cyan Core Dot */}
          {isChecked && (
            <circle
              cx="12"
              cy="12"
              r="1"
              fill="#22D3EE"
              className="transition-opacity duration-200"
            />
          )}

          {/* Orbital Satellite Node - Sweeps around the orbit on state transition */}
          <g
            className={`transition-transform duration-700 ease-out motion-reduce:transition-none ${
              isChecked ? 'rotate-[225deg]' : 'rotate-0'
            }`}
            style={{ transformOrigin: '12px 12px' }}
          >
            <circle
              cx="12"
              cy="5.2"
              r={isChecked ? 1.4 : 0.8}
              className={`transition-all duration-300 ${
                isChecked
                  ? 'fill-[#22D3EE] opacity-100 drop-shadow-[0_0_3px_#22D3EE]'
                  : 'fill-[#3B4352] opacity-0 group-hover:opacity-40'
              }`}
            />
          </g>
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

export default OrbitCheckbox;
