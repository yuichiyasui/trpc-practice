import { screen, waitFor, within } from "@testing-library/react";
import { setupServer } from "msw/node";
import Page from "~/app/page";
import { customRender, trpcMsw } from "./utils";

const postListQueryInterceptor = vi.fn();

const server = setupServer(
  trpcMsw.post.list.query((input) => {
    postListQueryInterceptor(input);

    return {
      nextCursor: "1",
      items: [
        {
          id: "1",
          title: "ポストのタイトル",
          text: "ポストの内容",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    };
  }),
);

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

test("ポスト一覧画面が表示される", async () => {
  customRender(<Page />);

  expect(
    screen.getByRole("heading", { name: "ポスト一覧", level: 2 }),
  ).toBeInTheDocument();

  await waitFor(() => {
    expect(postListQueryInterceptor).toHaveBeenCalledTimes(1);
  });

  // 一覧の検証
  const list = await screen.findByRole("list");
  expect(list).toBeInTheDocument();
  const items = within(list).getAllByRole("listitem");
  expect(items).toHaveLength(1);
  const item = items[0];
  expect(item).toHaveTextContent("ポストのタイトル");
  const detailLink = within(item).getByRole("link", {
    name: "詳細",
  });
  expect(detailLink).toBeInTheDocument();
  expect(detailLink).toHaveAttribute("href", "/post/1");

  const newLink = screen.getByRole("link", { name: "ポストの作成" });
  expect(newLink).toBeInTheDocument();
  expect(newLink).toHaveAttribute("href", "/post/new");
});
