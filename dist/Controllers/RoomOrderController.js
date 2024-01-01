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
exports.RoomOrderController = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("../Entities/Dto/core");
const swagger_1 = require("@nestjs/swagger");
const RoomOrderService_1 = require("../services/RoomOrderService");
const user_decorator_1 = require("../Shared/user.decorator");
const user_dto_1 = require("../Shared/user.dto");
const JwtGuardService_1 = require("../Services/JwtGuardService");
let RoomOrderController = class RoomOrderController {
    constructor(roomOrderService) {
        this.roomOrderService = roomOrderService;
    }
    async getAllRoomOrders(request, user) {
        return await this.roomOrderService.findAllAsync(request, user);
    }
    async getRoomOrderDetails(id, user) {
        return await this.roomOrderService.findOneAsync(id, user);
    }
    async createRoomOrder(createRoomOrderDto) {
        return await this.roomOrderService.createAsync(createRoomOrderDto);
    }
    async updateRoomOrder(updateRoomOrderDto, user, id) {
        return await this.roomOrderService.updateAsync(id, updateRoomOrderDto, user);
    }
    async removeRoomOrder(id, user) {
        return await this.roomOrderService.removeAsync(id, user);
    }
    async restoreRoomOrder(id, user) {
        return await this.roomOrderService.restoreAsync(id, user);
    }
    async deleteRoomOrder(id, user) {
        return await this.roomOrderService.deleteAsync(id, user);
    }
};
__decorate([
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], RoomOrderController.prototype, "getAllRoomOrders", null);
__decorate([
    (0, common_1.Get)(':id/details'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], RoomOrderController.prototype, "getRoomOrderDetails", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], RoomOrderController.prototype, "createRoomOrder", null);
__decorate([
    (0, common_1.Put)(':id/update'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, user_decorator_1.User)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.UpdatedRoomOrderDto,
        user_dto_1.UserDto, String]),
    __metadata("design:returntype", Promise)
], RoomOrderController.prototype, "updateRoomOrder", null);
__decorate([
    (0, common_1.Delete)(':id/remove'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], RoomOrderController.prototype, "removeRoomOrder", null);
__decorate([
    (0, common_1.Delete)(':id/restore'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], RoomOrderController.prototype, "restoreRoomOrder", null);
__decorate([
    (0, common_1.Delete)(':id/delete'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], RoomOrderController.prototype, "deleteRoomOrder", null);
RoomOrderController = __decorate([
    (0, common_1.Controller)('room-order'),
    (0, common_1.UseGuards)(JwtGuardService_1.JwtAuthGuard),
    (0, swagger_1.ApiTags)('room-order'),
    __metadata("design:paramtypes", [RoomOrderService_1.RoomOrderService])
], RoomOrderController);
exports.RoomOrderController = RoomOrderController;
//# sourceMappingURL=RoomOrderController.js.map