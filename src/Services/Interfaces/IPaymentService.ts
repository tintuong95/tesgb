import {Payment} from '@entities/Payment';
import {
	CreatePaymentDto,
	CreatePaymentOptionDto,
	UpdatePaymentDto,
} from 'Entities/Dto/Payment';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

export interface IPaymentService {
	_url: string;
	_client_id: string;
	_api_key: string;
	_checksum_key: string;
	/**
	 * find all
	 */
	findAllAsync(request: Request, user: UserDto): Promise<any>;

	/**
	 *
	 * find one
	 */
	findOneAsync(id: number, user: UserDto): Promise<Payment>;

	/**
	 *
	 * create
	 */
	createAsync(
		createPaymentOptionDto: CreatePaymentOptionDto,
		user: UserDto
	): Promise<any>;

	/**
	 *
	 * update
	 */
	updateAsync(
		id: number,
		updatePaymentDto: UpdatePaymentDto,
		user: UserDto
	): Promise<Payment>;

	/**
	 *
	 * remove
	 */
	removeAsync(id: number, user: UserDto): Promise<string>;

	/**
	 *
	 * restore
	 */
	restoreAsync(id: number, user: UserDto): Promise<string>;

	/**
	 *
	 * delete
	 */
	deleteAsync(id: number, user: UserDto): Promise<string>;
}
