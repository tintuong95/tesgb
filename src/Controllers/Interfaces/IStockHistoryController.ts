import {StockHistory} from '@entities/StockHistory';
import {
	CreateStockHistoryDto,
	UpdateStockHistoryDto,
} from 'Entities/Dto/StockHistory';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

export interface IStockHistoryController {
	/**
	 * find all
	 */
	getAllStockHistorys(request: Request, user: UserDto): Promise<StockHistory[]>;

	/**
	 *
	 * find one
	 */
	getStockHistoryDetails(id: string, user: UserDto): Promise<StockHistory>;

	/**
	 *
	 * create
	 */
	createStockHistory(
		createStockHistoryDto: CreateStockHistoryDto,
		user: UserDto
	): Promise<StockHistory>;

	/**
	 *
	 * update
	 */
	updateStockHistory(
		updateStockHistoryDto: UpdateStockHistoryDto,
		user: UserDto,
		id: string
	): Promise<StockHistory>;

	/**
	 *
	 * remove
	 */
	removeStockHistory(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * restore
	 */
	restoreStockHistory(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * delete
	 */
	deleteStockHistory(id: string, user: UserDto): Promise<string>;
}
