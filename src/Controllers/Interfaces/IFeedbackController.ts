import {Feedback} from '@entities/Feedback';
import {CreateFeedbackDto, UpdateFeedbackDto} from 'Entities/Dto/Feedback';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

export interface IFeedbackController {
	/**
	 * find all
	 */
	getAllFeedbacks(request: Request, user: UserDto): Promise<Feedback[]>;

	/**
	 *
	 * find one
	 */
	getFeedbackDetails(id: string, user: UserDto): Promise<Feedback>;

	/**
	 *
	 * create
	 */
	createFeedback(
		createFeedbackDto: CreateFeedbackDto,
		user: UserDto
	): Promise<Feedback>;

	/**
	 *
	 * update
	 */
	updateFeedback(
		updateFeedbackDto: UpdateFeedbackDto,
		user: UserDto,
		id: string
	): Promise<Feedback>;

	/**
	 *
	 * remove
	 */
	removeFeedback(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * restore
	 */
	restoreFeedback(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * delete
	 */
	deleteFeedback(id: string, user: UserDto): Promise<string>;
}
