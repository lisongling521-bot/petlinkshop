import Link from "next/link";
import { T } from "@/components/LocaleProvider";
import type { MessageKey } from "@/lib/i18n";

const columns = [
  {
    title: "footerShop",
    links: [
      { href: "/products", label: "navProducts" },
      { href: "/cart", label: "navCart" },
      { href: "/search", label: "navSearch" }
    ]
  },
  {
    title: "footerBrand",
    links: [
      { href: "/about", label: "navAbout" },
      { href: "/agency", label: "footerAgentProgram" },
      { href: "/blogs", label: "blogs" },
      { href: "/contact", label: "navContact" }
    ]
  },
  {
    title: "footerPolicy",
    links: [
      { href: "/shipping-policy", label: "shippingPolicy" },
      { href: "/returns-policy", label: "returnsPolicy" },
      { href: "/privacy-policy", label: "privacyPolicy" },
      { href: "/terms", label: "terms" },
      { href: "/commercial-law", label: "commercialLaw" }
    ]
  }
] satisfies { title: MessageKey; links: { href: string; label: MessageKey }[] }[];

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1.2fr_2fr]">
        <div>
          <div className="text-sm font-semibold tracking-[0.18em] text-zinc-950">PETLINKSHOP</div>
          <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-500">
            <T k="footerText" />
          </p>
          <Link href="/admin" className="mt-5 inline-flex text-sm font-semibold text-zinc-950">
            <T k="adminEntrance" />
          </Link>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-semibold text-zinc-950"><T k={column.title} /></h3>
              <div className="mt-4 grid gap-3 text-sm text-zinc-500">
                {column.links.map((link) => (
                  <Link key={link.href} href={link.href} className="hover:text-zinc-950">
                    <T k={link.label} />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container-page border-t border-zinc-100 py-5 text-xs text-zinc-400">
        <T k="copyright" />
      </div>
    </footer>
  );
}
