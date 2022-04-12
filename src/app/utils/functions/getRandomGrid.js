import getRandomInt from './getRandomInt';

export default function getRandomGrid(total, sizes) {
	let count = 0;
	const r = [];
	// eslint-disable-next-line no-plusplus
	for (let index = 0; index < total; index++) {
		if (count < 12) {
			const num = getRandomInt(0, 4);
			if (count + sizes[num] < 12) {
				count += sizes[num];
				r.push(sizes[num]);
			} else {
				r.push(12 - count);
				count = 0;
			}
		}
	}

	return r;
}
