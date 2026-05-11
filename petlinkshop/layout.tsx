import Link from "next/link";
import type { ReactNode } from "react";
import { LogoutButton } from "@/components/admin/LogoutButton";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-slate-50">
      <div className="container-page flex items-center justify-between gap-4 border-b border-slate-200 py-4">
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-teal">Admin</p>
          <h1 className="text-xl font-black">PetLinkShop 管理后台</h1>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/orders" className="btn-secondary min-h-10 px-3 py-2">
            订单
          </Link>
          <Link href="/admin/inventory" className="btn-secondary min-h-10 px-3 py-2">
            库存
          </Link>
          <LogoutButton />
        </div>
      </div>
      {children}
    </div>
  );
}
