import type { AnyTRPCRouter } from "@trpc/server";
import { trpc } from "./handler";
import type { MswTrpc, TRPCMswConfig } from "./types";

export const createTRPCMsw = <Router extends AnyTRPCRouter>(
  config: TRPCMswConfig,
) => {
  const { links, transformer } = config;

  const createUntypedTRPCMsw = (pathParts: string[] = []) => {
    return new Proxy(
      {},
      {
        get(target: unknown, lastKey) {
          const procedurePath = pathParts.join(".");
          if (lastKey === "query" || lastKey === "mutation") {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type, @typescript-eslint/ban-types
            return (handler: Function) => {
              const result = trpc[lastKey](procedurePath, handler, {
                links,
                transformer,
              });

              return result;
            };
          }

          return createUntypedTRPCMsw([...pathParts, lastKey as string]);
        },
      },
    );
  };

  return createUntypedTRPCMsw() as MswTrpc<Router>;
};
