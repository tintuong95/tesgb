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
exports.RoomTypeService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const _ = require("lodash");
const RoomType_1 = require("../entities/RoomType");
const pagination_1 = require("../Utils/pagination");
let RoomTypeService = class RoomTypeService {
    constructor(roomTypesRepository) {
        this.roomTypesRepository = roomTypesRepository;
    }
    async findAllAsync(request, user) {
        try {
            const { skip, take, currentPage, perPage } = (0, pagination_1.queryHandler)(request.query);
            const { name = '', startDate = '', endDate = '', } = request.query;
            const result = this.roomTypesRepository
                .createQueryBuilder('roomTypes')
                .leftJoinAndSelect('roomTypes.price', 'prices', 'roomTypes.priceId=prices.id')
                .where(`roomTypes.deletedAt IS NULL`)
                .andWhere(`roomTypes.accountId = :accountId`, {
                accountId: `${user.accountId}`,
            })
                .orderBy('roomTypes.createdAt', 'DESC')
                .skip(skip)
                .take(take);
            name &&
                result.andWhere('roomTypes.name LIKE :name', {
                    name: `%${name}%`,
                });
            startDate &&
                result.andWhere('roomTypes.createdAt >= :startDate', {
                    startDate: new Date(startDate.toString()),
                });
            endDate &&
                result.andWhere('roomTypes.createdAt <= :endDate', {
                    endDate: new Date(endDate.toString()),
                });
            const count = await result.getCount();
            const roomTypes = await result.getMany();
            if (count == 0)
                return new common_2.HttpException('Not Found', common_1.HttpStatus.NOT_FOUND);
            return (0, pagination_1.pagination)(request, [roomTypes, count], currentPage, perPage);
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOneAsync(id, user) {
        try {
            const result = await this.roomTypesRepository.findOne({
                where: { id, accountId: user.accountId },
            });
            if (!result)
                throw new common_2.NotFoundException('RoomType Id ' + id + ' Not Found !');
            return result;
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createAsync(createRoomDto, user) {
        try {
            createRoomDto.accountId = user.accountId;
            const result = this.roomTypesRepository.create(createRoomDto);
            return await this.roomTypesRepository.save(result);
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateAsync(id, updateRoomTypeDto, user) {
        try {
            const result = await this.roomTypesRepository.findOne({ where: { id } });
            if (!result)
                throw new common_2.NotFoundException('RoomType Id ' + id + ' Not Found !');
            _(updateRoomTypeDto).forEach((val, key) => {
                if (val)
                    result[key] = val;
            });
            return this.roomTypesRepository.save(result);
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async removeAsync(id, user) {
        const result = await this.roomTypesRepository.softDelete({
            id,
            accountId: user.accountId,
        });
        if (result.affected > 0)
            return 'Deleted RoomType Id ' + id + ' successfully !';
        throw new common_2.NotFoundException('RoomType Id ' + id + ' Not Found !');
    }
    async restoreAsync(id, user) {
        const result = await this.roomTypesRepository.restore({
            id,
            accountId: user.accountId,
        });
        if (result.affected > 0)
            return 'Restore RoomType Id ' + id + ' successfully !';
        throw new common_2.NotFoundException('RoomType Id ' + id + ' Not Found !');
    }
    async deleteAsync(id, user) {
        const result = await this.roomTypesRepository.delete(id);
        if (result.affected > 0)
            return 'Deleted RoomType Id ' + id + ' successfully !';
        throw new common_2.NotFoundException('RoomType Id ' + id + ' Not Found !');
    }
};
RoomTypeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(RoomType_1.RoomType)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RoomTypeService);
exports.RoomTypeService = RoomTypeService;
//# sourceMappingURL=RoomTypeService.js.map