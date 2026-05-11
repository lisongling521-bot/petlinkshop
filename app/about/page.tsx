import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { T } from "@/components/LocaleProvider";
import type { MessageKey } from "@/lib/i18n";
import { breadcrumbSchema } from "@/lib/schema";
import { seoMetadata, seoPages } from "@/lib/seo";

export const metadata: Metadata = seoMetadata(seoPages.about);

const values = [
  ["aboutMinimalTitle", "aboutMinimalBody"],
  ["aboutReliableTitle", "aboutReliableBody"],
  ["aboutScalableTitle", "aboutScalableBody"]
] satisfies [MessageKey, MessageKey][];

export default function AboutPage() {
  return (
    <main className="bg-[#f5f5f7]">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" }
        ])}
      />
      <section className="container-page grid gap-8 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:py-24">
        <div className="self-center">
          <p className="eyebrow"><T k="aboutEyebrow" /></p>
          <h1 className="display-title mt-5"><T k="aboutTitle" /></h1>
          <p className="lead-copy mt-6">
            <T k="aboutBody" />
          </p>
          <Link href="/products/tofu-cat-litter-low-dust" className="btn-primary mt-8">
            <T k="aboutCta" />
          </Link>
        </div>
        <Image src="/images/cat-scene.png" alt="Petlinkshop low dust tofu cat litter brand scene" width={1200} height={900} className="rounded-[42px] object-cover shadow-[0_40px_120px_rgba(0,0,0,0.10)]" />
      </section>

      <section className="bg-white py-16">
        <div className="container-page grid gap-5 md:grid-cols-3">
          {values.map(([title, body]) => (
            <article key={title} className="surface p-8">
              <h2 className="text-2xl font-semibold tracking-[-0.03em]"><T k={title} /></h2>
              <p className="mt-4 leading-7 text-zinc-500"><T k={body} /></p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
