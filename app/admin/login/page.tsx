import type { Metadata } from "next";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

export const metadata: Metadata = { title: "管理后台登录" };

export default function AdminLoginPage() {
  return (
    <main className="container-page grid min-h-[78vh] place-items-center py-16">
      <AdminLoginForm />
    </main>
  );
}
