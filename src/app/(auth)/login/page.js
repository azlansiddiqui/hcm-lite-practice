import { Inter } from "next/font/google";
import LoginForm from "@/components/login/LoginForm";
import BrandPanel from "@/components/login/Brandpanel";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sign in | HCM Lite",
};

export default function LoginPage() {
  return (
    <main className={`${inter.className} min-h-screen bg-white`}>
      <div className="grid min-h-screen w-full lg:grid-cols-[1.08fr_1fr]">
        <BrandPanel />
        <LoginForm />
      </div>
    </main>
  );
}