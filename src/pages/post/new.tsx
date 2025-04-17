import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { trpc } from "~/utils/trpc";
import type { NextPageWithLayout } from "../_app";

const schema = z.object({
  title: z.string().min(1, { message: "タイトルは必須です" }),
  text: z.string().min(1, { message: "内容は必須です" }),
});

const PostNewPage: NextPageWithLayout = () => {
  const router = useRouter();
  const utils = trpc.useUtils();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      text: "",
    },
  });

  const { mutateAsync, isPending } = trpc.post.add.useMutation({
    async onSuccess() {
      // refetches posts after a post is added
      await utils.post.list.invalidate();
      router.push("/");
    },
    onError() {
      setError("root", { message: "投稿に失敗しました" });
    },
  });

  const submit = handleSubmit(async (data) => {
    await mutateAsync(data);
  });

  const id = useId();
  const titleFieldId = `title-${id}`;
  const textFieldId = `text-${id}`;

  return (
    <div className="flex flex-col bg-gray-800 py-8">
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center space-x-2 text-gray-400">
          <li className="after:content-['/'] after:ml-2">
            <a href="/" className="hover:text-gray-300">
              ポスト一覧
            </a>
          </li>
          <li>
            <span aria-current="page">ポストの作成</span>
          </li>
        </ol>
      </nav>

      <h1 className="text-4xl font-bold mb-6">ポストの作成</h1>
      <form className="py-2 w-4/6" noValidate onSubmit={submit}>
        <div className="flex flex-col gap-y-4 font-semibold w-96">
          <div>
            <div className="mb-2">
              <label htmlFor={titleFieldId}>タイトル</label>
            </div>
            <div>
              <input
                {...register("title")}
                className="focus-visible:outline-dashed outline-offset-4 outline-2 outline-gray-700 w-full rounded-xl px-4 py-3 bg-gray-900"
                id={titleFieldId}
                type="text"
                disabled={isPending}
              />
            </div>
            {errors.title && (
              <p className="text-red-600 mt-2">{errors.title.message}</p>
            )}
          </div>
          <div>
            <div className="mb-2">
              <label htmlFor={textFieldId}>内容</label>
            </div>
            <div>
              <textarea
                {...register("text")}
                className="resize-none focus-visible:outline-dashed outline-offset-4 outline-2 outline-gray-700 rounded-xl w-full px-4 py-3 bg-gray-900"
                id={textFieldId}
                disabled={isPending}
                rows={6}
              />
            </div>
            {errors.text && (
              <p className="text-red-600 mt-2">{errors.text.message}</p>
            )}
          </div>

          <div>
            <button
              className="cursor-pointer bg-gray-900 p-2 rounded-md px-16 text-nowrap"
              type="submit"
              disabled={isPending}
            >
              {isPending ? (
                <span className="animate-pulse">作成中...</span>
              ) : (
                "ポストを作成"
              )}
            </button>
          </div>

          {errors.root && (
            <p className="text-red-600">{errors.root?.message}</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default PostNewPage;
