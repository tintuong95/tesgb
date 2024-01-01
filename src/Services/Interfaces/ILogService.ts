import {Log} from '@entities/Log';
import {CreateLogDto, UpdateLogDto} from 'Entities/Dto/Log';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

export interface ILogService {
	/**
	 * find all
	 */
	findAllAsync(request: Request, user: UserDto): Promise<any>;

	/**
	 *
	 * find one
	 */
	findOneAsync(id: string, user: UserDto): Promise<Log>;

	/**
	 *
	 * create
	 */
	createAsync(createLogDto: CreateLogDto, user: UserDto): Promise<Log>;

	/**
	 *
	 * update
	 */
	updateAsync(
		id: string,
		updateLogDto: UpdateLogDto,
		user: UserDto
	): Promise<Log>;

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
