export const addWeights = <T>(items: T[]): { item: T; weight: number }[] => {
	return items.map((item) => {
		return {
			item,
			weight: 1,
		};
	});
};
