export type BlogCategory =
  | "猫砂知识"
  | "猫咪护理"
  | "豆腐猫砂"
  | "除臭技巧"
  | "多猫家庭"
  | "产品测评"
  | "日本养猫生活";

export type BlogPost = {
  slug: string;
  category: BlogCategory;
  title: string;
  excerpt: string;
  publishedAt: string;
  seoTitle: string;
  seoDescription: string;
  coverImage: string;
  imageAlt: string;
  readingTime: string;
  sections: {
    heading: string;
    body: string[];
  }[];
};

export const blogCategories: BlogCategory[] = [
  "猫砂知识",
  "猫咪护理",
  "豆腐猫砂",
  "除臭技巧",
  "多猫家庭",
  "产品测评",
  "日本养猫生活"
];

export const blogPosts: BlogPost[] = [
  {
    slug: "best-cat-litter-for-japan-apartment",
    category: "日本养猫生活",
    title: "マンションで使いやすい猫砂の選び方",
    excerpt: "日本のマンション暮らしでは、臭い、粉塵、飛び散り、保管しやすさをまとめて考えることが大切です。",
    publishedAt: "2026-05-01",
    seoTitle: "マンションで使いやすい猫砂｜低粉塵・消臭・飛び散り対策",
    seoDescription:
      "日本のマンションで猫砂を選ぶポイントを解説。低粉塵、消臭力、固まり方、飛び散りにくさ、保管しやすさを比較します。",
    coverImage: "/images/cat-scene.png",
    imageAlt: "日本のマンションで使いやすい低粉塵猫砂",
    readingTime: "5 min",
    sections: [
      {
        heading: "マンションでは臭い対策が最優先",
        body: [
          "室内の距離が近いマンションでは、猫砂の臭いが生活空間に残りやすくなります。消臭力のある猫砂を選ぶことで、玄関やリビングに置いた場合でも清潔な印象を保ちやすくなります。",
          "排泄後にすばやく固まるタイプは、汚れた部分だけを取り除きやすく、毎日の掃除時間も短くできます。"
        ]
      },
      {
        heading: "低粉塵タイプは掃除しやすい",
        body: [
          "猫砂の粉塵が多いと、床や棚に白い粉が残りやすく、猫の足にも付着しやすくなります。低粉塵の豆腐猫砂は、掃除のしやすさと室内の清潔感を重視する家庭に向いています。"
        ]
      },
      {
        heading: "保管しやすいセットを選ぶ",
        body: [
          "猫砂は継続的に使う消耗品です。1袋で試してから、生活リズムに合う場合は複数袋セットに切り替えると、買い忘れを防ぎやすくなります。"
        ]
      }
    ]
  },
  {
    slug: "tofu-cat-litter-merits-demerits",
    category: "豆腐猫砂",
    title: "豆腐猫砂とは？メリット・デメリットをやさしく解説",
    excerpt: "豆腐猫砂は植物由来素材を中心にした猫砂です。軽さ、固まり方、処理方法、臭い対策の観点で特徴を整理します。",
    publishedAt: "2026-04-22",
    seoTitle: "豆腐猫砂とは？メリット・デメリット｜猫砂 おすすめ比較",
    seoDescription:
      "豆腐猫砂のメリットとデメリットを解説。低粉塵、消臭、固まり方、処理方法、膨潤土猫砂との違いを比較します。",
    coverImage: "/images/feature-clump.png",
    imageAlt: "豆腐猫砂の固まり方と低粉塵の特徴",
    readingTime: "6 min",
    sections: [
      {
        heading: "豆腐猫砂の特徴",
        body: [
          "豆腐猫砂は、おからなど植物由来の素材を中心に作られる猫砂です。軽量で扱いやすく、低粉塵タイプを選ぶと室内でも使いやすいのが特徴です。",
          "固まり方や消臭力は製品によって差があるため、素材だけでなく粒の形状や配合も確認すると選びやすくなります。"
        ]
      },
      {
        heading: "メリット",
        body: [
          "軽くて補充しやすいこと、粉塵が少ないタイプを選びやすいこと、汚れた部分を取り除きやすいことが主なメリットです。",
          "日本の住まいでは、保管スペースや掃除のしやすさも重要な判断軸になります。"
        ]
      },
      {
        heading: "デメリット",
        body: [
          "湿気に弱い場合があるため、開封後はできるだけ早めに使い切ることが大切です。高温多湿、直射日光を避けて保管しましょう。"
        ]
      }
    ]
  },
  {
    slug: "cat-litter-odor-control-summer",
    category: "除臭技巧",
    title: "夏の猫砂の臭い対策。部屋を快適に保つ基本",
    excerpt: "夏は猫砂の臭いが強くなりやすい季節。固まり方、掃除頻度、置き場所、補充の仕方を見直しましょう。",
    publishedAt: "2026-04-10",
    seoTitle: "猫砂の臭い対策｜夏でも快適な消臭猫砂の選び方",
    seoDescription:
      "夏の猫砂の臭い対策を解説。消臭力、掃除頻度、固まり方、トイレの置き場所、多頭飼い家庭での注意点をまとめました。",
    coverImage: "/images/feature-odor.png",
    imageAlt: "猫砂 消臭と夏の臭い対策",
    readingTime: "5 min",
    sections: [
      {
        heading: "臭いが強くなる理由",
        body: [
          "気温と湿度が高くなる夏は、猫砂トイレの臭いがこもりやすくなります。消臭力のある猫砂に加えて、固まった部分を早めに取り除くことが重要です。"
        ]
      },
      {
        heading: "掃除頻度を上げる",
        body: [
          "1日1回だけでなく、可能であれば朝晩の確認がおすすめです。汚れた部分を取り除いた分だけ新しい猫砂を補充すると、清潔な状態を保ちやすくなります。"
        ]
      },
      {
        heading: "置き場所の見直し",
        body: [
          "直射日光が当たる場所や湿気の多い場所は避け、空気がこもりすぎない位置に置くと臭い対策に役立ちます。"
        ]
      }
    ]
  }
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
