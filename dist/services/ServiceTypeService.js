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
exports.ServiceTypeService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("../entities/core");
const typeorm_2 = require("typeorm");
const _ = require("lodash");
const relation_1 = require("../contants/relation");
let ServiceTypeService = class ServiceTypeService {
    constructor(serviceRepository) {
        this.serviceRepository = serviceRepository;
    }
    async findAllAsync(request, user) {
        try {
            return await this.serviceRepository.find({
                relations: [relation_1.SERVICE_RELATION],
            });
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOneAsync(id, user) {
        try {
            const result = await this.serviceRepository.findOne({
                where: { id, accountId: user.accountId },
            });
            if (!result)
                throw new common_2.NotFoundException('ServiceType Id ' + id + ' Not Found !');
            return result;
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createAsync(createServiceTypeDto, user) {
        try {
            createServiceTypeDto.accountId = user.accountId;
            const result = this.serviceRepository.create(createServiceTypeDto);
            return await this.serviceRepository.save(result);
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateAsync(id, updateServiceTypeDto, user) {
        try {
            const result = await this.serviceRepository.findOne({ where: { id } });
            if (!result)
                throw new common_2.NotFoundException('ServiceType Id ' + id + ' Not Found !');
            _(updateServiceTypeDto).forEach((val, key) => {
                if (val)
                    result[key] = val;
            });
            return this.serviceRepository.save(result);
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async removeAsync(id, user) {
        const result = await this.serviceRepository.softDelete({
            id,
            accountId: user.accountId,
        });
        if (result.affected > 0)
            return 'Deleted ServiceType Id ' + id + ' successfully !';
        throw new common_2.NotFoundException('ServiceType Id ' + id + ' Not Found !');
    }
    async restoreAsync(id, user) {
        const result = await this.serviceRepository.restore({
            id,
            accountId: user.accountId,
        });
        if (result.affected > 0)
            return 'Restore ServiceType Id ' + id + ' successfully !';
        throw new common_2.NotFoundException('ServiceType Id ' + id + ' Not Found !');
    }
    async deleteAsync(id, user) {
        const result = await this.serviceRepository.delete(id);
        if (result.affected > 0)
            return 'Deleted ServiceType Id ' + id + ' successfully !';
        throw new common_2.NotFoundException('ServiceType Id ' + id + ' Not Found !');
    }
};
ServiceTypeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(core_1.ServiceType)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ServiceTypeService);
exports.ServiceTypeService = ServiceTypeService;
//# sourceMappingURL=ServiceTypeService.js.map