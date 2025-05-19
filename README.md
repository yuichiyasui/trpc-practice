# tRPC Practice

tRPCの素振り用プロジェクト。
短い記事を投稿できるアプリケーション。

## Getting Started

1. apps/frontend/.env を作成。

2. 以下のコマンドを実行。

```bash
pnpm i

docker compose up -d

pnpm db:generate
pnpm db:seed
pnpm db:migrate-dev

pnpm dev
```
