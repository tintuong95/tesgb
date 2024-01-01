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
exports.EmployeesService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("../entities/core");
const typeorm_2 = require("typeorm");
const _ = require("lodash");
const pagination_1 = require("../Utils/pagination");
let EmployeesService = class EmployeesService {
    constructor(employeeRepository) {
        this.employeeRepository = employeeRepository;
    }
    async findAllAsync(request, user) {
        try {
            const { skip, take, currentPage, perPage } = (0, pagination_1.queryHandler)(request.query);
            const { idCard = '', phone = '', lastName = '', address = '', startDate = '', endDate = '', } = request.query;
            const result = await this.employeeRepository
                .createQueryBuilder('employees')
                .where(`employees.deletedAt IS NULL`)
                .andWhere(`employees.accountId = :accountId`, {
                accountId: `${user.accountId}`,
            })
                .orderBy('employees.createdAt', 'DESC')
                .skip(skip)
                .take(take);
            lastName &&
                result.andWhere('employees.lastName LIKE :lastName', {
                    lastName: `%${lastName}%`,
                });
            const count = await result.getCount();
            const customers = await result.getMany();
            if (count == 0)
                return new common_2.HttpException('Not Found', common_1.HttpStatus.NOT_FOUND);
            return (0, pagination_1.pagination)(request, [customers, count], currentPage, perPage);
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOneAsync(id, user) {
        try {
            const result = await this.employeeRepository.findOne({
                where: { id, accountId: user.accountId },
            });
            if (!result)
                throw new common_2.NotFoundException('Employee Id ' + id + ' Not Found !');
            return result;
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createAsync(createEmployeeDto, user) {
        try {
            createEmployeeDto.accountId = user.accountId;
            const result = this.employeeRepository.create(createEmployeeDto);
            return await this.employeeRepository.save(result);
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateAsync(id, updateEmployeeDto, user) {
        try {
            const result = await this.employeeRepository.findOne({ where: { id } });
            if (!result)
                throw new common_2.NotFoundException('Employee Id ' + id + ' Not Found !');
            _(updateEmployeeDto).forEach((val, key) => {
                if (val)
                    result[key] = val;
            });
            return this.employeeRepository.save(result);
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async removeAsync(id, user) {
        const result = await this.employeeRepository.softDelete({
            id,
            accountId: user.accountId,
        });
        if (result.affected > 0)
            return 'Deleted Employee Id ' + id + ' successfully !';
        throw new common_2.NotFoundException('Employee Id ' + id + ' Not Found !');
    }
    async restoreAsync(id, user) {
        const result = await this.employeeRepository.restore({
            id,
            accountId: user.accountId,
        });
        if (result.affected > 0)
            return 'Restore Employee Id ' + id + ' successfully !';
        throw new common_2.NotFoundException('Employee Id ' + id + ' Not Found !');
    }
    async deleteAsync(id, user) {
        const result = await this.employeeRepository.delete(id);
        if (result.affected > 0)
            return 'Deleted Employee Id ' + id + ' successfully !';
        throw new common_2.NotFoundException('Employee Id ' + id + ' Not Found !');
    }
    async countEmployeeStatusCurrent(user, request) {
        const { status } = request.query;
        const rs = await this.employeeRepository
            .createQueryBuilder('employees')
            .where(`employees.deletedAt IS NULL`)
            .andWhere(`employees.accountId = :accountId`, {
            accountId: `${user.accountId}`,
        })
            .andWhere(`employees.status = :status`, {
            status: status,
        })
            .select('COUNT(*) AS count')
            .getRawOne();
        return rs;
    }
};
EmployeesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(core_1.Employee)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EmployeesService);
exports.EmployeesService = EmployeesService;
//# sourceMappingURL=EmployeesService.js.map