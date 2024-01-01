"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BedType = exports.RoomStatus = void 0;
var RoomStatus;
(function (RoomStatus) {
    RoomStatus[RoomStatus["Ready"] = 1] = "Ready";
    RoomStatus[RoomStatus["Payment"] = 2] = "Payment";
    RoomStatus[RoomStatus["Unconfirmed"] = 3] = "Unconfirmed";
    RoomStatus[RoomStatus["Block"] = 4] = "Block";
})(RoomStatus = exports.RoomStatus || (exports.RoomStatus = {}));
var BedType;
(function (BedType) {
    BedType[BedType["One"] = 0] = "One";
    BedType[BedType["Two"] = 1] = "Two";
})(BedType = exports.BedType || (exports.BedType = {}));
//# sourceMappingURL=RoomType.js.map