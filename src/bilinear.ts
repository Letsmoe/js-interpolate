export function createBilinearInterpolationFunction(grid: number[][]) {
	// Cache for computed parameters
	const interpolationParamsCache: { [key: string]: number[] } = {};

	// Cache for computed interpolation values
	const interpolationValueCache: { [key: string]: number } = {};

	return function bilinearInterpolation(x: number, y: number) {
			// Check if we're within grid bounds
			if (x < 0 || y < 0 || x >= grid.length || y >= grid[0].length) {
					// Extrapolate using the last 4x4 grid
					const startX = Math.max(0, Math.min(grid.length - 4, Math.floor(x) - 1));
					const startY = Math.max(0, Math.min(grid[0].length - 4, Math.floor(y) - 1));

					// Calculate interpolation within the last 4x4 grid
					const localX = x - startX;
					const localY = y - startY;

					// Perform bilinear interpolation
					const qx00 = bilinearInterpolate(grid[startX][startY], grid[startX + 1][startY], grid[startX][startY + 1], grid[startX + 1][startY + 1], localX, localY);

					return qx00;
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
			const qx00 = grid[x0][y0] * (1 - dx) + grid[x1][y0] * dx;
			const qx10 = grid[x0][y1] * (1 - dx) + grid[x1][y1] * dx;
			const interpolatedValue = qx00 * (1 - dy) + qx10 * dy;

			// Cache interpolation value
			interpolationValueCache[cacheKey] = interpolatedValue;

			return interpolatedValue;
	};
}

function bilinearInterpolate(q00: number, q10: number, q01: number, q11: number, dx: number, dy: number) {
	const q0 = q00 * (1 - dx) + q10 * dx;
	const q1 = q01 * (1 - dx) + q11 * dx;
	return q0 * (1 - dy) + q1 * dy;
}
