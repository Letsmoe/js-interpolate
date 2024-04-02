export function createBilinearInterpolationFunction(grid: number[][]) {
	// Cache for computed parameters
	const interpolationParamsCache: { [key: string]: number[] } = {};

	// Cache for computed interpolation values
	const interpolationValueCache: { [key: string]: number } = {};

	return function bilinearInterpolation(x: number, y: number) {
			// Check if we're within grid bounds
			if (x < 0 || y < 0 || x >= grid.length - 1 || y >= grid[0].length - 1) {
					throw new Error("Interpolation point is out of bounds");
			}

			// Check if interpolation value is cached
			const cacheKey = `${x},${y}`;
			if (interpolationValueCache[cacheKey] !== undefined) {
					// If cached, return cached value
					return interpolationValueCache[cacheKey];
			}

			// Check if parameters are cached
			if (!interpolationParamsCache[cacheKey]) {
					// If parameters are not cached, compute and cache them
					const x0 = Math.floor(x);
					const y0 = Math.floor(y);
					const x1 = Math.min(x0 + 1, grid.length - 1); // Ensure within grid bounds
					const y1 = Math.min(y0 + 1, grid[0].length - 1); // Ensure within grid bounds
					const dx = x - x0;
					const dy = y - y0;

					// Cache parameters
					interpolationParamsCache[cacheKey] = [x0, y0, x1, y1, dx, dy];
			}

			// Perform interpolation using cached parameters
			const [x0, y0, x1, y1, dx, dy] = interpolationParamsCache[cacheKey];
			const qx0 = grid[x0][y0] * (1 - dx) + grid[x1][y0] * dx;
			const qx1 = grid[x0][y1] * (1 - dx) + grid[x1][y1] * dx;
			const interpolatedValue = qx0 * (1 - dy) + qx1 * dy;

			// Cache interpolation value
			interpolationValueCache[cacheKey] = interpolatedValue;

			return interpolatedValue;
	};
}
