import {Room} from '@entities/Room';
import {CreateRoomDto, UpdateRoomDto} from 'Entities/Dto/Room';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

export interface IRoomController {
	/**
	 * find all
	 */
	getAllRooms(request: Request, user: UserDto): Promise<Room[]>;

	/**
	 *
	 * find one
	 */
	getAllPriceRooms(idList: string[], user: UserDto): Promise<Room[]>;

	/**
	 *
	 * find one
	 */
	getRoomDetails(id: string, user: UserDto): Promise<Room>;

	/**
	 *
	 * create
	 */
	createRoom(createRoomDto: CreateRoomDto[], user: UserDto): Promise<Room[]>;

	/**
	 *
	 * update
	 */
	updateRoom(
		updateRoomDto: UpdateRoomDto,
		user: UserDto,
		id: string
	): Promise<Room>;

	/**
	 *
	 * remove
	 */
	removeRoom(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * restore
	 */
	restoreRoom(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * delete
	 */
	deleteRoom(id: string, user: UserDto): Promise<string>;
}
