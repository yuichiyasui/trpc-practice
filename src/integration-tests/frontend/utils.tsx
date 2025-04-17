import { render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { httpLink as TRPCClientHttpLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import type { ReactNode } from "react";
import SuperJSON from "superjson";
import type { AppRouter } from "~/server/routers/_app";
import { createTRPCMsw, httpLink } from "~/utils/msw-trpc";

export const trpc = createTRPCNext<AppRouter>({
  config: () => {
    return {
      links: [
        TRPCClientHttpLink({
          url: "http://localhost:3000/api/trpc",
          headers() {
            return {
              "content-type": "application/json",
            };
          },
          transformer: SuperJSON,
        }),
      ],
      queryClientConfig: {
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
          },
        },
      },
    };
  },
  transformer: SuperJSON,
});

export const customRender = (ui: ReactNode) => {
  const user = userEvent.setup();

  return {
    user,
    ...render(ui),
  };
};

export const trpcMsw = createTRPCMsw<AppRouter>({
  transformer: {
    input: SuperJSON,
    output: SuperJSON,
  },
  links: [
    httpLink({
      url: "http://localhost:3000/api/trpc",
      headers() {
        return {
          "content-type": "application/json",
        };
      },
    }),
  ],
});
