import { weighted, addWeight } from "@lrkit/weighted";

const WEIGHTS = {
  common: 3,
  uncommon: 2,
  rare: 1,
};

const commonHeaders = [
  "Stuff I've been working on lately",
  "What's cooking",
  "Latest projects",
  "Recent projects",
  "Latest work",
  "Recent work",
  "Latest stuff",
  "Recent stuff",
];

const weightedCommonHeaders = addWeight(commonHeaders, WEIGHTS.common);

export const secondPageHeaders = weighted([...weightedCommonHeaders]);
