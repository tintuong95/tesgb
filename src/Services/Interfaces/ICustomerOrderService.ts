import {Account} from '@entities/Account';
import {CustomerOrder} from '@entities/CustomerOrder';
import {CreateAccountDto, UpdateAccountDto} from 'Entities/Dto/Account';
import {CreateCustomerDto} from 'Entities/Dto/Customer';
import {
	CreatedCustomerOrderDto,
	UpdatedCustomerOrderDto,
} from 'Entities/Dto/CustomerOrder';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

export interface ICustomerOrderService {
	/**
	 * find all
	 */
	findAllAsync(request: Request, user: UserDto): Promise<CustomerOrder[]>;

	/**
	 *
	 * find one
	 */
	findOneAsync(id: string, user: UserDto): Promise<CustomerOrder>;

	/**
	 *
	 * create
	 */
	createAsync(
		createdCustomerOrderDto: CreatedCustomerOrderDto,
		user: UserDto
	): Promise<CustomerOrder[]>;

	/**
	 *
	 * update
	 */
	updateAsync(
		id: string,
		user: UserDto,
		updatedCustomerOrderDto: UpdatedCustomerOrderDto
	): Promise<CustomerOrder>;

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
}
