"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHmacSha256 = exports.sortObjDataByAlphabet = void 0;
const CryptoJS = require("crypto-js");
function sortObjDataByAlphabet(obj) {
    const sortedKeys = Object.keys(obj).sort();
    const sortedObject = {};
    sortedKeys.forEach((key) => {
        sortedObject[key] = obj[key];
    });
    return sortedObject;
}
exports.sortObjDataByAlphabet = sortObjDataByAlphabet;
function generateHmacSha256(data, secretKey) {
    const sortData = sortObjDataByAlphabet(data);
    const stringifyData = Object.keys(sortData)
        .map((key) => `${key}=${data[key]}`)
        .join('&');
    return CryptoJS.HmacSHA256(stringifyData, secretKey).toString(CryptoJS.enc.Hex);
}
exports.generateHmacSha256 = generateHmacSha256;
//# sourceMappingURL=payos.js.map