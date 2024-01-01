import {RoomOrder} from '@entities/RoomOrder';
import {CreatedRoomOrderDto, UpdatedRoomOrderDto} from 'Entities/Dto/RoomOrder';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

export interface IRoomOrderController {
	/**
	 * find all
	 */
	getAllRoomOrders(request: Request, user: UserDto): Promise<RoomOrder[]>;

	/**
	 *
	 * find one
	 */
	getRoomOrderDetails(id: string, user: UserDto): Promise<RoomOrder>;

	/**
	 *
	 * create
	 */
	createRoomOrder(
		createRoomOrderDto: CreatedRoomOrderDto[],
		user: UserDto
	): Promise<RoomOrder[]>;

	/**
	 *
	 * update
	 */
	updateRoomOrder(
		updateRoomOrderDto: UpdatedRoomOrderDto,
		user: UserDto,
		id: string
	): Promise<RoomOrder>;

	/**
	 *
	 * remove
	 */
	removeRoomOrder(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * restore
	 */
	restoreRoomOrder(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * delete
	 */
	deleteRoomOrder(id: string, user: UserDto): Promise<string>;
}
