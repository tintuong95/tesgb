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
exports.PayrollController = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("../services/core");
const core_2 = require("../Entities/Dto/core");
const swagger_1 = require("@nestjs/swagger");
const user_decorator_1 = require("../Shared/user.decorator");
const user_dto_1 = require("../Shared/user.dto");
const JwtGuardService_1 = require("../Services/JwtGuardService");
const Revenue_1 = require("../entities/Types/Revenue");
let PayrollController = class PayrollController {
    constructor(payrollService, revenueService) {
        this.payrollService = payrollService;
        this.revenueService = revenueService;
    }
    async getAllPayrolls(request, user) {
        return await this.payrollService.findAllAsync(request, user);
    }
    async getPayrollDetails(id, user) {
        return await this.payrollService.findOneAsync(id, user);
    }
    async createPayroll(createPayrollDto, user) {
        const newPayroll = await this.payrollService.createAsync(createPayrollDto, user);
        const data = new core_2.CreateRevenueDto();
        data.amount = newPayroll.amount;
        data.referenceId = newPayroll.id;
        data.referenceType = Revenue_1.REVENUE_TYPE.EMPLOYEE;
        data.type = Revenue_1.REVENUE_STATE.EXPENSES;
        await this.revenueService.createAsync(data, user);
        return newPayroll;
    }
    async updatePayroll(updatePayrollDto, user, id) {
        return await this.payrollService.updateAsync(id, updatePayrollDto, user);
    }
    async removePayroll(id, user) {
        return await this.payrollService.removeAsync(id, user);
    }
    async restorePayroll(id, user) {
        return await this.payrollService.restoreAsync(id, user);
    }
    async deletePayroll(id, user) {
        return await this.payrollService.deleteAsync(id, user);
    }
};
__decorate([
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "getAllPayrolls", null);
__decorate([
    (0, common_1.Get)(':id/details'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "getPayrollDetails", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_2.CreatePayrollDto,
        user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "createPayroll", null);
__decorate([
    (0, common_1.Put)(':id/update'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, user_decorator_1.User)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_2.UpdatePayrollDto,
        user_dto_1.UserDto, String]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "updatePayroll", null);
__decorate([
    (0, common_1.Delete)(':id/remove'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "removePayroll", null);
__decorate([
    (0, common_1.Delete)(':id/restore'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "restorePayroll", null);
__decorate([
    (0, common_1.Delete)(':id/delete'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], PayrollController.prototype, "deletePayroll", null);
PayrollController = __decorate([
    (0, common_1.Controller)('payroll'),
    (0, swagger_1.ApiTags)('payroll'),
    (0, common_1.UseGuards)(JwtGuardService_1.JwtAuthGuard),
    __metadata("design:paramtypes", [core_1.PayrollsService,
        core_1.RevenueService])
], PayrollController);
exports.PayrollController = PayrollController;
//# sourceMappingURL=PayrollsController.js.map