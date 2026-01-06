import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
  ],
  webpackFinal: async (config: any) => {
    if (!config || !config.module) return config;

    // Ensure existing rules that handle images do not process .svg
    config.module.rules = config.module.rules.map((rule: any) => {
      if (!rule || !rule.test) return rule;
      const testStr = String(rule.test);
      if (testStr.includes("svg")) {
        // Narrow the rule to common raster image formats only
        return { ...rule, test: /\.(png|jpe?g|gif|webp|avif|ico)$/i };
      }
      return rule;
    });

    // Add a comprehensive SVG rule:
    // - If imported from JS/TS(X), use @svgr/webpack to get a React component
    // - Otherwise treat as an asset/resource (file)
    config.module.rules.unshift({
      test: /\.svg$/i,
      oneOf: [
        {
          issuer: /\.[jt]sx?$/,
          use: [
            {
              loader: "@svgr/webpack",
              options: { svgo: true },
            },
          ],
        },
        {
          type: 'asset/resource',
          generator: {
            filename: 'static/media/[name].[hash][ext]'
          }
        }
      ]
    });

    return config;
  },
  framework: {
    name: "@storybook/nextjs",
    options: {
      appDirectory: true,
      nextConfigPath: "../next.config.mjs",
    },
  },
  staticDirs: ["../public"],
};
export default config;
