import {Service} from '@entities/Service';
import {CreateServiceDto, UpdateServiceDto} from 'Entities/Dto/Service';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

export interface IServiceController {
	/**
	 * find all
	 */
	getAllServices(request: Request, user: UserDto): Promise<Service[]>;

	/**
	 *
	 * find one
	 */
	getServiceDetails(id: string, user: UserDto): Promise<Service>;

	/**
	 *
	 * create
	 */
	createService(
		createServiceDto: CreateServiceDto,
		user: UserDto
	): Promise<Service>;

	/**
	 *
	 * update
	 */
	updateService(
		updateServiceDto: UpdateServiceDto,
		user: UserDto,
		id: string
	): Promise<Service>;

	/**
	 *
	 * remove
	 */
	removeService(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * restore
	 */
	restoreService(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * delete
	 */
	deleteService(id: string, user: UserDto): Promise<string>;
}
