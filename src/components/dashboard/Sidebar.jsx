"use client";

import Image from "next/image";
import { FiLogOut } from "react-icons/fi";

import NavList from "./NavList";
import { ROLE_BADGES, ROLE_LABELS } from "./navConfig";

export default function Sidebar({ user, onLogout }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col bg-[#0A1F5C] lg:flex">
      <div className="flex h-16 shrink-0 items-center gap-3 px-5">
        <Image src="/images/logo.png" alt="" width={32} height={32} />
        <span className="text-lg font-semibold tracking-tight text-white">
          HCM Lite
        </span>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <NavList role={user?.role} />
      </div>

      {user && (
        <div className="shrink-0 border-t border-white/10 p-4">
          <p className="truncate text-sm font-medium text-white">
            {user.name || user.email}
          </p>
          <p className="mt-0.5 truncate text-xs text-white/60">{user.email}</p>

          <div className="mt-3 flex items-center justify-between gap-2">
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset ${
                ROLE_BADGES[user.role] ?? ROLE_BADGES.employee
              }`}
            >
              {ROLE_LABELS[user.role] ?? user.role}
            </span>

            <button
              type="button"
              onClick={onLogout}
              className="flex h-9 items-center gap-2 rounded-lg px-3 text-sm text-white/75 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              <FiLogOut className="h-4 w-4" aria-hidden="true" />
              Log out
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
