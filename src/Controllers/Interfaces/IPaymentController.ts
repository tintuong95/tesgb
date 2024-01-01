import {Payment} from '@entities/Payment';
import {
	CreatePaymentDto,
	CreatePaymentOptionDto,
	UpdatePaymentDto,
} from 'Entities/Dto/Payment';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

export interface IPaymentController {
	/**
	 * find all
	 */
	getAllPayments(request: Request, user: UserDto): Promise<Payment[]>;

	/**
	 *
	 * find one
	 */
	getPaymentDetails(id: number, user: UserDto): Promise<Payment>;

	/**
	 *
	 * create
	 */
	createPayment(
		CreatePaymentOptionDto: CreatePaymentOptionDto,
		user: UserDto
	): Promise<Payment>;

	/**
	 *
	 * update
	 */
	updatePayment(
		updatePaymentDto: UpdatePaymentDto,
		user: UserDto,
		id: number
	): Promise<Payment>;

	/**
	 *
	 * remove
	 */
	restorePayment(id: number, user: UserDto): Promise<string>;

	/**
	 *
	 * restore
	 */
	deletePayment(id: number, user: UserDto): Promise<string>;

	/**
	 *
	 * delete
	 */
	removePayment(id: number, user: UserDto): Promise<string>;
}
