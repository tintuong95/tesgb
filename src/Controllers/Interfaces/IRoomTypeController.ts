import {RoomType} from '@entities/RoomType';
import {CreateRoomTypeDto, UpdateRoomTypeDto} from 'Entities/Dto/RoomType';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

export interface IRoomTypeController {
	/**
	 * find all
	 */
	getAllRoomTypes(request: Request, user: UserDto): Promise<RoomType[]>;

	/**
	 *
	 * find one
	 */
	getRoomTypeDetails(id: string, user: UserDto): Promise<RoomType>;

	/**
	 *
	 * create
	 */
	createRoomType(
		createRoomTypeDto: CreateRoomTypeDto,
		user: UserDto
	): Promise<RoomType>;

	/**
	 *
	 * update
	 */
	updateRoomType(
		updateRoomTypeDto: UpdateRoomTypeDto,
		user: UserDto,
		id: string
	): Promise<RoomType>;

	/**
	 *
	 * remove
	 */
	removeRoomType(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * restore
	 */
	restoreRoomType(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * delete
	 */
	deleteRoomType(id: string, user: UserDto): Promise<string>;
}
