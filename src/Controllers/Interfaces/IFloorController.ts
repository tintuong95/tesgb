import {Floor} from '@entities/Floor';
import {CreateFloorDto, UpdateFloorDto} from 'Entities/Dto/Floor';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

export interface IFloorController {
	/**
	 * find all
	 */
	getAllFloors(request: Request, user: UserDto): Promise<Floor[]>;

	/**
	 *
	 * find one
	 */
	getFloorDetails(id: string, user: UserDto): Promise<Floor>;

	/**
	 *
	 * create
	 */
	createFloor(createFloorDto: CreateFloorDto, user: UserDto): Promise<Floor>;

	/**
	 *
	 * update
	 */
	updateFloor(
		updateFloorDto: UpdateFloorDto,
		user: UserDto,
		id: string
	): Promise<Floor>;

	/**
	 *
	 * remove
	 */
	removeFloor(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * restore
	 */
	restoreFloor(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * delete
	 */
	deleteFloor(id: string, user: UserDto): Promise<string>;
}
