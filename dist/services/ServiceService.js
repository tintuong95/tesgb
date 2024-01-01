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
exports.ServiceService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("../entities/core");
const typeorm_2 = require("typeorm");
const _ = require("lodash");
const pagination_1 = require("../Utils/pagination");
const relation_1 = require("../contants/relation");
let ServiceService = class ServiceService {
    constructor(serviceRepository) {
        this.serviceRepository = serviceRepository;
    }
    async findAllAsync(request, user) {
        try {
            const { skip, take, currentPage, perPage } = (0, pagination_1.queryHandler)(request.query);
            const { name = '', unitId = '', startDate = '', endDate = '', serviceTypeId = '', } = request.query;
            const result = this.serviceRepository
                .createQueryBuilder('services')
                .leftJoinAndSelect('services.serviceType', 'serviceTypes', 'services.serviceTypeId=serviceTypes.id')
                .leftJoinAndSelect('services.unit', 'units', 'services.unitId = units.id')
                .where(`services.deletedAt IS NULL`)
                .andWhere(`services.accountId = :accountId`, {
                accountId: `${user.accountId}`,
            })
                .orderBy('services.createdAt', 'DESC')
                .skip(skip)
                .take(take);
            unitId &&
                result.andWhere('services.unitId = :unitId', {
                    unitId: `${unitId}`,
                });
            name &&
                result.andWhere('services.name LIKE :name', {
                    name: `%${name}%`,
                });
            serviceTypeId &&
                result.andWhere('serviceTypes.id = :serviceTypeId', {
                    serviceTypeId: `${serviceTypeId}`,
                });
            startDate &&
                result.andWhere('services.createdAt >= :startDate', {
                    startDate: new Date(startDate.toString()),
                });
            endDate &&
                result.andWhere('services.createdAt <= :endDate', {
                    endDate: new Date(endDate.toString()),
                });
            const count = await result.getCount();
            const services = await result.getMany();
            if (count == 0)
                return new common_2.HttpException('Not Found', common_1.HttpStatus.NOT_FOUND);
            return (0, pagination_1.pagination)(request, [services, count], currentPage, perPage);
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
                throw new common_2.NotFoundException('Service Id ' + id + ' Not Found !');
            return result;
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findByServiceTypeId(serviceTypeId, user) {
        try {
            const result = await this.serviceRepository.find({
                where: { serviceTypeId, accountId: user.accountId },
                relations: [relation_1.UNIT_RELATION],
            });
            if (!result)
                throw new common_2.NotFoundException('Service Id ' + serviceTypeId + ' Not Found !');
            return result;
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createAsync(createServiceDto, user) {
        try {
            createServiceDto.accountId = user.accountId;
            const result = this.serviceRepository.create(createServiceDto);
            return await this.serviceRepository.save(result);
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateAsync(id, updateServiceDto, user) {
        try {
            const result = await this.serviceRepository.findOne({ where: { id } });
            if (!result)
                throw new common_2.NotFoundException('Service Id ' + id + ' Not Found !');
            _(updateServiceDto).forEach((val, key) => {
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
            return 'Deleted Service Id ' + id + ' successfully !';
        throw new common_2.NotFoundException('Service Id ' + id + ' Not Found !');
    }
    async restoreAsync(id, user) {
        const result = await this.serviceRepository.restore({
            id,
            accountId: user.accountId,
        });
        if (result.affected > 0)
            return 'Restore Service Id ' + id + ' successfully !';
        throw new common_2.NotFoundException('Service Id ' + id + ' Not Found !');
    }
    async deleteAsync(id, user) {
        const result = await this.serviceRepository.delete(id);
        if (result.affected > 0)
            return 'Deleted Service Id ' + id + ' successfully !';
        throw new common_2.NotFoundException('Service Id ' + id + ' Not Found !');
    }
    async countServiceStatusCurrent(user, request) {
        const { status } = request.query;
        const rs = await this.serviceRepository
            .createQueryBuilder('services')
            .where(`services.deletedAt IS NULL`)
            .andWhere(`services.accountId = :accountId`, {
            accountId: `${user.accountId}`,
        })
            .andWhere(`services.status = :status`, {
            status: status,
        })
            .select('COUNT(*) AS count')
            .getRawOne();
        return rs;
    }
};
ServiceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(core_1.Service)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ServiceService);
exports.ServiceService = ServiceService;
//# sourceMappingURL=ServiceService.js.map