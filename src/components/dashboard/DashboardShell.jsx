"use client";

import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { FiLoader } from "react-icons/fi";

import { auth } from "@/lib/firebase/firebase";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import MobileDrawer from "./MobileDrawer";

export default function DashboardShell({ children }) {
  const status = useSelector((state) => state.auth.status);
  const user = useSelector((state) => state.auth.user);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const handleLogout = useCallback(async () => {
    try {
      setDrawerOpen(false);
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, []);

  const authenticated = status === "authenticated";

  return (
    <div className="min-h-screen bg-[#F4F6FF]">
      <Sidebar user={user} onLogout={handleLogout} />

      <div className="flex min-h-screen flex-col lg:pl-64">
        <Topbar
          user={user}
          menuOpen={drawerOpen}
          onMenuClick={() => setDrawerOpen(true)}
          onLogout={handleLogout}
        />
        <main className="flex-1">{children}</main>
      </div>

      <MobileDrawer
        open={drawerOpen}
        onClose={closeDrawer}
        user={user}
        onLogout={handleLogout}
      />

      {!authenticated && (
        <div
          role="status"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#F4F6FF]"
        >
          <FiLoader className="animate-spin text-blue-600" size={32} />
          <span className="ml-3 text-slate-600">Checking your session…</span>
        </div>
      )}
    </div>
  );
}
