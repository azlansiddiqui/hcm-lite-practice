import {
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiHome,
  FiShield,
  FiUsers,
} from "react-icons/fi";

const NAV_ITEMS = [
  { label: "Dashboard", path: "/admin", icon: FiHome, roles: ["admin"] },
  { label: "Dashboard", path: "/hr", icon: FiHome, roles: ["hr"] },
  { label: "Dashboard", path: "/employee", icon: FiHome, roles: ["employee"] },

  { label: "Employees", icon: FiUsers, roles: ["admin", "hr"], soon: true },
  { label: "Attendance", icon: FiClock, roles: ["employee"], soon: true },
  { label: "Leave", icon: FiCalendar, roles: ["hr", "employee"], soon: true },
  {
    label: "Payroll",
    icon: FiDollarSign,
    roles: ["admin", "hr", "employee"],
    soon: true,
  },
  { label: "Audit log", icon: FiShield, roles: ["admin"], soon: true },
];

export const ROLE_LABELS = {
  admin: "Admin",
  hr: "HR",
  employee: "Employee",
};

export const ROLE_BADGES = {
  admin: "bg-blue-500/15 text-blue-300 ring-blue-400/30",
  hr: "bg-emerald-500/15 text-emerald-300 ring-emerald-400/30",
  employee: "bg-violet-500/15 text-violet-300 ring-violet-400/30",
};

export function navFor(role) {
  if (!role) return [];
  return NAV_ITEMS.filter((item) => item.roles.includes(role));
}
