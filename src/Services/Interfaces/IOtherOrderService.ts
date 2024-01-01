import {OtherOrder} from '@entities/OtherOrder';
import {
	CreatedOtherOrderDto,
	UpdatedOtherOrderDto,
} from 'Entities/Dto/OtherOrder';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

export interface IOtherOrderService {
	/**
	 * find all
	 */
	findAllAsync(request: Request, user: UserDto): Promise<any>;

	/**
	 *
	 * find one
	 */
	findOneAsync(id: string, user: UserDto): Promise<OtherOrder | any>;

	/**
	 *
	 * create
	 */
	createAsync(
		createOtherOrderDto: CreatedOtherOrderDto[],
		user: UserDto
	): Promise<OtherOrder[]>;

	/**
	 *
	 * update
	 */
	updateAsync(
		id: string,
		updateOtherOrderDto: UpdatedOtherOrderDto,
		user: UserDto
	): Promise<OtherOrder>;

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
