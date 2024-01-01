import {HttpStatus, Injectable} from '@nestjs/common';
import {NotFoundException, HttpException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {ServiceOrder} from '../entities/core';
import {Repository} from 'typeorm';

import * as _ from 'lodash';
import {
	CreatedServiceOrderDto,
	UpdatedServiceOrderDto,
} from 'Entities/Dto/core';
import {Request} from 'express';
import {pagination, queryHandler} from '@util/pagination';
import {findOptionWhere} from '@util/query';
import {ORDER_RELATION, SERVICE_RELATION} from '@contants/relation';
import {IServiceOrderService} from './Interfaces/IServiceOrderService';
import {UserDto} from 'Shared/user.dto';

@Injectable()
export class ServiceOrderService implements IServiceOrderService {
	constructor(
		@InjectRepository(ServiceOrder)
		private serviceOrderRepository: Repository<ServiceOrder>
	) {}

	async findAllAsync(request: Request, user: UserDto): Promise<any> {
		try {
			const {skip, take, currentPage, perPage} = queryHandler(request.query);
			// const newQuery = findOptionWhere(request.query, []);

			// const result = await this.serviceOrderRepository.findAndCount({
			// 	where: {...newQuery, accountId: user.accountId},
			// 	withDeleted: false,
			// 	order: {
			// 		createdAt: {direction: 'desc'},
			// 	},
			// 	take,
			// 	skip,
			// 	relations: [ORDER_RELATION, SERVICE_RELATION],
			// });
			const {
				name = '',
				orderId = '',

				startDate = '',
				endDate = '',
			} = request.query;

			const result = this.serviceOrderRepository
				.createQueryBuilder('serviceOrder')
				.leftJoinAndSelect(
					'serviceOrder.order',
					'orders',
					'serviceOrder.orderId = orders.id'
				)
				.leftJoinAndSelect(
					'serviceOrder.service',
					'services',
					'serviceOrder.serviceId = services.id'
				)
				.leftJoinAndSelect(
					'services.unit',
					'units',
					'services.unitId = units.id'
				)
				.where(`serviceOrder.deletedAt IS NULL`)
				.andWhere(`serviceOrder.accountId = :accountId`, {
					accountId: `${user.accountId}`,
				})
				.orderBy('serviceOrder.createdAt', 'DESC')
				.skip(skip)
				.take(take);
			name &&
				result.andWhere('services.name LIKE :name', {
					name: `%${name}%`,
				});
			orderId &&
				result.andWhere('serviceOrder.orderId LIKE :orderId', {
					orderId: `%${orderId}%`,
				});
			const count = await result.getCount();
			const serviceOrders = await result.getMany();
			if (count == 0)
				return new HttpException('Not Found', HttpStatus.NOT_FOUND);

			return pagination(request, [serviceOrders, count], currentPage, perPage);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async findOneAsync(id: string, user: UserDto): Promise<ServiceOrder | any> {
		try {
			const result = await this.serviceOrderRepository.findOne({
				where: {id, accountId: user.accountId},
			});
			if (!result)
				throw new NotFoundException('ServiceOrder Id ' + id + ' Not Found !');
			return result;
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async createAsync(
		createServiceOrderDto: CreatedServiceOrderDto[]
	): Promise<ServiceOrder[]> {
		try {
			const result = this.serviceOrderRepository.create(createServiceOrderDto);
			return await this.serviceOrderRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async updateAsync(
		id: string,
		updateServiceOrderDto: UpdatedServiceOrderDto,
		user: UserDto
	): Promise<ServiceOrder> {
		try {
			const result = await this.serviceOrderRepository.findOne({where: {id}});
			if (!result)
				throw new NotFoundException('ServiceOrder Id ' + id + ' Not Found !');

			_(updateServiceOrderDto).forEach((val, key) => {
				if (val) result[key] = val;
			});
			return this.serviceOrderRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async removeAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.serviceOrderRepository.softDelete({
			id,
			accountId: user.accountId,
		});
		if (result.affected > 0)
			return 'Deleted ServiceOrder Id ' + id + ' successfully !';
		throw new NotFoundException('ServiceOrder Id ' + id + ' Not Found !');
	}

	async restoreAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.serviceOrderRepository.restore({
			id,
			accountId: user.accountId,
		});
		if (result.affected > 0)
			return 'Restore ServiceOrder Id ' + id + ' successfully !';
		throw new NotFoundException('ServiceOrder Id ' + id + ' Not Found !');
	}

	async deleteAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.serviceOrderRepository.delete(id);
		if (result.affected > 0)
			return 'Deleted ServiceOrder Id ' + id + ' successfully !';
		throw new NotFoundException('ServiceOrder Id ' + id + ' Not Found !');
	}
}
