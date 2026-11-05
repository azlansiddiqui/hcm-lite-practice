"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navFor } from "./navConfig";

export default function NavList({ role, onNavigate }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className="flex flex-col gap-1 px-3">
      {navFor(role).map((item) => {
        const Icon = item.icon;

        if (!item.path || item.soon) {
          return (
            <span
              key={item.label}
              aria-disabled="true"
              className="flex h-10 items-center gap-3 rounded-lg px-3 text-sm text-white/45"
            >
              <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span className="flex-1">{item.label}</span>
              <span className="rounded-full border border-white/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white/45">
                Soon
              </span>
            </span>
          );
        }

        const active =
          pathname === item.path || pathname.startsWith(item.path + "/");

        return (
          <Link
            key={item.path}
            href={item.path}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={`flex h-10 items-center gap-3 rounded-lg px-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
              active
                ? "bg-[#2563EB] font-semibold text-white shadow-[0_6px_16px_-6px_rgba(37,99,235,0.8)]"
                : "text-white/75 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
            <span className="flex-1">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
