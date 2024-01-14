import { weighted, addWeight } from "@lrkit/weighted";

const WEIGHTS = {
  common: 3,
  uncommon: 2,
  rare: 1,
};

const common = [`take back control of your digital <span>space.</span>`];

const uncommon: Array<string> = [];

const weightedCommonHeaders = addWeight(common, WEIGHTS.common);

const weightedUncommonHeaders = addWeight(uncommon, WEIGHTS.uncommon);

export const footerText = weighted([...weightedCommonHeaders, ...weightedUncommonHeaders]);
