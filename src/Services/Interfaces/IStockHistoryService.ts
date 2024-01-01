import {StockHistory} from '@entities/StockHistory';
import {StockHistoryType} from '@entities/Types/StockHistoryType';
import {
	CreateStockHistoryDto,
	UpdateStockHistoryDto,
} from 'Entities/Dto/StockHistory';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

export interface IStockHistoryService {
	/**
	 * find all
	 */
	findAllAsync(request: Request, user: UserDto): Promise<any>;

	/**
	 *
	 * find one
	 */
	findOneAsync(id: string, user: UserDto): Promise<StockHistory | any>;

	/**
	 *
	 * create
	 */
	createAsync(
		createStockHistoryDto: CreateStockHistoryDto,
		user: UserDto
	): Promise<StockHistory>;

	/**
	 *
	 * update
	 */
	updateAsync(
		id: string,
		updateStockHistoryDto: UpdateStockHistoryDto,
		user: UserDto
	): Promise<StockHistory>;

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

	getStockExportImportTotal(
		stockId: string,

		user: UserDto
	): Promise<any>;
}
