"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("../entities/core");
const core_2 = require("../Controllers/core");
const core_3 = require("../services/core");
const CustomerModule_1 = require("./CustomerModule");
const RoomOrderModule_1 = require("./RoomOrderModule");
const CustomerOrderModule_1 = require("./CustomerOrderModule");
const ServiceOrderModule_1 = require("./ServiceOrderModule");
const RoomModule_1 = require("./RoomModule");
const RevenueModule_1 = require("./RevenueModule");
const OtherOrderModule_1 = require("./OtherOrderModule");
let OrderModule = class OrderModule {
};
OrderModule = __decorate([
    (0, common_1.Module)({
        controllers: [core_2.OrderController],
        providers: [core_3.OrderService, core_3.RevenueService],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([core_1.Order]),
            CustomerModule_1.CustomerModule,
            RoomOrderModule_1.RoomOrderModule,
            CustomerOrderModule_1.CustomerOrderModule,
            ServiceOrderModule_1.ServiceOrderModule,
            RoomModule_1.RoomModule,
            RevenueModule_1.RevenueModule,
            OtherOrderModule_1.OtherOrderModule,
        ],
        exports: [typeorm_1.TypeOrmModule, core_3.OrderService],
    })
], OrderModule);
exports.OrderModule = OrderModule;
//# sourceMappingURL=OrderModule.js.map