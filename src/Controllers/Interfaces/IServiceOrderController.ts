import {ServiceOrder} from '@entities/ServiceOrder';
import {
	CreatedServiceOrderDto,
	UpdatedServiceOrderDto,
} from 'Entities/Dto/ServiceOrder';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

export interface IServiceOrderController {
	/**
	 * find all
	 */
	getAllServiceOrder(request: Request, user: UserDto): Promise<ServiceOrder[]>;

	/**
	 *
	 * find one
	 */
	getServiceOrderDetails(id: string, user: UserDto): Promise<ServiceOrder>;

	/**
	 *
	 * create
	 */
	createServiceOrder(
		createServiceOrderDto: CreatedServiceOrderDto[]
	): Promise<ServiceOrder[]>;

	/**
	 *
	 * update
	 */
	updateServiceOrder(
		updateServiceOrderDto: UpdatedServiceOrderDto,
		user: UserDto,
		id: string
	): Promise<ServiceOrder>;

	/**
	 *
	 * remove
	 */
	removeServiceOrder(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * restore
	 */
	restoreServiceOrder(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * delete
	 */
	deleteServiceOrder(id: string, user: UserDto): Promise<string>;
}
