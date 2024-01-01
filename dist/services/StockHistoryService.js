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
exports.StockHistoryService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("../entities/core");
const typeorm_2 = require("typeorm");
const _ = require("lodash");
const pagination_1 = require("../Utils/pagination");
let StockHistoryService = class StockHistoryService {
    constructor(stockHistoryRepository) {
        this.stockHistoryRepository = stockHistoryRepository;
    }
    async findAllAsync(request, user) {
        try {
            const { skip, take, currentPage, perPage } = (0, pagination_1.queryHandler)(request.query);
            const { name = '', unitId = '', type = '', startDate = '', endDate = '', } = request.query;
            const result = this.stockHistoryRepository
                .createQueryBuilder('stockhistorys')
                .leftJoinAndSelect('stockhistorys.stock', 'stocks', 'stockhistorys.stockId=stocks.id')
                .leftJoinAndSelect('stockhistorys.member', 'members', 'stockhistorys.memberId=members.id')
                .leftJoinAndSelect('stocks.product', 'products', 'stocks.productId=products.id')
                .leftJoinAndSelect('products.unit', 'units', 'products.unitId = units.id')
                .where(`stockhistorys.accountId = :accountId`, {
                accountId: `${user.accountId}`,
            })
                .andWhere(`stockhistorys.deletedAt IS NULL`)
                .orderBy('stockhistorys.createdAt', 'DESC')
                .skip(skip)
                .take(take);
            type &&
                result.andWhere('stockhistorys.type = :type', {
                    type: `${type}`,
                });
            unitId &&
                result.andWhere('products.unitId = :unitId', {
                    unitId: `${unitId}`,
                });
            name &&
                result.andWhere('products.name LIKE :name', {
                    name: `%${name}%`,
                });
            startDate &&
                result.andWhere('stockhistorys.createdAt >= :startDate', {
                    startDate: new Date(startDate.toString()),
                });
            endDate &&
                result.andWhere('stockhistorys.createdAt <= :endDate', {
                    endDate: new Date(endDate.toString()),
                });
            const count = await result.getCount();
            const stocks = await result.getMany();
            if (count == 0)
                return new common_2.HttpException('Not Found', common_1.HttpStatus.NOT_FOUND);
            return (0, pagination_1.pagination)(request, [stocks, count], currentPage, perPage);
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOneAsync(id, user) {
        try {
            const result = await this.stockHistoryRepository
                .createQueryBuilder('stockhistorys')
                .leftJoinAndSelect('stockhistorys.stock', 'stocks', 'stockhistorys.stockId=stocks.id')
                .leftJoinAndSelect('stocks.product', 'products', 'stocks.productId=products.id')
                .leftJoinAndSelect('stockhistorys.member', 'members', 'stockhistorys.memberId=members.id')
                .where(`stockhistorys.accountId = :accountId`, {
                accountId: `${user.accountId}`,
            })
                .andWhere(`stockhistorys.id = :id`, {
                id: `${id}`,
            })
                .andWhere(`stockhistorys.deletedAt IS NULL`)
                .getOne();
            if (!result)
                throw new common_2.NotFoundException('StockHistory Id ' + id + ' Not Found !');
            return result;
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createAsync(createStockHistoryDto, user) {
        try {
            createStockHistoryDto.accountId = user.accountId;
            createStockHistoryDto.memberId = user.id;
            const result = this.stockHistoryRepository.create(createStockHistoryDto);
            return await this.stockHistoryRepository.save(result);
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateAsync(id, updateStockHistoryDto, user) {
        try {
            const result = await this.stockHistoryRepository.findOne({
                where: { id, accountId: user.accountId },
            });
            if (!result)
                throw new common_2.NotFoundException('StockHistory Id ' + id + ' Not Found !');
            _(updateStockHistoryDto).forEach((val, key) => {
                if (val)
                    result[key] = val;
            });
            return this.stockHistoryRepository.save(result);
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async removeAsync(id, user) {
        const result = await this.stockHistoryRepository.softDelete({
            id,
            accountId: user.accountId,
        });
        if (result.affected > 0)
            return 'Deleted StockHistory Id ' + id + ' successfully !';
        throw new common_2.NotFoundException('StockHistory Id ' + id + ' Not Found !');
    }
    async restoreAsync(id, user) {
        const result = await this.stockHistoryRepository.restore({
            id,
            accountId: user.accountId,
        });
        if (result.affected > 0)
            return 'Restore StockHistory Id ' + id + ' successfully !';
        throw new common_2.NotFoundException('StockHistory Id ' + id + ' Not Found !');
    }
    async deleteAsync(id, user) {
        const result = await this.stockHistoryRepository.delete(id);
        if (result.affected > 0)
            return 'Deleted StockHistory Id ' + id + ' successfully !';
        throw new common_2.NotFoundException('StockHistory Id ' + id + ' Not Found !');
    }
    async getStockExportImportTotal(stockId, user) {
        try {
            const exportTotal = await this.stockHistoryRepository
                .createQueryBuilder('stockhistorys')
                .where(`stockhistorys.accountId = :accountId`, {
                accountId: `${user.accountId}`,
            })
                .andWhere(`stockhistorys.stockId = :stockId`, {
                stockId: `${stockId}`,
            })
                .andWhere(`stockhistorys.deletedAt IS NULL`)
                .select('SUM(stockhistorys.quantity)', 'sum')
                .groupBy('stockhistorys.type')
                .getRawMany();
            return exportTotal;
        }
        catch (err) {
            console.log(err);
            throw new common_2.HttpException(err.sqlMessage, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
StockHistoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(core_1.StockHistory)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StockHistoryService);
exports.StockHistoryService = StockHistoryService;
//# sourceMappingURL=StockHistoryService.js.map