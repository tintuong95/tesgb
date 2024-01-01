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
exports.PriceItemController = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("../services/core");
const core_2 = require("../Entities/Dto/core");
const swagger_1 = require("@nestjs/swagger");
const user_decorator_1 = require("../Shared/user.decorator");
const user_dto_1 = require("../Shared/user.dto");
const JwtGuardService_1 = require("../Services/JwtGuardService");
const PriceItem_1 = require("../entities/Types/PriceItem");
let PriceItemController = class PriceItemController {
    constructor(priceItemService) {
        this.priceItemService = priceItemService;
    }
    async getAllPriceItems(request, user) {
        return await this.priceItemService.findAllAsync(request, user);
    }
    async getPriceItemDetails(id, user) {
        return await this.priceItemService.findOneAsync(id, user);
    }
    async createPriceItem(createPriceItemDto) {
        return await this.priceItemService.createAsync(createPriceItemDto);
    }
    async updatePriceItem(updatePriceItemDto, user, id, type) {
        return await this.priceItemService.updateAsync(id, type, updatePriceItemDto);
    }
    async removePriceItem(id, user) {
        return await this.priceItemService.removeAsync(id, user);
    }
    async restorePriceItem(id, user) {
        return await this.priceItemService.restoreAsync(id, user);
    }
    async deletePriceItem(id, user) {
        return await this.priceItemService.deleteAsync(id, user);
    }
};
__decorate([
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], PriceItemController.prototype, "getAllPriceItems", null);
__decorate([
    (0, common_1.Get)(':id/details'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], PriceItemController.prototype, "getPriceItemDetails", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], PriceItemController.prototype, "createPriceItem", null);
__decorate([
    (0, common_1.Put)(':id/:type/update'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(2, (0, common_1.Param)('id')),
    __param(3, (0, common_1.Param)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_2.UpdatePriceItemDto,
        user_dto_1.UserDto, String, Number]),
    __metadata("design:returntype", Promise)
], PriceItemController.prototype, "updatePriceItem", null);
__decorate([
    (0, common_1.Delete)(':id/remove'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], PriceItemController.prototype, "removePriceItem", null);
__decorate([
    (0, common_1.Delete)(':id/restore'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], PriceItemController.prototype, "restorePriceItem", null);
__decorate([
    (0, common_1.Delete)(':id/delete'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], PriceItemController.prototype, "deletePriceItem", null);
PriceItemController = __decorate([
    (0, common_1.Controller)('priceItem'),
    (0, swagger_1.ApiTags)('priceItem'),
    (0, common_1.UseGuards)(JwtGuardService_1.JwtAuthGuard),
    __metadata("design:paramtypes", [core_1.PriceItemService])
], PriceItemController);
exports.PriceItemController = PriceItemController;
//# sourceMappingURL=PriceItemController.js.map