"use client";

import clsx from "clsx";
import Link from "next/link";
import { trpc } from "~/libs/trpc/client";

type Props = {
  limit: number;
};

export const PostList = ({ limit }: Props) => {
  const [{ pages }, allPostsQuery] = trpc.post.list.useSuspenseInfiniteQuery(
    {
      limit,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );
  const { fetchNextPage, isFetchingNextPage, hasNextPage } = allPostsQuery;

  const posts = pages.flatMap((page) => page.items) ?? [];

  return (
    <div>
      <ul className={clsx("grid", "gap-y-4", "mb-6")}>
        {posts.map((item) => (
          <li key={item.id}>
            <article key={item.id}>
              <h3 className="text-2xl font-semibold">{item.title}</h3>
              <Link className="text-gray-400" href={`/post/${item.id}`}>
                詳細
              </Link>
            </article>
          </li>
        ))}
      </ul>
      {hasNextPage && (
        <div>
          <button
            className={clsx(
              "bg-gray-900",
              "p-2",
              "rounded-md",
              "font-semibold",
              "disabled:bg-gray-700",
              "disabled:text-gray-400",
            )}
            onClick={() => {
              fetchNextPage();
            }}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "読み込み中..." : "もっと読み込む"}
          </button>
        </div>
      )}
    </div>
  );
};
