import {Customer} from '@entities/Customer';
import {CreateCustomerDto, UpdateCustomerDto} from 'Entities/Dto/Customer';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

export interface ICustomerService {
	/**
	 * find all
	 */
	findAllAsync(user: UserDto, request: Request): Promise<any>;

	/**
	 *
	 * find one
	 */
	findOneAsync(id: string, user: UserDto): Promise<Customer>;

	/**
	 *
	 * create
	 */
	createAsync(
		createCustomerDto: CreateCustomerDto[],
		user: UserDto
	): Promise<Customer[]>;

	/**
	 *
	 * update
	 */
	updateAsync(
		id: string,
		updateCustomerDto: UpdateCustomerDto,
		user: UserDto
	): Promise<Customer>;

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
	 * find by list idcards
	 */
	findByIdCards(user: UserDto, idCards: Array<string>): Promise<Customer[]>;
}
