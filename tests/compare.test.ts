import { test, expect, describe } from "bun:test";
import { createBilinearInterpolationFunction, linearInterpolation, quadraticInterpolation, polynomialInterpolation } from "../src";


describe("Bilinear interpolation", () => {
	const data = [
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9]
	];

	const bilinearInterpolation = createBilinearInterpolationFunction(data);
	

	test("Interpolates correctly", () => {
		expect(bilinearInterpolation(0.5, 0.5)).toBe(3);
		expect(bilinearInterpolation(0.5, 1)).toBe(3.5);
		expect(bilinearInterpolation(1.5, 0.5)).toBe(6);
		expect(bilinearInterpolation(1.5, 1.5)).toBe(7);
		expect(bilinearInterpolation(3, 3)).toBe(13);
		expect(bilinearInterpolation(4, 4)).toBe(17);
	});
})


describe("Linear interpolation", () => {
	const data = [1, 2, 3, 4, 5];

	test("Interpolates correctly", () => {
		expect(linearInterpolation(data, 0.5)).toBe(1.5);
		expect(linearInterpolation(data, 1.5)).toBe(2.5);
		expect(linearInterpolation(data, 2.5)).toBe(3.5);
		expect(linearInterpolation(data, 3.5)).toBe(4.5);
		expect(linearInterpolation(data, 5)).toBe(6);
	});
})

describe("Quadratic interpolation", () => {
	const data = [0, 1, 4, 9, 16];

	test("Interpolates correctly", () => {
		expect(quadraticInterpolation(data, -2)).toBe(4);
		expect(quadraticInterpolation(data, -1)).toBe(1);
		expect(quadraticInterpolation(data, 0)).toBe(0);
		expect(quadraticInterpolation(data, 3)).toBe(9);
		expect(quadraticInterpolation(data, 4)).toBe(16);
	});
})

describe("Polynomial interpolation", () => {
	const quintic = (a: number, b: number, c: number, d: number, e: number)  => {
		return (x: number) => a * x ** 5 + b * x ** 4 + c * x ** 3 + d * x ** 2 + e * x;
	}

	const func = quintic(0.1, 0.25, 0.12, 0.3, 0.11);

	// Sample the function at random points
	const data = new Array(Math.ceil(Math.random() * 50) + 10).fill(0).map((_,i) => func(i));

	test("Interpolates correctly", () => {
		for (let i = 0; i < 50; i++) {
			expect(polynomialInterpolation(data, i, 5)).toBeCloseTo(func(i), 1);
		}
	});

	test("errors when the degree is larger than the sample size", () => {
		expect(() => polynomialInterpolation(data, 0, data.length)).toThrow();
	})
})