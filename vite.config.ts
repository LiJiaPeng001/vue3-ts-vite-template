import { defineConfig, loadEnv, ConfigEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import autoImport from "unplugin-auto-import/vite";
import Unocss from 'unocss/vite'
import pages from "vite-plugin-pages"
import viteHtmlPlugin from "./src/utils/viteHtmlPlugin/index";

function getEnvVariable(mode: string) {
  return loadEnv(mode, process.cwd());
}

export default ({ mode }: ConfigEnv) => {
  return defineConfig({
    base: "/", // 基础路径
    define: {
      appName: JSON.stringify("peeeng-cli"),
    }, // 全局变量
    resolve: {
      alias: {
        "~": resolve(__dirname, "./src"),
      },
    },
    plugins: [
      vue(),
      pages({
        importMode: 'async',
        exclude: ['**/components/*.vue'],
      }),
      autoImport({
        imports: ["vue", "vue-router", "@vueuse/core"],
        eslintrc: {
          enabled: true, // Default `false`
        },
      }),
      viteHtmlPlugin({
        metaEnv: getEnvVariable(mode),
      }),
      Unocss({
        configFile: resolve(__dirname, 'unocss.config.ts'),
      }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          additionalData: `@import "${resolve(
            __dirname,
            "./src/style/variable.less"
          )}";`,
        },
      },
    },
    server: {
      port: 2525,
      host: "0.0.0.0",
      proxy: {}, // cross
    },
  })
}
