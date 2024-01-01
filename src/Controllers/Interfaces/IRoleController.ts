import {Role} from '@entities/Role';
import {CreateRoleDto, UpdateRoleDto} from 'Entities/Dto/Role';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

export interface IRoleController {
	/**
	 * find all
	 */
	getAllRoles(request: Request, user: UserDto): Promise<Role[]>;

	/**
	 *
	 * find one
	 */
	getRoleDetails(id: string, user: UserDto): Promise<Role>;

	/**
	 *
	 * create
	 */
	createRole(createRoleDto: CreateRoleDto, user: UserDto): Promise<Role>;

	/**
	 *
	 * update
	 */
	updateRole(
		updateRoleDto: UpdateRoleDto,
		user: UserDto,
		id: string
	): Promise<Role>;

	/**
	 *
	 * remove
	 */
	removeRole(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * restore
	 */
	restoreRole(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * delete
	 */
	deleteRole(id: string, user: UserDto): Promise<string>;
}
