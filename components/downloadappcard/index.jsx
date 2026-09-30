import type { FC, SVGProps } from "react";

/* ---------- Types ---------- */

/* ---------- Icons ---------- */

const GooglePlayIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path fill="#00D4FF" d="M3.6 2.3c-.3.3-.5.8-.5 1.4v16.6c0 .6.2 1.1.5 1.4l.1.1 9.3-9.3v-.2L3.7 2.2l-.1.1z" />
    <path fill="#FFCE00" d="M16.1 15.4l-3.1-3.1v-.2l3.1-3.1.1.1 3.7 2.1c1 .6 1 1.6 0 2.2l-3.7 2.1-.1-.1z" />
    <path fill="#FF3A44" d="M16.2 15.3L13 12.1 3.6 21.5c.3.4.9.4 1.5.1l11.1-6.3" />
    <path fill="#00F076" d="M16.2 8.9L5.1 2.6c-.6-.3-1.2-.3-1.5.1l9.4 9.4 3.2-3.2z" />
  </svg>
);

const AppleIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
  </svg>
);

/* ---------- Store button ---------- */

const StoreButton: FC<StoreButtonProps> = ({ href, kicker, label, icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group inline-flex items-center gap-3 rounded-xl bg-white px-4 py-2.5 text-[#0E3B3A] shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB84D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E3B3A] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
  >
    <span className="flex h-7 w-7 items-center justify-center">{icon}</span>
    <span className="flex flex-col text-left leading-tight">
      <span className="text-[11px] font-medium text-[#0E3B3A]/60">{kicker}</span>
      <span className="text-base font-semibold">{label}</span>
    </span>
  </a>
);

/* ---------- Phone mockup (pure CSS) ---------- */

const PhoneMockup: FC = () => (
  <div
    aria-hidden="true"
    className="relative mx-auto h-[300px] w-[170px] shrink-0 rotate-[6deg] rounded-[2rem] bg-[#0A2B2A] p-2 shadow-2xl ring-1 ring-white/10 sm:h-[340px] sm:w-[190px] md:translate-y-8"
  >
    <div className="flex h-full w-full flex-col gap-3 overflow-hidden rounded-[1.5rem] bg-[#F5FAF8] p-3">
      <div className="mx-auto h-1.5 w-12 rounded-full bg-[#0E3B3A]/15" />

      <div className="rounded-2xl bg-[#0E3B3A] p-3 text-white">
        <p className="text-[10px] text-white/60">Total balance</p>
        <p className="mt-1 text-xl font-semibold tracking-tight">$12,480.50</p>
        <div className="mt-3 flex gap-1.5">
          <span className="rounded-full bg-[#FFB84D] px-2 py-0.5 text-[9px] font-semibold text-[#0E3B3A]">Send</span>
          <span className="rounded-full bg-white/15 px-2 py-0.5 text-[9px] font-medium">Request</span>
        </div>
      </div>

      <div className="space-y-2">
        {[
          { name: "Netflix", amount: "-$15.99" },
          { name: "Salary", amount: "+$3,200" },
          { name: "Groceries", amount: "-$64.20" },
        ].map((row) => (
          <div key={row.name} className="flex items-center justify-between rounded-xl bg-white px-2.5 py-2 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="h-5 w-5 rounded-full bg-[#CFEFE4]" />
              <span className="text-[10px] font-medium text-[#0E3B3A]">{row.name}</span>
            </div>
            <span className={`text-[10px] font-semibold ${row.amount.startsWith("+") ? "text-emerald-600" : "text-[#0E3B3A]/70"}`}>
              {row.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ---------- Main card ---------- */

export const DownloadAppCard: FC<DownloadAppCardProps> = ({
  title = "Download Now!",
  subtitle = "Download our mobile application.",
  description = "Download Lorem mobile banking app for IOS & Android to manage your online money.",
  googlePlay = { href: "#" },
  appStore = { href: "#" },
  className = "",
}) => {
  return (
    <section
      className={`relative mx-auto w-full max-w-5xl overflow-hidden rounded-[2rem] bg-[#0E3B3A] px-6 py-10 text-white shadow-xl sm:px-10 md:px-14 md:py-14 ${className}`}
    >
      {/* soft light behind the phone */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-[#1F6F66] opacity-60 blur-3xl"
      />

      <div className="relative grid items-center gap-10 md:grid-cols-[1.2fr_0.8fr]">
        <div className="text-center md:text-left">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">{title}</h2>
          <p className="mt-3 text-lg font-medium text-[#FFB84D]">{subtitle}</p>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-white/75 md:mx-0">
            {description}
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:justify-start">
            <StoreButton
              href={googlePlay.href}
              kicker="Get it on"
              label="Google Play"
              icon={<GooglePlayIcon className="h-6 w-6" />}
            />
            <StoreButton
              href={appStore.href}
              kicker="Download from"
              label="App Store"
              icon={<AppleIcon className="h-6 w-6" />}
            />
          </div>
        </div>

        <PhoneMockup />
      </div>
    </section>
  );
};

export default DownloadAppCard;