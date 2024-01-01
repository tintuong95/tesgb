import {Report} from '@entities/Report';
import {CreateReportDto, UpdateReportDto} from 'Entities/Dto/Report';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

export interface IReportService {
	/**
	 * find all
	 */
	findAllAsync(request: Request, user: UserDto): Promise<any>;

	/**
	 *
	 * find one
	 */
	findOneAsync(id: string, user: UserDto): Promise<Report | any>;

	/**
	 *
	 * create
	 */
	createAsync(createReportDto: CreateReportDto, user: UserDto): Promise<Report>;

	/**
	 *
	 * update
	 */
	updateAsync(
		id: string,
		updateReportDto: UpdateReportDto,
		user: UserDto
	): Promise<Report>;

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
