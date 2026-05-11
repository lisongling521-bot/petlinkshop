import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/products", "/products/", "/about", "/contact", "/faq", "/agency", "/blogs", "/blogs/"],
        disallow: [
          "/admin",
          "/admin/",
          "/product/",
          "/cart",
          "/checkout",
          "/login",
          "/register",
          "/order-complete",
          "/api/",
          "/search"
        ]
      }
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL
  };
}
