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
exports.UnitService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const _ = require("lodash");
const typeorm_2 = require("typeorm");
const core_1 = require("../entities/core");
let UnitService = class UnitService {
    constructor(unitRepository) {
        this.unitRepository = unitRepository;
    }
    async findAllAsync(request, user) {
        try {
            const { type } = request.query;
            const result = await this.unitRepository
                .createQueryBuilder('units')
                .where(`units.deletedAt IS NULL`)
                .andWhere(`units.type = :type`, {
                type: `${type}`,
            })
                .getMany();
            if (!result)
                return new common_1.HttpException('Not Found', common_1.HttpStatus.NOT_FOUND);
            else
                return result;
        }
        catch (err) {
            console.log(err);
            throw new common_1.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOneAsync(id, user) {
        try {
            const result = await this.unitRepository.findOne({
                where: { id: id },
            });
            if (!result)
                return new common_1.HttpException('Not Found', common_1.HttpStatus.NOT_FOUND);
            else
                return result;
        }
        catch (err) {
            console.log(err);
            throw new common_1.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createAsync(createUnitDto, user) {
        try {
            const result = this.unitRepository.create(createUnitDto);
            return await this.unitRepository.save(result);
        }
        catch (err) {
            console.log(err);
            throw new common_1.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateAsync(id, updateUnitDto, user) {
        try {
            const result = await this.unitRepository.findOne({
                where: { id },
            });
            if (!result)
                throw new common_1.NotFoundException('Unit Id ' + id + ' Not Found !');
            _(updateUnitDto).forEach((val, key) => {
                if (val)
                    result[key] = val;
            });
            return this.unitRepository.save(result);
        }
        catch (err) {
            console.log(err);
            throw new common_1.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async removeAsync(id, user) {
        const result = await this.unitRepository.softDelete({
            id,
        });
        if (result.affected > 0)
            return 'Deleted Unit Id ' + id + ' successfully !';
        throw new common_1.NotFoundException('Unit Id ' + id + ' Not Found !');
    }
    async removeListAsync(ids, user) {
        const rs = await this.unitRepository.find({ where: { id: (0, typeorm_2.In)(ids) } });
        const reDelete = await this.unitRepository.softDelete(rs.map((i) => i.id));
        if (reDelete.affected > 0)
            return 'Deleted Unit successfully !';
        throw new common_1.NotFoundException('Unit Ids Not Found !');
    }
    async restoreAsync(id, user) {
        const result = await this.unitRepository.restore({
            id,
        });
        if (result.affected > 0)
            return 'Restore Unit Id ' + id + ' successfully !';
        throw new common_1.NotFoundException('Unit Id ' + id + ' Not Found !');
    }
    async deleteAsync(id, user) {
        const result = await this.unitRepository.delete(id);
        if (result.affected > 0)
            return 'Deleted Unit Id ' + id + ' successfully !';
        throw new common_1.NotFoundException('Unit Id ' + id + ' Not Found !');
    }
};
UnitService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(core_1.Unit)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UnitService);
exports.UnitService = UnitService;
//# sourceMappingURL=UnitService.js.map