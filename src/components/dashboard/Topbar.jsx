"use client";

import { FiLogOut, FiMenu } from "react-icons/fi";
import { usePathname } from "next/navigation";

import { navFor, ROLE_LABELS } from "./navConfig";

function initialsOf(user) {
  const source = (user?.name || user?.email || "").trim();
  if (!source) return "?";
  const parts = source.split(/\s+/).filter(Boolean);
  const letters =
    parts.length >= 2 ? parts[0][0] + parts[1][0] : source.slice(0, 2);
  return letters.toUpperCase();
}

export default function Topbar({ user, menuOpen, onMenuClick, onLogout }) {
  const pathname = usePathname();

  const current = navFor(user?.role).find(
    (item) =>
      item.path &&
      (pathname === item.path || pathname.startsWith(item.path + "/"))
  );

  return (
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center gap-3 border-b border-slate-200 bg-white px-4 md:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open navigation"
        aria-expanded={menuOpen}
        className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 lg:hidden"
      >
        <FiMenu className="h-5 w-5" aria-hidden="true" />
      </button>

      <span className="truncate text-sm font-semibold text-slate-900 lg:hidden">
        {current?.label || "Dashboard"}
      </span>

      <div className="ml-auto flex items-center gap-3">
        {user && (
          <>
            <span className="hidden items-center gap-2 md:flex">
              <span className="max-w-[14rem] truncate text-sm font-medium text-slate-800">
                {user.name || user.email}
              </span>
              <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700 ring-1 ring-inset ring-blue-600/20">
                {ROLE_LABELS[user.role] ?? user.role}
              </span>
            </span>

            <span
              aria-hidden="true"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0A1F5C] text-xs font-semibold text-white"
            >
              {initialsOf(user)}
            </span>

            <button
              type="button"
              onClick={onLogout}
              aria-label="Log out"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <FiLogOut className="h-4 w-4" aria-hidden="true" />
            </button>
          </>
        )}
      </div>
    </header>
  );
}
