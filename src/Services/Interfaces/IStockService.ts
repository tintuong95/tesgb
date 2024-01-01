import {Stock} from '@entities/Stock';
import {CreateStockDto, UpdateStockDto} from 'Entities/Dto/Stock';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

export interface IStockService {
	/**
	 * find all
	 */
	findAllAsync(request: Request, user: UserDto): Promise<any>;

	/**
	 *
	 * find one
	 */
	findOneAsync(id: string, user: UserDto): Promise<Stock | any>;

	/**
	 *
	 * create
	 */
	createAsync(createStockDto: CreateStockDto, user: UserDto): Promise<Stock>;

	/**
	 *
	 * update
	 */
	updateAsync(
		id: string,
		updateStockDto: UpdateStockDto,
		user: UserDto
	): Promise<Stock>;

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
