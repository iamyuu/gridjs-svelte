const sveltePreprocess = require("svelte-preprocess");

const svelteConfig = {
  preprocess: sveltePreprocess(),
};

module.exports = {
  stories: ["../stories/**/*.stories.@(js|ts)"],
  addons: ["@storybook/addon-knobs/register", "@storybook/addon-storysource"],
  webpackFinal: async (baseConfig) => {
    const config = { ...baseConfig };

    // remove original storybook webpack rules for svelte
    config.module.rules = config.module.rules.filter((r) => {
      return !r.test.toString().includes("svelte");
    });

    config.module.rules.push({
      test: /\.svelte$/,
      exclude: /node_modules/,
      loader: require.resolve("svelte-loader"),
      options: svelteConfig,
    });

    config.resolve.extensions.push(".ts");

    return config;
  },
};
