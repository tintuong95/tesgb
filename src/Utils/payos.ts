import * as CryptoJS from 'crypto-js';

export function sortObjDataByAlphabet(obj) {
	const sortedKeys = Object.keys(obj).sort();
	const sortedObject = {};

	sortedKeys.forEach((key) => {
		sortedObject[key] = obj[key];
	});
	return sortedObject;
}
export function generateHmacSha256(data, secretKey) {
	const sortData = sortObjDataByAlphabet(data);
	const stringifyData = Object.keys(sortData)
		.map((key) => `${key}=${data[key]}`)
		.join('&');
	return CryptoJS.HmacSHA256(stringifyData, secretKey).toString(
		CryptoJS.enc.Hex
	);
}
