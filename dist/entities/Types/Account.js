"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACCOUNT_STATUS = exports.ACCOUNT_TYPE = void 0;
var ACCOUNT_TYPE;
(function (ACCOUNT_TYPE) {
    ACCOUNT_TYPE[ACCOUNT_TYPE["Basic"] = 0] = "Basic";
    ACCOUNT_TYPE[ACCOUNT_TYPE["Standard"] = 1] = "Standard";
    ACCOUNT_TYPE[ACCOUNT_TYPE["Advanced"] = 2] = "Advanced";
})(ACCOUNT_TYPE = exports.ACCOUNT_TYPE || (exports.ACCOUNT_TYPE = {}));
var ACCOUNT_STATUS;
(function (ACCOUNT_STATUS) {
    ACCOUNT_STATUS[ACCOUNT_STATUS["Active"] = 1] = "Active";
    ACCOUNT_STATUS[ACCOUNT_STATUS["Block"] = 2] = "Block";
    ACCOUNT_STATUS[ACCOUNT_STATUS["Unconfirmed"] = 0] = "Unconfirmed";
})(ACCOUNT_STATUS = exports.ACCOUNT_STATUS || (exports.ACCOUNT_STATUS = {}));
//# sourceMappingURL=Account.js.map