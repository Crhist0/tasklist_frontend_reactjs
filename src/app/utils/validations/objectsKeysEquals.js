export default function (objectPrimary, objectSecondary) {
	const keys = Object.keys(objectPrimary);
	let diff = false;

	keys.forEach(key => {
		if (objectSecondary[key] !== objectPrimary[key]) {
			diff = true;
		}
	});

	return diff;
}
