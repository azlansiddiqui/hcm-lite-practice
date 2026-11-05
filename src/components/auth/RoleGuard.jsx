"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { FiLoader } from "react-icons/fi";

const DASHBOARD_BY_ROLE = {
  admin: "/admin",
  hr: "/hr",
  employee: "/employee",
};

function LoadingScreen() {
  return (
    <div
      role="status"
      className="flex min-h-[50vh] w-full items-center justify-center"
    >
      <FiLoader className="animate-spin text-blue-600" size={32} />
      <span className="ml-3 text-slate-600">Checking your session…</span>
    </div>
  );
}

export default function RoleGuard({ children }) {
  const status = useSelector((state) => state.auth.status);
  const user = useSelector((state) => state.auth.user);
  const pathname = usePathname();
  const router = useRouter();

  const role = user?.role;
  const ownDashboard = role ? DASHBOARD_BY_ROLE[role] : null;

  const allowed =
    status === "authenticated" &&
    ownDashboard !== null &&
    (pathname === ownDashboard || pathname.startsWith(ownDashboard + "/"));

  useEffect(() => {
    if (status === "checking") return;
    if (status !== "authenticated") {
      router.replace("/login");
      return;
    }
    if (!ownDashboard) {
      router.replace("/login");
      return;
    }
    if (!allowed) {
      router.replace(ownDashboard);
    }
  }, [status, ownDashboard, allowed, pathname, router]);

  return (
    <>
      {!allowed && <LoadingScreen />}
      <div className={allowed ? undefined : "hidden"} aria-hidden={!allowed}>
        {children}
      </div>
    </>
  );
}
