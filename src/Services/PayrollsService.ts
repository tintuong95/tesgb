import {HttpStatus, Injectable} from '@nestjs/common';
import {NotFoundException, HttpException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Payroll} from '../entities/core';
import {Repository} from 'typeorm';
import {CreatePayrollDto, UpdatePayrollDto} from '../Entities/Dto/core';
import * as _ from 'lodash';
import {pagination, queryHandler} from '@util/pagination';
import {findOptionWhere} from '@util/query';
import {Request} from 'express';
import {EMPLOYEE_RELATION} from '@contants/relation';
import {UserDto} from 'Shared/user.dto';
import {IPayrollsService} from './Interfaces/IPayrollsService';

@Injectable()
export class PayrollsService implements IPayrollsService {
	constructor(
		@InjectRepository(Payroll)
		private payrollRepository: Repository<Payroll>
	) {}

	async findAllAsync(request: Request, user: UserDto): Promise<any> {
		try {
			const {skip, take, currentPage, perPage} = queryHandler(request.query);
			const newQuery = findOptionWhere(request.query, ['name']);

			const result = await this.payrollRepository.findAndCount({
				where: {...newQuery, accountId: user.accountId},
				withDeleted: false,
				order: {
					createdAt: {direction: 'desc'},
				},
				take,
				skip,
				relations: [EMPLOYEE_RELATION],
			});
			if (result[1] == 0)
				return new HttpException('Not Found', HttpStatus.NOT_FOUND);

			return pagination(request, result, currentPage, perPage);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async findOneAsync(id: string, user: UserDto): Promise<Payroll | any> {
		try {
			const result = await this.payrollRepository.findOne({
				where: {id},
				relations: [EMPLOYEE_RELATION],
			});
			if (!result)
				throw new NotFoundException('Payroll Id ' + id + ' Not Found !');
			return result;
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async createAsync(
		createPayrollDto: CreatePayrollDto,
		user: UserDto
	): Promise<Payroll> {
		try {
			createPayrollDto.accountId = user.accountId;
			const result = this.payrollRepository.create(createPayrollDto);
			return await this.payrollRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async updateAsync(
		id: string,
		updatePayrollDto: UpdatePayrollDto,
		user: UserDto
	): Promise<Payroll> {
		try {
			const result = await this.payrollRepository.findOne({where: {id}});
			if (!result)
				throw new NotFoundException('Payroll Id ' + id + ' Not Found !');

			_(updatePayrollDto).forEach((val, key) => {
				if (val) result[key] = val;
			});
			return this.payrollRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async removeAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.payrollRepository.restore({
			id,
			accountId: user.accountId,
		});
		if (result.affected > 0)
			return 'Deleted Payroll Id ' + id + ' successfully !';
		throw new NotFoundException('Payroll Id ' + id + ' Not Found !');
	}

	async restoreAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.payrollRepository.restore({
			id,
			accountId: user.accountId,
		});
		if (result.affected > 0)
			return 'Restore Payroll Id ' + id + ' successfully !';
		throw new NotFoundException('Payroll Id ' + id + ' Not Found !');
	}

	async deleteAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.payrollRepository.delete(id);
		if (result.affected > 0)
			return 'Deleted Payroll Id ' + id + ' successfully !';
		throw new NotFoundException('Payroll Id ' + id + ' Not Found !');
	}
}
