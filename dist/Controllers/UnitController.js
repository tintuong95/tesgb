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
exports.UnitController = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("../services/core");
const core_2 = require("../Entities/Dto/core");
const swagger_1 = require("@nestjs/swagger");
const user_decorator_1 = require("../Shared/user.decorator");
const user_dto_1 = require("../Shared/user.dto");
const JwtGuardService_1 = require("../Services/JwtGuardService");
let UnitController = class UnitController {
    constructor(unitService) {
        this.unitService = unitService;
    }
    async getAllUnits(request, user) {
        return await this.unitService.findAllAsync(request, user);
    }
    async getUnitDetails(id, user) {
        return await this.unitService.findOneAsync(id, user);
    }
    async createUnit(createUnitDto, user) {
        return await this.unitService.createAsync(createUnitDto, user);
    }
    async updateUnit(updateUnitDto, user, id) {
        return await this.unitService.updateAsync(id, updateUnitDto, user);
    }
    async removeUnit(id, user) {
        return await this.unitService.removeAsync(id, user);
    }
    async removeListUnit(id, user) {
        return await this.unitService.removeListAsync(id, user);
    }
    async restoreUnit(id, user) {
        return await this.unitService.restoreAsync(id, user);
    }
    async deleteUnit(id, user) {
        return await this.unitService.deleteAsync(id, user);
    }
};
__decorate([
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], UnitController.prototype, "getAllUnits", null);
__decorate([
    (0, common_1.Get)(':id/details'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], UnitController.prototype, "getUnitDetails", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], UnitController.prototype, "createUnit", null);
__decorate([
    (0, common_1.Put)(':id/update'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, user_decorator_1.User)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_2.UpdateUnitDto,
        user_dto_1.UserDto, String]),
    __metadata("design:returntype", Promise)
], UnitController.prototype, "updateUnit", null);
__decorate([
    (0, common_1.Delete)(':id/remove'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], UnitController.prototype, "removeUnit", null);
__decorate([
    (0, common_1.Post)('/remove'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], UnitController.prototype, "removeListUnit", null);
__decorate([
    (0, common_1.Delete)(':id/restore'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], UnitController.prototype, "restoreUnit", null);
__decorate([
    (0, common_1.Delete)(':id/delete'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], UnitController.prototype, "deleteUnit", null);
UnitController = __decorate([
    (0, common_1.Controller)('unit'),
    (0, common_1.UseGuards)(JwtGuardService_1.JwtAuthGuard),
    (0, swagger_1.ApiTags)('unit'),
    __metadata("design:paramtypes", [core_1.UnitService])
], UnitController);
exports.UnitController = UnitController;
//# sourceMappingURL=UnitController.js.map