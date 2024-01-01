import {Employee} from '@entities/Employees';
import {CreateEmployeeDto, UpdateEmployeeDto} from 'Entities/Dto/Employees';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

export interface IEmployeesController {
	/**
	 * find all
	 */
	getAllEmployees(request: Request, user: UserDto): Promise<Employee[]>;

	/**
	 *
	 * find one
	 */
	getEmployeeDetails(id: string, user: UserDto): Promise<Employee>;

	/**
	 *
	 * create
	 */
	createEmployee(
		createEmployeeDto: CreateEmployeeDto,
		user: UserDto
	): Promise<Employee>;

	/**
	 *
	 * update
	 */
	updateEmployee(
		updateEmployeeDto: UpdateEmployeeDto,
		user: UserDto,
		id: string
	): Promise<Employee>;

	/**
	 *
	 * remove
	 */
	removeEmployee(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * restore
	 */
	restoreEmployee(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * delete
	 */
	deleteEmployee(id: string, user: UserDto): Promise<string>;
}
