import * as CryptoJS from 'crypto-js';

export const encodeData = (data: any): string => {
	const secretKey = process.env.SECRET_KEY_CRYPTO;

	const dataToEncrypt = JSON.stringify(data);
	const encryptedData = CryptoJS.AES.encrypt(
		dataToEncrypt,
		secretKey
	).toString();
	return encryptedData;
};

export const decodeData = (code: string): any => {
	const secretKey = process.env.SECRET_KEY_CRYPTO;

	const decryptedData = CryptoJS.AES.decrypt(code, secretKey).toString(
		CryptoJS.enc.Utf8
	);

	return decryptedData ? JSON.parse(decryptedData) : null;
};
