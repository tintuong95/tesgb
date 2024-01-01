import {Order} from '@entities/Order';
import {CreateOrderDto, UpdateOrderDto} from 'Entities/Dto/Order';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

export interface IOrderService {
	/**
	 * find all
	 */
	findAllAsync(request: Request, user: UserDto): Promise<any>;

	/**
	 *
	 * find one
	 */
	findOneAsync(id: string, user: UserDto): Promise<Order>;

	/**
	 *
	 * create
	 */
	createAsync(createOrderDto: CreateOrderDto, user: UserDto): Promise<Order>;

	/**
	 *
	 * update
	 */
	updateAsync(
		id: string,
		updateOrderDto: UpdateOrderDto,
		user: UserDto
	): Promise<Order>;

	/**
	 *
	 * remove
	 */
	removeAsync(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * restore
	 */
	restoreAsync(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * delete
	 */
	deleteAsync(id: string, user: UserDto): Promise<string>;
	/**
	 *
	 * find
	 */
	findOrderByListRoomId(idList: string[], user: UserDto): Promise<Order[]>;
}
