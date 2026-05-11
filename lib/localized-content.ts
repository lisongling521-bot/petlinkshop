import type { Locale } from "@/lib/i18n";

type Localized<T> = Record<Locale, T>;

export const localizedSeo = {
  homeFaqs: {
    ja: [
      ["豆腐猫砂は日本のマンションでも使いやすいですか？", "低粉塵、消臭、固まりやすさを重視しているため、猫砂トイレと生活空間が近いマンションでも使いやすい設計です。"],
      ["多頭飼いにもおすすめですか？", "複数SKUを用意しているため、1袋のお試しから6袋以上のストック購入まで選びやすく、多頭飼い家庭にも向いています。"],
      ["猫砂の臭い対策として何が大切ですか？", "消臭力のある猫砂を選び、固まった部分を毎日取り除き、同量を補充することが臭い対策の基本です。"]
    ],
    zh: [
      ["豆腐猫砂适合日本公寓使用吗？", "适合。低粉尘、除臭和快速结团是核心设计点，适合猫砂盆离生活空间较近的公寓家庭。"],
      ["多猫家庭适合使用吗？", "适合。网站提供多个SKU，从1袋试用到6袋以上囤货都可以选择，方便多猫家庭长期使用。"],
      ["猫砂除臭最重要的是什么？", "选择除臭能力好的猫砂，并每天清理结团部分，再补充等量新猫砂，是控制异味的基础。"]
    ],
    en: [
      ["Is tofu cat litter suitable for Japanese apartments?", "Yes. It is designed around low dust, odor control, and fast clumping, making it practical for compact homes."],
      ["Is it suitable for multi-cat homes?", "Yes. Multiple SKUs make it easy to start with one bag or stock up with larger sets for multi-cat households."],
      ["What matters most for litter odor control?", "Choose a litter with odor control, remove clumps daily, and refill the same amount of fresh litter."]
    ]
  },
  homeWhy: {
    ja: {
      eyebrow: "Why Petlinkshop",
      title: "日本家庭に合う、低粉塵・消臭・固まりやすい猫砂",
      body: "Petlinkshopは、猫砂 おすすめ、豆腐猫砂 おすすめ、猫砂 消臭、猫砂 低粉塵を探している方に向けて、毎日の掃除と保管がしやすい猫砂を提案します。多頭飼い、マンション生活、夏の臭い対策、飛び散りにくさを重視する日本の猫家庭に使いやすい設計です。",
      cards: [
        ["低粉塵で室内を清潔に", "粉塵が少ない猫砂は、床や棚に細かい粉が残りにくく、猫トイレ周辺の掃除もしやすくなります。"],
        ["臭いを閉じ込める消臭設計", "排泄後の臭いがこもりやすいマンションや多頭飼い家庭でも、快適な空間を保ちやすい猫砂を目指しました。"],
        ["固まりやすく、取り除きやすい", "しっかり固まる猫砂は、汚れた部分だけを取り除きやすく、毎日の清掃時間を短くできます。"]
      ]
    },
    zh: {
      eyebrow: "为什么选择 Petlinkshop",
      title: "适合日本家庭的低粉尘、强除臭、快速结团猫砂",
      body: "Petlinkshop 面向正在搜索猫砂推荐、豆腐猫砂推荐、猫砂除臭、低粉尘猫砂的用户，提供更容易清理、囤货和长期复购的猫砂选择。适合多猫家庭、公寓生活、夏季异味控制和减少飞散的日常使用场景。",
      cards: [
        ["低粉尘，保持室内清洁", "粉尘更少的猫砂不容易在地板和柜面留下细粉，也更方便清理猫砂盆周边。"],
        ["锁住异味的除臭设计", "针对公寓和多猫家庭中更容易积聚的异味，强调更舒适的居家空间。"],
        ["结团快，更好铲除", "结团稳定的猫砂能让脏污部分更容易被铲走，减少每天清理时间。"]
      ]
    },
    en: {
      eyebrow: "Why Petlinkshop",
      title: "Low-dust, odor-control cat litter for Japanese homes",
      body: "Petlinkshop is designed for customers searching for recommended cat litter, tofu cat litter, odor control, and low-dust litter. It supports everyday cleaning, apartment living, summer odor control, and multi-cat households.",
      cards: [
        ["Low dust for cleaner rooms", "Low-dust litter leaves less fine residue around floors, shelves, and the litter box area."],
        ["Odor control for compact homes", "Designed to help keep apartments and multi-cat homes feeling fresher after daily litter box use."],
        ["Fast clumping, easy scooping", "Firm clumps make it easier to remove only the soiled parts and shorten daily cleaning time."]
      ]
    }
  },
  creator: {
    ja: {
      eyebrow: "Creator reviews",
      title: "達人・ユーザー動画を掲載できるSEO導線",
      body: "今後、猫砂 比較、猫砂 口コミ、猫砂 飛び散らないなどの検索流入に向けて、使用レビュー動画や短い実演コンテンツをここに追加できます。第一版では大きな動画を自動読み込みせず、ページ速度を保つため画像カードとして表示しています。",
      cards: [
        ["低粉塵レビュー", "床に粉が残りにくいか、猫トイレ周辺の掃除しやすさを確認できます。"],
        ["消臭レビュー", "マンションや多頭飼い家庭で気になる臭い対策を分かりやすく紹介します。"]
      ]
    },
    zh: {
      eyebrow: "达人与用户评测",
      title: "为达人视频和用户评测预留 SEO 展示入口",
      body: "后续可以在这里放使用评测、开箱、除臭对比和飞散测试，用于承接“猫砂比较”“猫砂评价”“不易飞散猫砂”等搜索流量。第一版不自动加载大视频，用图片卡片保持页面速度。",
      cards: [
        ["低粉尘评测", "展示地板是否容易残留粉尘，以及猫砂盆周边是否更容易清理。"],
        ["除臭评测", "用更直观的方式展示公寓和多猫家庭关心的异味控制效果。"]
      ]
    },
    en: {
      eyebrow: "Creator reviews",
      title: "A lightweight SEO area for creator and customer reviews",
      body: "Future review videos, unboxing clips, odor comparisons, and tracking tests can live here. The first version uses image cards instead of autoplay video to keep the page fast.",
      cards: [
        ["Low-dust review", "Show how little residue is left around the litter box and floor."],
        ["Odor-control review", "Explain odor control in apartments and multi-cat homes in a simple visual way."]
      ]
    }
  },
  productList: {
    ja: {
      eyebrow: "Products",
      title: "猫砂产品一覧",
      body: "低粉塵、強力消臭、快速固まりを重視したPetlinkshopの豆腐猫砂。1袋のお試しから、多頭飼い・ストック用のセットまで選べます。",
      cta: "商品详情を見る",
      lineupEyebrow: "SKU lineup",
      lineupTitle: "日本家庭の使い方に合わせて選べる6SKU",
      lineupBody: "猫砂 おすすめ、豆腐猫砂 おすすめ、猫砂 消臭、猫砂 低粉塵を探している方に向けて、分かりやすいセット構成にしています。"
    },
    zh: {
      eyebrow: "商品",
      title: "猫砂产品一覧",
      body: "Petlinkshop 豆腐猫砂主打低粉尘、强力除臭和快速结团。从1袋试用到多猫家庭囤货套装，都可以清楚选择。",
      cta: "查看商品详情",
      lineupEyebrow: "SKU 组合",
      lineupTitle: "6个SKU，适合不同家庭使用方式",
      lineupBody: "面向搜索猫砂推荐、豆腐猫砂推荐、猫砂除臭和低粉尘猫砂的用户，提供容易理解的套装组合。"
    },
    en: {
      eyebrow: "Products",
      title: "Cat litter products",
      body: "Petlinkshop tofu cat litter focuses on low dust, odor control, and fast clumping. Choose from a trial bag to larger stock-up sets for multi-cat homes.",
      cta: "View product details",
      lineupEyebrow: "SKU lineup",
      lineupTitle: "Six SKUs for different household needs",
      lineupBody: "A simple lineup for customers looking for recommended cat litter, tofu cat litter, odor control, and low-dust options."
    }
  },
  agencyExtra: {
    ja: {
      eyebrow: "Partner flow",
      title: "日本向け猫砂販売パートナーの申請流程",
      body: "オンラインで申請、審査、契約、販売開始まで進められるように設計しています。将来的なSEO記事や広告からの流入にも対応しやすい代理加盟ページです。"
    },
    zh: {
      eyebrow: "合作流程",
      title: "面向日本市场的猫砂销售代理申请流程",
      body: "页面说明从线上申请、审核、签约到开始销售的完整流程，也方便后续承接SEO文章、广告和渠道推广带来的代理咨询。"
    },
    en: {
      eyebrow: "Partner flow",
      title: "Agency application flow for cat litter partners",
      body: "The page explains the online application, review, contract, and launch process, making it easier to support future SEO and ad traffic."
    }
  },
  productKeywords: {
    ja: ["猫砂 おすすめ", "豆腐猫砂 おすすめ", "猫砂 消臭", "猫砂 低粉塵", "猫砂 固まる"],
    zh: ["猫砂推荐", "豆腐猫砂推荐", "猫砂除臭", "低粉尘猫砂", "快速结团猫砂"],
    en: ["recommended cat litter", "tofu cat litter", "odor control", "low dust", "fast clumping"]
  },
  productGuideTitle: {
    ja: "日本の猫家庭に向けた豆腐猫砂の選び方",
    zh: "如何为日本养猫家庭选择豆腐猫砂",
    en: "How to choose tofu cat litter for Japanese homes"
  },
  productSections: {
    ja: [
      ["どんな猫におすすめか", "低粉塵で掃除しやすい猫砂を探している家庭、臭い対策を重視する家庭、しっかり固まる猫砂を使いたい家庭におすすめです。初めて豆腐猫砂を使う猫にも試しやすい粒設計を目指しています。"],
      ["日本の住まいに合う使用シーン", "マンションやアパートなど、猫砂トイレと生活空間が近い日本の家庭では、粉塵、臭い、飛び散り、保管しやすさが重要です。Petlinkshopは日常の清潔感を保ちやすい猫砂を目指しています。"],
      ["低粉塵・消臭・固まり方", "豆腐砂とキャッサバ砂を組み合わせ、粉塵の少なさ、臭いを閉じ込める消臭力、汚れた部分を取り除きやすい固まり方のバランスを大切にしています。"],
      ["成分と使い方", "主な成分は植物由来のおから、キャッサバ澱粉、植物繊維、食品グレード凝固剤、天然香料です。猫トイレの底に5〜6cmほど敷き、使用後は固まった部分を取り除いて同量を補充してください。"],
      ["注意事項", "猫用トイレ砂以外の用途には使用しないでください。高温多湿、直射日光を避け、小さなお子様やペットの手が届かない場所で保管してください。"]
    ],
    zh: [
      ["适合什么猫咪", "适合需要低粉尘、容易清理、重视除臭和快速结团的家庭。第一次尝试豆腐猫砂的猫咪，也建议从少量或单袋开始观察适应情况。"],
      ["适合什么家庭场景", "在日本公寓、租房和多猫家庭中，猫砂盆常常离生活空间较近，因此粉尘、异味、飞散和收纳便利性都很重要。Petlinkshop 面向这些日常场景设计。"],
      ["低粉尘、除臭和结团效果", "通过豆腐砂和木薯砂的组合，兼顾低粉尘、锁住异味和结团后容易铲除的使用体验。"],
      ["成分和使用方法", "主要成分包含植物来源豆腐砂、木薯淀粉、植物纤维、食品级凝固剂和天然香料。建议在猫砂盆底部铺5-6cm，使用后铲除结团部分并补充等量新砂。"],
      ["注意事项", "请勿用于猫砂以外用途。避免高温潮湿和直射阳光，并存放在儿童和宠物不易接触的位置。"]
    ],
    en: [
      ["Best for which cats", "Recommended for homes that want low dust, easier cleaning, odor control, and fast clumping. Start with a small amount if your cat is new to tofu litter."],
      ["Best household scenarios", "In Japanese apartments and compact homes, dust, odor, tracking, and storage all matter. Petlinkshop is designed for those daily situations."],
      ["Low dust, odor control, and clumping", "A blend of tofu and cassava litter balances lower dust, odor control, and clumps that are easy to scoop."],
      ["Ingredients and use", "Main ingredients include plant-based okara, cassava starch, plant fiber, food-grade coagulant, and natural fragrance. Fill 5-6cm, scoop clumps, and refill the same amount."],
      ["Notes", "Use only as cat litter. Store away from heat, humidity, direct sunlight, children, and pets."]
    ]
  },
  productFaqs: {
    ja: [
      ["豆腐猫砂はすべての猫に使えますか？", "多くの成猫に使いやすい猫砂ですが、猫の好みや健康状態に合わせて少量から試すことをおすすめします。"],
      ["この猫砂は粉塵が多いですか？", "低粉塵を意識した配合で、掃除しやすく日本のマンションでも使いやすい設計です。"],
      ["猫砂はトイレに流せますか？", "少量ずつ流し、自治体や建物の排水ルールに従ってください。一度に大量に流すことは避けてください。"],
      ["多頭飼い家庭にも向いていますか？", "消臭力と固まりやすさを重視しているため、多頭飼い家庭の毎日の掃除にも使いやすい猫砂です。"],
      ["幼猫にも使えますか？", "幼猫に使う場合は誤食や体調変化に注意し、心配な場合は獣医師に相談してください。"]
    ],
    zh: [
      ["豆腐猫砂适合所有猫咪吗？", "大多数成年猫可以使用，但建议根据猫咪偏好和健康情况，从少量开始尝试。"],
      ["这款猫砂粉尘多吗？", "配方强调低粉尘，适合更重视清洁和日本公寓使用体验的家庭。"],
      ["猫砂可以冲厕所吗？", "如需冲厕所，请少量分次处理，并遵守当地自治体和建筑排水规则，避免一次大量冲入。"],
      ["多猫家庭适合使用吗？", "适合。产品重视除臭和结团，方便多猫家庭日常清理。"],
      ["幼猫可以使用吗？", "幼猫使用时请注意误食和身体反应，如有担心建议先咨询兽医。"]
    ],
    en: [
      ["Is tofu cat litter suitable for all cats?", "It works for many adult cats, but start with a small amount and watch your cat's preference and condition."],
      ["Is this litter dusty?", "The formula is designed with low dust in mind, making it easier to keep apartments clean."],
      ["Can it be flushed?", "Flush only small amounts and follow local drainage rules. Do not flush large amounts at once."],
      ["Is it good for multi-cat homes?", "Yes. It focuses on odor control and clumping for daily multi-cat cleaning."],
      ["Can kittens use it?", "Watch for accidental eating or changes in condition. Ask a veterinarian if you are unsure."]
    ]
  },
  productReviews: {
    ja: ["粉塵が少なく、掃除後の床がすっきりします。", "臭いがこもりにくく、マンションでも使いやすいです。", "セット価格が分かりやすく、ストック購入しやすいです。"],
    zh: ["粉尘少，清理后地板更干净。", "异味不容易闷住，公寓里也比较好用。", "套装价格清楚，囤货购买很方便。"],
    en: ["Low dust and the floor feels cleaner after scooping.", "Odor does not linger as much, even in an apartment.", "The set pricing is clear and easy for stock-up orders."]
  },
  relatedProduct: {
    ja: ["関連商品推薦", "6つのSKUから、試し買い、多頭飼い、ストック購入に合わせて選べます。", "产品一覧へ"],
    zh: ["相关商品推荐", "可从6个SKU中选择，适合试用、多猫家庭和囤货购买。", "返回产品一覧"],
    en: ["Related products", "Choose from six SKUs for trial orders, multi-cat homes, and stock-up purchases.", "View products"]
  },
  faqTitle: {
    ja: "猫砂 SEO FAQ",
    zh: "猫砂常见问题",
    en: "Cat Litter FAQ"
  },
  homeFaqTitle: {
    ja: "猫砂についてよくある質問",
    zh: "关于猫砂的常见问题",
    en: "Cat litter frequently asked questions"
  },
  viewFaq: {
    ja: "FAQを見る",
    zh: "查看FAQ",
    en: "View FAQ"
  },
  blogHome: {
    ja: ["猫砂知识与日本养猫生活", "記事一覧へ"],
    zh: ["猫砂知识与日本养猫生活", "查看文章"],
    en: ["Cat litter knowledge and cat care life", "View articles"]
  }
} satisfies {
  homeFaqs: Localized<string[][]>;
  homeWhy: Localized<{ eyebrow: string; title: string; body: string; cards: string[][] }>;
  creator: Localized<{ eyebrow: string; title: string; body: string; cards: string[][] }>;
  productList: Localized<Record<string, string>>;
  agencyExtra: Localized<Record<string, string>>;
  productKeywords: Localized<string[]>;
  productGuideTitle: Localized<string>;
  productSections: Localized<string[][]>;
  productFaqs: Localized<string[][]>;
  productReviews: Localized<string[]>;
  relatedProduct: Localized<string[]>;
  faqTitle: Localized<string>;
  homeFaqTitle: Localized<string>;
  viewFaq: Localized<string>;
  blogHome: Localized<string[]>;
};

