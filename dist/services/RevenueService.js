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
exports.RevenueService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("../entities/core");
const typeorm_2 = require("typeorm");
const _ = require("lodash");
const pagination_1 = require("../Utils/pagination");
const Revenue_1 = require("../entities/Types/Revenue");
let RevenueService = class RevenueService {
    constructor(revenueRepository) {
        this.revenueRepository = revenueRepository;
    }
    async findAllAsync(request, user) {
        var _a, _b, _c, _d;
        try {
            const { skip, take, currentPage, perPage } = (0, pagination_1.queryHandler)(request.query);
            const { id = '', type = '', startDate = '', endDate = '' } = request.query;
            const result = this.revenueRepository
                .createQueryBuilder('revenues')
                .leftJoinAndSelect('revenues.member', 'members')
                .where(`revenues.deletedAt IS NULL`)
                .andWhere(`revenues.accountId = :accountId`, {
                accountId: `${user.accountId}`,
            });
            ((_a = request.query) === null || _a === void 0 ? void 0 : _a.type) &&
                result.andWhere(`revenues.type = :type`, {
                    type: `${(_b = request.query) === null || _b === void 0 ? void 0 : _b.type}`,
                });
            ((_c = request.query) === null || _c === void 0 ? void 0 : _c.referenceType) &&
                result.andWhere(`revenues.referenceType = :referenceType`, {
                    referenceType: `${(_d = request.query) === null || _d === void 0 ? void 0 : _d.referenceType}`,
                });
            result.orderBy('revenues.createdAt', 'DESC').skip(skip).take(take);
            startDate &&
                result.andWhere('revenues.createdAt >= :startDate', {
                    startDate: new Date(startDate.toString()),
                });
            endDate &&
                result.andWhere('revenues.createdAt <= :endDate', {
                    endDate: new Date(endDate.toString()),
                });
            const count = await result.getCount();
            const revenues = await result.getMany();
            if (count == 0)
                return new common_2.HttpException('Not Found', common_1.HttpStatus.NOT_FOUND);
            return (0, pagination_1.pagination)(request, [revenues, count], currentPage, perPage);
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOneAsync(id, user) {
        try {
            const result = await this.revenueRepository.findOne({
                where: { id },
            });
            if (!result)
                throw new common_2.NotFoundException('Revenue Id ' + id + ' Not Found !');
            return result;
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createAsync(createRevenueDto, user) {
        try {
            createRevenueDto.accountId = user.accountId;
            createRevenueDto.memberId = user.id;
            const result = this.revenueRepository.create(createRevenueDto);
            return await this.revenueRepository.save(result);
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateAsync(id, updateRevenueDto, user) {
        try {
            const result = await this.revenueRepository.findOne({ where: { id } });
            if (!result)
                throw new common_2.NotFoundException('Revenue Id ' + id + ' Not Found !');
            _(updateRevenueDto).forEach((val, key) => {
                if (val)
                    result[key] = val;
            });
            return this.revenueRepository.save(result);
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async removeAsync(id, user) {
        const result = await this.revenueRepository.softDelete({
            id,
        });
        if (result.affected > 0)
            return 'Deleted Revenue Id ' + id + ' successfully !';
        throw new common_2.NotFoundException('Revenue Id ' + id + ' Not Found !');
    }
    async restoreAsync(id, user) {
        const result = await this.revenueRepository.restore({
            id,
        });
        if (result.affected > 0)
            return 'Restore Revenue Id ' + id + ' successfully !';
        throw new common_2.NotFoundException('Revenue Id ' + id + ' Not Found !');
    }
    async deleteAsync(id, user) {
        const result = await this.revenueRepository.delete(id);
        if (result.affected > 0)
            return 'Deleted Revenue Id ' + id + ' successfully !';
        throw new common_2.NotFoundException('Revenue Id ' + id + ' Not Found !');
    }
    async getRevenueAndExpendTotalByTime(request, user) {
        var _a, _b;
        const { startDate = '10-10-1999', endDate = '10-10-2999' } = request.query;
        const result = await this.revenueRepository
            .createQueryBuilder('revenues')
            .where(`revenues.deletedAt IS NULL`)
            .andWhere(`revenues.accountId = :accountId`, {
            accountId: `${user.accountId}`,
        })
            .andWhere('revenues.createdAt >= :startDate', {
            startDate: new Date(startDate.toString()),
        })
            .andWhere('revenues.createdAt <= :endDate', {
            endDate: new Date(endDate.toString()),
        })
            .select('type')
            .addSelect('SUM(amount)', 'sumTotal')
            .groupBy('type')
            .getRawMany();
        const revenue = ((_a = _.find(result, { type: String(Revenue_1.REVENUE_STATE.REVENUE) })) === null || _a === void 0 ? void 0 : _a.sumTotal) || 0;
        const expenses = ((_b = _.find(result, { type: String(Revenue_1.REVENUE_STATE.EXPENSES) })) === null || _b === void 0 ? void 0 : _b.sumTotal) || 0;
        const total = +revenue + +expenses;
        const revenueRatio = Math.round((revenue / total) * 100);
        const expensesRatio = 100 - revenueRatio;
        return {
            revenue,
            expenses,
            revenueRatio,
            expensesRatio,
        };
    }
    async getRevenueAndExpendInDate(request, user) {
        const { startDate = '10-09-1999', endDate = '10-09-2999', referenceType = Revenue_1.REVENUE_TYPE.ORDER, } = request.query;
        const result = await this.revenueRepository
            .createQueryBuilder('revenues')
            .where(`revenues.deletedAt IS NULL`)
            .andWhere(`revenues.accountId = :accountId`, {
            accountId: `${user.accountId}`,
        })
            .andWhere('revenues.createdAt >= :startDate', {
            startDate: new Date(startDate.toString()),
        })
            .andWhere('revenues.createdAt <= :endDate', {
            endDate: new Date(endDate.toString()),
        })
            .andWhere('revenues.referenceType = :referenceType', {
            referenceType: `${referenceType}`,
        })
            .select([
            'DATE_FORMAT(revenues.createdAt, "%d-%b-%Y") as formattedDate',
            'revenues.type as type',
            'SUM(revenues.amount) as totalAmount',
        ])
            .groupBy('formattedDate, type')
            .orderBy('formattedDate', 'ASC')
            .addOrderBy('type', 'ASC')
            .getRawMany();
        return result;
    }
    async getRevenueAndExpendInDateByReferenceType(request, user) {
        const { startDate = '10-09-1999', endDate = '10-09-2999', referenceType = '', } = request.query;
        const result = await this.revenueRepository
            .createQueryBuilder('revenues')
            .where(`revenues.deletedAt IS NULL`)
            .andWhere(`revenues.accountId = :accountId`, {
            accountId: `${user.accountId}`,
        })
            .andWhere('revenues.createdAt >= :startDate', {
            startDate: new Date(startDate.toString()),
        })
            .andWhere('revenues.createdAt <= :endDate', {
            endDate: new Date(endDate.toString()),
        })
            .andWhere('revenues.referenceType = :referenceType', {
            referenceType: `${referenceType}`,
        })
            .andWhere('revenues.type = :type', {
            type: `${Revenue_1.REVENUE_STATE.REVENUE}`,
        })
            .select([
            'DATE_FORMAT(revenues.createdAt, "%d-%b-%Y") as formattedDate',
            'revenues.type as type',
            'SUM(revenues.amount) as totalAmount',
        ])
            .groupBy('formattedDate, type')
            .orderBy('formattedDate', 'ASC')
            .addOrderBy('type', 'ASC')
            .getRawMany();
        return result;
    }
    async getTotalRevenue(user) {
        var _a, _b;
        const result = await this.revenueRepository
            .createQueryBuilder('revenues')
            .where(`revenues.deletedAt IS NULL`)
            .andWhere(`revenues.accountId = :accountId`, {
            accountId: `${user.accountId}`,
        })
            .select('type')
            .addSelect('SUM(amount)', 'sumTotal')
            .groupBy('type')
            .getRawMany();
        const revenue = ((_a = _.find(result, { type: String(Revenue_1.REVENUE_STATE.REVENUE) })) === null || _a === void 0 ? void 0 : _a.sumTotal) || 0;
        const expenses = ((_b = _.find(result, { type: String(Revenue_1.REVENUE_STATE.EXPENSES) })) === null || _b === void 0 ? void 0 : _b.sumTotal) || 0;
        return { revenue, expenses };
    }
};
RevenueService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(core_1.Revenue)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RevenueService);
exports.RevenueService = RevenueService;
//# sourceMappingURL=RevenueService.js.map