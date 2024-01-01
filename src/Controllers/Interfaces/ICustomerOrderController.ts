import {CustomerOrder} from '@entities/CustomerOrder';
import {
	CreatedCustomerOrderDto,
	UpdatedCustomerOrderDto,
} from 'Entities/Dto/CustomerOrder';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

export interface ICustomerOrderController {
	/**
	 * find all
	 */
	getAllCustomerOrders(
		request: Request,
		user: UserDto
	): Promise<CustomerOrder[]>;

	/**
	 *
	 * find one
	 */
	getCustomerOrderDetails(id: string, user: UserDto): Promise<CustomerOrder>;

	/**
	 *
	 * create
	 */
	createCustomerOrder(
		createCustomerOrderDto: CreatedCustomerOrderDto[],
		user: UserDto
	): Promise<CustomerOrder[]>;

	/**
	 *
	 * update
	 */
	updateCustomerOrder(
		updateCustomerOrderDto: UpdatedCustomerOrderDto,
		user: UserDto,
		id: string
	): Promise<CustomerOrder>;

	/**
	 *
	 * remove
	 */
	removeCustomerOrder(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * restore
	 */
	restoreCustomerOrder(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * delete
	 */
	deleteCustomerOrder(id: string, user: UserDto): Promise<string>;
}
