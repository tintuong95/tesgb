import {ServiceType} from '@entities/ServiceType';
import {
	CreateServiceTypeDto,
	UpdateServiceTypeDto,
} from 'Entities/Dto/ServiceType';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

export interface IServiceTypeService {
	/**
	 * find all
	 */
	findAllAsync(request: Request, user: UserDto): Promise<any>;

	/**
	 *
	 * find one
	 */
	findOneAsync(id: string, user: UserDto): Promise<ServiceType | any>;

	/**
	 *
	 * create
	 */
	createAsync(
		createServiceTypeDto: CreateServiceTypeDto,
		user: UserDto
	): Promise<ServiceType>;

	/**
	 *
	 * update
	 */
	updateAsync(
		id: string,
		updateServiceTypeDto: UpdateServiceTypeDto,
		user: UserDto
	): Promise<ServiceType>;

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
