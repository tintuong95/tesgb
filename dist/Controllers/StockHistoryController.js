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
exports.StockHistoryController = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("../services/core");
const core_2 = require("../Entities/Dto/core");
const swagger_1 = require("@nestjs/swagger");
const user_decorator_1 = require("../Shared/user.decorator");
const user_dto_1 = require("../Shared/user.dto");
const JwtGuardService_1 = require("../Services/JwtGuardService");
const StockHistoryType_1 = require("../entities/Types/StockHistoryType");
const Revenue_1 = require("../entities/Types/Revenue");
let StockHistoryController = class StockHistoryController {
    constructor(stockHistoryService, stockService, revenueService) {
        this.stockHistoryService = stockHistoryService;
        this.stockService = stockService;
        this.revenueService = revenueService;
    }
    async getAllStockHistorys(request, user) {
        return await this.stockHistoryService.findAllAsync(request, user);
    }
    async getStockHistoryDetails(id, user) {
        return await this.stockHistoryService.findOneAsync(id, user);
    }
    async createStockHistory(createStockHistoryDto, user) {
        const result = await this.stockHistoryService.createAsync(createStockHistoryDto, user);
        const data = new core_2.CreateRevenueDto();
        data.amount = result.price;
        data.referenceId = result.id;
        data.referenceType = Revenue_1.REVENUE_TYPE.STOCK;
        data.type =
            result.type == StockHistoryType_1.StockHistoryType.Import
                ? Revenue_1.REVENUE_STATE.EXPENSES
                : Revenue_1.REVENUE_STATE.REVENUE;
        await this.revenueService.createAsync(data, user);
        return result;
    }
    async updateStockHistory(updateStockHistoryDto, user, id) {
        return await this.stockHistoryService.updateAsync(id, updateStockHistoryDto, user);
    }
    async removeStockHistory(id, user) {
        return await this.stockHistoryService.removeAsync(id, user);
    }
    async restoreStockHistory(id, user) {
        return await this.stockHistoryService.restoreAsync(id, user);
    }
    async deleteStockHistory(id, user) {
        return await this.stockHistoryService.deleteAsync(id, user);
    }
    async getSumTotalImportExportStockHistory(id, user) {
        return await this.stockHistoryService.getStockExportImportTotal(id, user);
    }
};
__decorate([
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], StockHistoryController.prototype, "getAllStockHistorys", null);
__decorate([
    (0, common_1.Get)(':id/details'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], StockHistoryController.prototype, "getStockHistoryDetails", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_2.CreateStockHistoryDto,
        user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], StockHistoryController.prototype, "createStockHistory", null);
__decorate([
    (0, common_1.Put)(':id/update'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, user_decorator_1.User)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_2.UpdateStockHistoryDto,
        user_dto_1.UserDto, String]),
    __metadata("design:returntype", Promise)
], StockHistoryController.prototype, "updateStockHistory", null);
__decorate([
    (0, common_1.Delete)(':id/remove'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], StockHistoryController.prototype, "removeStockHistory", null);
__decorate([
    (0, common_1.Delete)(':id/restore'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], StockHistoryController.prototype, "restoreStockHistory", null);
__decorate([
    (0, common_1.Delete)(':id/delete'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], StockHistoryController.prototype, "deleteStockHistory", null);
__decorate([
    (0, common_1.Get)(':id/sum-total-import-export'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], StockHistoryController.prototype, "getSumTotalImportExportStockHistory", null);
StockHistoryController = __decorate([
    (0, common_1.Controller)('stock-history'),
    (0, common_1.UseGuards)(JwtGuardService_1.JwtAuthGuard),
    (0, swagger_1.ApiTags)('stock-history'),
    __metadata("design:paramtypes", [core_1.StockHistoryService,
        core_1.StockService,
        core_1.RevenueService])
], StockHistoryController);
exports.StockHistoryController = StockHistoryController;
//# sourceMappingURL=StockHistoryController.js.map