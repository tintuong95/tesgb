import {Customer} from '@entities/Customer';
import {CreateCustomerDto, UpdateCustomerDto} from 'Entities/Dto/Customer';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

export interface ICustomerController {
	/**
	 * find all
	 */
	getAllCustomers(request: Request, user: UserDto): Promise<Customer[]>;

	/**
	 *
	 * find one
	 */
	getCustomerDetails(id: string, user: UserDto): Promise<Customer>;

	/**
	 *
	 * create
	 */
	createCustomer(
		createCustomerDto: CreateCustomerDto[],
		user: UserDto
	): Promise<Customer[]>;

	/**
	 *
	 * update
	 */
	updateCustomer(
		updateCustomerDto: UpdateCustomerDto,
		user: UserDto,
		id: string
	): Promise<Customer>;

	/**
	 *
	 * remove
	 */
	removeCustomer(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * restore
	 */
	restoreCustomer(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * delete
	 */
	deleteCustomer(id: string, user: UserDto): Promise<string>;
}
