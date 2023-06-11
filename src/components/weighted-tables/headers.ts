import { weighted, addWeights } from "@lrkit/weighted";
import { WEEKDAYS } from "../../constants";

const today = WEEKDAYS[new Date().getDay()];

const headers = [
	[
		"Hello World",
		`It is ${today}`,
		"Welcome back",
		`const pipe =
	(...fns) => (x) => fns.reduce((v, f) => f(v), x)`,
		"Everything I ever said has been satire",
		"Do you like it here?",
		"Welcome to my website",
		"Welcome to my blog",
	],
	[
		"Stuff I've been working on lately",
		"What's cooking",
		"Latest projects",
		"Recent work",
		"Recent projects",
	],
];

export const weightedHeaders = [
	weighted(addWeights(headers[0])),
	weighted(addWeights(headers[1])),
];
