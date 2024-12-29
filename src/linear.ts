
// Linearly interpolates values on a given line. If x is out of bounds, the line
// will be extended to point x and it's value y is returned.
// @param line - The line to interpolate between.
// @param x - The x value to interpolate at.

import type { Vector2D } from "./shape";

// @returns The interpolated value at x on the line
export function linearInterpolation(line: Vector2D[], x: number) { 
	// y = m * x + c
	// Ensure line has at least two points
	if (line.length < 2) {
		throw new Error("Line must have at least two points");
	}
	const m = (line[1].y - line[0].y) / (line[1].x - line[0].x);
	const c = line[0].y - m * line[0].x;
	
	return m * x + c;
}