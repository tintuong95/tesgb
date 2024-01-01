import {Stock} from '@entities/Stock';
import {CreateProductDto} from 'Entities/Dto/Product';
import {UpdateStockDto} from 'Entities/Dto/Stock';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

export interface IStockController {
	/**
	 * find all
	 */
	getAllStocks(request: Request, user: UserDto): Promise<Stock[]>;

	/**
	 *
	 * find one
	 */
	getStockDetails(id: string, user: UserDto): Promise<Stock>;

	/**
	 *
	 * create
	 */
	createStock(
		createProductDto: CreateProductDto,
		user: UserDto
	): Promise<Stock>;

	/**
	 *
	 * update
	 */
	updateStock(
		updateStockDto: UpdateStockDto,
		user: UserDto,
		id: string
	): Promise<Stock>;

	/**
	 *
	 * remove
	 */
	removeStock(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * restore
	 */
	restoreStock(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * delete
	 */
	deleteStock(id: string, user: UserDto): Promise<string>;
}
