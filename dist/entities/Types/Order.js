"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatus = void 0;
var OrderStatus;
(function (OrderStatus) {
    OrderStatus[OrderStatus["Unconfirmed"] = 0] = "Unconfirmed";
    OrderStatus[OrderStatus["Confirmed"] = 1] = "Confirmed";
    OrderStatus[OrderStatus["Cancelled"] = 2] = "Cancelled";
    OrderStatus[OrderStatus["Expired"] = 3] = "Expired";
    OrderStatus[OrderStatus["Completed"] = 4] = "Completed";
    OrderStatus[OrderStatus["Draft"] = 5] = "Draft";
})(OrderStatus = exports.OrderStatus || (exports.OrderStatus = {}));
//# sourceMappingURL=Order.js.map