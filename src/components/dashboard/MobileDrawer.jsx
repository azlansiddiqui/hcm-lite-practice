"use client";

import { useEffect } from "react";
import Image from "next/image";
import { FiLogOut, FiX } from "react-icons/fi";

import NavList from "./NavList";
import { ROLE_BADGES, ROLE_LABELS } from "./navConfig";

export default function MobileDrawer({ open, onClose, user, onLogout }) {
  useEffect(() => {
    if (!open) return;
    function onKeyDown(event) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <div
      className={`fixed inset-0 z-40 lg:hidden ${
        open ? "" : "pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-[#0B1230]/50 transition-opacity duration-200 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        className={`absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col bg-[#0A1F5C] shadow-2xl transition-all duration-200 ease-out ${
          open ? "visible translate-x-0" : "invisible -translate-x-full"
        }`}
      >
        <div className="flex h-16 shrink-0 items-center justify-between px-5">
          <div className="flex items-center gap-3">
            <Image src="/images/logo.png" alt="" width={32} height={32} />
            <span className="text-lg font-semibold tracking-tight text-white">
              HCM Lite
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-white/75 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            <FiX className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <NavList role={user?.role} onNavigate={onClose} />
        </div>

        {user && (
          <div className="shrink-0 border-t border-white/10 p-4">
            <p className="truncate text-sm font-medium text-white">
              {user.name || user.email}
            </p>
            <p className="mt-0.5 truncate text-xs text-white/60">
              {user.email}
            </p>
            <span
              className={`mt-2 inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset ${
                ROLE_BADGES[user.role] ?? ROLE_BADGES.employee
              }`}
            >
              {ROLE_LABELS[user.role] ?? user.role}
            </span>
            <button
              type="button"
              onClick={onLogout}
              className="mt-3 flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-white/10 text-sm font-medium text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              <FiLogOut className="h-4 w-4" aria-hidden="true" />
              Log out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
