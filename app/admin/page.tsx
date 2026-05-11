import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin";

export default function AdminHome() {
  requireAdmin();
  redirect("/admin/orders");
}
