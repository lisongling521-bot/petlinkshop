import type { Metadata } from "next";
import { PRODUCT_SLUG, SITE_NAME } from "@/lib/constants";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.petlinkshop.com";
export const CANONICAL_PRODUCT_SLUG = "tofu-cat-litter-low-dust";
export const PRODUCT_PATH = `/products/${CANONICAL_PRODUCT_SLUG}`;
export const PRODUCT_IMAGE = "/images/hero-lifestyle.jpg";

type SeoMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
};

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function seoMetadata({ title, description, path, image = PRODUCT_IMAGE, type = "website", noIndex }: SeoMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title,
    description,
    alternates: {
      canonical: url
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type,
      locale: "ja_JP",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 900,
          alt: "Petlinkshop 低粉塵豆腐猫砂"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl]
    },
    robots: noIndex
      ? {
          index: false,
          follow: false
        }
      : undefined
  };
}

export function resolveProductSlug(slug: string) {
  if (slug === CANONICAL_PRODUCT_SLUG || slug === PRODUCT_SLUG) return PRODUCT_SLUG;
  return slug;
}

export function canonicalProductPath(slug = PRODUCT_SLUG) {
  return slug === PRODUCT_SLUG ? PRODUCT_PATH : `/products/${slug}`;
}

export const seoPages = {
  home: {
    path: "/",
    title: "Petlinkshop｜日本进口豆腐猫砂｜低粉尘・强力除臭・快速结团",
    description:
      "Petlinkshopは、日本の猫家庭に向けた低粉塵・強力消臭・快速固まりの豆腐猫砂ブランドです。多頭飼い、マンション生活、臭い対策にもおすすめです。"
  },
  products: {
    path: "/products",
    title: "猫砂产品一覧｜低粉尘豆腐猫砂・强力除臭｜Petlinkshop",
    description:
      "Petlinkshopの猫砂製品一覧。低粉塵、強力消臭、しっかり固まる豆腐猫砂を、1袋から多頭飼い向けセットまで選べます。"
  },
  product: {
    path: PRODUCT_PATH,
    title: "日本进口豆腐猫砂｜低粉尘・强力除臭・快速结团｜Petlinkshop",
    description:
      "低粉塵で飛び散りにくく、しっかり固まる豆腐猫砂。消臭力に優れ、多頭飼いや日本のマンション暮らしにも使いやすい猫砂です。"
  },
  about: {
    path: "/about",
    title: "Petlinkshopについて｜日本家庭にやさしい猫砂ブランド",
    description:
      "Petlinkshopは、日本の住まいに合う清潔感、低粉塵、消臭力、続けやすい価格を大切にした猫砂ブランドです。"
  },
  contact: {
    path: "/contact",
    title: "お問い合わせ｜Petlinkshop",
    description: "Petlinkshopの商品、配送、注文、代理販売に関するお問い合わせページです。通常2営業日以内に返信します。"
  },
  faq: {
    path: "/faq",
    title: "猫砂についてよくある質問｜Petlinkshop",
    description: "豆腐猫砂の粉塵、消臭、固まり方、トイレ処理、多頭飼い、マンション利用についてよくある質問をまとめました。"
  },
  agency: {
    path: "/agency",
    title: "Petlinkshop代理加盟｜猫砂販売パートナー募集",
    description: "Petlinkshopの猫砂販売パートナーを募集しています。代理モデル、返点、申請流程、オンライン契約についてご案内します。"
  },
  blogs: {
    path: "/blogs",
    title: "猫砂知识与养猫生活｜Petlinkshop Blog",
    description: "猫砂の選び方、豆腐猫砂、臭い対策、多頭飼い、日本のマンション暮らしに役立つ記事を発信します。"
  }
} as const;
