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
exports.PaymentController = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("../services/core");
const core_2 = require("../Entities/Dto/core");
const swagger_1 = require("@nestjs/swagger");
const user_dto_1 = require("../Shared/user.dto");
const user_decorator_1 = require("../Shared/user.decorator");
const JwtGuardService_1 = require("../Services/JwtGuardService");
let PaymentController = class PaymentController {
    constructor(paymentService, accountService) {
        this.paymentService = paymentService;
        this.accountService = accountService;
    }
    async getAllPayments(request, user) {
        return await this.paymentService.findAllAsync(request, user);
    }
    async getPaymentDetails(id, user) {
        return await this.paymentService.findOneAsync(id, user);
    }
    async createPayment(createPaymentOptionDto, user) {
        return await this.paymentService.createAsync(createPaymentOptionDto, user);
    }
    async updatePayment(updatePaymentDto, user, id) {
        return await this.paymentService.updateAsync(id, updatePaymentDto, user);
    }
    async removePayment(id, user) {
        return await this.paymentService.removeAsync(id, user);
    }
    async restorePayment(id, user) {
        return await this.paymentService.restoreAsync(id, user);
    }
    async deletePayment(id, user) {
        return await this.paymentService.deleteAsync(id, user);
    }
    async checkPayment(id, user) {
        const payment = await this.paymentService.checkPaymentRequest(id, user);
        if (payment) {
            const updateAccountDto = new core_2.UpdateAccountDto();
            updateAccountDto.expiredAt = payment === null || payment === void 0 ? void 0 : payment.expiredAt;
            const account = await this.accountService.updateAsync(user.accountId, updateAccountDto);
            return account;
        }
        throw new common_1.MethodNotAllowedException();
    }
};
__decorate([
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "getAllPayments", null);
__decorate([
    (0, common_1.Get)(':id/details'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "getPaymentDetails", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_2.CreatePaymentOptionDto,
        user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "createPayment", null);
__decorate([
    (0, common_1.Put)(':id/update'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, user_decorator_1.User)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_2.UpdatePaymentDto,
        user_dto_1.UserDto, Number]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "updatePayment", null);
__decorate([
    (0, common_1.Delete)(':id/remove'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "removePayment", null);
__decorate([
    (0, common_1.Delete)(':id/restore'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "restorePayment", null);
__decorate([
    (0, common_1.Delete)(':id/delete'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "deletePayment", null);
__decorate([
    (0, common_1.Get)('/check-payment/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "checkPayment", null);
PaymentController = __decorate([
    (0, common_1.Controller)('payment'),
    (0, swagger_1.ApiTags)('payment'),
    (0, common_1.UseGuards)(JwtGuardService_1.JwtAuthGuard),
    __metadata("design:paramtypes", [core_1.PaymentService,
        core_1.AccountService])
], PaymentController);
exports.PaymentController = PaymentController;
//# sourceMappingURL=PaymentController.js.map