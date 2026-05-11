# PetLinkShop 单品独立站

Next.js + TypeScript + Tailwind CSS + Prisma + SQLite 实现的单品猫砂独立站。

## 功能

- 首页、商品详情、购物车、结算、订单完成页
- FAQ、联系我们、配送政策、退换货政策、隐私政策、利用规约、特定商取引法页面
- 1 个产品、6 个 SKU
- SKU 选择、数量选择、加入购物车、修改数量、删除商品
- 提交订单后生成唯一订单号
- 创建订单时自动扣减对应 SKU 库存
- `/admin` 简单后台登录保护
- 后台查看订单列表、订单详情、修改订单状态、填写物流单号
- 后台查看并修改 SKU 库存、价格、是否上架
- 预留 Stripe Checkout 接入位置，第一版订单 `paymentStatus` 默认为 `pending`

## 技术栈

- Next.js App Router
- TypeScript
- Tailwind CSS
- Prisma
- SQLite

## 安装

请先安装带 npm 的 Node.js LTS 版本。

```bash
cd "C:\Users\Administrator\Documents\New project\petlinkshop"
npm install
```

复制环境变量：

```bash
copy .env.example .env
```

建议修改 `.env`：

```env
DATABASE_URL="file:./dev.db"
ADMIN_PASSWORD="your-admin-password"
ADMIN_COOKIE_SECRET="a-long-random-string"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""
```

初始化数据库并写入 seed 数据：

```bash
npm run db:init
```

启动开发服务器：

```bash
npm run dev
```

访问：

- 前台：http://localhost:3000
- 商品页：http://localhost:3000/product/tofu-cat-litter
- 后台：http://localhost:3000/admin

## 默认后台密码

如果没有设置 `.env`，代码会使用开发默认密码：

```text
admin12345
```

上线前必须修改 `ADMIN_PASSWORD` 和 `ADMIN_COOKIE_SECRET`。

## Stripe 接入位置

当前第一版创建订单后直接跳转订单完成页，订单 `paymentStatus` 为 `pending`。

后续接 Stripe Checkout 时，主要修改：

- `app/api/orders/route.ts`

在订单创建后创建 Stripe Checkout Session，并返回 checkout URL。Stripe webhook 验证成功后再把订单 `paymentStatus` 改为 `paid`，订单 `status` 可改为 `paid`。

## 数据模型

Prisma schema 在：

```text
prisma/schema.prisma
```

包含：

- `Product`
- `SKU`
- `Order`
- `OrderItem`

订单状态：

- `pending`
- `paid`
- `shipped`
- `completed`
- `cancelled`

## 素材

商品图已经复制到：

```text
public/images
```

为了方便部署，已改成英文文件名。
