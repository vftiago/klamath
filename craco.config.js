module.exports = {
	webpack: {
		configure: (webpackConfig) => {
			webpackConfig.module.rules.push({
				test: /\.(glsl|vert|frag)$/,
				type: "asset/source",
			});
			return webpackConfig;
		},
	},
};
