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
exports.RoomTypeController = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("../services/core");
const core_2 = require("../Entities/Dto/core");
const swagger_1 = require("@nestjs/swagger");
const user_dto_1 = require("../Shared/user.dto");
const user_decorator_1 = require("../Shared/user.decorator");
const JwtGuardService_1 = require("../Services/JwtGuardService");
let RoomTypeController = class RoomTypeController {
    constructor(roomService) {
        this.roomService = roomService;
    }
    async getAllRoomTypes(request, user) {
        return await this.roomService.findAllAsync(request, user);
    }
    async getRoomTypeDetails(id, user) {
        return await this.roomService.findOneAsync(id, user);
    }
    async createRoomType(createRoomTypeDto, user) {
        return await this.roomService.createAsync(createRoomTypeDto, user);
    }
    async updateRoomType(updateRoomTypeDto, user, id) {
        return await this.roomService.updateAsync(id, updateRoomTypeDto, user);
    }
    async removeRoomType(id, user) {
        return await this.roomService.removeAsync(id, user);
    }
    async restoreRoomType(id, user) {
        return await this.roomService.restoreAsync(id, user);
    }
    async deleteRoomType(id, user) {
        return await this.roomService.deleteAsync(id, user);
    }
};
__decorate([
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], RoomTypeController.prototype, "getAllRoomTypes", null);
__decorate([
    (0, common_1.Get)(':id/details'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], RoomTypeController.prototype, "getRoomTypeDetails", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_2.CreateRoomTypeDto,
        user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], RoomTypeController.prototype, "createRoomType", null);
__decorate([
    (0, common_1.Put)(':id/update'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, user_decorator_1.User)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_2.UpdateRoomTypeDto,
        user_dto_1.UserDto, String]),
    __metadata("design:returntype", Promise)
], RoomTypeController.prototype, "updateRoomType", null);
__decorate([
    (0, common_1.Delete)(':id/remove'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], RoomTypeController.prototype, "removeRoomType", null);
__decorate([
    (0, common_1.Delete)(':id/restore'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], RoomTypeController.prototype, "restoreRoomType", null);
__decorate([
    (0, common_1.Delete)(':id/delete'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], RoomTypeController.prototype, "deleteRoomType", null);
RoomTypeController = __decorate([
    (0, common_1.Controller)('room-type'),
    (0, swagger_1.ApiTags)('room-type'),
    (0, common_1.UseGuards)(JwtGuardService_1.JwtAuthGuard),
    __metadata("design:paramtypes", [core_1.RoomTypeService])
], RoomTypeController);
exports.RoomTypeController = RoomTypeController;
//# sourceMappingURL=RoomTypeController.js.map