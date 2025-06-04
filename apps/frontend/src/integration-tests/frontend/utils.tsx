import { QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import type { AppRouter } from "@trpc-practice/server";
import { httpLink as TRPCClientHttpLink } from "@trpc/client";
import { type ReactNode, useState } from "react";
import SuperJSON from "superjson";
import { makeQueryClient } from "~/libs/react-query";
import { trpc } from "~/libs/trpc/client";
import { createTRPCMsw, httpLink } from "~/utils/msw-trpc";

const MockTrpcProvider = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(makeQueryClient);
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        TRPCClientHttpLink({
          transformer: SuperJSON,
          url: "http://localhost:3000/api/trpc",
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};

export const customRender = (ui: ReactNode) => {
  const user = userEvent.setup();

  return {
    user,
    ...render(<MockTrpcProvider>{ui}</MockTrpcProvider>),
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
