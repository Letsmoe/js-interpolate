import { test, expect, describe } from "bun:test";
import { lagrangeInterpolation } from "../src";

describe("Polynomial interpolation", () => {
		const quintic = (a: number, b: number, c: number, d: number, e: number) => {
				return (x: number) => a * x ** 5 + b * x ** 4 + c * x ** 3 + d * x ** 2 + e * x;
		};

		const func = quintic(-2, 0.025, 0.12, 0.3, 0.11);

		// Create deterministic sample data
		const data = new Array(10).fill(0).map((_, i) => ({ x: i, y: func(i) })); // Exactly 10 points

		test("Interpolates correctly", () => {
				for (let i = 0; i < data.length; i++) {
						const interpolated = lagrangeInterpolation(data, i);
						const expected = func(i);
						expect(interpolated).toBeCloseTo(expected, 5); // Higher precision for robustness
				}
		});
});
