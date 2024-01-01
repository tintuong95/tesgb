import {Staff} from '@entities/Staff';
import {CreateStaffDto, UpdateStaffDto} from 'Entities/Dto/Staff';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

export interface IStaffController {
	/**
	 * find all
	 */
	getAllStaffs(request: Request, user: UserDto): Promise<Staff[]>;

	/**
	 *
	 * find one
	 */
	getStaffDetails(id: string, user: UserDto): Promise<Staff>;

	/**
	 *
	 * create
	 */
	createStaff(createStaffDto: CreateStaffDto, user: UserDto): Promise<Staff>;

	/**
	 *
	 * update
	 */
	updateStaff(
		updateStaffDto: UpdateStaffDto,
		user: UserDto,
		id: string
	): Promise<Staff>;

	/**
	 *
	 * remove
	 */
	removeStaff(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * restore
	 */
	restoreStaff(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * delete
	 */
	deleteStaff(id: string, user: UserDto): Promise<string>;
}
