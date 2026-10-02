import React, { useState } from "react";
import { User, Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";

export interface LoginFormData {
  username: string;
  password: string;
}

export interface SignUpFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface NeumorphismLoginFormProps {
  /** Initial or controlled mode */
  mode?: "login" | "signup";
  /** Callback fired when mode changes */
  onModeChange?: (mode: "login" | "signup") => void;
  /** Title inside the card for login mode */
  loginTitle?: string;
  /** Subtitle inside the card for login mode */
  loginSubtitle?: string;
  /** Title inside the card for signup mode */
  signUpTitle?: string;
  /** Subtitle inside the card for signup mode */
  signUpSubtitle?: string;
  /** Callback fired upon submitting login form */
  onLogin?: (data: LoginFormData) => void;
  /** Callback fired upon submitting signup form */
  onSignUp?: (data: SignUpFormData) => void;
  /** Callback for "Forgot password?" */
  onForgotPassword?: () => void;
  /** Extra container styling */
  className?: string;
}

/**
 * NeumorphismLoginForm
 *
 * An animated, tactile Neumorphism authentication component supporting both Login and Sign Up flows.
 * Features:
 * - Fluid sliding & staggered entrance transitions between modes.
 * - Dynamic debossed inset shadow focus rings that respond to active fields.
 * - Tactile 3D button press and hover elevation physics.
 * - Neumorphic segmented tab switcher.
 * - Subtle emblem micro-animations and shake validation effects.
 */
export const NeumorphismLoginForm: React.FC<NeumorphismLoginFormProps> = ({
  mode: controlledMode,
  onModeChange,
  loginTitle = "Web Development",
  loginSubtitle = "Made easy!",
  signUpTitle = "Create Account",
  signUpSubtitle = "Join Web Development today!",
  onLogin,
  onSignUp,
  onForgotPassword,
  className = "",
}) => {
  const [internalMode, setInternalMode] = useState<"login" | "signup">("login");
  const currentMode = controlledMode || internalMode;

  // Form states
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const switchMode = (newMode: "login" | "signup") => {
    if (newMode === currentMode) return;
    setPasswordError(null);
    if (!controlledMode) {
      setInternalMode(newMode);
    }
    onModeChange?.(newMode);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onLogin?.({ username, password });
    }, 400);
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    setPasswordError(null);
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSignUp?.({ username, email, password, confirmPassword });
    }, 400);
  };

  // Helper for dynamic neumorphic inset field shadows
  const getInsetFieldStyle = (fieldName: string) => {
    const isFocused = focusedField === fieldName;
    return {
      backgroundColor: "#ecf0f3",
      boxShadow: isFocused
        ? "inset 6px 6px 10px #cbced1, inset -6px -6px 10px #ffffff, 0 0 0 2px rgba(64, 181, 208, 0.45)"
        : "inset 5px 5px 8px #cbced1, inset -5px -5px 8px #ffffff, 0 0 0 2px transparent",
    };
  };

  return (
    <div
      className={`min-h-screen w-full bg-[#ecf0f3] flex flex-col items-center justify-center p-4 sm:p-8 font-sans select-none transition-colors duration-300 ${className}`}
      style={{ backgroundColor: "#ecf0f3" }}
    >
      {/* Scoped CSS Animations for fluid keyframes */}
      <style>{`
        @keyframes cardEntrance {
          0% { opacity: 0; transform: translateY(16px) scale(0.97); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeInSlide {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes shakeError {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-5px); }
          40%, 80% { transform: translateX(5px); }
        }
        .animate-card-entrance {
          animation: cardEntrance 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .animate-field-1 {
          animation: fadeInSlide 0.3s cubic-bezier(0.16, 1, 0.3, 1) 0.05s both;
        }
        .animate-field-2 {
          animation: fadeInSlide 0.3s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
        }
        .animate-field-3 {
          animation: fadeInSlide 0.3s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both;
        }
        .animate-field-4 {
          animation: fadeInSlide 0.3s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
        }
        .animate-shake {
          animation: shakeError 0.35s ease-in-out both;
        }
      `}</style>

      {/* Main Neumorphic Elevated Card */}
      <div
        className="w-full max-w-[360px] sm:max-w-[400px] rounded-[36px] p-8 sm:p-10 flex flex-col items-center animate-card-entrance transition-all duration-300"
        style={{
          backgroundColor: "#ecf0f3",
          boxShadow: "14px 14px 28px #cbced1, -14px -14px 28px #ffffff",
        }}
      >
        {/* Circular Avatar / Brand Emblem with tactile micro-interaction */}
        <div
          className="group relative w-20 h-20 rounded-full flex items-center justify-center p-1.5 mb-5 cursor-pointer transition-all duration-300 hover:scale-105"
          style={{
            backgroundColor: "#ecf0f3",
            boxShadow: "7px 7px 15px #cbced1, -7px -7px 15px #ffffff",
          }}
          title="Web Development"
        >
          {/* Inner Black Emblem */}
          <div className="w-full h-full rounded-full bg-[#0a0c10] flex flex-col items-center justify-center relative overflow-hidden shadow-inner transition-transform duration-300 group-hover:rotate-3">
            <div className="flex items-center justify-center relative mb-0.5">
              <svg
                viewBox="0 0 40 24"
                className="w-9 h-5 transition-transform duration-300 group-hover:scale-110"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 3L16 12L6 21"
                  stroke="#3b82f6"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <ellipse cx="24" cy="14" rx="7" ry="3.5" fill="#38bdf8" />
              </svg>
            </div>
            <span className="text-[7.5px] font-bold text-white tracking-wider leading-none">
              Web Dev
            </span>
            <span className="text-[5.5px] text-[#38bdf8] font-medium tracking-tight mt-0.5 leading-none">
              made easy
            </span>
          </div>
        </div>

        {/* Dynamic Card Titles with smooth fade-in */}
        <div className="text-center transition-all duration-300 mb-5">
          <h2
            key={`title-${currentMode}`}
            className="text-xl font-bold text-[#1f2937] tracking-tight transition-all duration-200 animate-fadeIn"
          >
            {currentMode === "login" ? loginTitle : signUpTitle}
          </h2>
          <p
            key={`sub-${currentMode}`}
            className="text-xs font-semibold text-[#5c6879] tracking-wide mt-1 transition-all duration-200"
          >
            {currentMode === "login" ? loginSubtitle : signUpSubtitle}
          </p>
        </div>

        {/* Tactile Segmented Mode Switcher (Login / Sign Up) */}
        <div
          className="relative w-full h-11 p-1 rounded-full flex items-center mb-6 transition-all duration-300"
          style={{
            backgroundColor: "#ecf0f3",
            boxShadow: "inset 4px 4px 7px #cbced1, inset -4px -4px 7px #ffffff",
          }}
        >
          {/* Animated Gliding Pill */}
          <div
            className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full transition-all duration-300 ease-out"
            style={{
              backgroundColor: "#ecf0f3",
              boxShadow: "3px 3px 6px #cbced1, -3px -3px 6px #ffffff",
              transform: currentMode === "login" ? "translateX(0px)" : "translateX(calc(100% + 8px))",
            }}
          />

          <button
            type="button"
            onClick={() => switchMode("login")}
            className={`relative z-10 w-1/2 h-full text-xs font-bold rounded-full transition-colors duration-200 outline-none flex items-center justify-center gap-1.5 ${
              currentMode === "login" ? "text-[#40b5d0]" : "text-[#7a869a] hover:text-[#374151]"
            }`}
          >
            <span>Login</span>
          </button>

          <button
            type="button"
            onClick={() => switchMode("signup")}
            className={`relative z-10 w-1/2 h-full text-xs font-bold rounded-full transition-colors duration-200 outline-none flex items-center justify-center gap-1.5 ${
              currentMode === "signup" ? "text-[#40b5d0]" : "text-[#7a869a] hover:text-[#374151]"
            }`}
          >
            <span>Sign Up</span>
          </button>
        </div>

        {/* ===================== LOGIN FORM ===================== */}
        {currentMode === "login" && (
          <form
            key="login-form"
            onSubmit={handleLoginSubmit}
            className="w-full flex flex-col gap-4 transition-all duration-300"
          >
            {/* Username Field */}
            <div
              className="animate-field-1 w-full h-12 rounded-full flex items-center px-4 transition-all duration-200"
              style={getInsetFieldStyle("username")}
            >
              <User
                className={`w-4 h-4 flex-shrink-0 mr-3 transition-colors duration-200 ${
                  focusedField === "username" ? "text-[#40b5d0]" : "text-[#616e7f]"
                }`}
              />
              <input
                type="text"
                name="username"
                id="login-username"
                placeholder="username"
                autoComplete="username"
                value={username}
                onFocus={() => setFocusedField("username")}
                onBlur={() => setFocusedField(null)}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm text-[#374151] placeholder-[#7d8b9d] outline-none font-normal"
                required
              />
            </div>

            {/* Password Field */}
            <div
              className="animate-field-2 w-full h-12 rounded-full flex items-center px-4 transition-all duration-200"
              style={getInsetFieldStyle("password")}
            >
              <Lock
                className={`w-4 h-4 flex-shrink-0 mr-3 transition-colors duration-200 ${
                  focusedField === "password" ? "text-[#40b5d0]" : "text-[#616e7f]"
                }`}
              />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="login-password"
                placeholder="password"
                autoComplete="current-password"
                value={password}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm text-[#374151] placeholder-[#7d8b9d] outline-none font-normal"
                required
              />
              {password.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="text-[#7d8b9d] hover:text-[#374151] focus:outline-none transition-transform duration-200 active:scale-90 ml-1"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full h-12 mt-2 rounded-full text-white font-bold text-sm tracking-wide transition-all duration-200 outline-none flex items-center justify-center cursor-pointer
                hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]
                ${isSubmitting ? "opacity-80 cursor-wait" : ""}
              `}
              style={{
                backgroundColor: "#40b5d0",
                boxShadow:
                  "5px 5px 12px rgba(64, 181, 208, 0.4), -4px -4px 10px rgba(255, 255, 255, 0.8)",
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.boxShadow = "inset 3px 3px 6px rgba(0, 0, 0, 0.25)";
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.boxShadow =
                  "5px 5px 12px rgba(64, 181, 208, 0.4), -4px -4px 10px rgba(255, 255, 255, 0.8)";
              }}
            >
              {isSubmitting ? (
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Login"
              )}
            </button>

            {/* Footer Link */}
            <div className="mt-4 text-center text-[11px] sm:text-xs text-[#6e7b8c]">
              <button
                type="button"
                onClick={onForgotPassword}
                className="hover:text-[#1f2937] transition-colors focus:outline-none hover:underline"
              >
                Forgot password?
              </button>
            </div>
          </form>
        )}

        {/* ===================== SIGN UP FORM ===================== */}
        {currentMode === "signup" && (
          <form
            key="signup-form"
            onSubmit={handleSignUpSubmit}
            className="w-full flex flex-col gap-3.5 transition-all duration-300"
          >
            {/* Username Field */}
            <div
              className="animate-field-1 w-full h-11 sm:h-12 rounded-full flex items-center px-4 transition-all duration-200"
              style={getInsetFieldStyle("signup-username")}
            >
              <User
                className={`w-4 h-4 flex-shrink-0 mr-3 transition-colors duration-200 ${
                  focusedField === "signup-username" ? "text-[#40b5d0]" : "text-[#616e7f]"
                }`}
              />
              <input
                type="text"
                name="username"
                id="signup-username"
                placeholder="username"
                autoComplete="username"
                value={username}
                onFocus={() => setFocusedField("signup-username")}
                onBlur={() => setFocusedField(null)}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm text-[#374151] placeholder-[#7d8b9d] outline-none font-normal"
                required
              />
            </div>

            {/* Email Field */}
            <div
              className="animate-field-2 w-full h-11 sm:h-12 rounded-full flex items-center px-4 transition-all duration-200"
              style={getInsetFieldStyle("signup-email")}
            >
              <Mail
                className={`w-4 h-4 flex-shrink-0 mr-3 transition-colors duration-200 ${
                  focusedField === "signup-email" ? "text-[#40b5d0]" : "text-[#616e7f]"
                }`}
              />
              <input
                type="email"
                name="email"
                id="signup-email"
                placeholder="email address"
                autoComplete="email"
                value={email}
                onFocus={() => setFocusedField("signup-email")}
                onBlur={() => setFocusedField(null)}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm text-[#374151] placeholder-[#7d8b9d] outline-none font-normal"
                required
              />
            </div>

            {/* Password Field */}
            <div
              className="animate-field-3 w-full h-11 sm:h-12 rounded-full flex items-center px-4 transition-all duration-200"
              style={getInsetFieldStyle("signup-password")}
            >
              <Lock
                className={`w-4 h-4 flex-shrink-0 mr-3 transition-colors duration-200 ${
                  focusedField === "signup-password" ? "text-[#40b5d0]" : "text-[#616e7f]"
                }`}
              />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="signup-password"
                placeholder="create password"
                autoComplete="new-password"
                value={password}
                onFocus={() => setFocusedField("signup-password")}
                onBlur={() => setFocusedField(null)}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm text-[#374151] placeholder-[#7d8b9d] outline-none font-normal"
                required
              />
              {password.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="text-[#7d8b9d] hover:text-[#374151] focus:outline-none transition-transform duration-200 active:scale-90 ml-1"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              )}
            </div>

            {/* Confirm Password Field */}
            <div
              className="animate-field-4 w-full h-11 sm:h-12 rounded-full flex items-center px-4 transition-all duration-200"
              style={getInsetFieldStyle("signup-confirm")}
            >
              <ShieldCheck
                className={`w-4 h-4 flex-shrink-0 mr-3 transition-colors duration-200 ${
                  focusedField === "signup-confirm" ? "text-[#40b5d0]" : "text-[#616e7f]"
                }`}
              />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="signup-confirm-password"
                placeholder="confirm password"
                autoComplete="new-password"
                value={confirmPassword}
                onFocus={() => setFocusedField("signup-confirm")}
                onBlur={() => setFocusedField(null)}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm text-[#374151] placeholder-[#7d8b9d] outline-none font-normal"
                required
              />
              {confirmPassword.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  className="text-[#7d8b9d] hover:text-[#374151] focus:outline-none transition-transform duration-200 active:scale-90 ml-1"
                >
                  {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              )}
            </div>

            {/* Animated Password Validation Error */}
            {passwordError && (
              <p className="animate-shake text-[11px] text-[#ef4444] font-medium text-center -mt-1">
                {passwordError}
              </p>
            )}

            {/* Sign Up Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full h-12 mt-2 rounded-full text-white font-bold text-sm tracking-wide transition-all duration-200 outline-none flex items-center justify-center cursor-pointer
                hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]
                ${isSubmitting ? "opacity-80 cursor-wait" : ""}
              `}
              style={{
                backgroundColor: "#40b5d0",
                boxShadow:
                  "5px 5px 12px rgba(64, 181, 208, 0.4), -4px -4px 10px rgba(255, 255, 255, 0.8)",
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.boxShadow = "inset 3px 3px 6px rgba(0, 0, 0, 0.25)";
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.boxShadow =
                  "5px 5px 12px rgba(64, 181, 208, 0.4), -4px -4px 10px rgba(255, 255, 255, 0.8)";
              }}
            >
              {isSubmitting ? (
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Create Account"
              )}
            </button>


          </form>
        )}
      </div>
    </div>
  );
};

export default NeumorphismLoginForm;
