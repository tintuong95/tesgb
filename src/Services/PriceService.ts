import {HttpStatus, Injectable} from '@nestjs/common';
import {NotFoundException, HttpException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Price} from '../entities/core';
import {Repository} from 'typeorm';
import {CreatePriceDto, UpdatePriceDto} from '../Entities/Dto/core';
import * as _ from 'lodash';
import {queryHandler, pagination} from '@util/pagination';
import {findOptionWhere} from '@util/query';
import {Request} from 'express';
import {IPriceService} from './Interfaces/IPriceService';
import {UserDto} from 'Shared/user.dto';
@Injectable()
export class PriceService implements IPriceService {
	constructor(
		@InjectRepository(Price)
		private priceRepository: Repository<Price>
	) {}

	async findAllAsync(request: Request, user: UserDto): Promise<any> {
		try {
			const {skip, take, currentPage, perPage} = queryHandler(request.query);

			const {
				name = '',
				status = '',

				startDate = '',
				endDate = '',
			} = request.query;
			const result = this.priceRepository
				.createQueryBuilder('prices')
				.leftJoinAndSelect(
					'prices.priceItem',
					'priceItems',
					'prices.id = priceItems.priceId'
				)

				.where(`prices.deletedAt IS NULL`)
				.andWhere(`prices.accountId = :accountId`, {
					accountId: `${user.accountId}`,
				})
				.orderBy('prices.createdAt', 'DESC')
				.skip(skip)
				.take(take);
			status &&
				result.andWhere('prices.status = :status', {
					status: `${status}`,
				});
			name &&
				result.andWhere('prices.name LIKE :name', {
					name: `%${name}%`,
				});
			startDate &&
				result.andWhere('prices.createdAt >= :startDate', {
					startDate: new Date(startDate.toString()),
				});
			endDate &&
				result.andWhere('prices.createdAt <= :endDate', {
					endDate: new Date(endDate.toString()),
				});

			const count = await result.getCount();
			const prices = await result.getMany();

			if (count == 0)
				return new HttpException('Not Found', HttpStatus.NOT_FOUND);
			return pagination(request, [prices, count], currentPage, perPage);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async findOneAsync(id: string, user: UserDto): Promise<Price | any> {
		try {
			const result = this.priceRepository
				.createQueryBuilder('prices')
				.leftJoinAndSelect(
					'prices.priceItem',
					'priceItems',
					'prices.id = priceItems.priceId'
				)

				.where(`prices.deletedAt IS NULL`)
				.andWhere('prices.id <= :id', {
					id: id,
				});

			if (!result)
				throw new NotFoundException('Price Id ' + id + ' Not Found !');
			return result.getOne();
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async createAsync(
		createPriceDto: CreatePriceDto,
		user: UserDto
	): Promise<Price> {
		try {
			createPriceDto.accountId = user.accountId;
			createPriceDto.status = 1;
			const result = this.priceRepository.create(createPriceDto);
			return await this.priceRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async updateAsync(
		id: string,
		updatePriceDto: UpdatePriceDto,
		user: UserDto
	): Promise<Price> {
		try {
			const result = await this.priceRepository.findOne({where: {id}});
			if (!result)
				throw new NotFoundException('Price Id ' + id + ' Not Found !');

			_(updatePriceDto).forEach((val, key) => {
				if (val) result[key] = val;
			});
			return this.priceRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async removeAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.priceRepository.softDelete({
			id,
			accountId: user.accountId,
		});
		if (result.affected > 0)
			return 'Deleted Price Id ' + id + ' successfully !';
		throw new NotFoundException('Price Id ' + id + ' Not Found !');
	}

	async restoreAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.priceRepository.restore({
			id,
			accountId: user.accountId,
		});
		if (result.affected > 0)
			return 'Restore Price Id ' + id + ' successfully !';
		throw new NotFoundException('Price Id ' + id + ' Not Found !');
	}

	async deleteAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.priceRepository.delete(id);
		if (result.affected > 0)
			return 'Deleted Price Id ' + id + ' successfully !';
		throw new NotFoundException('Price Id ' + id + ' Not Found !');
	}
}
