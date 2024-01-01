import {Revenue} from '@entities/Revenue';
import {CreateRevenueDto, UpdateRevenueDto} from 'Entities/Dto/Revenue';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

export interface IRevenueController {
	/**
	 * find all
	 */
	getAllRevenues(request: Request, user: UserDto): Promise<Revenue[]>;

	/**
	 *
	 * find one
	 */
	getRevenueDetails(id: string, user: UserDto): Promise<Revenue>;

	/**
	 *
	 * create
	 */
	createRevenue(
		createRevenueDto: CreateRevenueDto,
		user: UserDto
	): Promise<Revenue>;

	/**
	 *
	 * update
	 */
	updateRevenue(
		updateRevenueDto: UpdateRevenueDto,
		user: UserDto,
		id: string
	): Promise<Revenue>;

	/**
	 *
	 * remove
	 */
	removeRevenue(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * restore
	 */
	restoreRevenue(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * delete
	 */
	deleteRevenue(id: string, user: UserDto): Promise<string>;
}
