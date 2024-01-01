"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REVENUE_STATE = exports.REVENUE_TYPE = void 0;
var REVENUE_TYPE;
(function (REVENUE_TYPE) {
    REVENUE_TYPE[REVENUE_TYPE["ORDER"] = 0] = "ORDER";
    REVENUE_TYPE[REVENUE_TYPE["STOCK"] = 1] = "STOCK";
    REVENUE_TYPE[REVENUE_TYPE["EMPLOYEE"] = 2] = "EMPLOYEE";
    REVENUE_TYPE[REVENUE_TYPE["SERVICE"] = 3] = "SERVICE";
    REVENUE_TYPE[REVENUE_TYPE["OTHER"] = 4] = "OTHER";
})(REVENUE_TYPE = exports.REVENUE_TYPE || (exports.REVENUE_TYPE = {}));
var REVENUE_STATE;
(function (REVENUE_STATE) {
    REVENUE_STATE[REVENUE_STATE["REVENUE"] = 0] = "REVENUE";
    REVENUE_STATE[REVENUE_STATE["EXPENSES"] = 1] = "EXPENSES";
})(REVENUE_STATE = exports.REVENUE_STATE || (exports.REVENUE_STATE = {}));
//# sourceMappingURL=Revenue.js.map