"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("../entities/core");
const core_2 = require("../Controllers/core");
const core_3 = require("../services/core");
const config_1 = require("@nestjs/config");
const axios_1 = require("@nestjs/axios");
const AccountModule_1 = require("./AccountModule");
let PaymentModule = class PaymentModule {
};
PaymentModule = __decorate([
    (0, common_1.Module)({
        controllers: [core_2.PaymentController],
        providers: [core_3.PaymentService],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([core_1.Payment]),
            config_1.ConfigModule,
            axios_1.HttpModule.registerAsync({
                useFactory: () => ({
                    timeout: 2500,
                    maxRedirects: 5,
                }),
            }),
            AccountModule_1.AccountModule,
        ],
        exports: [typeorm_1.TypeOrmModule],
    })
], PaymentModule);
exports.PaymentModule = PaymentModule;
//# sourceMappingURL=PaymentModule.js.map