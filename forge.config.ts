import type { ForgeConfig } from "@electron-forge/shared-types";
import { MakerZIP } from "@electron-forge/maker-zip";
import { MakerRpm } from "@electron-forge/maker-rpm";
import { WebpackPlugin } from "@electron-forge/plugin-webpack";

import { mainConfig } from "./webpack.main.config";
import { rendererConfig } from "./webpack.renderer.config";

const config: ForgeConfig = {
  packagerConfig: {
    // see https://www.electronforge.io/config/plugins/auto-unpack-natives
    asar: true, // or an object containing your asar options
    icon: "./images/icon",
  },
  rebuildConfig: {},
  makers: [
    new MakerZIP({}),
    new MakerRpm({}),
    // TODO: find out why squirrel errors with
    // --------
    // ---> (Inner Exception #0) System.Exception: Application could not be started, or no application associated with the specified file.
    // ShellExecuteEx failed: File not found.
    // --------
    // {
    //   name: "@electron-forge/maker-squirrel",
    //   config: {
    //     // authors: "roc",
    //     icon: "./images/icon.ico",
    //     exe: "nts-desky.exe",
    //     name: "nts-desky",
    //     // exe: `${BUILD_NAME}.exe`,
    //   },
    // },
    {
      name: "@electron-forge/maker-deb",
      config: {
        options: {
          bin: "nts-desky",
          maintainer: "roc",
          homepage: "https://github.com/roc/nts-desky",
        },
      },
    },
    {
      name: "@electron-forge/maker-dmg",
      config: {
        format: "ULFO",
        icon: "./images/icon.icns",
      },
    },
  ],
  publishers: [
    {
      name: "@electron-forge/publisher-github",
      config: {
        repository: {
          owner: "roc",
          name: "nts-desky",
        },
        prerelease: true,
      },
    },
  ],
  plugins: [
    new WebpackPlugin({
      mainConfig,
      // devContentSecurityPolicy: "connect-src 'self' https://www.nts.live/api/",
      devContentSecurityPolicy:
        "connect-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.nts.live/api/ * http://localhost:* ws://localhost:*",
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: "./src/index.html",
            js: "./src/renderer.ts",
            name: "main_window",
            preload: {
              js: "./src/preload.ts",
            },
          },
        ],
      },
    }),
    // {
    //   name: "@electron-forge/plugin-electronegativity",
    //   config: {
    //     isSarif: true,
    //   },
    // },
    {
      name: "@electron-forge/plugin-auto-unpack-natives",
      config: {},
    },
  ],
};

export default config;
