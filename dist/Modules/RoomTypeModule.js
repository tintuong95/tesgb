"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomTypeModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("../entities/core");
const core_2 = require("../Controllers/core");
const core_3 = require("../services/core");
let RoomTypeModule = class RoomTypeModule {
};
RoomTypeModule = __decorate([
    (0, common_1.Module)({
        controllers: [core_2.RoomTypeController],
        providers: [core_3.RoomTypeService],
        imports: [typeorm_1.TypeOrmModule.forFeature([core_1.RoomType])],
        exports: [typeorm_1.TypeOrmModule],
    })
], RoomTypeModule);
exports.RoomTypeModule = RoomTypeModule;
//# sourceMappingURL=RoomTypeModule.js.map