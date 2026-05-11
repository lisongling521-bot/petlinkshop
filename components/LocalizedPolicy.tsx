"use client";

import type { ReactNode } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { MessageKey, messages } from "@/lib/i18n";

type PolicyKind = "faq" | "contact" | "shipping" | "returns" | "privacy" | "terms" | "commercial";

const policyContent: Record<PolicyKind, Record<"ja" | "zh" | "en", ReactNode>> = {
  faq: {
    ja: (
      <div className="grid gap-3">
        {[
          ["どのSKUを選べばいいですか？", "初めての方は1袋または2袋セット、継続利用の方は6袋以上がおすすめです。"],
          ["配送エリアは？", "日本国内配送を想定しています。離島など一部地域は別途確認が必要です。"],
          ["注文後に在庫は減りますか？", "はい。注文作成時に選択SKUの在庫が自動で減ります。"],
          ["支払いは利用できますか？", "第一版ではStripe接続を予約しています。注文の paymentStatus は pending で作成されます。"]
        ].map(([q, a]) => <FaqItem key={q} q={q} a={a} />)}
      </div>
    ),
    zh: (
      <div className="grid gap-3">
        {[
          ["应该选择哪个SKU？", "首次购买建议选1袋或2袋装，长期使用建议选择6袋以上组合。"],
          ["配送范围？", "当前以日本国内配送为基础设计，离岛等特殊地区可另行确认。"],
          ["下单后库存会减少吗？", "会。订单创建时会自动扣减对应SKU库存。"],
          ["现在可以支付吗？", "第一版预留 Stripe 接口，订单 paymentStatus 默认为 pending。"]
        ].map(([q, a]) => <FaqItem key={q} q={q} a={a} />)}
      </div>
    ),
    en: (
      <div className="grid gap-3">
        {[
          ["Which SKU should I choose?", "Try 1 or 2 bags first; choose 6+ bags for regular stock-up orders."],
          ["Where do you ship?", "The first version is designed for domestic Japan shipping. Remote areas can be confirmed separately."],
          ["Does stock decrease after ordering?", "Yes. The selected SKU stock is deducted when an order is created."],
          ["Is payment available now?", "Stripe is reserved for the next step. Orders are created with paymentStatus pending."]
        ].map(([q, a]) => <FaqItem key={q} q={q} a={a} />)}
      </div>
    )
  },
  contact: {
    ja: <TextLines lines={["商品、配送、注文に関するお問い合わせは下記メールアドレスまでご連絡ください。", "team@petlinkshop.com", "通常2営業日以内に返信します。"]} />,
    zh: <TextLines lines={["关于商品、配送和订单的问题，请通过以下邮箱联系我们。", "team@petlinkshop.com", "通常会在2个工作日内回复。"]} />,
    en: <TextLines lines={["For product, shipping, or order questions, contact us by email.", "team@petlinkshop.com", "We usually reply within 2 business days."]} />
  },
  shipping: {
    ja: <TextLines lines={["ご注文確認後、通常2〜5営業日以内に発送します。", "第一版では配送料は無料として計算しています。", "発送後、管理后台から物流单号を入力できます。"]} />,
    zh: <TextLines lines={["订单确认后，通常2-5个工作日内发货。", "第一版配送费按免费计算。", "发货后可在后台填写物流单号。"]} />,
    en: <TextLines lines={["Orders usually ship within 2-5 business days after confirmation.", "Shipping is calculated as free in this first version.", "Tracking numbers can be added from the admin panel after shipment."]} />
  },
  returns: {
    ja: <TextLines lines={["未開封の商品に限り、商品到着後7日以内の返品相談を承ります。", "開封済み、使用済み、お客様都合による破損がある場合は返品対象外となります。", "不良品または配送中の破損がある場合は、写真と注文番号を添えてお問い合わせください。"]} />,
    zh: <TextLines lines={["未开封商品可在到货后7日内咨询退换。", "已开封、已使用或因客户原因损坏的商品不支持退换。", "如商品不良或运输损坏，请附照片和订单号联系我们。"]} />,
    en: <TextLines lines={["Unopened products may be considered for return within 7 days of delivery.", "Opened, used, or customer-damaged items are not eligible.", "For defective or damaged items, contact us with photos and your order number."]} />
  },
  privacy: {
    ja: <TextLines lines={["当店は、注文処理、配送、問い合わせ対応のために必要な範囲で個人情報を取得します。", "取得した情報は、法令に基づく場合を除き、本人の同意なく第三者へ提供しません。", "決済機能を接続する場合、カード情報はStripe等の決済事業者が管理し、当店サーバーには保存しません。"]} />,
    zh: <TextLines lines={["本店仅在订单处理、配送和客服所需范围内收集个人信息。", "除法律要求外，未经本人同意不会向第三方提供个人信息。", "接入支付后，银行卡信息由 Stripe 等支付服务商管理，本站服务器不保存。"]} />,
    en: <TextLines lines={["We collect personal information only as needed for order processing, delivery, and support.", "We do not provide personal information to third parties without consent unless required by law.", "When payments are connected, card data is handled by Stripe or another payment provider and is not stored on this server."]} />
  },
  terms: {
    ja: <TextLines lines={["本サイトの利用者は、商品購入時に正確な注文情報を入力するものとします。", "在庫、価格、商品仕様は予告なく変更される場合があります。", "不正注文、虚偽情報、転売目的と判断される注文はキャンセルする場合があります。"]} />,
    zh: <TextLines lines={["用户购买商品时应填写准确的订单信息。", "库存、价格和商品规格可能会不定期调整。", "如判断为异常订单、虚假信息或转售目的，本站可能取消订单。"]} />,
    en: <TextLines lines={["Customers must enter accurate order information when purchasing.", "Stock, prices, and product specifications may change without notice.", "Orders may be cancelled if they appear fraudulent, inaccurate, or intended for resale."]} />
  },
  commercial: {
    ja: <TextLines lines={["販売業者: PetLinkShop", "メールアドレス: team@petlinkshop.com", "販売価格: 各商品ページに表示", "支払方法: 第一版はStripe Checkout接続予定。現在は注文作成のみ。", "引渡時期: 注文確認後、通常2〜5営業日以内に発送"]} />,
    zh: <TextLines lines={["销售方: PetLinkShop", "邮箱: team@petlinkshop.com", "销售价格: 显示于各商品页面", "支付方式: 第一版预留 Stripe Checkout，目前仅创建订单。", "交付时间: 订单确认后通常2-5个工作日内发货"]} />,
    en: <TextLines lines={["Seller: PetLinkShop", "Email: team@petlinkshop.com", "Price: Shown on each product page", "Payment: Stripe Checkout is reserved for a later version; this version creates orders only.", "Delivery: Usually ships within 2-5 business days after order confirmation"]} />
  }
};

const titleKeys: Record<PolicyKind, MessageKey> = {
  faq: "faqTitle",
  contact: "navContact",
  shipping: "shippingPolicy",
  returns: "returnsPolicy",
  privacy: "privacyPolicy",
  terms: "terms",
  commercial: "commercialLaw"
};

export function LocalizedPolicy({ kind }: { kind: PolicyKind }) {
  const { locale } = useLocale();
  return (
    <>
      <h1 className="text-4xl font-semibold tracking-[-0.04em] text-zinc-950 sm:text-5xl">{messages[locale][titleKeys[kind]]}</h1>
      <div className="prose prose-slate mt-6 max-w-none text-sm leading-7 text-zinc-500">{policyContent[kind][locale]}</div>
    </>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="rounded-md border border-slate-200 bg-white p-4">
      <summary className="cursor-pointer font-bold text-zinc-950">{q}</summary>
      <p className="mt-3">{a}</p>
    </details>
  );
}

function TextLines({ lines }: { lines: string[] }) {
  return (
    <div className="grid gap-3">
      {lines.map((line) => (
        <p key={line}>{line}</p>
      ))}
    </div>
  );
}
