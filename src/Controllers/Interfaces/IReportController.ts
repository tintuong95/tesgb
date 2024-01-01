import {Report} from '@entities/Report';
import {CreateReportDto, UpdateReportDto} from 'Entities/Dto/Report';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

export interface IReportController {
	/**
	 * find all
	 */
	getAllReports(request: Request, user: UserDto): Promise<Report[]>;

	/**
	 *
	 * find one
	 */
	getReportDetails(id: string, user: UserDto): Promise<Report>;

	/**
	 *
	 * create
	 */
	createReport(
		createReportDto: CreateReportDto,
		user: UserDto
	): Promise<Report>;

	/**
	 *
	 * update
	 */
	updateReport(
		updateReportDto: UpdateReportDto,
		user: UserDto,
		id: string
	): Promise<Report>;

	/**
	 *
	 * remove
	 */
	removeReport(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * restore
	 */
	restoreReport(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * delete
	 */
	deleteReport(id: string, user: UserDto): Promise<string>;
}
