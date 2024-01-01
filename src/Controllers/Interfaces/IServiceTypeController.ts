import {ServiceType} from '@entities/ServiceType';
import {
	CreateServiceTypeDto,
	UpdateServiceTypeDto,
} from 'Entities/Dto/ServiceType';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

export interface IServiceTypeController {
	/**
	 * find all
	 */
	getAllServiceTypes(request: Request, user: UserDto): Promise<ServiceType[]>;

	/**
	 *
	 * find one
	 */
	getServiceTypeDetails(id: string, user: UserDto): Promise<ServiceType>;

	/**
	 *
	 * create
	 */
	createServiceType(
		createServiceTypeDto: CreateServiceTypeDto,
		user: UserDto
	): Promise<ServiceType>;

	/**
	 *
	 * update
	 */
	updateServiceType(
		updateServiceTypeDto: UpdateServiceTypeDto,
		user: UserDto,
		id: string
	): Promise<ServiceType>;

	/**
	 *
	 * remove
	 */
	removeServiceType(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * restore
	 */
	restoreServiceType(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * delete
	 */
	deleteServiceType(id: string, user: UserDto): Promise<string>;
}
