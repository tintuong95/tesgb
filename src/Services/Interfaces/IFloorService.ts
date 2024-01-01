import {Floor} from '@entities/Floor';
import {CreateFloorDto, UpdateFloorDto} from 'Entities/Dto/Floor';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

export interface IFloorService {
	/**
	 * find all
	 */
	findAllAsync(request: Request, user: UserDto): Promise<any>;

	/**
	 *
	 * find one
	 */
	findOneAsync(id: string, user: UserDto): Promise<Floor>;

	/**
	 *
	 * create
	 */
	createAsync(createFloorDto: CreateFloorDto, user: UserDto): Promise<Floor>;

	/**
	 *
	 * update
	 */
	updateAsync(
		id: string,
		updateFloorDto: UpdateFloorDto,
		user: UserDto
	): Promise<Floor>;

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
