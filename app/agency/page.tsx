import type { Metadata } from "next";
import Link from "next/link";
import { BadgePercent, FileSignature, LineChart, PackageCheck } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { T } from "@/components/LocaleProvider";
import { AgencyLocalizedExtra } from "@/components/seo/MiscLocalizedSeo";
import type { MessageKey } from "@/lib/i18n";
import { breadcrumbSchema } from "@/lib/schema";
import { seoMetadata, seoPages } from "@/lib/seo";

export const metadata: Metadata = seoMetadata(seoPages.agency);

const steps = [
  ["agentStepApply", "agentStepApplyBody"],
  ["agentStepReview", "agentStepReviewBody"],
  ["agentStepSign", "agentStepSignBody"],
  ["agentStepSell", "agentStepSellBody"]
] satisfies [MessageKey, MessageKey][];

const agentStats = [
  { value: "rebateRange", label: "rebateBody", Icon: BadgePercent },
  { value: "skuLadder", label: "skuLadderBody", Icon: PackageCheck },
  { value: "onlineFlow", label: "onlineFlowBody", Icon: FileSignature }
] satisfies { value: MessageKey; label: MessageKey; Icon: typeof BadgePercent }[];

export default function AgencyPage() {
  return (
    <main className="bg-[#f5f5f7]">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Agency", path: "/agency" }
        ])}
      />
      <section className="container-page py-16 text-center lg:py-24">
        <p className="eyebrow"><T k="agentCenter" /></p>
        <h1 className="mx-auto mt-5 max-w-4xl text-5xl font-semibold tracking-[-0.05em] text-zinc-950 sm:text-7xl">
          <T k="agentHeroTitle" />
        </h1>
        <p className="lead-copy mx-auto mt-7 max-w-2xl">
          <T k="agentHeroBody" />
        </p>
        <Link href="/contact" className="btn-primary mt-8">
          <T k="applyAgent" />
        </Link>
      </section>

      <section className="container-page grid gap-5 pb-16 md:grid-cols-3">
        {agentStats.map(({ value, label, Icon }) => (
          <article key={value} className="surface p-8 text-center">
            <Icon className="mx-auto h-8 w-8 text-zinc-950" />
            <h2 className="mt-8 text-4xl font-semibold tracking-[-0.04em]"><T k={value} /></h2>
            <p className="mt-3 text-sm leading-6 text-zinc-500"><T k={label} /></p>
          </article>
        ))}
      </section>

      <section className="bg-white py-16">
        <div className="container-page">
          <AgencyLocalizedExtra />
          <div className="mt-12 grid gap-5 md:grid-cols-4">
            {steps.map(([title, body], index) => (
              <article key={title} className="rounded-[28px] bg-zinc-50 p-7">
                <span className="text-sm font-semibold text-zinc-400">0{index + 1}</span>
                <h3 className="mt-8 text-2xl font-semibold tracking-[-0.03em]"><T k={title} /></h3>
                <p className="mt-3 text-sm leading-6 text-zinc-500"><T k={body} /></p>
              </article>
            ))}
          </div>
          <div className="surface mt-8 grid gap-6 bg-zinc-950 p-8 text-white md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <LineChart className="h-8 w-8 text-white/70" />
              <h2 className="mt-6 text-3xl font-semibold tracking-[-0.04em]"><T k="agentReadyTitle" /></h2>
              <p className="mt-3 text-white/60"><T k="agentReadyBody" /></p>
            </div>
            <Link href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-7 text-sm font-semibold text-zinc-950">
              <T k="startApplication" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
