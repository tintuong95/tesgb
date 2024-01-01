import {Feedback} from '@entities/Feedback';
import {CreateFeedbackDto, UpdateFeedbackDto} from 'Entities/Dto/Feedback';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

export interface IFeedbackService {
	/**
	 * find all
	 */
	findAllAsync(request: Request, user: UserDto): Promise<any>;

	/**
	 *
	 * find one
	 */
	findOneAsync(id: string, user: UserDto): Promise<Feedback | any>;

	/**
	 *
	 * create
	 */
	createAsync(
		createFeedbackDto: CreateFeedbackDto,
		user: UserDto
	): Promise<Feedback>;

	/**
	 *
	 * update
	 */
	updateAsync(
		id: string,
		updateFeedbackDto: UpdateFeedbackDto,
		user: UserDto
	): Promise<Feedback>;

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
