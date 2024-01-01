import {HttpStatus, Injectable} from '@nestjs/common';
import {NotFoundException, HttpException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Employee} from '../entities/core';
import {Repository} from 'typeorm';

import * as _ from 'lodash';
import {CreateEmployeeDto, UpdateEmployeeDto} from 'Entities/Dto/core';
import {pagination, queryHandler} from '@util/pagination';
import {findOptionWhere} from '@util/query';
import {Request} from 'express';
import {IEmployeesService} from './Interfaces/IEmployeesService';
import {UserDto} from 'Shared/user.dto';

@Injectable()
export class EmployeesService implements IEmployeesService {
	constructor(
		@InjectRepository(Employee)
		private employeeRepository: Repository<Employee>
	) {}

	async findAllAsync(request: Request, user: UserDto): Promise<any> {
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

			const result = await this.employeeRepository
				.createQueryBuilder('employees')
				.where(`employees.deletedAt IS NULL`)
				.andWhere(`employees.accountId = :accountId`, {
					accountId: `${user.accountId}`,
				})
				.orderBy('employees.createdAt', 'DESC')
				.skip(skip)
				.take(take);
			lastName &&
				result.andWhere('employees.lastName LIKE :lastName', {
					lastName: `%${lastName}%`,
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

	async findOneAsync(id: string, user: UserDto): Promise<Employee | any> {
		try {
			const result = await this.employeeRepository.findOne({
				where: {id, accountId: user.accountId},
			});
			if (!result)
				throw new NotFoundException('Employee Id ' + id + ' Not Found !');
			return result;
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async createAsync(
		createEmployeeDto: CreateEmployeeDto,
		user: UserDto
	): Promise<Employee> {
		try {
			createEmployeeDto.accountId = user.accountId;
			const result = this.employeeRepository.create(createEmployeeDto);
			return await this.employeeRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async updateAsync(
		id: string,
		updateEmployeeDto: UpdateEmployeeDto,
		user: UserDto
	): Promise<Employee> {
		try {
			const result = await this.employeeRepository.findOne({where: {id}});
			if (!result)
				throw new NotFoundException('Employee Id ' + id + ' Not Found !');

			_(updateEmployeeDto).forEach((val, key) => {
				if (val) result[key] = val;
			});
			return this.employeeRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async removeAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.employeeRepository.softDelete({
			id,
			accountId: user.accountId,
		});
		if (result.affected > 0)
			return 'Deleted Employee Id ' + id + ' successfully !';
		throw new NotFoundException('Employee Id ' + id + ' Not Found !');
	}

	async restoreAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.employeeRepository.restore({
			id,
			accountId: user.accountId,
		});
		if (result.affected > 0)
			return 'Restore Employee Id ' + id + ' successfully !';
		throw new NotFoundException('Employee Id ' + id + ' Not Found !');
	}

	async deleteAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.employeeRepository.delete(id);
		if (result.affected > 0)
			return 'Deleted Employee Id ' + id + ' successfully !';
		throw new NotFoundException('Employee Id ' + id + ' Not Found !');
	}

	async countEmployeeStatusCurrent(
		user: UserDto,
		request: Request
	): Promise<any> {
		const {status} = request.query;
		const rs = await this.employeeRepository
			.createQueryBuilder('employees')
			.where(`employees.deletedAt IS NULL`)
			.andWhere(`employees.accountId = :accountId`, {
				accountId: `${user.accountId}`,
			})
			.andWhere(`employees.status = :status`, {
				status: status,
			})
			.select('COUNT(*) AS count')
			.getRawOne();
		return rs;
	}
}
