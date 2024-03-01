import { terser } from "rollup-plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { version } from "../package.json";

export default {
  input: "src/index.js",
  output: {
    file: "dist/index.js",
    format: "umd",
    name: "VToggleSlide",
  },
  plugins: [resolve(), commonjs(), terser()],
  banner: `/**
  * v-toggle-slide v${version}
  * (c) ${new Date().getFullYear()} 4Small 
  * @license MIT
  */`,
};
