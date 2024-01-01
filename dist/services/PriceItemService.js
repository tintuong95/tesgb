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
exports.PriceItemService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("../entities/core");
const typeorm_2 = require("typeorm");
const _ = require("lodash");
const pagination_1 = require("../Utils/pagination");
const query_1 = require("../Utils/query");
let PriceItemService = class PriceItemService {
    constructor(priceItemRepository) {
        this.priceItemRepository = priceItemRepository;
    }
    async findAllAsync(request, user) {
        try {
            const { skip, take, currentPage, perPage } = (0, pagination_1.queryHandler)(request.query);
            const newQuery = (0, query_1.findOptionWhere)(request.query, ['name']);
            console.log(request.query);
            const result = await this.priceItemRepository.findAndCount({
                where: Object.assign(Object.assign({}, newQuery), { accountId: user.accountId }),
                withDeleted: false,
                order: {
                    createdAt: { direction: 'desc' },
                },
                take,
                skip,
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
            const result = await this.priceItemRepository.findOne({
                where: { id, accountId: user.accountId },
            });
            if (!result)
                throw new common_2.NotFoundException('PriceItem Id ' + id + ' Not Found !');
            return result;
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createAsync(createPriceItemDto) {
        try {
            const result = this.priceItemRepository.create(createPriceItemDto);
            return await this.priceItemRepository.save(result);
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateAsync(priceId, type, updatePriceItemDto) {
        try {
            const result = await this.priceItemRepository.findOne({
                where: { priceId, type },
            });
            if (!result)
                throw new common_2.NotFoundException('PriceItem priceId ' + priceId + ' Not Found !');
            _(updatePriceItemDto).forEach((val, key) => {
                if (val)
                    result[key] = val;
            });
            return this.priceItemRepository.save(result);
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async removeAsync(id, user) {
        const result = await this.priceItemRepository.restore({
            id,
            accountId: user.accountId,
        });
        if (result.affected > 0)
            return 'Deleted PriceItem Id ' + id + ' successfully !';
        throw new common_2.NotFoundException('PriceItem Id ' + id + ' Not Found !');
    }
    async restoreAsync(id, user) {
        const result = await this.priceItemRepository.restore({
            id,
            accountId: user.accountId,
        });
        if (result.affected > 0)
            return 'Restore PriceItem Id ' + id + ' successfully !';
        throw new common_2.NotFoundException('PriceItem Id ' + id + ' Not Found !');
    }
    async deleteAsync(id, user) {
        const result = await this.priceItemRepository.delete(id);
        if (result.affected > 0)
            return 'Deleted PriceItem Id ' + id + ' successfully !';
        throw new common_2.NotFoundException('PriceItem Id ' + id + ' Not Found !');
    }
};
PriceItemService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(core_1.PriceItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PriceItemService);
exports.PriceItemService = PriceItemService;
//# sourceMappingURL=PriceItemService.js.map