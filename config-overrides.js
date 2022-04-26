module.exports = function override(config) {
	config.module.rules.push({
		test: /\.(glsl|vert|frag)$/,
		type: "asset/source",
	});

	return config;
};
