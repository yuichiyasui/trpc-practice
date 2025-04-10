import clsx from 'clsx';
import Link from 'next/link';
import { trpc } from '../utils/trpc';
import type { NextPageWithLayout } from './_app';

const IndexPage: NextPageWithLayout = () => {
  const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } =
    trpc.post.list.useInfiniteQuery(
      {
        limit: 5,
      },
      {
        getNextPageParam(lastPage) {
          return lastPage.nextCursor;
        },
      },
    );

  const posts = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <div className="bg-gray-800 py-8">
      <h1 className="text-4xl font-bold">tRPC Practice</h1>

      <div className={clsx('py-8')}>
        <h2 className="text-3xl font-semibold mb-6">
          ポスト一覧
          {status === 'pending' && '(loading)'}
        </h2>

        <div className="mb-6">
          <ul className={clsx('grid', 'gap-y-4', 'mb-6')}>
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
                  'bg-gray-900',
                  'p-2',
                  'rounded-md',
                  'font-semibold',
                  'disabled:bg-gray-700',
                  'disabled:text-gray-400',
                )}
                onClick={() => {
                  fetchNextPage();
                }}
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage ? '読み込み中...' : 'もっと読み込む'}
              </button>
            </div>
          )}
        </div>

        <div>
          <Link
            href="/post/new"
            className={clsx(
              'bg-gray-900',
              'p-2',
              'rounded-md',
              'font-semibold',
            )}
          >
            ポストの作成
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
