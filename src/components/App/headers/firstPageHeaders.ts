import { weighted, addWeight } from "@lrkit/weighted";
import { WEEKDAYS } from "../../../constants";

const today = WEEKDAYS[new Date().getDay()];

const WEIGHTS = {
	common: 3,
	uncommon: 2,
	rare: 1,
};

const commonHeaders = [
	"Hello World",
	`It is ${today}`,
	"Welcome to my website",
	"Welcome to my blog",
];

const uncommonHeaders = [
	`const pipe =
	(...fns) => (x) => fns.reduce((v, f) => f(v), x)`,
	"Do you like it here?",
];

const rareHeaders = ["Everything I ever said has been satire"];

const weightedCommonHeaders = addWeight(commonHeaders, WEIGHTS.common);

const weightedUncommonHeaders = addWeight(uncommonHeaders, WEIGHTS.uncommon);

const weightedRareHeaders = addWeight(rareHeaders, WEIGHTS.rare);

export const firstPageHeaders = weighted([
	...weightedCommonHeaders,
	...weightedUncommonHeaders,
	...weightedRareHeaders,
]);
