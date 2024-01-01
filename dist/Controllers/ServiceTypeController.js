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
exports.ServiceTypeController = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("../Entities/Dto/core");
const swagger_1 = require("@nestjs/swagger");
const ServiceTypeService_1 = require("../services/ServiceTypeService");
const user_decorator_1 = require("../Shared/user.decorator");
const user_dto_1 = require("../Shared/user.dto");
const JwtGuardService_1 = require("../Services/JwtGuardService");
let ServiceTypeController = class ServiceTypeController {
    constructor(serviceTypeService) {
        this.serviceTypeService = serviceTypeService;
    }
    async getAllServiceTypes(request, user) {
        return await this.serviceTypeService.findAllAsync(request, user);
    }
    async getServiceTypeDetails(id, user) {
        return await this.serviceTypeService.findOneAsync(id, user);
    }
    async createServiceType(createServiceTypeDto, user) {
        return await this.serviceTypeService.createAsync(createServiceTypeDto, user);
    }
    async updateServiceType(updateServiceTypeDto, user, id) {
        return await this.serviceTypeService.updateAsync(id, updateServiceTypeDto, user);
    }
    async removeServiceType(id, user) {
        return await this.serviceTypeService.removeAsync(id, user);
    }
    async restoreServiceType(id, user) {
        return await this.serviceTypeService.restoreAsync(id, user);
    }
    async deleteServiceType(id, user) {
        return await this.serviceTypeService.deleteAsync(id, user);
    }
};
__decorate([
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], ServiceTypeController.prototype, "getAllServiceTypes", null);
__decorate([
    (0, common_1.Get)(':id/details'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], ServiceTypeController.prototype, "getServiceTypeDetails", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.CreateServiceTypeDto,
        user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], ServiceTypeController.prototype, "createServiceType", null);
__decorate([
    (0, common_1.Put)(':id/update'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, user_decorator_1.User)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.UpdateServiceTypeDto,
        user_dto_1.UserDto, String]),
    __metadata("design:returntype", Promise)
], ServiceTypeController.prototype, "updateServiceType", null);
__decorate([
    (0, common_1.Delete)(':id/remove'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], ServiceTypeController.prototype, "removeServiceType", null);
__decorate([
    (0, common_1.Delete)(':id/restore'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], ServiceTypeController.prototype, "restoreServiceType", null);
__decorate([
    (0, common_1.Delete)(':id/delete'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], ServiceTypeController.prototype, "deleteServiceType", null);
ServiceTypeController = __decorate([
    (0, common_1.Controller)('service-type'),
    (0, common_1.UseGuards)(JwtGuardService_1.JwtAuthGuard),
    (0, swagger_1.ApiTags)('service-type'),
    __metadata("design:paramtypes", [ServiceTypeService_1.ServiceTypeService])
], ServiceTypeController);
exports.ServiceTypeController = ServiceTypeController;
//# sourceMappingURL=ServiceTypeController.js.map