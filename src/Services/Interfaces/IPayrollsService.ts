import {Payroll} from '@entities/Payrolls';
import {CreatePayrollDto, UpdatePayrollDto} from 'Entities/Dto/Payrolls';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

export interface IPayrollsService {
	/**
	 * find all
	 */
	findAllAsync(request: Request, user: UserDto): Promise<any>;

	/**
	 *
	 * find one
	 */
	findOneAsync(id: string, user: UserDto): Promise<Payroll | any>;

	/**
	 *
	 * create
	 */
	createAsync(
		createPayrollDto: CreatePayrollDto,
		user: UserDto
	): Promise<Payroll>;

	/**
	 *
	 * update
	 */
	updateAsync(
		id: string,
		updatePayrollDto: UpdatePayrollDto,
		user: UserDto
	): Promise<Payroll>;

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
