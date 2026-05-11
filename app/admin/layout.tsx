import Link from "next/link";
import type { ReactNode } from "react";
import { LogoutButton } from "@/components/admin/LogoutButton";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[#f5f5f7]">
      <div className="container-page flex items-center justify-between gap-4 border-b border-zinc-200 py-5">
        <div>
          <p className="eyebrow">Admin</p>
          <h1 className="text-xl font-semibold tracking-[-0.03em]">PetLinkShop 管理后台</h1>
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
