import Image from "next/image";
import { FiUser, FiCalendar, FiShield } from "react-icons/fi";

const features = [
  { icon: FiUser, label: "Manage Employees" },
  { icon: FiCalendar, label: "Track Attendance" },
  { icon: FiShield, label: "Simplify Payroll" },
];

export default function BrandPanel() {
  return (
    <section className="relative hidden flex-col overflow-hidden bg-[linear-gradient(135deg,#0a1f5c_0%,#0b3190_48%,#1f5ee6_100%)] px-12 py-10 text-white lg:flex">
      <svg
        aria-hidden="true"
        viewBox="0 0 600 500"
        className="pointer-events-none absolute -right-10 -top-10 w-[85%]"
        fill="none"
      >
        <path d="M120 0C300 60 420 200 600 230" stroke="#fff" strokeOpacity=".14" strokeWidth="60" />
        <path d="M260 0C420 40 520 140 600 160" stroke="#7db0ff" strokeOpacity=".18" strokeWidth="26" />
      </svg>

      <div className="pointer-events-none absolute bottom-0 right-0 h-[80%] w-[74%]">
        <Image
          src="/images/buildingVisual.png"
          alt=""
          fill
          priority
          unoptimized
          className="object-contain object-right-bottom"
        />
      </div>

      <svg
        aria-hidden="true"
        viewBox="0 0 400 220"
        preserveAspectRatio="none"
        className="pointer-events-none absolute bottom-0 right-0 h-[26%] w-[64%]"
      >
        <defs>
          <linearGradient id="swoosh" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#0f766e" stopOpacity=".95" />
            <stop offset="1" stopColor="#2dd4bf" stopOpacity=".9" />
          </linearGradient>
        </defs>
        <path d="M0 220C140 205 300 150 400 20V220Z" fill="url(#swoosh)" />
      </svg>

      <div className="relative z-10 flex items-center gap-3">
        <Image src="/images/logo.png" alt="" width={44} height={44} priority unoptimized />
        <span className="text-2xl font-semibold tracking-tight">HCM Lite</span>
      </div>

      <div className="relative z-10 mt-12 xl:mt-20">
        <h1 className="text-5xl font-bold leading-[1.1] xl:text-[3.5rem] tracking-tight">
          Smart HR.
          <br />
          Better Workplace.
        </h1>
        <p className="mt-6 max-w-sm text-lg leading-relaxed text-blue-100/90">
          AI-powered Human Capital Management for a more productive tomorrow.
        </p>

        <ul className="mt-8 space-y-4 xl:mt-10 xl:space-y-5">
          {features.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-4 text-lg text-blue-50">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#5d8df0] text-[#0b2a74]">
                <Icon size={20} strokeWidth={2.2} />
              </span>
              {label}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative z-10 mt-auto flex items-center gap-2 pt-10 text-sm text-blue-50">
        <Image src="/images/saylani_mark.png" alt="" width={22} height={22} unoptimized />
        Powered by Saylani Hackathon
      </div>
    </section>
  );
}