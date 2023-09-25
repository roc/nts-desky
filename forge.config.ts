import type { ForgeConfig } from "@electron-forge/shared-types";
import { MakerSquirrel } from "@electron-forge/maker-squirrel";
import { MakerZIP } from "@electron-forge/maker-zip";
import { MakerDeb } from "@electron-forge/maker-deb";
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
    new MakerSquirrel({}),
    new MakerZIP({}, ["darwin", "linux", "win32"]),
    new MakerRpm({}),
    new MakerDeb({}),
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
