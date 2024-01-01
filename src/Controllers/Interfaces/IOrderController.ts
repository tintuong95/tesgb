import {Order} from '@entities/Order';
import {UpdateOrderDto} from 'Entities/Dto/Order';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

export interface IOrderController {
	/**
	 * find all
	 */
	getAllOrders(request: Request, user: UserDto): Promise<Order[]>;

	/**
	 *
	 * find one
	 */
	getOrderDetails(id: string, user: UserDto): Promise<Order>;

	/**
	 *
	 * create
	 */
	createOrder(createOrderDto: any, user: UserDto): Promise<Order>;

	/**
	 *
	 * update
	 */
	updateOrder(
		updateOrderDto: UpdateOrderDto,
		user: UserDto,
		id: string
	): Promise<Order>;

	/**
	 *
	 * remove
	 */
	removeOrder(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * restore
	 */
	restoreOrder(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * delete
	 */
	deleteOrder(id: string, user: UserDto): Promise<string>;
}
