import { weighted, addWeights } from "@lrkit/weighted";

const WEIGHTS = {
	common: 3,
	uncommon: 2,
	rare: 1,
};

const commonHeaders = [
	"Stuff I've been working on lately",
	"What's cooking",
	"Latest projects",
	"Recent work",
	"Recent projects",
];

const weightedCommonHeaders = addWeights(commonHeaders, [
	...commonHeaders.map(() => WEIGHTS.common),
]);

export const secondPageHeaders = weighted([...weightedCommonHeaders]);
