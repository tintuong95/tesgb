import {HttpStatus, Injectable} from '@nestjs/common';
import {NotFoundException, HttpException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {PriceItem} from '../entities/core';
import {Repository} from 'typeorm';
import {CreatePriceItemDto, UpdatePriceItemDto} from '../Entities/Dto/core';
import * as _ from 'lodash';
import {queryHandler, pagination} from '@util/pagination';
import {findOptionWhere} from '@util/query';
import {Request} from 'express';
import {IPriceItemService} from './Interfaces/IPriceItemService';
import {UserDto} from 'Shared/user.dto';
import {PriceItemType} from '@entities/Types/PriceItem';
@Injectable()
export class PriceItemService implements IPriceItemService {
	constructor(
		@InjectRepository(PriceItem)
		private priceItemRepository: Repository<PriceItem>
	) {}

	async findAllAsync(request: Request, user: UserDto): Promise<any> {
		try {
			const {skip, take, currentPage, perPage} = queryHandler(request.query);

			const newQuery = findOptionWhere(request.query, ['name']);
			console.log(request.query);
			const result = await this.priceItemRepository.findAndCount({
				where: {...newQuery, accountId: user.accountId},
				withDeleted: false,
				order: {
					createdAt: {direction: 'desc'},
				},
				take,
				skip,
			});
			if (result[1] == 0)
				return new HttpException('Not Found', HttpStatus.NOT_FOUND);

			return pagination(request, result, currentPage, perPage);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async findOneAsync(id: string, user: UserDto): Promise<PriceItem | any> {
		try {
			const result = await this.priceItemRepository.findOne({
				where: {id, accountId: user.accountId},
			});
			if (!result)
				throw new NotFoundException('PriceItem Id ' + id + ' Not Found !');
			return result;
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async createAsync(
		createPriceItemDto: CreatePriceItemDto[]
	): Promise<PriceItem[]> {
		try {
			const result = this.priceItemRepository.create(createPriceItemDto);
			return await this.priceItemRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async updateAsync(
		priceId: string,
		type: PriceItemType,
		updatePriceItemDto: UpdatePriceItemDto
	): Promise<PriceItem> {
		try {
			const result = await this.priceItemRepository.findOne({
				where: {priceId, type},
			});
			if (!result)
				throw new NotFoundException(
					'PriceItem priceId ' + priceId + ' Not Found !'
				);

			_(updatePriceItemDto).forEach((val, key) => {
				if (val) result[key] = val;
			});
			return this.priceItemRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async removeAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.priceItemRepository.restore({
			id,
			accountId: user.accountId,
		});
		if (result.affected > 0)
			return 'Deleted PriceItem Id ' + id + ' successfully !';
		throw new NotFoundException('PriceItem Id ' + id + ' Not Found !');
	}

	async restoreAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.priceItemRepository.restore({
			id,
			accountId: user.accountId,
		});
		if (result.affected > 0)
			return 'Restore PriceItem Id ' + id + ' successfully !';
		throw new NotFoundException('PriceItem Id ' + id + ' Not Found !');
	}

	async deleteAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.priceItemRepository.delete(id);
		if (result.affected > 0)
			return 'Deleted PriceItem Id ' + id + ' successfully !';
		throw new NotFoundException('PriceItem Id ' + id + ' Not Found !');
	}
}
