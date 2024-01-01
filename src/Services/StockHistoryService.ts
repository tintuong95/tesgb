import {HttpStatus, Injectable} from '@nestjs/common';
import {NotFoundException, HttpException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Stock, StockHistory} from '../entities/core';
import {Repository} from 'typeorm';
import {
	CreateStockHistoryDto,
	UpdateStockHistoryDto,
} from '../Entities/Dto/core';
import * as _ from 'lodash';
import {
	MEMBER_RELATION,
	STOCK_PRODUCT_RELATION,
	STOCK_RELATION,
} from '@contants/relation';
import {queryHandler, pagination} from '@util/pagination';
import {Request} from 'express';
import {findOptionWhere} from '@util/query';
import {UserDto} from 'Shared/user.dto';
import {
	classToPlain,
	instanceToPlain,
	plainToInstance,
} from 'class-transformer';
import moment from 'moment';
import {StockHistoryType} from '@entities/Types/StockHistoryType';

@Injectable()
export class StockHistoryService {
	constructor(
		@InjectRepository(StockHistory)
		private stockHistoryRepository: Repository<StockHistory>
	) {}

	async findAllAsync(request: Request, user: UserDto): Promise<any> {
		try {
			const {skip, take, currentPage, perPage} = queryHandler(request.query);
			// const newQuery = findOptionWhere(request.query, []);

			// const result = await this.stockHistoryRepository.findAndCount({
			// 	where: {...newQuery, accountId: user.accountId},
			// 	withDeleted: false,
			// 	order: {
			// 		createdAt: {direction: 'desc'},
			// 	},
			// 	take,
			// 	skip,
			// 	relations: [STOCK_PRODUCT_RELATION, MEMBER_RELATION],
			// });
			// if (result[1] == 0)
			// 	return new HttpException('Not Found', HttpStatus.NOT_FOUND);
			const {
				name = '',
				unitId = '',
				type = '',
				startDate = '',
				endDate = '',
			} = request.query;
			const result = this.stockHistoryRepository
				.createQueryBuilder('stockhistorys')
				.leftJoinAndSelect(
					'stockhistorys.stock',
					'stocks',
					'stockhistorys.stockId=stocks.id'
				)
				.leftJoinAndSelect(
					'stockhistorys.member',
					'members',
					'stockhistorys.memberId=members.id'
				)
				.leftJoinAndSelect(
					'stocks.product',
					'products',
					'stocks.productId=products.id'
				)
				.leftJoinAndSelect(
					'products.unit',
					'units',
					'products.unitId = units.id'
				)

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
				return new HttpException('Not Found', HttpStatus.NOT_FOUND);
			return pagination(request, [stocks, count], currentPage, perPage);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async findOneAsync(id: string, user: UserDto): Promise<StockHistory | any> {
		try {
			const result = await this.stockHistoryRepository
				.createQueryBuilder('stockhistorys')
				.leftJoinAndSelect(
					'stockhistorys.stock',
					'stocks',
					'stockhistorys.stockId=stocks.id'
				)
				.leftJoinAndSelect(
					'stocks.product',
					'products',
					'stocks.productId=products.id'
				)
				.leftJoinAndSelect(
					'stockhistorys.member',
					'members',
					'stockhistorys.memberId=members.id'
				)
				.where(`stockhistorys.accountId = :accountId`, {
					accountId: `${user.accountId}`,
				})
				.andWhere(`stockhistorys.id = :id`, {
					id: `${id}`,
				})
				.andWhere(`stockhistorys.deletedAt IS NULL`)
				.getOne();
			if (!result)
				throw new NotFoundException('StockHistory Id ' + id + ' Not Found !');
			return result;
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async createAsync(
		createStockHistoryDto: CreateStockHistoryDto,
		user: UserDto
	): Promise<StockHistory> {
		try {
			createStockHistoryDto.accountId = user.accountId;
			createStockHistoryDto.memberId = user.id;
			const result = this.stockHistoryRepository.create(createStockHistoryDto);
			return await this.stockHistoryRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async updateAsync(
		id: string,
		updateStockHistoryDto: UpdateStockHistoryDto,
		user: UserDto
	): Promise<StockHistory> {
		try {
			const result = await this.stockHistoryRepository.findOne({
				where: {id, accountId: user.accountId},
			});
			if (!result)
				throw new NotFoundException('StockHistory Id ' + id + ' Not Found !');

			_(updateStockHistoryDto).forEach((val, key) => {
				if (val) result[key] = val;
			});
			return this.stockHistoryRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async removeAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.stockHistoryRepository.softDelete({
			id,
			accountId: user.accountId,
		});
		if (result.affected > 0)
			return 'Deleted StockHistory Id ' + id + ' successfully !';
		throw new NotFoundException('StockHistory Id ' + id + ' Not Found !');
	}

	async restoreAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.stockHistoryRepository.restore({
			id,
			accountId: user.accountId,
		});
		if (result.affected > 0)
			return 'Restore StockHistory Id ' + id + ' successfully !';
		throw new NotFoundException('StockHistory Id ' + id + ' Not Found !');
	}

	async deleteAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.stockHistoryRepository.delete(id);
		if (result.affected > 0)
			return 'Deleted StockHistory Id ' + id + ' successfully !';
		throw new NotFoundException('StockHistory Id ' + id + ' Not Found !');
	}

	async getStockExportImportTotal(
		stockId: string,

		user: UserDto
	): Promise<any> {
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
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
