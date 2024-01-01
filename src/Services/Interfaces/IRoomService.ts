import {Room} from '@entities/Room';
import {CreateRoomDto, UpdateRoomDto} from 'Entities/Dto/Room';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';
import * as TYPE from '../../Entities/Types/core';
export interface IRoomService {
	/**
	 * find all
	 */
	findAllAsync(request: Request, user: UserDto): Promise<any>;

	/**
	 *
	 * find one
	 */
	findOneAsync(id: string, user: UserDto): Promise<Room | any>;

	/**
	 *
	 * create
	 */
	createAsync(createRoomDto: CreateRoomDto[], user: UserDto): Promise<Room[]>;

	/**
	 *
	 * update
	 */
	updateAsync(
		id: string,
		updateRoomDto: UpdateRoomDto,
		user: UserDto
	): Promise<Room>;
	/**
	 *
	 * update
	 */

	updateStatusAsync(idList: string[], status: TYPE.RoomStatus): Promise<Room>;

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
