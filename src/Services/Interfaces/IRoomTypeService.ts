import {RoomType} from '@entities/RoomType';
import {CreateRoomTypeDto, UpdateRoomTypeDto} from 'Entities/Dto/RoomType';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

export interface IRoomTypeService {
	/**
	 * find all
	 */
	findAllAsync(request: Request, user: UserDto): Promise<any>;

	/**
	 *
	 * find one
	 */
	findOneAsync(id: string, user: UserDto): Promise<RoomType | any>;

	/**
	 *
	 * create
	 */
	createAsync(
		createRoomTypeDto: CreateRoomTypeDto,
		user: UserDto
	): Promise<RoomType>;

	/**
	 *
	 * update
	 */
	updateAsync(
		id: string,
		updateRoomTypeDto: UpdateRoomTypeDto,
		user: UserDto
	): Promise<RoomType>;

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
