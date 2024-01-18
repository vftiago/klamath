import { weighted, addWeight } from "@lrkit/weighted";

const WEIGHTS = {
  common: 3,
  uncommon: 2,
  rare: 1,
};

const common = ["A quick summary", "A little about me", "Who I am"];

const weightedCommonHeaders = addWeight(common, WEIGHTS.common);

export const aboutSectionHeaders = weighted([...weightedCommonHeaders]);
