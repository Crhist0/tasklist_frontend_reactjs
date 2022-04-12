export default function dateLocalString(date) {
	const newDate = new Date(date);

	return newDate.toLocaleDateString();
}
