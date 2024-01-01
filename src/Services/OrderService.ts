import {HttpStatus, Injectable} from '@nestjs/common';
import {NotFoundException, HttpException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Order} from '../entities/core';
import {Repository} from 'typeorm';
import {CreateOrderDto, UpdateOrderDto} from '../Entities/Dto/core';
import * as _ from 'lodash';
import {pagination, queryHandler} from '@util/pagination';
import {findOptionWhere} from '@util/query';
import {Request} from 'express';
import {CUSTOMER_ORDER_RELATION, ROOM_ORDER_RELATION} from '@contants/relation';
import {UserDto} from 'Shared/user.dto';
import {IOrderService} from './Interfaces/IOrderService';
import {OrderStatus} from '@entities/Types/Order';
import {sumTotal} from '@util/price';

@Injectable()
export class OrderService implements IOrderService {
	constructor(
		@InjectRepository(Order)
		private orderRepository: Repository<Order>
	) {}

	async findAllAsync(request: Request, user: UserDto): Promise<any> {
		try {
			const {skip, take, currentPage, perPage} = queryHandler(request.query);
			const {
				id = '',
				status = '',
				startDate = '',
				endDate = '',
			} = request.query;

			// const result = await this.orderRepository.findAndCount({
			// 	where: {...newQuery, accountId: user.accountId},
			// 	withDeleted: false,
			// 	order: {
			// 		createdAt: {direction: 'desc'},
			// 	},
			// 	take,
			// 	skip,
			// 	relations: [ROOM_ORDER_RELATION, CUSTOMER_ORDER_RELATION],
			// });

			const result = this.orderRepository
				.createQueryBuilder('orders')
				.leftJoinAndSelect(
					'orders.roomOrder',
					'roomOrders',
					'orders.id=roomOrders.orderId'
				)
				.leftJoinAndSelect(
					'orders.customerOrder',
					'customerOrders',
					'orders.id=customerOrders.orderId'
				)
				.leftJoinAndSelect(
					'orders.otherOrder',
					'otherOrders',
					'orders.id=otherOrders.orderId'
				)
				.leftJoinAndSelect(
					'roomOrders.room',
					'rooms',
					'roomOrders.roomId=rooms.id'
				)

				.where(`orders.deletedAt IS NULL`)
				.andWhere(`orders.accountId = :accountId`, {
					accountId: `${user.accountId}`,
				})
				.orderBy('orders.createdAt', 'DESC')
				.skip(skip)
				.take(take);

			status &&
				result.andWhere('orders.status = :status', {
					status: `${status}`,
				});
			id &&
				result.andWhere('orders.id LIKE :id', {
					id: `%${id}%`,
				});
			startDate &&
				result.andWhere('orders.createdAt >= :startDate', {
					startDate: new Date(startDate.toString()),
				});
			endDate &&
				result.andWhere('orders.createdAt <= :endDate', {
					endDate: new Date(endDate.toString()),
				});

			const count = await result.getCount();
			const orders = await result.getMany();
			if (count == 0)
				return new HttpException('Not Found', HttpStatus.NOT_FOUND);

			return pagination(request, [orders, count], currentPage, perPage);
		} catch (err) {
			console.error(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async findOneAsync(id: string, user: UserDto): Promise<Order | any> {
		try {
			const result = this.orderRepository
				.createQueryBuilder('orders')
				.leftJoinAndSelect(
					'orders.roomOrder',
					'roomOrders',
					'orders.id=roomOrders.orderId'
				)
				.leftJoinAndSelect(
					'orders.otherOrder',
					'otherOrders',
					'orders.id=otherOrders.orderId'
				)
				.leftJoinAndSelect(
					'orders.customerOrder',
					'customerOrders',
					'orders.id=customerOrders.orderId'
				)
				.leftJoinAndSelect(
					'orders.serviceOrder',
					'serviceOrders',
					'orders.id=serviceOrders.orderId'
				)
				.leftJoinAndSelect(
					'serviceOrders.service',
					'services',
					'serviceOrders.serviceId=services.id'
				)
				.leftJoinAndSelect(
					'roomOrders.room',
					'rooms',
					'roomOrders.roomId=rooms.id'
				)
				.leftJoinAndSelect(
					'customerOrders.customer',
					'customers',
					'customerOrders.customerId=customers.id'
				)
				.leftJoinAndSelect(
					'rooms.roomType',
					'roomTypes',
					'rooms.roomTypeId=roomTypes.id'
				)
				.leftJoinAndSelect(
					'roomTypes.price',
					'prices',
					'roomTypes.priceId=prices.id'
				)
				.leftJoinAndSelect(
					'prices.priceItem',
					'priceItems',
					'prices.id=priceItems.priceId'
				)

				.where(`orders.deletedAt IS NULL`)
				.andWhere(`orders.accountId = :accountId`, {
					accountId: `${user.accountId}`,
				})
				.andWhere(`orders.id = :id`, {
					id: `${id}`,
				});

			const orders = await result.getOne();
			if (!orders)
				throw new NotFoundException('Order Id ' + id + ' Not Found !');
			return orders;
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async createAsync(
		createOrderDto: CreateOrderDto,
		user: UserDto
	): Promise<Order> {
		try {
			createOrderDto.accountId = user.accountId;
			const result = this.orderRepository.create(createOrderDto);
			return await this.orderRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async updateAsync(
		id: string,
		updateOrderDto: UpdateOrderDto,
		user: UserDto
	): Promise<Order> {
		try {
			const result = await this.orderRepository.findOne({where: {id}});
			if (!result)
				throw new NotFoundException('Order Id ' + id + ' Not Found !');

			_(updateOrderDto).forEach((val, key) => {
				if (val) result[key] = val;
			});

			if (updateOrderDto?.numDays == 0) {
				result.numDays = 0;
			} else if (updateOrderDto?.numNights == 0) {
				result.numNights = 0;
			} else if (updateOrderDto?.numHours == 0) {
				result.numHours = 0;
			} else if (updateOrderDto?.numMoreHours == 0) {
				result.numMoreHours = 0;
			}
			return this.orderRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async removeAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.orderRepository.restore({
			id,
			accountId: user.accountId,
		});
		if (result.affected > 0)
			return 'Deleted Order Id ' + id + ' successfully !';
		throw new NotFoundException('Order Id ' + id + ' Not Found !');
	}

	async restoreAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.orderRepository.restore({
			id,
			accountId: user.accountId,
		});
		if (result.affected > 0)
			return 'Restore Order Id ' + id + ' successfully !';
		throw new NotFoundException('Order Id ' + id + ' Not Found !');
	}

	async deleteAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.orderRepository.delete(id);
		if (result.affected > 0)
			return 'Deleted Order Id ' + id + ' successfully !';
		throw new NotFoundException('Order Id ' + id + ' Not Found !');
	}

	async findOrderByListRoomId(
		idList: string[],
		user: UserDto
	): Promise<Order[]> {
		const result = this.orderRepository
			.createQueryBuilder('orders')
			.leftJoinAndSelect(
				'orders.roomOrder',
				'roomOrders',
				'orders.id=roomOrders.orderId'
			)
			.where(`orders.deletedAt IS NULL`)
			.andWhere(`orders.accountId = :accountId`, {
				accountId: `${user.accountId}`,
			})
			.andWhere(`orders.status = :status`, {
				status: `2`,
			})
			.andWhere('orders.status = :status1 OR orders.status = :status2', {
				status1: 1,
				status2: 2,
			})
			.andWhere('roomOrders.roomId IN (:...idList)', {idList})

			.orderBy('orders.createdAt', 'DESC');
		const orders = result.getMany();
		return orders;
	}

	async countRoomStatusByTime(user: UserDto, request: Request): Promise<any> {
		const {startDate = '', endDate = ''} = request.query;
		const rs = await this.orderRepository
			.createQueryBuilder('orders')
			.where(`orders.deletedAt IS NULL`)
			.andWhere(`orders.accountId = :accountId`, {
				accountId: `${user.accountId}`,
			})
			.andWhere('orders.createdAt >= :startDate', {
				startDate: new Date(startDate.toString()),
			})
			.andWhere('orders.createdAt <= :endDate', {
				endDate: new Date(endDate.toString()),
			})
			.select([
				'DATE_FORMAT(orders.updatedAt, "%d-%b-%Y") as Date',
				'orders.status as status',
				'COUNT(*) as count',
			])
			.groupBy('Date, status')
			.getRawMany();
		return rs;
	}

	async countRoomStatusCurrent(user: UserDto, request: Request): Promise<any> {
		const {status} = request.query;
		const rs = await this.orderRepository
			.createQueryBuilder('orders')
			.where(`orders.deletedAt IS NULL`)
			.andWhere(`orders.accountId = :accountId`, {
				accountId: `${user.accountId}`,
			})
			.andWhere(`orders.status = :status`, {
				status: status,
			})
			.select('COUNT(*) AS count')
			.getRawOne();
		return rs;
	}

	async sumTotalMoneyOfOrder(id: string, user: UserDto): Promise<number> {
		const orderDetails = await this.findOneAsync(id, user);
		const {
			serviceOrder,
			roomOrder,
			otherOrder,
			numDays,
			numNights,
			numHours,
			numMoreHours,
		} = orderDetails;

		return +sumTotal(
			numDays,
			numNights,
			numHours,
			numMoreHours,
			roomOrder,
			serviceOrder,
			otherOrder
		);
	}
}
