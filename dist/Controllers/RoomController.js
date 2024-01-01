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
exports.RoomController = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("../services/core");
const core_2 = require("../Entities/Dto/core");
const swagger_1 = require("@nestjs/swagger");
const user_decorator_1 = require("../Shared/user.decorator");
const user_dto_1 = require("../Shared/user.dto");
const JwtGuardService_1 = require("../Services/JwtGuardService");
const _ = require("lodash");
const pagination_1 = require("../Utils/pagination");
let RoomController = class RoomController {
    constructor(roomService, orderService) {
        this.roomService = roomService;
        this.orderService = orderService;
    }
    async getAllRooms(request, user) {
        const roomList = await this.roomService.findAllAsync(request, user);
        const { rooms, count, currentPage, perPage } = roomList;
        console.log('roomList', roomList);
        const roomIds = _(rooms)
            .map((item) => item === null || item === void 0 ? void 0 : item.id)
            .value();
        const orders = await this.orderService.findOrderByListRoomId(roomIds, user);
        console.log('orders', orders);
        const orderRoomList = _(orders)
            .flatMap('roomOrder')
            .uniqBy('roomId')
            .map((item) => ({ roomId: item.roomId, orderId: item.orderId }))
            .value();
        const mergedArray = _.merge(_.keyBy(rooms, 'id'), _.keyBy(orderRoomList, 'roomId'));
        return (0, pagination_1.pagination)(request, [_.values(mergedArray), count], currentPage, perPage);
    }
    async getAllPriceRooms(idList, user) {
        console.log('idList', idList);
        return await this.roomService.findPriceRoomAllAsync(idList, user);
    }
    async getRoomDetails(id, user) {
        return await this.roomService.findOneAsync(id, user);
    }
    async createRoom(createRoomDto, user) {
        return await this.roomService.createAsync(createRoomDto, user);
    }
    async updateRoom(updateRoomDto, user, id) {
        return await this.roomService.updateAsync(id, updateRoomDto, user);
    }
    async removeRoom(id, user) {
        return await this.roomService.removeAsync(id, user);
    }
    async restoreRoom(id, user) {
        return await this.roomService.restoreAsync(id, user);
    }
    async deleteRoom(id, user) {
        return await this.roomService.deleteAsync(id, user);
    }
    async countRoomStatus(user) {
        return await this.roomService.countRoomStatusAsync(user);
    }
};
__decorate([
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "getAllRooms", null);
__decorate([
    (0, common_1.Get)('price/list'),
    __param(0, (0, common_1.Query)('idList')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "getAllPriceRooms", null);
__decorate([
    (0, common_1.Get)(':id/details'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "getRoomDetails", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "createRoom", null);
__decorate([
    (0, common_1.Put)(':id/update'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, user_decorator_1.User)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_2.UpdateRoomDto,
        user_dto_1.UserDto, String]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "updateRoom", null);
__decorate([
    (0, common_1.Delete)(':id/remove'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "removeRoom", null);
__decorate([
    (0, common_1.Delete)(':id/restore'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "restoreRoom", null);
__decorate([
    (0, common_1.Delete)(':id/delete'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "deleteRoom", null);
__decorate([
    (0, common_1.Get)('/count-room-status'),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "countRoomStatus", null);
RoomController = __decorate([
    (0, common_1.Controller)('room'),
    (0, swagger_1.ApiTags)('room'),
    (0, common_1.UseGuards)(JwtGuardService_1.JwtAuthGuard),
    __metadata("design:paramtypes", [core_1.RoomService,
        core_1.OrderService])
], RoomController);
exports.RoomController = RoomController;
//# sourceMappingURL=RoomController.js.map