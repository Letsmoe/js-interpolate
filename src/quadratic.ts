/**
 * Interpolates x for a given dataset that resembles a quadratic formula. If x
	is out of bounds, the quadratic will be extended to point x and it's assumed
	value y is returned. 
 * @date 4/3/2024 - 2:14:13 PM
 *
 * @export
 * @param {number[]} data
 * @param {number} x
 */
export function quadraticInterpolation(data: number[], x: number) {
	// y = a * x^2 + b * x + c
	// Ensure data has at least three points
	if (data.length < 3) {
		throw new Error("Data must have at least three points");
	}

	// Now loop through all data points to produce an estimate of a, b and c
	// The data might look something like this:
	// [0, 1, 4, 9, 16]
	// This would mean that the quadratic formula is:
	// y = 1 * x^2 + 0 * x + 0
	// y = x^2

	// First, calculate the differences between the data points
	const diffs = data.map((_, i) => data[i + 1] - data[i]);
	const secondDiffs = diffs.map((_, i) => diffs[i + 1] - diffs[i]);

	// Now, calculate the estimates for a, b and c
	const a = secondDiffs[0] / 2;
	const b = diffs[0] - a;
	const c = data[0];

	// Now, calculate the value of the quadratic formula at x
	return a * x * x + b * x + c;
}
