import { weighted, addWeight } from "@lrkit/weighted";

const WEIGHTS = {
  common: 3,
  uncommon: 2,
  rare: 1,
};

const commonHeaders = [
  "Stuff I've been working on lately",
  "Latest projects",
  "Recent projects",
  "Latest work",
  "Recent work",
];

const uncommonHeaders = ["Dashboard", "What's cooking", "Latest stuff", "Recent stuff"];

const weightedCommonHeaders = addWeight(commonHeaders, WEIGHTS.common);

const weightedUncommonHeaders = addWeight(uncommonHeaders, WEIGHTS.uncommon);

export const secondPageHeaders = weighted([...weightedCommonHeaders, ...weightedUncommonHeaders]);
