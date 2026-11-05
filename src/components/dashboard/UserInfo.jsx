"use client";

import { useSelector } from "react-redux";

export default function UserInfo() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-base font-semibold text-slate-900">Your Profile</h2>

      {user ? (
        <div className="mt-4 space-y-2">
          <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-3">
            <span className="w-20 text-sm text-slate-500">Name</span>
            <span className="text-sm font-medium text-slate-900">
              {user.name || "-"}
            </span>
          </div>

          <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-3">
            <span className="w-20 text-sm text-slate-500">Email</span>
            <span className="text-sm font-medium text-slate-900">
              {user.email}
            </span>
          </div>

          <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-3">
            <span className="w-20 text-sm text-slate-500">Role</span>
            <span className="inline-flex w-fit items-center rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700 ring-1 ring-inset ring-blue-600/20">
              {user.role}
            </span>
          </div>
        </div>
      ) : (
        <p className="mt-3 text-sm text-slate-500">Loading your details...</p>
      )}
    </div>
  );
}
