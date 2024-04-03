export function polynomialInterpolation(data: number[], x: number, n: number) {
	if (data.length < n + 1) {
		throw new Error("Data must have at least n + 1 points");
	}

	// Implement neville's iterative interpolation algorithm for polynomials of degree n
	// Initialize the array of interpolations
	const interpolations = new Array(n + 1).fill(0);

	// Initialize the first column with the data points
	for (let i = 0; i < n + 1; i++) {
		interpolations[i] = data[i];
	}

	// Perform the interpolation
	for (let i = 1; i < n + 1; i++) {
		for (let j = 0; j < n - i + 1; j++) {
			interpolations[j] = ((x - j) * interpolations[j + 1] - (x - i - j) * interpolations[j]) / i;
		}
	}

	return interpolations[0];
}