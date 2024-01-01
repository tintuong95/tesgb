import {HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {NotFoundException, HttpException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Payment} from '../entities/core';
import {Repository} from 'typeorm';
import {
	CreatePaymentDto,
	CreatePaymentOptionDto,
	UpdatePaymentDto,
} from '../Entities/Dto/core';
import * as _ from 'lodash';
import {pagination, queryHandler} from '@util/pagination';
import {findOptionWhere} from '@util/query';
import {Request} from 'express';
import {ORDER_RELATION} from '@contants/relation';
import {IPaymentService} from './Interfaces/IPaymentService';
import {UserDto} from 'Shared/user.dto';
import {ConfigService} from '@nestjs/config';

import {HttpService} from '@nestjs/axios';
import {ACCOUNT_TYPE} from '@entities/Types/Account';
import {PAYMENT_OPTION, PAYMENT_STATUS} from '@entities/Types/Payment';
import {generateHmacSha256} from '@util/payos';
import {PRICE_OPTION_TOTAL, TIME_OPTION} from 'Contants/price';
import * as moment from 'moment';

@Injectable()
export class PaymentService implements IPaymentService {
	_url = '';
	_client_id = '';
	_api_key = '';
	_checksum_key = '';
	_domain_frontend = '';

	constructor(
		@InjectRepository(Payment)
		private paymentRepository: Repository<Payment>,
		private configService: ConfigService,
		private readonly httpService: HttpService
	) {
		this._url = this.configService.get<string>('payos.url');
		this._client_id = this.configService.get<string>('payos.client_id');
		this._api_key = this.configService.get<string>('payos.api_key');
		this._checksum_key = this.configService.get<string>('payos.checksum_key');
		this._domain_frontend = this.configService.get<string>('domain.frontend');
	}

	async findAllAsync(request: Request, user: UserDto): Promise<any> {
		try {
			const {skip, take, currentPage, perPage} = queryHandler(request.query);

			const result = await this.paymentRepository.findAndCount({
				where: {
					accountId: user.accountId,
					status: PAYMENT_STATUS.Success,
				},
				withDeleted: false,
				order: {
					createdAt: {direction: 'desc'},
				},
				take,
				skip,
			});
			if (result[1] == 0)
				return new HttpException('Not Found', HttpStatus.NOT_FOUND);

			return pagination(request, result, currentPage, perPage);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async findOneAsync(id: number, user: UserDto): Promise<Payment | any> {
		try {
			const result = await this.paymentRepository.findOne({
				where: {id, accountId: user.accountId},
			});
			if (!result)
				throw new NotFoundException('Payment Id ' + id + ' Not Found !');
			return result;
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async createAsync(
		createPaymentOptionDto: CreatePaymentOptionDto,
		user: UserDto
	): Promise<any> {
		try {
			const newPayment = new CreatePaymentDto();
			newPayment.accountId = user.accountId;
			newPayment.amount =
				PRICE_OPTION_TOTAL[createPaymentOptionDto.type][
					createPaymentOptionDto.option
				];
			newPayment.option = createPaymentOptionDto.option;
			newPayment.type = createPaymentOptionDto.type;
			newPayment.description = 'TEST';
			newPayment.expiredAt = new Date(
				moment()
					.add(TIME_OPTION[createPaymentOptionDto.option], 'months')
					.format('DD-MMM-YYYY HH:mm:ss')
			);

			const payment = await this.paymentRepository.save(newPayment);

			let data: any = {
				orderCode: Number(payment.id),
				amount: Number(payment.amount),
				description: payment.description || 'Not Found',
				cancelUrl: this._domain_frontend + `/tai-khoan/nang-cap`,
				returnUrl: this._domain_frontend + `/tai-khoan/nang-cap`,
			};
			const signature = generateHmacSha256(data, this._checksum_key);
			data = {...data, signature};
			const headers = {
				'x-client-id': this._client_id,
				'x-api-key': this._api_key,
			};
			const result = await this.httpService.axiosRef.post(
				this._url + '/v2/payment-requests',
				data,
				{headers}
			);

			if (result.status === 200) {
				if (result?.data?.code == '00') {
					payment.signature = signature;

					this.paymentRepository.save(payment);
					return result?.data;
				}
			}
			throw new HttpException(
				'Create payment fail',
				HttpStatus.INTERNAL_SERVER_ERROR
			);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async updateAsync(
		id: number,
		updatePaymentDto: UpdatePaymentDto,
		user: UserDto
	): Promise<Payment> {
		try {
			const result = await this.paymentRepository.findOne({where: {id}});
			if (!result)
				throw new NotFoundException('Payment Id ' + id + ' Not Found !');
			if (user.accountId != result.accountId)
				throw new UnauthorizedException('Unauthorized payment');
			_(updatePaymentDto).forEach((val, key) => {
				if (val) result[key] = val;
			});
			return this.paymentRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async removeAsync(id: number, user: UserDto): Promise<string> {
		const result = await this.paymentRepository.restore({
			id,
			accountId: user.accountId,
		});
		if (result.affected > 0)
			return 'Deleted Payment Id ' + id + ' successfully !';
		throw new NotFoundException('Payment Id ' + id + ' Not Found !');
	}

	async restoreAsync(id: number, user: UserDto): Promise<string> {
		const result = await this.paymentRepository.restore({
			id,
			accountId: user.accountId,
		});
		if (result.affected > 0)
			return 'Restore Payment Id ' + id + ' successfully !';
		throw new NotFoundException('Payment Id ' + id + ' Not Found !');
	}

	async deleteAsync(id: number, user: UserDto): Promise<string> {
		const result = await this.paymentRepository.delete(id);
		if (result.affected > 0)
			return 'Deleted Payment Id ' + id + ' successfully !';
		throw new NotFoundException('Payment Id ' + id + ' Not Found !');
	}

	async checkPaymentRequest(id: string, user: UserDto): Promise<any> {
		try {
			const headers = {
				'x-client-id': this._client_id,
				'x-api-key': this._api_key,
			};
			const result = await this.httpService.axiosRef.get(
				this._url + '/v2/payment-requests/' + id,
				{headers}
			);

			if ((result.data.code = '00')) {
				const payment = await this.paymentRepository.findOne({
					where: {id: result?.data?.data?.orderCode, accountId: user.accountId},
				});
				if (payment) {
					payment.status = PAYMENT_STATUS.Success;
					this.paymentRepository.save(payment);
				}
				return payment;
			}
			return false;
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
