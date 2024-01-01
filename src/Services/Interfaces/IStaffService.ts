import {Staff} from '@entities/Staff';
import {CreateStaffDto, UpdateStaffDto} from 'Entities/Dto/Staff';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

export interface IStaffService {
	/**
	 * find all
	 */
	findAllAsync(request: Request, user: UserDto): Promise<any>;

	/**
	 *
	 * find one
	 */
	findOneAsync(id: string, user: UserDto): Promise<Staff | any>;

	/**
	 *
	 * create
	 */
	createAsync(createStaffDto: CreateStaffDto, user: UserDto): Promise<Staff>;

	/**
	 *
	 * update
	 */
	updateAsync(
		id: string,
		updateStaffDto: UpdateStaffDto,
		user: UserDto
	): Promise<Staff>;

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
