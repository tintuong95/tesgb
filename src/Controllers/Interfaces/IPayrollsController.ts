import {Payroll} from '@entities/Payrolls';
import {CreatePayrollDto, UpdatePayrollDto} from 'Entities/Dto/Payrolls';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

export interface IPayrollsController {
	/**
	 * find all
	 */
	getAllPayrolls(request: Request, user: UserDto): Promise<Payroll[]>;

	/**
	 *
	 * find one
	 */
	getPayrollDetails(id: string, user: UserDto): Promise<Payroll>;

	/**
	 *
	 * create
	 */
	createPayroll(
		createPayrollDto: CreatePayrollDto,
		user: UserDto
	): Promise<Payroll>;

	/**
	 *
	 * update
	 */
	updatePayroll(
		updatePayrollDto: UpdatePayrollDto,
		user: UserDto,
		id: string
	): Promise<Payroll>;

	/**
	 *
	 * remove
	 */
	removePayroll(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * restore
	 */
	restorePayroll(id: string, user: UserDto): Promise<string>;

	/**
	 *
	 * delete
	 */
	deletePayroll(id: string, user: UserDto): Promise<string>;
}
