"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCode = exports.getRandomBetween = exports.generateId = exports.randomNumber = exports.zeroPad = void 0;
function zeroPad(num, places) {
    const zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join('0') + num;
}
exports.zeroPad = zeroPad;
function randomNumber() {
    return Math.floor(Math.random() * 1000) + 1;
}
exports.randomNumber = randomNumber;
const generateId = (code) => {
    return code + zeroPad(randomNumber(), 7);
};
exports.generateId = generateId;
function getRandomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
exports.getRandomBetween = getRandomBetween;
function generateCode(prefix) {
    const number = getRandomBetween(1, 9999999);
    const paddedNumber = String(number).padStart(8, '0');
    return `${prefix}${paddedNumber}`;
}
exports.generateCode = generateCode;
//# sourceMappingURL=generate.js.map