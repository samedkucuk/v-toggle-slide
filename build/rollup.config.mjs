import { terser } from "rollup-plugin-terser";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { version } from "../package.json";

export default {
  input: "src/index.js",
  output: {
    file: "dist/index.js",
    format: "es",
    name: "VToggleSlide",
    banner: `/**
    * v-toggle-slide v${version}
    * (c) ${new Date().getFullYear()} 4Small 
    * @license MIT \n*/`,
  },
  plugins: [resolve(), commonjs(), terser()],
};
