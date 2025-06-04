import clsx from "clsx";
import Link from "next/link";
import { Suspense } from "react";
import { PostList } from "~/components/post-list";
import { HydrateClient, trpc } from "~/libs/trpc/server";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const Page = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const page = params.page;
  const limit = typeof page === "string" ? Number.parseInt(page, 10) * 5 : 5;

  void trpc.post.list.prefetchInfinite({
    limit,
  });

  return (
    <HydrateClient>
      <div className="bg-gray-800 py-8">
        <h1 className="text-4xl font-bold">tRPC Practice</h1>

        <div className={clsx("py-8")}>
          <h2 className="text-3xl font-semibold mb-6">ポスト一覧</h2>

          <div className="mb-6">
            <Suspense fallback={<p>Loading...</p>}>
              <PostList limit={limit} />
            </Suspense>
          </div>

          <div>
            <Link
              href="/post/new"
              className={clsx(
                "bg-gray-900",
                "p-2",
                "rounded-md",
                "font-semibold",
              )}
            >
              ポストの作成
            </Link>
          </div>
        </div>
      </div>
    </HydrateClient>
  );
};

export default Page;