export const localizedBlogs = {
  ja: [
    {
      slug: "best-cat-litter-for-japan-apartment",
      category: "日本养猫生活",
      title: "マンションで使いやすい猫砂の選び方",
      excerpt: "日本のマンション暮らしでは、臭い、粉塵、飛び散り、保管しやすさをまとめて考えることが大切です。",
      sections: [
        ["マンションでは臭い対策が最優先", ["室内の距離が近いマンションでは、猫砂の臭いが生活空間に残りやすくなります。", "排泄後にすばやく固まるタイプは、汚れた部分だけを取り除きやすく、毎日の掃除時間も短くできます。"]],
        ["低粉塵タイプは掃除しやすい", ["猫砂の粉塵が多いと、床や棚に白い粉が残りやすく、猫の足にも付着しやすくなります。"]],
        ["保管しやすいセットを選ぶ", ["1袋で試してから、生活リズムに合う場合は複数袋セットに切り替えると、買い忘れを防ぎやすくなります。"]]
      ]
    },
    {
      slug: "tofu-cat-litter-merits-demerits",
      category: "豆腐猫砂",
      title: "豆腐猫砂とは？メリット・デメリットをやさしく解説",
      excerpt: "豆腐猫砂は植物由来素材を中心にした猫砂です。軽さ、固まり方、処理方法、臭い対策の観点で特徴を整理します。",
      sections: [
        ["豆腐猫砂の特徴", ["豆腐猫砂は、おからなど植物由来の素材を中心に作られる猫砂です。軽量で扱いやすく、低粉塵タイプを選ぶと室内でも使いやすいのが特徴です。"]],
        ["メリット", ["軽くて補充しやすいこと、粉塵が少ないタイプを選びやすいこと、汚れた部分を取り除きやすいことが主なメリットです。"]],
        ["デメリット", ["湿気に弱い場合があるため、開封後はできるだけ早めに使い切ることが大切です。"]]
      ]
    },
    {
      slug: "cat-litter-odor-control-summer",
      category: "除臭技巧",
      title: "夏の猫砂の臭い対策。部屋を快適に保つ基本",
      excerpt: "夏は猫砂の臭いが強くなりやすい季節。固まり方、掃除頻度、置き場所、補充の仕方を見直しましょう。",
      sections: [
        ["臭いが強くなる理由", ["気温と湿度が高くなる夏は、猫砂トイレの臭いがこもりやすくなります。"]],
        ["掃除頻度を上げる", ["可能であれば朝晩に確認し、汚れた部分を取り除いた分だけ新しい猫砂を補充しましょう。"]],
        ["置き場所の見直し", ["直射日光が当たる場所や湿気の多い場所は避け、空気がこもりすぎない位置に置くと臭い対策に役立ちます。"]]
      ]
    }
  ],
  zh: [
    {
      slug: "best-cat-litter-for-japan-apartment",
      category: "日本养猫生活",
      title: "日本公寓里好用的猫砂怎么选？",
      excerpt: "在日本公寓养猫，选择猫砂时要同时考虑除臭、低粉尘、减少飞散和收纳便利性。",
      sections: [
        ["公寓里除臭最重要", ["日本公寓空间相对紧凑，猫砂盆和生活区距离较近，异味更容易被感知。", "快速结团的猫砂可以更容易铲除脏污部分，减少每天清理时间。"]],
        ["低粉尘更容易打扫", ["粉尘多的猫砂容易在地板、柜面和猫咪脚掌上留下细粉。低粉尘豆腐猫砂更适合重视室内清洁感的家庭。"]],
        ["选择方便囤货的套装", ["猫砂是长期消耗品。可以先买1袋试用，确认适合后再选择多袋套装，减少忘记补货的情况。"]]
      ]
    },
    {
      slug: "tofu-cat-litter-merits-demerits",
      category: "豆腐猫砂",
      title: "什么是豆腐猫砂？优点和缺点一次看懂",
      excerpt: "豆腐猫砂以植物来源材料为主，轻便、低粉尘、方便清理，但也需要注意保存环境。",
      sections: [
        ["豆腐猫砂的特点", ["豆腐猫砂通常以豆渣等植物来源材料为基础，重量较轻，日常补充和搬运更方便。"]],
        ["主要优点", ["更轻、更好补充、低粉尘类型更容易选择，结团后也方便铲除。"]],
        ["需要注意的地方", ["部分豆腐猫砂比较怕潮，开封后应尽快使用，并避免高温潮湿和直射阳光。"]]
      ]
    },
    {
      slug: "cat-litter-odor-control-summer",
      category: "除臭技巧",
      title: "夏天猫砂臭味重怎么办？保持房间舒适的基础方法",
      excerpt: "夏季温度和湿度升高，猫砂盆更容易产生异味。可以从猫砂、清理频率和摆放位置一起优化。",
      sections: [
        ["为什么夏天异味更明显", ["温度和湿度升高后，猫砂盆的味道更容易闷在室内。"]],
        ["提高清理频率", ["如果条件允许，早晚各检查一次。铲除结团部分后补充等量新砂，有助于保持清洁。"]],
        ["调整摆放位置", ["避免阳光直射和湿气重的位置，选择空气不太闷的地方更有利于控味。"]]
      ]
    }
  ],
  en: [
    {
      slug: "best-cat-litter-for-japan-apartment",
      category: "Japan cat life",
      title: "How to choose cat litter for Japanese apartments",
      excerpt: "For apartment living in Japan, odor control, dust, tracking, and storage all matter.",
      sections: [
        ["Odor control comes first", ["In compact apartments, litter box odor can reach the living space quickly.", "Fast-clumping litter makes daily scooping easier."]],
        ["Low dust is easier to clean", ["Dusty litter can leave residue on floors, shelves, and paws. Low-dust tofu litter is easier for clean interiors."]],
        ["Choose a set that is easy to store", ["Start with one bag, then move to larger sets if it fits your routine."]]
      ]
    },
    {
      slug: "tofu-cat-litter-merits-demerits",
      category: "Tofu cat litter",
      title: "What is tofu cat litter? Pros and cons",
      excerpt: "Tofu cat litter is usually plant-based, lightweight, easy to scoop, and best stored away from humidity.",
      sections: [
        ["What makes tofu litter different", ["Tofu litter is often made mainly from plant-derived ingredients such as okara."]],
        ["Main benefits", ["It can be lightweight, easy to refill, available in low-dust options, and simple to scoop after clumping."]],
        ["Things to watch", ["Some tofu litter is sensitive to humidity, so use it soon after opening and store it carefully."]]
      ]
    },
    {
      slug: "cat-litter-odor-control-summer",
      category: "Odor control",
      title: "Cat litter odor control in summer",
      excerpt: "Summer heat and humidity can make litter box odor stronger. Improve litter choice, scooping frequency, and placement.",
      sections: [
        ["Why odor gets stronger in summer", ["Higher temperature and humidity make litter box odor more noticeable indoors."]],
        ["Scoop more often", ["Check morning and evening if possible, then refill the same amount of clean litter after scooping."]],
        ["Review the litter box location", ["Avoid direct sunlight and humid spots, and choose a place with better airflow."]]
      ]
    }
  ]
} satisfies Localized<
  {
    slug: string;
    category: string;
    title: string;
    excerpt: string;
    sections: [string, string[]][];
  }[]
>;

export function getLocalizedBlog(locale: Locale, slug: string) {
  return localizedBlogs[locale].find((post) => post.slug === slug) || localizedBlogs.ja.find((post) => post.slug === slug);
}
