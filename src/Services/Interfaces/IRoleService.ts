import {Role} from '@entities/Role';
import {CreateRoleDto, UpdateRoleDto} from 'Entities/Dto/Role';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

export interface IRoleService {
	/**
	 * find all
	 */
	findAllAsync(request: Request, user: UserDto): Promise<any>;

	/**
	 *
	 * find one
	 */
	findOneAsync(id: string, user: UserDto): Promise<Role | any>;

	/**
	 *
	 * create
	 */
	createAsync(createRoleDto: CreateRoleDto, user: UserDto): Promise<Role>;

	/**
	 *
	 * update
	 */
	updateAsync(
		id: string,
		updateRoleDto: UpdateRoleDto,
		user: UserDto
	): Promise<Role>;

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
