import { createWeightedTable } from "weighted/src/weighted";
import { WEEKDAYS } from "../../constants";
import { addWeights } from "../../utils/addWeights";

const today = WEEKDAYS[new Date().getDay()];

const headers = [
	[
		"Hello World",
		`It is ${today}`,
		"Welcome back",
		`const pipe =
	(...fns) => (x) => fns.reduce((v, f) => f(v), x)`,
	],
	["Stuff I've been working on lately", "What's cooking", "Latest projects"],
];

export const weightedHeaders = [
	createWeightedTable(addWeights(headers[0])),
	createWeightedTable(addWeights(headers[1])),
];
