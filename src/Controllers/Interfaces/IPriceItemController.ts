import {PriceItem} from '@entities/PriceItem';
import {PriceItemType} from '@entities/Types/PriceItem';
import {CreatePriceItemDto, UpdatePriceItemDto} from 'Entities/Dto/PriceItem';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

export interface IPriceItemController {
	/**
	 * find all
	 */
	getAllPriceItems(request: Request, user: UserDto): Promise<PriceItem>;

	/**
	 *
	 * find one
	 */
	getPriceItemDetails(id: string, user: UserDto): Promise<PriceItem>;

	/**
	 *
	 * create
	 */
	createPriceItem(
		createPriceItemDto: CreatePriceItemDto[],
		user: UserDto
	): Promise<PriceItem[]>;

	/**
	 *
	 * update
	 */
	updatePriceItem(
		updatePriceItemDto: UpdatePriceItemDto,
		user: UserDto,
		id: string,
		type: PriceItemType
	): Promise<PriceItem>;

	/**
	 *
	 * remove
	 */
	removePriceItem(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * restore
	 */
	restorePriceItem(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * delete
	 */
	deletePriceItem(id: string, user: UserDto): Promise<string>;
}
