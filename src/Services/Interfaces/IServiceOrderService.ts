import {ServiceOrder} from '@entities/ServiceOrder';
import {
	CreatedServiceOrderDto,
	UpdatedServiceOrderDto,
} from 'Entities/Dto/ServiceOrder';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

export interface IServiceOrderService {
	/**
	 * find all
	 */
	findAllAsync(request: Request, user: UserDto): Promise<any>;

	/**
	 *
	 * find one
	 */
	findOneAsync(id: string, user: UserDto): Promise<ServiceOrder | any>;

	/**
	 *
	 * create
	 */
	createAsync(
		createServiceOrderDto: CreatedServiceOrderDto[]
	): Promise<ServiceOrder[]>;

	/**
	 *
	 * update
	 */
	updateAsync(
		id: string,
		updateServiceOrderDto: UpdatedServiceOrderDto,
		user: UserDto
	): Promise<ServiceOrder>;

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
