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
exports.CustomerService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("../entities/core");
const typeorm_2 = require("typeorm");
const _ = require("lodash");
const pagination_1 = require("../Utils/pagination");
let CustomerService = class CustomerService {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    async findAllAsync(user, request) {
        try {
            const { skip, take, currentPage, perPage } = (0, pagination_1.queryHandler)(request.query);
            const { idCard = '', phone = '', lastName = '', address = '', startDate = '', endDate = '', } = request.query;
            const result = this.customerRepository
                .createQueryBuilder('customers')
                .where(`customers.deletedAt IS NULL`)
                .andWhere(`customers.accountId = :accountId`, {
                accountId: `${user.accountId}`,
            })
                .orderBy('customers.createdAt', 'DESC')
                .skip(skip)
                .take(take);
            idCard &&
                result.andWhere('customers.idCard LIKE :idCard', {
                    idCard: `%${idCard}%`,
                });
            phone &&
                result.andWhere('customers.phone LIKE :phone', {
                    phone: `%${phone}%`,
                });
            lastName &&
                result.andWhere('customers.lastName LIKE :lastName', {
                    lastName: `%${lastName}%`,
                });
            address &&
                result.andWhere('customers.address LIKE :address', {
                    address: `%${address}%`,
                });
            startDate &&
                result.andWhere('customers.createdAt >= :startDate', {
                    startDate: new Date(startDate.toString()),
                });
            endDate &&
                result.andWhere('customers.createdAt <= :endDate', {
                    endDate: new Date(endDate.toString()),
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
    async findByIdCards(user, idCards) {
        return this.customerRepository.find({
            where: { idCard: (0, typeorm_2.In)(idCards) },
        });
    }
    async findOneAsync(id, user) {
        try {
            const result = await this.customerRepository.findOne({
                where: { id, accountId: user.accountId },
            });
            if (!result)
                throw new common_2.NotFoundException('Customer Id ' + id + ' Not Found !');
            return result;
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createAsync(createCustomerDto) {
        try {
            const result = this.customerRepository.create(createCustomerDto);
            return await this.customerRepository.save(result);
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateAsync(id, updateCustomerDto, user) {
        try {
            const result = await this.customerRepository.findOne({ where: { id } });
            if (!result)
                throw new common_2.NotFoundException('Customer Id ' + id + ' Not Found !');
            _(updateCustomerDto).forEach((val, key) => {
                if (val)
                    result[key] = val;
            });
            return this.customerRepository.save(result);
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async removeAsync(id, user) {
        const result = await this.customerRepository.restore({
            id,
            accountId: user.accountId,
        });
        if (result.affected > 0)
            return 'Deleted Customer Id ' + id + ' successfully !';
        throw new common_2.NotFoundException('Customer Id ' + id + ' Not Found !');
    }
    async restoreAsync(id, user) {
        const result = await this.customerRepository.restore({
            id,
            accountId: user.accountId,
        });
        if (result.affected > 0)
            return 'Restore Customer Id ' + id + ' successfully !';
        throw new common_2.NotFoundException('Customer Id ' + id + ' Not Found !');
    }
    async deleteAsync(id, user) {
        const result = await this.customerRepository.delete(id);
        if (result.affected > 0)
            return 'Deleted Customer Id ' + id + ' successfully !';
        throw new common_2.NotFoundException('Customer Id ' + id + ' Not Found !');
    }
};
CustomerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(core_1.Customer)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CustomerService);
exports.CustomerService = CustomerService;
//# sourceMappingURL=CustomerService.js.map