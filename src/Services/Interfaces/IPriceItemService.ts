import {Price} from '@entities/Price';
import {PriceItem} from '@entities/PriceItem';
import {PriceItemType} from '@entities/Types/PriceItem';
import {CreatePriceDto, UpdatePriceDto} from 'Entities/Dto/Price';
import {CreatePriceItemDto, UpdatePriceItemDto} from 'Entities/Dto/PriceItem';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

export interface IPriceItemService {
	/**
	 * find all
	 */
	findAllAsync(request: Request, user: UserDto): Promise<any>;

	/**
	 *
	 * find one
	 */
	findOneAsync(id: string, user: UserDto): Promise<PriceItem | any>;

	/**
	 *
	 * create
	 */
	createAsync(
		createPriceItemDto: CreatePriceItemDto[],
		user: UserDto
	): Promise<PriceItem[]>;

	/**
	 *
	 * update
	 */
	updateAsync(
		priceId: string,
		type: PriceItemType,
		updatePriceItemDto: UpdatePriceItemDto
	): Promise<PriceItem>;

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
