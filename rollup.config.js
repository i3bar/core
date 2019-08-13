import { resolve } from "path";
import { terser } from "rollup-plugin-terser";
import { eslint } from "rollup-plugin-eslint";

import babel from "rollup-plugin-babel";

function fromHere(...paths) {
  return resolve(__dirname, ...paths);
}

export default {
  input: fromHere("sources", "i3bar.js"),

  external: [
    "readline",
    "events"
  ],

  plugins: [
    process.env.NODE_ENV === "production" && eslint({
      fix: true,
      throwOnError: true,
      throwOnWarning: true,
      exclude: "node_modules/**"
    }),

    babel({
      exclude: "node_modules/**"
    }),

    process.env.NODE_ENV === "production" && terser()
  ],

  output: {
    file: fromHere("lib", "i3bar.js"),
    format: "cjs"
  }
};
