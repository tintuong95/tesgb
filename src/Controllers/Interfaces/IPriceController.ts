import {Price} from '@entities/Price';
import {CreatePriceDto, UpdatePriceDto} from 'Entities/Dto/Price';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

export interface IPriceController {
	/**
	 * find all
	 */
	getAllPrices(request: Request, user: UserDto): Promise<Price>;

	/**
	 *
	 * find one
	 */
	getPriceDetails(id: string, user: UserDto): Promise<Price>;

	/**
	 *
	 * create
	 */
	createPrice(createPriceDto: CreatePriceDto, user: UserDto): Promise<Price>;

	/**
	 *
	 * update
	 */
	updatePrice(
		updatePriceDto: UpdatePriceDto,
		user: UserDto,
		id: string
	): Promise<Price>;

	/**
	 *
	 * remove
	 */
	removePrice(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * restore
	 */
	restorePrice(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * delete
	 */
	deletePrice(id: string, user: UserDto): Promise<string>;
}
