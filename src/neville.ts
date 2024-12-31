import type { Vector2D } from "./shape";

/**
 * Contructs the coefficients of a polynomial through all points in the given
 * dataset and returns a function to compute any point on that polynomial.
 * @param dataset A set of points in the original dataset
 * @param degree The degreee of polynomial to be calculated
 */
export function nevillePolynomialInterpolation(dataset: Vector2D[], degree: number) {
	const outputTable: number[][] = new Array(degree).fill(0).map(x => new Array(degree).fill(0));

	for (let i = 0; i < degree; i++) {
    outputTable[i][0] = dataset[i].y; //Setting the first column of Q to y[0] through y[3].
	}

	return (x: number) => {
		for (let i = 1; i < degree; i++) {
			for (let j = 1; j <= i; j++) {
				outputTable[i][j] = ((x - dataset[i - j].x) * outputTable[i][j - 1] - (x - dataset[i].x) * outputTable[i - 1][j - 1]) / (dataset[i].x - dataset[i - j].x);
			}
		}

		return outputTable[degree - 1][degree - 1]
	}
}