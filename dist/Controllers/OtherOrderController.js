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
exports.OtherOrderController = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("../Entities/Dto/core");
const swagger_1 = require("@nestjs/swagger");
const OtherOrderService_1 = require("../services/OtherOrderService");
const user_decorator_1 = require("../Shared/user.decorator");
const user_dto_1 = require("../Shared/user.dto");
const JwtGuardService_1 = require("../Services/JwtGuardService");
let OtherOrderController = class OtherOrderController {
    constructor(OtherOrderService) {
        this.OtherOrderService = OtherOrderService;
    }
    async getAllOtherOrders(request, user) {
        return await this.OtherOrderService.findAllAsync(request, user);
    }
    async getOtherOrderDetails(id, user) {
        return await this.OtherOrderService.findOneAsync(id, user);
    }
    async createOtherOrder(createOtherOrderDto) {
        return await this.OtherOrderService.createAsync(createOtherOrderDto);
    }
    async updateOtherOrder(updateOtherOrderDto, user, id) {
        return await this.OtherOrderService.updateAsync(id, updateOtherOrderDto, user);
    }
    async removeOtherOrder(id, user) {
        return await this.OtherOrderService.removeAsync(id, user);
    }
    async restoreOtherOrder(id, user) {
        return await this.OtherOrderService.restoreAsync(id, user);
    }
    async deleteOtherOrder(id, user) {
        return await this.OtherOrderService.deleteAsync(id, user);
    }
};
__decorate([
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], OtherOrderController.prototype, "getAllOtherOrders", null);
__decorate([
    (0, common_1.Get)(':id/details'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], OtherOrderController.prototype, "getOtherOrderDetails", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], OtherOrderController.prototype, "createOtherOrder", null);
__decorate([
    (0, common_1.Put)(':id/update'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, user_decorator_1.User)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.UpdatedOtherOrderDto,
        user_dto_1.UserDto, String]),
    __metadata("design:returntype", Promise)
], OtherOrderController.prototype, "updateOtherOrder", null);
__decorate([
    (0, common_1.Delete)(':id/remove'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], OtherOrderController.prototype, "removeOtherOrder", null);
__decorate([
    (0, common_1.Delete)(':id/restore'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], OtherOrderController.prototype, "restoreOtherOrder", null);
__decorate([
    (0, common_1.Delete)(':id/delete'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], OtherOrderController.prototype, "deleteOtherOrder", null);
OtherOrderController = __decorate([
    (0, common_1.Controller)('room-order'),
    (0, common_1.UseGuards)(JwtGuardService_1.JwtAuthGuard),
    (0, swagger_1.ApiTags)('other-order'),
    __metadata("design:paramtypes", [OtherOrderService_1.OtherOrderService])
], OtherOrderController);
exports.OtherOrderController = OtherOrderController;
//# sourceMappingURL=OtherOrderController.js.map