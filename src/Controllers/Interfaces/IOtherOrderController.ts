import {OtherOrder} from '@entities/OtherOrder';
import {
	CreatedOtherOrderDto,
	UpdatedOtherOrderDto,
} from 'Entities/Dto/OtherOrder';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

export interface IOtherOrderController {
	/**
	 * find all
	 */
	getAllOtherOrders(request: Request, user: UserDto): Promise<OtherOrder[]>;

	/**
	 *
	 * find one
	 */
	getOtherOrderDetails(id: string, user: UserDto): Promise<OtherOrder>;

	/**
	 *
	 * create
	 */
	createOtherOrder(
		createOtherOrderDto: CreatedOtherOrderDto[],
		user: UserDto
	): Promise<OtherOrder[]>;

	/**
	 *
	 * update
	 */
	updateOtherOrder(
		updateOtherOrderDto: UpdatedOtherOrderDto,
		user: UserDto,
		id: string
	): Promise<OtherOrder>;

	/**
	 *
	 * remove
	 */
	removeOtherOrder(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * restore
	 */
	restoreOtherOrder(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * delete
	 */
	deleteOtherOrder(id: string, user: UserDto): Promise<string>;
}
