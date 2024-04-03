[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<h1>js-interpolate</h1>

Dead simple data interpolation. 

- [Usage](#usage)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)


## Usage

interpolate.js is a simple data interpolation library that allows for interpolation of linear and bilinear functions/datapoints.

To use the library, install it via npm:

```sh
npm install js-interpolate
```

Then, you can use the library as follows:

Linear interpolation enables data interpolation of a single dimension array of data points. If the requested `x` is out of bounds, the function will expand the data points basing off the first two data points.

```javascript
import { linearInterpolation } from 'js-interpolate';

const data = [1, 2, 3, 4, 5];

console.log(linearInterpolation(data, 2.5)) // 3.5
console.log(linearInterpolation(data, 5)) // 6
```

Bilinear interpolation enables data interpolation of a two-dimensional array of data points where the `x` and `y` dimensions are the axis of the provided grid and `z` are the provided data points. If the requested `x` or `y` is out of bounds, it will provide an estimate given the nearest data points.

```javascript
import { createBilinearInterpolationFunction } from 'js-interpolate';

const data = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9]
];

const bilinearInterpolation = createBilinearInterpolationFunction(data);

bilinearInterpolation(0.5, 0.5) // 3
```

## Roadmap

- [x] Linear interpolation
- [x] Bilinear interpolation
- [ ] Tricubic interpolation
- [x] Polynomial interpolation
- [ ] Spline interpolation

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.


[contributors-shield]: https://img.shields.io/github/contributors/letsmoe/interpolate.js.svg?style=for-the-badge
[contributors-url]: https://github.com/letsmoe/interpolate.js/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/letsmoe/interpolate.js.svg?style=for-the-badge
[forks-url]: https://github.com/letsmoe/interpolate.js/network/members
[stars-shield]: https://img.shields.io/github/stars/letsmoe/interpolate.js.svg?style=for-the-badge
[stars-url]: https://github.com/letsmoe/interpolate.js/stargazers
[issues-shield]: https://img.shields.io/github/issues/letsmoe/interpolate.js.svg?style=for-the-badge
[issues-url]: https://github.com/letsmoe/interpolate.js/issues
[license-shield]: https://img.shields.io/github/license/letsmoe/interpolate.js.svg?style=for-the-badge
[license-url]: https://github.com/letsmoe/interpolate.js/blob/master/LICENSE.txt