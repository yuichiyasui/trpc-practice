import { screen } from '@testing-library/react';
import PostListPage from '~/pages';
import { trpc } from '~/utils/trpc';
import { customRender } from './utils';

const Page = trpc.withTRPC(PostListPage);

test('ポスト一覧画面が表示される', async () => {
  customRender(<Page />);

  expect(
    screen.getByRole('heading', { name: 'ポスト一覧', level: 2 }),
  ).toBeInTheDocument();

  // 一覧の検証

  const newLink = screen.getByRole('link', { name: 'ポストの作成' });
  expect(newLink).toBeInTheDocument();
  expect(newLink).toHaveAttribute('href', '/post/new');
});
