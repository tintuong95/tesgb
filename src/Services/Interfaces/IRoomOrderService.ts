import {RoomOrder} from '@entities/RoomOrder';
import {CreatedRoomOrderDto, UpdatedRoomOrderDto} from 'Entities/Dto/RoomOrder';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

export interface IRoomOrderService {
	/**
	 * find all
	 */
	findAllAsync(request: Request, user: UserDto): Promise<any>;

	/**
	 *
	 * find one
	 */
	findOneAsync(id: string, user: UserDto): Promise<RoomOrder | any>;

	/**
	 *
	 * create
	 */
	createAsync(
		createRoomOrderDto: CreatedRoomOrderDto[],
		user: UserDto
	): Promise<RoomOrder[]>;

	/**
	 *
	 * update
	 */
	updateAsync(
		id: string,
		updateRoomOrderDto: UpdatedRoomOrderDto,
		user: UserDto
	): Promise<RoomOrder>;

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
