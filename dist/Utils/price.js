"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sumTotal = exports.getRoomPriceHandler = void 0;
const PriceItem_1 = require("../entities/Types/PriceItem");
const _ = require("lodash");
const getRoomPriceHandler = (priceList, numDays, numNight, numHours, numMoreHours) => {
    let total = 0;
    const priceHours = _.find(priceList, { type: PriceItem_1.PriceItemType.HourPrice });
    const priceHMoreHours = _.find(priceList, {
        type: PriceItem_1.PriceItemType.MoreHoursPrice,
    });
    const priceDays = _.find(priceList, { type: PriceItem_1.PriceItemType.DayPrice });
    const priceNight = _.find(priceList, { type: PriceItem_1.PriceItemType.NightPrice });
    if (numDays) {
        total += priceDays.priceRoom * numDays;
    }
    if (numNight) {
        total += priceNight.priceRoom * numNight;
    }
    if (numHours) {
        total += priceHours.priceRoom * numHours;
    }
    if (numMoreHours) {
        total += priceHMoreHours.priceRoom * numMoreHours;
    }
    return total;
};
exports.getRoomPriceHandler = getRoomPriceHandler;
function sumTotal(numDays, numNights, numHours, numMoreHours, rooms, services, orders) {
    let total = 0;
    rooms === null || rooms === void 0 ? void 0 : rooms.map((item) => {
        var _a, _b, _c;
        total += +(0, exports.getRoomPriceHandler)((_c = (_b = (_a = item === null || item === void 0 ? void 0 : item.room) === null || _a === void 0 ? void 0 : _a.roomType) === null || _b === void 0 ? void 0 : _b.price) === null || _c === void 0 ? void 0 : _c.priceItem, numDays, numNights, numHours, numMoreHours);
    });
    services === null || services === void 0 ? void 0 : services.map((item, index) => { var _a; return (total += +(item === null || item === void 0 ? void 0 : item.quanlity) * +((_a = item === null || item === void 0 ? void 0 : item.service) === null || _a === void 0 ? void 0 : _a.price)); });
    orders === null || orders === void 0 ? void 0 : orders.map((item, index) => (total += +(item === null || item === void 0 ? void 0 : item.price)));
    return total;
}
exports.sumTotal = sumTotal;
//# sourceMappingURL=price.js.map