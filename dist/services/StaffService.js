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
exports.StaffService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("../entities/core");
const typeorm_2 = require("typeorm");
const _ = require("lodash");
const pagination_1 = require("../Utils/pagination");
let StaffService = class StaffService {
    constructor(staffRepository) {
        this.staffRepository = staffRepository;
    }
    async findAllAsync(request, user) {
        try {
            const { skip, take, currentPage, perPage } = (0, pagination_1.queryHandler)(request.query);
            const { id = '', status = '', startDate = '', endDate = '', } = request.query;
            const result = this.staffRepository
                .createQueryBuilder('staffs')
                .where(`staffs.deletedAt IS NULL`)
                .andWhere(`staffs.accountId = :accountId`, {
                accountId: `${user.accountId}`,
            })
                .orderBy('staffs.createdAt', 'DESC')
                .skip(skip)
                .take(take);
            const count = await result.getCount();
            const staffs = await result.getMany();
            if (count == 0)
                return new common_2.HttpException('Not Found', common_1.HttpStatus.NOT_FOUND);
            return (0, pagination_1.pagination)(request, [staffs, count], currentPage, perPage);
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOneAsync(id, user) {
        try {
            const result = await this.staffRepository.findOne({
                where: { id, accountId: user.accountId },
            });
            if (!result)
                throw new common_2.NotFoundException('Staff Id ' + id + ' Not Found !');
            return result;
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createAsync(createStaffDto, user) {
        try {
            const result = this.staffRepository.create(createStaffDto);
            return await this.staffRepository.save(result);
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateAsync(id, updateStaffDto, user) {
        try {
            const result = await this.staffRepository.findOne({ where: { id } });
            if (!result)
                throw new common_2.NotFoundException('Staff Id ' + id + ' Not Found !');
            _(updateStaffDto).forEach((val, key) => {
                if (val)
                    result[key] = val;
            });
            return this.staffRepository.save(result);
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async removeAsync(id, user) {
        const result = await this.staffRepository.restore({
            id,
            accountId: user.accountId,
        });
        if (result.affected > 0)
            return 'Deleted Staff Id ' + id + ' successfully !';
        throw new common_2.NotFoundException('Staff Id ' + id + ' Not Found !');
    }
    async restoreAsync(id, user) {
        const result = await this.staffRepository.restore({
            id,
            accountId: user.accountId,
        });
        if (result.affected > 0)
            return 'Restore Staff Id ' + id + ' successfully !';
        throw new common_2.NotFoundException('Staff Id ' + id + ' Not Found !');
    }
    async deleteAsync(id, user) {
        const result = await this.staffRepository.delete(id);
        if (result.affected > 0)
            return 'Deleted Staff Id ' + id + ' successfully !';
        throw new common_2.NotFoundException('Staff Id ' + id + ' Not Found !');
    }
};
StaffService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(core_1.Staff)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StaffService);
exports.StaffService = StaffService;
//# sourceMappingURL=StaffService.js.map