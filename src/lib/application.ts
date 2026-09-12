const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

export function isApplicationStalled(
	updatedAt: Date,
	thresholdDays: number,
): boolean {
	const ageInMilliseconds = Date.now() - updatedAt.getTime();

	return ageInMilliseconds >= thresholdDays * MILLISECONDS_PER_DAY;
}
