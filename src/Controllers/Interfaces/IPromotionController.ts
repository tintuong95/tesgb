import {Promotion} from '@entities/Promotion';
import {CreatePromotionDto, UpdatePromotionDto} from 'Entities/Dto/Promotion';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

export interface IPromotionController {
	/**
	 * find all
	 */
	getAllPromotions(request: Request, user: UserDto): Promise<Promotion[]>;

	/**
	 *
	 * find one
	 */
	getPromotionDetails(id: string, user: UserDto): Promise<Promotion>;

	/**
	 *
	 * create
	 */
	createPromotion(
		createPromotionDto: CreatePromotionDto,
		user: UserDto
	): Promise<Promotion>;

	/**
	 *
	 * update
	 */
	updatePromotion(
		updatePromotionDto: UpdatePromotionDto,
		user: UserDto,
		id: string
	): Promise<Promotion>;

	/**
	 *
	 * remove
	 */
	removePromotion(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * restore
	 */
	restorePromotion(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * delete
	 */
	deletePromotion(id: string, user: UserDto): Promise<string>;
}
