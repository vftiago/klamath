import { weighted, addWeight } from "@lrkit/weighted";

const phoneHeaders = [
  "get off your phone",
  "put down your phone",
  "stop looking at your phone",
  "there's nothing here",
  "nothing to see here",
  "move along",
];

export const weightedPhoneHeaders = weighted(addWeight(phoneHeaders, 1));
