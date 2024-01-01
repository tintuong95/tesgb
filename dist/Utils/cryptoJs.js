"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeData = exports.encodeData = void 0;
const CryptoJS = require("crypto-js");
const encodeData = (data) => {
    const secretKey = process.env.SECRET_KEY_CRYPTO;
    const dataToEncrypt = JSON.stringify(data);
    const encryptedData = CryptoJS.AES.encrypt(dataToEncrypt, secretKey).toString();
    return encryptedData;
};
exports.encodeData = encodeData;
const decodeData = (code) => {
    const secretKey = process.env.SECRET_KEY_CRYPTO;
    const decryptedData = CryptoJS.AES.decrypt(code, secretKey).toString(CryptoJS.enc.Utf8);
    return decryptedData ? JSON.parse(decryptedData) : null;
};
exports.decodeData = decodeData;
//# sourceMappingURL=cryptoJs.js.map