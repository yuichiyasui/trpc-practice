import { flag } from "flags/next";

export const searchPostsFlag = flag({
  key: "search-posts-flag",
  decide() {
    return process.env.NODE_ENV === "development";
  },
});
