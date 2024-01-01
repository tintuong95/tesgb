import {Revenue} from '@entities/Revenue';
import {CreateRevenueDto, UpdateRevenueDto} from 'Entities/Dto/Revenue';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

export interface IRevenueService {
	/**
	 * find all
	 */
	findAllAsync(request: Request, user: UserDto): Promise<any>;

	/**
	 *
	 * find one
	 */
	findOneAsync(id: string, user: UserDto): Promise<Revenue | any>;

	/**
	 *
	 * create
	 */
	createAsync(
		createRevenueDto: CreateRevenueDto,
		user: UserDto
	): Promise<Revenue>;

	/**
	 *
	 * update
	 */
	updateAsync(
		id: string,
		updateRevenueDto: UpdateRevenueDto,
		user: UserDto
	): Promise<Revenue>;

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
