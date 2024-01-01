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
exports.StockController = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("../services/core");
const core_2 = require("../Entities/Dto/core");
const swagger_1 = require("@nestjs/swagger");
const JwtGuardService_1 = require("../Services/JwtGuardService");
const user_decorator_1 = require("../Shared/user.decorator");
const user_dto_1 = require("../Shared/user.dto");
let StockController = class StockController {
    constructor(stockService, productService) {
        this.stockService = stockService;
        this.productService = productService;
    }
    async getAllStocks(request, user) {
        return await this.stockService.findAllAsync(request, user);
    }
    async getStockDetails(id, user) {
        return await this.stockService.findOneAsync(id, user);
    }
    async createStock(createProductDto, user) {
        const product = await this.productService.createAsync(createProductDto, user);
        const stock = new core_2.CreateStockDto();
        stock.productId = product.id;
        return await this.stockService.createAsync(stock, user);
    }
    async updateStock(updateStockDto, user, id) {
        return await this.stockService.updateAsync(id, updateStockDto, user);
    }
    async removeStock(id, user) {
        return await this.stockService.removeAsync(id, user);
    }
    async restoreStock(id, user) {
        return await this.stockService.restoreAsync(id, user);
    }
    async deleteStock(id, user) {
        return await this.stockService.deleteAsync(id, user);
    }
};
__decorate([
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], StockController.prototype, "getAllStocks", null);
__decorate([
    (0, common_1.Get)(':id/details'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], StockController.prototype, "getStockDetails", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_2.CreateProductDto,
        user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], StockController.prototype, "createStock", null);
__decorate([
    (0, common_1.Put)(':id/update'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, user_decorator_1.User)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_2.UpdateStockDto,
        user_dto_1.UserDto, String]),
    __metadata("design:returntype", Promise)
], StockController.prototype, "updateStock", null);
__decorate([
    (0, common_1.Delete)(':id/remove'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], StockController.prototype, "removeStock", null);
__decorate([
    (0, common_1.Delete)(':id/restore'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], StockController.prototype, "restoreStock", null);
__decorate([
    (0, common_1.Delete)(':id/delete'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], StockController.prototype, "deleteStock", null);
StockController = __decorate([
    (0, common_1.Controller)('stock'),
    (0, swagger_1.ApiTags)('stock'),
    (0, common_1.UseGuards)(JwtGuardService_1.JwtAuthGuard),
    __metadata("design:paramtypes", [core_1.StockService,
        core_1.ProductService])
], StockController);
exports.StockController = StockController;
//# sourceMappingURL=StockController.js.map