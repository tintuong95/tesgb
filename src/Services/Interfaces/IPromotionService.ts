import {Promotion} from '@entities/Promotion';
import {CreatePromotionDto, UpdatePromotionDto} from 'Entities/Dto/Promotion';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

export interface IPromotionService {
	/**
	 * find all
	 */
	findAllAsync(request: Request, user: UserDto): Promise<any>;

	/**
	 *
	 * find one
	 */
	findOneAsync(id: string, user: UserDto): Promise<Promotion>;

	/**
	 *
	 * create
	 */
	createAsync(
		createPromotionDto: CreatePromotionDto,
		user: UserDto
	): Promise<Promotion>;

	/**
	 *
	 * update
	 */
	updateAsync(
		id: string,
		updatePromotionDto: UpdatePromotionDto,
		user: UserDto
	): Promise<Promotion>;

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
