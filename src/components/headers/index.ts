import { getFirstPageHeaders } from "./firstPageHeaders";
import { secondPageHeaders } from "./secondPageHeaders";
import { aboutSectionHeaders } from "./aboutSectionHeaders";

export const getWeightedHeaders = ({ isRecurringVisitor }: { isRecurringVisitor: boolean }) => {
  const firstPageHeaders = getFirstPageHeaders({
    isRecurringVisitor,
  });

  return [firstPageHeaders, secondPageHeaders, aboutSectionHeaders];
};
