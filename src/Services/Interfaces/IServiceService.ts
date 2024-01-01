import {Service} from '@entities/Service';
import {CreateServiceDto, UpdateServiceDto} from 'Entities/Dto/Service';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

export interface IServiceService {
	/**
	 * find all
	 */
	findAllAsync(request: Request, user: UserDto): Promise<any>;

	/**
	 *
	 * find one
	 */
	findOneAsync(id: string, user: UserDto): Promise<Service | any>;
	/**
	 *
	 * find by service Type id
	 */
	findByServiceTypeId(serviceTypeId: string, user: UserDto): Promise<Service[]>;

	/**
	 *
	 * create
	 */
	createAsync(
		createServiceDto: CreateServiceDto,
		user: UserDto
	): Promise<Service>;

	/**
	 *
	 * update
	 */
	updateAsync(
		id: string,
		updateServiceDto: UpdateServiceDto,
		user: UserDto
	): Promise<Service>;

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
