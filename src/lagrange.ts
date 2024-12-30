import type { Vector2D } from "./shape";

export function lagrangeInterpolation(points: Vector2D[], x: number) {
	let value = 0
	
	for (let j = 0; j < points.length; j++) {
		let temp = 1

		for (let i = 0; i < points.length; i++) {
			if (i !== j) {      
				temp *= (x - points[i].x) / (points[j].x - points[i].x)
			}
		}

		value += points[j].y * temp
	}
	
	return value
}