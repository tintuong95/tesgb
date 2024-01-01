import {HttpStatus, Injectable} from '@nestjs/common';
import {NotFoundException, HttpException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Customer} from '../entities/core';
import {In, Repository} from 'typeorm';
import {CreateCustomerDto, UpdateCustomerDto} from '../Entities/Dto/core';
import * as _ from 'lodash';
import {pagination, queryHandler} from '@util/pagination';
import {findOptionWhere} from '@util/query';
import {Request} from 'express';
import {UserDto} from 'Shared/user.dto';
import {ICustomerService} from './Interfaces/ICustomerService';
import {NOTFOUND} from 'dns';

@Injectable()
export class CustomerService implements ICustomerService {
	constructor(
		@InjectRepository(Customer)
		private customerRepository: Repository<Customer>
	) {}

	async findAllAsync(user: UserDto, request: Request): Promise<any> {
		try {
			const {skip, take, currentPage, perPage} = queryHandler(request.query);
			const {
				idCard = '',
				phone = '',
				lastName = '',
				address = '',
				startDate = '',
				endDate = '',
			} = request.query;
			const result = this.customerRepository
				.createQueryBuilder('customers')
				.where(`customers.deletedAt IS NULL`)
				.andWhere(`customers.accountId = :accountId`, {
					accountId: `${user.accountId}`,
				})
				.orderBy('customers.createdAt', 'DESC')
				.skip(skip)
				.take(take);

			idCard &&
				result.andWhere('customers.idCard LIKE :idCard', {
					idCard: `%${idCard}%`,
				});
			phone &&
				result.andWhere('customers.phone LIKE :phone', {
					phone: `%${phone}%`,
				});
			lastName &&
				result.andWhere('customers.lastName LIKE :lastName', {
					lastName: `%${lastName}%`,
				});
			address &&
				result.andWhere('customers.address LIKE :address', {
					address: `%${address}%`,
				});
			startDate &&
				result.andWhere('customers.createdAt >= :startDate', {
					startDate: new Date(startDate.toString()),
				});
			endDate &&
				result.andWhere('customers.createdAt <= :endDate', {
					endDate: new Date(endDate.toString()),
				});

			const count = await result.getCount();
			const customers = await result.getMany();

			if (count == 0)
				return new HttpException('Not Found', HttpStatus.NOT_FOUND);
			return pagination(request, [customers, count], currentPage, perPage);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async findByIdCards(
		user: UserDto,
		idCards: Array<string>
	): Promise<Customer[]> {
		return this.customerRepository.find({
			where: {idCard: In(idCards)},
		});
	}

	async findOneAsync(id: string, user: UserDto): Promise<Customer> {
		try {
			const result = await this.customerRepository.findOne({
				where: {id, accountId: user.accountId},
			});
			if (!result)
				throw new NotFoundException('Customer Id ' + id + ' Not Found !');
			return result;
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async createAsync(
		createCustomerDto: CreateCustomerDto[]
	): Promise<Customer[]> {
		try {
			const result = this.customerRepository.create(createCustomerDto);
			return await this.customerRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async updateAsync(
		id: string,
		updateCustomerDto: UpdateCustomerDto,
		user: UserDto
	): Promise<Customer> {
		try {
			const result = await this.customerRepository.findOne({where: {id}});
			if (!result)
				throw new NotFoundException('Customer Id ' + id + ' Not Found !');

			_(updateCustomerDto).forEach((val, key) => {
				if (val) result[key] = val;
			});
			return this.customerRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async removeAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.customerRepository.restore({
			id,
			accountId: user.accountId,
		});
		if (result.affected > 0)
			return 'Deleted Customer Id ' + id + ' successfully !';
		throw new NotFoundException('Customer Id ' + id + ' Not Found !');
	}

	async restoreAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.customerRepository.restore({
			id,
			accountId: user.accountId,
		});
		if (result.affected > 0)
			return 'Restore Customer Id ' + id + ' successfully !';
		throw new NotFoundException('Customer Id ' + id + ' Not Found !');
	}

	async deleteAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.customerRepository.delete(id);
		if (result.affected > 0)
			return 'Deleted Customer Id ' + id + ' successfully !';
		throw new NotFoundException('Customer Id ' + id + ' Not Found !');
	}
}
