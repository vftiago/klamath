import { weighted, addWeights } from "@lrkit/weighted";
import { WEEKDAYS } from "../../constants";

const today = WEEKDAYS[new Date().getDay()];

const phoneHeaders = [
	"get off your phone",
	"put down your phone",
	"stop looking at your phone",
	"stop looking at your phone and look at me",
	"there's nothing here",
	"nothing to see here",
	"nothing to see here, move along",
];

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

export const weightedPhoneHeaders = weighted(addWeights(phoneHeaders));

export const weightedHeaders = [
	weighted(addWeights(headers[0])),
	weighted(addWeights(headers[1])),
];
