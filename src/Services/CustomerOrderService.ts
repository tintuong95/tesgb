import {HttpStatus, Injectable} from '@nestjs/common';
import {NotFoundException, HttpException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {CustomerOrder} from '../entities/core';
import {Repository} from 'typeorm';

import * as _ from 'lodash';
import {
	CreatedCustomerOrderDto,
	UpdatedCustomerOrderDto,
} from 'Entities/Dto/core';
import {UserDto} from 'Shared/user.dto';
import {ICustomerOrderService} from './Interfaces/core';
import {Request} from 'express';

@Injectable()
export class CustomerOrderService implements ICustomerOrderService {
	constructor(
		@InjectRepository(CustomerOrder)
		private customerOrderRepository: Repository<CustomerOrder>
	) {}

	async findAllAsync(
		request: Request,
		user: UserDto
	): Promise<CustomerOrder[]> {
		try {
			return await this.customerOrderRepository.find();
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async findOneAsync(id: string, user: UserDto): Promise<CustomerOrder> {
		try {
			const result = await this.customerOrderRepository.findOne({
				where: {id, accountId: user.accountId},
			});
			if (!result)
				throw new NotFoundException('CustomerOrder Id ' + id + ' Not Found !');
			return result;
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async createAsync(
		createCustomerOrderDto: CreatedCustomerOrderDto[] | any,
		user: UserDto
	): Promise<CustomerOrder[]> {
		try {
			const result = this.customerOrderRepository.create(
				createCustomerOrderDto
			);
			return await this.customerOrderRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async updateAsync(
		id: string,
		user: UserDto,
		updateCustomerOrderDto: UpdatedCustomerOrderDto
	): Promise<CustomerOrder> {
		try {
			const result = await this.customerOrderRepository.findOne({where: {id}});
			if (!result)
				throw new NotFoundException('CustomerOrder Id ' + id + ' Not Found !');

			_(updateCustomerOrderDto).forEach((val, key) => {
				if (val) result[key] = val;
			});
			return this.customerOrderRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async removeAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.customerOrderRepository.restore({
			id,
			accountId: user.accountId,
		});
		if (result.affected > 0)
			return 'Deleted CustomerOrder Id ' + id + ' successfully !';
		throw new NotFoundException('CustomerOrder Id ' + id + ' Not Found !');
	}

	async restoreAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.customerOrderRepository.restore({
			id,
			accountId: user.accountId,
		});
		if (result.affected > 0)
			return 'Restore CustomerOrder Id ' + id + ' successfully !';
		throw new NotFoundException('CustomerOrder Id ' + id + ' Not Found !');
	}

	async deleteAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.customerOrderRepository.delete(id);
		if (result.affected > 0)
			return 'Deleted CustomerOrder Id ' + id + ' successfully !';
		throw new NotFoundException('CustomerOrder Id ' + id + ' Not Found !');
	}
}
