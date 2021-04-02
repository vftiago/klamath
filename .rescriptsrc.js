const { edit, getPaths } = require("@rescripts/utilities");

const customLoaders = [
  {
    test: /\.(glsl|frag|vert)$/,
    exclude: [/node_modules/],
    use: ["raw-loader", "glslify-loader"],
  },
  {
    test: /\.(obj)$/,
    exclude: [/node_modules/],
    use: ["url-loader"],
  },
];

const predicate = (valueToTest) => {
  return valueToTest.oneOf;
};

const transform = (match) => ({
  ...match,
  oneOf: [
    ...match.oneOf.slice(0, -1),
    ...customLoaders,
    ...match.oneOf.slice(-1), // need to add as second-to-last to avoid being intercepted by the file-loader in CRA
  ],
});

function rescriptGlslifyPlugin() {
  return (config) => {
    const matchingPaths = getPaths(predicate, config);
    return edit(transform, matchingPaths, config);
  };
}

module.exports = [[rescriptGlslifyPlugin]];
