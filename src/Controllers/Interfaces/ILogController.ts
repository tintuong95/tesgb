import {Log} from '@entities/Log';
import {CreateLogDto, UpdateLogDto} from 'Entities/Dto/Log';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

export interface ILogController {
	/**
	 * find all
	 */
	getAllLogs(request: Request, user: UserDto): Promise<Log[]>;

	/**
	 *
	 * find one
	 */
	getLogDetails(id: string, user: UserDto): Promise<Log>;

	/**
	 *
	 * create
	 */
	createLog(createLogDto: CreateLogDto, user: UserDto): Promise<Log>;

	/**
	 *
	 * update
	 */
	updateLog(
		updateAccountDto: UpdateLogDto,
		user: UserDto,
		id: string
	): Promise<Log>;

	/**
	 *
	 * remove
	 */
	removeLog(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * restore
	 */
	restoreLog(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * delete
	 */
	deleteLog(id: string, user: UserDto): Promise<string>;
}
