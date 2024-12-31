import { test, expect, describe } from "bun:test";
import { nevillePolynomialInterpolation } from "../src/neville";

describe("Neville's Iterative interpolation", () => {
		const quintic = (a: number, b: number, c: number, d: number, e: number) => {
				return (x: number) => a * x ** 5 + b * x ** 4 + c * x ** 3 + d * x ** 2 + e * x;
		};

		const func = quintic(0.001, -0.01, 0.05, 0.1, 0.5);

		// Create deterministic sample data
		const data = new Array(10).fill(0).map((_, i) => ({ x: i, y: func(i) }));

		test("Interpolates correctly", () => {
				for (let i = 0; i < data.length; i++) {
						const interpolate = nevillePolynomialInterpolation(data, 6);
						const expected = func(i);
						const interpolated = interpolate(i)
						expect(interpolated).toBeCloseTo(expected, 5);
				}
		});
});
