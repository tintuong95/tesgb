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
exports.FloorService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("../entities/core");
const typeorm_2 = require("typeorm");
const _ = require("lodash");
let FloorService = class FloorService {
    constructor(floorRepository) {
        this.floorRepository = floorRepository;
    }
    async findAllAsync(request, user) {
        try {
            const result = await this.floorRepository.find({
                where: { accountId: user.accountId },
            });
            if (result.length == 0)
                throw new common_2.HttpException('Not Found', common_1.HttpStatus.NOT_FOUND);
            return result;
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOneAsync(id, user) {
        try {
            const result = await this.floorRepository.findOne({
                where: { id, accountId: user.accountId },
            });
            if (!result)
                throw new common_2.NotFoundException('Floor Id ' + id + ' Not Found !');
            return result;
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createAsync(createFloorDto, user) {
        try {
            const newFloorDto = Object.assign(Object.assign({}, createFloorDto), { accountId: user.accountId });
            const result = this.floorRepository.create(newFloorDto);
            return await this.floorRepository.save(result);
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateAsync(id, updateFloorDto, user) {
        try {
            const result = await this.floorRepository.findOne({ where: { id } });
            if (!result)
                throw new common_2.NotFoundException('Floor Id ' + id + ' Not Found !');
            _(updateFloorDto).forEach((val, key) => {
                if (val)
                    result[key] = val;
            });
            return this.floorRepository.save(result);
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async removeAsync(id, user) {
        const result = await this.floorRepository.softDelete({
            id,
            accountId: user.accountId,
        });
        if (result.affected > 0)
            return 'Deleted Floor Id ' + id + ' successfully !';
        throw new common_2.NotFoundException('Floor Id ' + id + ' Not Found !');
    }
    async restoreAsync(id, user) {
        const result = await this.floorRepository.restore({
            id,
            accountId: user.accountId,
        });
        if (result.affected > 0)
            return 'Restore Floor Id ' + id + ' successfully !';
        throw new common_2.NotFoundException('Floor Id ' + id + ' Not Found !');
    }
    async deleteAsync(id, user) {
        const result = await this.floorRepository.delete(id);
        if (result.affected > 0)
            return 'Deleted Floor Id ' + id + ' successfully !';
        throw new common_2.NotFoundException('Floor Id ' + id + ' Not Found !');
    }
};
FloorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(core_1.Floor)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FloorService);
exports.FloorService = FloorService;
//# sourceMappingURL=FloorService.js.map