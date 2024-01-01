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
exports.RevenueController = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("../services/core");
const swagger_1 = require("@nestjs/swagger");
const core_2 = require("../entities/DTO/core");
const user_decorator_1 = require("../Shared/user.decorator");
const user_dto_1 = require("../Shared/user.dto");
const JwtGuardService_1 = require("../Services/JwtGuardService");
let RevenueController = class RevenueController {
    constructor(revenueService) {
        this.revenueService = revenueService;
    }
    async getAllRevenues(request, user) {
        return await this.revenueService.findAllAsync(request, user);
    }
    async getRevenueDetails(id, user) {
        return await this.revenueService.findOneAsync(id, user);
    }
    async createRevenue(createRevenueDto, user) {
        return await this.revenueService.createAsync(createRevenueDto, user);
    }
    async updateRevenue(updateRevenueDto, user, id) {
        return await this.revenueService.updateAsync(id, updateRevenueDto, user);
    }
    async removeRevenue(id, user) {
        return await this.revenueService.removeAsync(id, user);
    }
    async restoreRevenue(id, user) {
        return await this.revenueService.restoreAsync(id, user);
    }
    async deleteRevenue(id, user) {
        return await this.revenueService.deleteAsync(id, user);
    }
    async getRevenueAndExpendTotalByMonth(request, user) {
        return await this.revenueService.getRevenueAndExpendTotalByTime(request, user);
    }
    async getRevenueAndExpendInDate(request, user) {
        return await this.revenueService.getRevenueAndExpendInDate(request, user);
    }
    async getRevenueAndExpendInDateReference(request, user) {
        return await this.revenueService.getRevenueAndExpendInDateByReferenceType(request, user);
    }
    async getRevenueAndExpendTotal(request, user) {
        return await this.revenueService.getTotalRevenue(user);
    }
};
__decorate([
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], RevenueController.prototype, "getAllRevenues", null);
__decorate([
    (0, common_1.Get)(':id/details'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], RevenueController.prototype, "getRevenueDetails", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_2.CreateRevenueDto,
        user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], RevenueController.prototype, "createRevenue", null);
__decorate([
    (0, common_1.Put)(':id/update'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, user_decorator_1.User)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_2.UpdateRevenueDto,
        user_dto_1.UserDto, String]),
    __metadata("design:returntype", Promise)
], RevenueController.prototype, "updateRevenue", null);
__decorate([
    (0, common_1.Delete)(':id/remove'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], RevenueController.prototype, "removeRevenue", null);
__decorate([
    (0, common_1.Delete)(':id/restore'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], RevenueController.prototype, "restoreRevenue", null);
__decorate([
    (0, common_1.Delete)(':id/delete'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], RevenueController.prototype, "deleteRevenue", null);
__decorate([
    (0, common_1.Get)('/revenue-expend-total-month'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], RevenueController.prototype, "getRevenueAndExpendTotalByMonth", null);
__decorate([
    (0, common_1.Get)('/revenue-expend-in-date'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], RevenueController.prototype, "getRevenueAndExpendInDate", null);
__decorate([
    (0, common_1.Get)('/revenue-expend-in-date-reference'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], RevenueController.prototype, "getRevenueAndExpendInDateReference", null);
__decorate([
    (0, common_1.Get)('/revenue-expend-total'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], RevenueController.prototype, "getRevenueAndExpendTotal", null);
RevenueController = __decorate([
    (0, common_1.Controller)('revenue'),
    (0, swagger_1.ApiTags)('revenue'),
    (0, common_1.UseGuards)(JwtGuardService_1.JwtAuthGuard),
    __metadata("design:paramtypes", [core_1.RevenueService])
], RevenueController);
exports.RevenueController = RevenueController;
//# sourceMappingURL=RevenueController.js.map