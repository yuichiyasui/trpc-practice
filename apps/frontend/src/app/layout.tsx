import type { Metadata } from "next";
import type { ReactNode } from "react";
import { TRPCProvider } from "~/libs/trpc";

import "~/styles/globals.css";

export const metadata = {
  title: "tRPC Practice",
} satisfies Metadata;

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="ja">
      <body>
        <TRPCProvider>{children}</TRPCProvider>
      </body>
    </html>
  );
};

export default RootLayout;
