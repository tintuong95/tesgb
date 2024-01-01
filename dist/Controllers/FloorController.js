"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FloorController = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("../Entities/Dto/core");
const core_2 = require("../services/core");
const swagger_1 = require("@nestjs/swagger");
const JwtGuardService_1 = require("../Services/JwtGuardService");
const user_decorator_1 = require("../Shared/user.decorator");
const user_dto_1 = require("../Shared/user.dto");
let FloorController = class FloorController {
    constructor(floorService) {
        this.floorService = floorService;
    }
    async getAllFloors(request, user) {
        return await this.floorService.findAllAsync(request, user);
    }
    async getFloorDetails(id, user) {
        return await this.floorService.findOneAsync(id, user);
    }
    async createFloor(createFloorDto, user) {
        return await this.floorService.createAsync(createFloorDto, user);
    }
    async updateFloor(updateFloorDto, user, id) {
        return await this.floorService.updateAsync(id, updateFloorDto, user);
    }
    async removeFloor(id, user) {
        return await this.floorService.removeAsync(id, user);
    }
    async restoreFloor(id, user) {
        return await this.floorService.restoreAsync(id, user);
    }
    async deleteFloor(id, user) {
        return await this.floorService.deleteAsync(id, user);
    }
};
__decorate([
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], FloorController.prototype, "getAllFloors", null);
__decorate([
    (0, common_1.Get)(':id/details'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], FloorController.prototype, "getFloorDetails", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.CreateFloorDto,
        user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], FloorController.prototype, "createFloor", null);
__decorate([
    (0, common_1.Put)(':id/update'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, user_decorator_1.User)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.UpdateFloorDto,
        user_dto_1.UserDto, String]),
    __metadata("design:returntype", Promise)
], FloorController.prototype, "updateFloor", null);
__decorate([
    (0, common_1.Delete)(':id/remove'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], FloorController.prototype, "removeFloor", null);
__decorate([
    (0, common_1.Delete)(':id/restore'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], FloorController.prototype, "restoreFloor", null);
__decorate([
    (0, common_1.Delete)(':id/delete'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], FloorController.prototype, "deleteFloor", null);
FloorController = __decorate([
    (0, common_1.Controller)('floor'),
    (0, swagger_1.ApiTags)('floor'),
    (0, common_1.UseGuards)(JwtGuardService_1.JwtAuthGuard),
    __metadata("design:paramtypes", [core_2.FloorService])
], FloorController);
exports.FloorController = FloorController;
//# sourceMappingURL=FloorController.js.map