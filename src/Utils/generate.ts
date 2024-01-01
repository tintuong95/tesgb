export function zeroPad(num: number, places: number) {
	const zero = places - num.toString().length + 1;
	return Array(+(zero > 0 && zero)).join('0') + num;
}

export function randomNumber() {
	return Math.floor(Math.random() * 1000) + 1;
}

export const generateId = (code: string) => {
	return code + zeroPad(randomNumber(), 7);
};

export function getRandomBetween(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateCode(prefix) {
	const number = getRandomBetween(1, 9999999);
	const paddedNumber = String(number).padStart(8, '0');
	return `${prefix}${paddedNumber}`;
}
