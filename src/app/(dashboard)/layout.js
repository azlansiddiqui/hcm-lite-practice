import RoleGuard from "@/components/auth/RoleGuard";
import DashboardShell from "@/components/dashboard/DashboardShell";

export default function DashboardLayout({ children }) {
  return (
    <DashboardShell>
      <RoleGuard>{children}</RoleGuard>
    </DashboardShell>
  );
}
