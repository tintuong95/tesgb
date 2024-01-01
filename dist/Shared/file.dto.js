"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsFile = void 0;
const class_validator_1 = require("class-validator");
function IsFile(options, validationOptions) {
    return function (object, propertyName) {
        return (0, class_validator_1.registerDecorator)({
            name: 'isFile',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value, args) {
                    var _a;
                    if ((value === null || value === void 0 ? void 0 : value.mimetype) &&
                        ((_a = options === null || options === void 0 ? void 0 : options.mime) !== null && _a !== void 0 ? _a : []).includes(value === null || value === void 0 ? void 0 : value.mimetype)) {
                        return true;
                    }
                    return false;
                },
            },
        });
    };
}
exports.IsFile = IsFile;
//# sourceMappingURL=file.dto.js.map