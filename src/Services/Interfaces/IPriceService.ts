import {Price} from '@entities/Price';
import {CreatePriceDto, UpdatePriceDto} from 'Entities/Dto/Price';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

export interface IPriceService {
	/**
	 * find all
	 */
	findAllAsync(request: Request, user: UserDto): Promise<any>;

	/**
	 *
	 * find one
	 */
	findOneAsync(id: string, user: UserDto): Promise<Price | any>;

	/**
	 *
	 * create
	 */
	createAsync(createPriceDto: CreatePriceDto, user: UserDto): Promise<Price>;

	/**
	 *
	 * update
	 */
	updateAsync(
		id: string,
		updatePriceDto: UpdatePriceDto,
		user: UserDto
	): Promise<Price>;

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
