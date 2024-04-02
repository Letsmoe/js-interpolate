import { test, expect, describe } from "bun:test";
import { createBilinearInterpolationFunction, linearInterpolation } from "../src";


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