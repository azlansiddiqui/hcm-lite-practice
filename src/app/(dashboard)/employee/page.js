import UserInfo from "@/components/dashboard/UserInfo";

export const metadata = { title: "Employee Dashboard | HCM Lite" };

export default function EmployeeDashboardPage() {
  return (
    <div className="p-6 sm:p-10">
      <h1 className="text-2xl font-bold text-slate-900">Employee Dashboard</h1>
      <p className="mt-2 text-slate-600">Role: employee</p>

      <UserInfo />
    </div>
  );
}
