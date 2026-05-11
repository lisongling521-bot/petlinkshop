import { redirect } from "next/navigation";
import { canonicalProductPath, resolveProductSlug } from "@/lib/seo";

export default function LegacyProductPage({ params }: { params: { slug: string } }) {
  redirect(canonicalProductPath(resolveProductSlug(params.slug)));
}
