import {HttpStatus, Injectable} from '@nestjs/common';
import {NotFoundException, HttpException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Stock} from '../entities/core';
import {Repository} from 'typeorm';
import {CreateStockDto, UpdateStockDto} from '../Entities/Dto/core';
import * as _ from 'lodash';
import {PRODUCT_RELATION} from '@contants/relation';
import {findOptionWhere} from '@util/query';
import {pagination, queryHandler} from '@util/pagination';
import {Request} from 'express';
import {IStockService} from './Interfaces/IStockService';
import {UserDto} from 'Shared/user.dto';

@Injectable()
export class StockService implements IStockService {
	constructor(
		@InjectRepository(Stock)
		private stockRepository: Repository<Stock>
	) {}

	async findAllAsync(request: Request, user: UserDto): Promise<any> {
		try {
			const {skip, take, currentPage, perPage} = queryHandler(request.query);

			const {
				name = '',
				unitId = '',

				startDate = '',
				endDate = '',
			} = request.query;
			const result = this.stockRepository
				.createQueryBuilder('stocks')
				.leftJoinAndSelect(
					'stocks.product',
					'products',
					'stocks.productId = products.id'
				)
				.leftJoinAndSelect(
					'products.unit',
					'units',
					'products.unitId = units.id'
				)
				.where(`stocks.deletedAt IS NULL`)
				.andWhere(`stocks.accountId = :accountId`, {
					accountId: `${user.accountId}`,
				})
				.orderBy('stocks.createdAt', 'DESC')
				.skip(skip)
				.take(take);
			unitId &&
				result.andWhere('products.unitId = :unitId', {
					unitId: `${unitId}`,
				});
			name &&
				result.andWhere('products.name LIKE :name', {
					name: `%${name}%`,
				});
			startDate &&
				result.andWhere('products.createdAt >= :startDate', {
					startDate: new Date(startDate.toString()),
				});
			endDate &&
				result.andWhere('products.createdAt <= :endDate', {
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

	async findOneAsync(id: string, user: UserDto): Promise<Stock | any> {
		try {
			const result = this.stockRepository
				.createQueryBuilder('stocks')
				.leftJoinAndSelect(
					'stocks.product',
					'products',
					'stocks.productId = products.id'
				)
				.leftJoinAndSelect(
					'products.unit',
					'units',
					'products.unitId = units.id'
				)
				.where(`stocks.deletedAt IS NULL`)
				.andWhere(`stocks.accountId = :accountId`, {
					accountId: `${user.accountId}`,
				})
				.andWhere(`stocks.id = :id`, {
					id: `${id}`,
				})
				.getOne();
			if (!result)
				throw new NotFoundException('Stock Id ' + id + ' Not Found !');
			return result;
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async createAsync(
		createStockDto: CreateStockDto,
		user: UserDto
	): Promise<Stock> {
		try {
			const newStock = {...createStockDto, accountId: user.accountId};
			const result = this.stockRepository.create(newStock);
			return await this.stockRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async updateAsync(
		id: string,
		updateStockDto: UpdateStockDto,
		user: UserDto
	): Promise<Stock> {
		try {
			const result = await this.stockRepository.findOne({where: {id}});
			if (!result)
				throw new NotFoundException('Stock Id ' + id + ' Not Found !');

			_(updateStockDto).forEach((val, key) => {
				if (val) result[key] = val;
			});
			return this.stockRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async removeAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.stockRepository.softDelete({
			id,
			accountId: user.accountId,
		});
		if (result.affected > 0)
			return 'Deleted Stock Id ' + id + ' successfully !';
		throw new NotFoundException('Stock Id ' + id + ' Not Found !');
	}

	async restoreAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.stockRepository.restore({
			id,
			accountId: user.accountId,
		});
		if (result.affected > 0)
			return 'Restore Stock Id ' + id + ' successfully !';
		throw new NotFoundException('Stock Id ' + id + ' Not Found !');
	}

	async deleteAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.stockRepository.delete(id);
		if (result.affected > 0)
			return 'Deleted Stock Id ' + id + ' successfully !';
		throw new NotFoundException('Stock Id ' + id + ' Not Found !');
	}
}
