// eslint-disable-next-line import/no-extraneous-dependencies
import dts from "rollup-plugin-dts";
// eslint-disable-next-line import/no-extraneous-dependencies
import esbuild from "rollup-plugin-esbuild";

const name = "dist/index";

const bundle = (config) => ({
  ...config,
  input: "src/index.ts",
  external: (id) => !/^[./]/.test(id),
});

// eslint-disable-next-line import/no-default-export
export default [
  bundle({
    plugins: [
      esbuild({
        sourceMap: false,
        minify: true,
      }),
    ],
    output: [
      {
        file: `${name}.js`,
        format: "cjs",
        globals: {
          react: "react",
        },
      },
    ],
    context: "this",
  }),
  bundle({
    plugins: [dts()],
    output: {
      file: `${name}.d.ts`,
      format: "es",
    },
  }),
];
