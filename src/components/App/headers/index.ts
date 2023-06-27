import { getFirstPageHeaders } from "./firstPageHeaders";
import { secondPageHeaders } from "./secondPageHeaders";

export const getWeightedHeaders = ({
	isRecurringVisitor,
}: {
	isRecurringVisitor: boolean;
}) => {
	const firstPageHeaders = getFirstPageHeaders({
		isRecurringVisitor,
	});

	return [firstPageHeaders, secondPageHeaders];
};
