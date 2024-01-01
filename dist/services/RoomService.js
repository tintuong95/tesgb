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
exports.RoomService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("../entities/core");
const typeorm_2 = require("typeorm");
const _ = require("lodash");
const pagination_1 = require("../Utils/pagination");
let RoomService = class RoomService {
    constructor(roomRepository) {
        this.roomRepository = roomRepository;
    }
    async findAllAsync(request, user) {
        try {
            const { skip, take, currentPage, perPage } = (0, pagination_1.queryHandler)(request.query);
            const { name = '', roomTypeId = '', floorId = '' } = request.query;
            const result = this.roomRepository
                .createQueryBuilder('rooms')
                .leftJoinAndSelect('rooms.roomType', 'roomTypes', 'rooms.roomTypeId = roomTypes.id')
                .leftJoinAndSelect('rooms.floor', 'floors', 'rooms.floorId = floors.id')
                .leftJoinAndSelect('roomTypes.price', 'prices', 'roomTypes.priceId = prices.id')
                .leftJoinAndSelect('prices.priceItem', 'priceItems', 'prices.id = priceItems.priceId')
                .where(`rooms.deletedAt IS NULL`)
                .andWhere(`rooms.accountId = :accountId`, {
                accountId: `${user.accountId}`,
            })
                .orderBy('rooms.createdAt', 'DESC')
                .skip(skip)
                .take(take);
            name &&
                result.andWhere('rooms.name LIKE :name', {
                    name: `%${name}%`,
                });
            floorId &&
                result.andWhere('rooms.floorId = :floorId', {
                    floorId: `${floorId}`,
                });
            roomTypeId &&
                result.andWhere('rooms.roomTypeId = :roomTypeId', {
                    roomTypeId: `${roomTypeId}`,
                });
            const count = await result.getCount();
            const rooms = await result.getMany();
            if (count == 0)
                return new common_2.HttpException('Not Found', common_1.HttpStatus.NOT_FOUND);
            return { rooms, count, currentPage, perPage };
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findPriceRoomAllAsync(idList, user) {
        try {
            const result = this.roomRepository
                .createQueryBuilder('rooms')
                .leftJoinAndSelect('rooms.roomType', 'roomTypes', 'rooms.roomTypeId = roomTypes.id')
                .leftJoinAndSelect('roomTypes.price', 'prices', 'roomTypes.priceId = prices.id')
                .leftJoinAndSelect('prices.priceItem', 'priceItems', 'prices.id = priceItems.priceId')
                .where(`rooms.deletedAt IS NULL`)
                .andWhere(`rooms.accountId = :accountId`, {
                accountId: `${user.accountId}`,
            })
                .andWhere('rooms.id IN (:...idList)', { idList })
                .orderBy('rooms.createdAt', 'DESC');
            const count = await result.getCount();
            const rooms = await result.getMany();
            return rooms;
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOneAsync(id, user) {
        try {
            const result = await this.roomRepository
                .createQueryBuilder('rooms')
                .leftJoinAndSelect('rooms.roomType', 'roomTypes', 'rooms.roomTypeId = roomTypes.id')
                .leftJoinAndSelect('roomTypes.price', 'prices', 'roomTypes.priceId = prices.id')
                .leftJoinAndSelect('prices.priceItem', 'priceItems', 'prices.id = priceItems.priceId')
                .where(`rooms.deletedAt IS NULL`)
                .andWhere(`rooms.id = :id`, {
                id: `${id}`,
            })
                .andWhere(`rooms.accountId = :accountId`, {
                accountId: `${user.accountId}`,
            })
                .getOne();
            if (!result)
                throw new common_2.NotFoundException('Room Id ' + id + ' Not Found !');
            return result;
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createAsync(createRoomDto, user) {
        try {
            const newRoomList = _(createRoomDto)
                .map((item) => (Object.assign(Object.assign({}, item), { accountId: user.accountId })))
                .value();
            const result = this.roomRepository.create(newRoomList);
            return await this.roomRepository.save(result);
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateAsync(id, updateRoomDto, user) {
        try {
            const result = await this.roomRepository.findOne({ where: { id } });
            if (!result)
                throw new common_2.NotFoundException('Room Id ' + id + ' Not Found !');
            _(updateRoomDto).forEach((val, key) => {
                if (val)
                    result[key] = val;
            });
            return this.roomRepository.save(result);
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateStatusAsync(idList, status) {
        try {
            const updateData = {
                status: status,
            };
            const result = await this.roomRepository
                .createQueryBuilder()
                .update(core_1.Room)
                .set(updateData)
                .whereInIds(idList)
                .execute();
            return result;
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async removeAsync(id, user) {
        const result = await this.roomRepository.restore({
            id,
            accountId: user.accountId,
        });
        if (result.affected > 0)
            return 'Deleted Room Id ' + id + ' successfully !';
        throw new common_2.NotFoundException('Room Id ' + id + ' Not Found !');
    }
    async restoreAsync(id, user) {
        const result = await this.roomRepository.restore({
            id,
            accountId: user.accountId,
        });
        if (result.affected > 0)
            return 'Restore Room Id ' + id + ' successfully !';
        throw new common_2.NotFoundException('Room Id ' + id + ' Not Found !');
    }
    async deleteAsync(id, user) {
        const result = await this.roomRepository.delete(id);
        if (result.affected > 0)
            return 'Deleted Room Id ' + id + ' successfully !';
        throw new common_2.NotFoundException('Room Id ' + id + ' Not Found !');
    }
    async countRoomStatusAsync(user) {
        const result = await this.roomRepository.findAndCount({
            where: { accountId: user.accountId },
        });
        const counts = _.countBy(result[0], 'status');
        return counts;
    }
};
RoomService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(core_1.Room)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RoomService);
exports.RoomService = RoomService;
//# sourceMappingURL=RoomService.js.map