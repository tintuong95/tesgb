import {Employee} from '@entities/Employees';
import {CreateEmployeeDto, UpdateEmployeeDto} from 'Entities/Dto/Employees';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

export interface IEmployeesService {
	/**
	 * find all
	 */
	findAllAsync(request: Request, user: UserDto): Promise<any>;

	/**
	 *
	 * find one
	 */
	findOneAsync(id: string, user: UserDto): Promise<Employee | any>;

	/**
	 *
	 * create
	 */
	createAsync(
		createEmployeeDto: CreateEmployeeDto,
		user: UserDto
	): Promise<Employee>;

	/**
	 *
	 * update
	 */
	updateAsync(
		id: string,
		updateEmployeeDto: UpdateEmployeeDto,
		user: UserDto
	): Promise<Employee>;

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
