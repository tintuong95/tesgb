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
exports.PayrollsService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("../entities/core");
const typeorm_2 = require("typeorm");
const _ = require("lodash");
const pagination_1 = require("../Utils/pagination");
const query_1 = require("../Utils/query");
const relation_1 = require("../contants/relation");
let PayrollsService = class PayrollsService {
    constructor(payrollRepository) {
        this.payrollRepository = payrollRepository;
    }
    async findAllAsync(request, user) {
        try {
            const { skip, take, currentPage, perPage } = (0, pagination_1.queryHandler)(request.query);
            const newQuery = (0, query_1.findOptionWhere)(request.query, ['name']);
            const result = await this.payrollRepository.findAndCount({
                where: Object.assign(Object.assign({}, newQuery), { accountId: user.accountId }),
                withDeleted: false,
                order: {
                    createdAt: { direction: 'desc' },
                },
                take,
                skip,
                relations: [relation_1.EMPLOYEE_RELATION],
            });
            if (result[1] == 0)
                return new common_2.HttpException('Not Found', common_1.HttpStatus.NOT_FOUND);
            return (0, pagination_1.pagination)(request, result, currentPage, perPage);
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOneAsync(id, user) {
        try {
            const result = await this.payrollRepository.findOne({
                where: { id },
                relations: [relation_1.EMPLOYEE_RELATION],
            });
            if (!result)
                throw new common_2.NotFoundException('Payroll Id ' + id + ' Not Found !');
            return result;
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createAsync(createPayrollDto, user) {
        try {
            createPayrollDto.accountId = user.accountId;
            const result = this.payrollRepository.create(createPayrollDto);
            return await this.payrollRepository.save(result);
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateAsync(id, updatePayrollDto, user) {
        try {
            const result = await this.payrollRepository.findOne({ where: { id } });
            if (!result)
                throw new common_2.NotFoundException('Payroll Id ' + id + ' Not Found !');
            _(updatePayrollDto).forEach((val, key) => {
                if (val)
                    result[key] = val;
            });
            return this.payrollRepository.save(result);
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async removeAsync(id, user) {
        const result = await this.payrollRepository.restore({
            id,
            accountId: user.accountId,
        });
        if (result.affected > 0)
            return 'Deleted Payroll Id ' + id + ' successfully !';
        throw new common_2.NotFoundException('Payroll Id ' + id + ' Not Found !');
    }
    async restoreAsync(id, user) {
        const result = await this.payrollRepository.restore({
            id,
            accountId: user.accountId,
        });
        if (result.affected > 0)
            return 'Restore Payroll Id ' + id + ' successfully !';
        throw new common_2.NotFoundException('Payroll Id ' + id + ' Not Found !');
    }
    async deleteAsync(id, user) {
        const result = await this.payrollRepository.delete(id);
        if (result.affected > 0)
            return 'Deleted Payroll Id ' + id + ' successfully !';
        throw new common_2.NotFoundException('Payroll Id ' + id + ' Not Found !');
    }
};
PayrollsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(core_1.Payroll)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PayrollsService);
exports.PayrollsService = PayrollsService;
//# sourceMappingURL=PayrollsService.js.map