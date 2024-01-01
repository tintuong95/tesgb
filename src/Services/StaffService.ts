import {HttpStatus, Injectable} from '@nestjs/common';
import {NotFoundException, HttpException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Staff} from '../entities/core';
import {Repository} from 'typeorm';
import {CreateStaffDto, UpdateStaffDto} from '../Entities/Dto/core';
import * as _ from 'lodash';
import {UserDto} from 'Shared/user.dto';
import {IStaffService} from './Interfaces/IStaffService';
import {Request} from 'express';
import {pagination, queryHandler} from '@util/pagination';

@Injectable()
export class StaffService implements IStaffService {
	constructor(
		@InjectRepository(Staff)
		private staffRepository: Repository<Staff>
	) {}

	async findAllAsync(request: Request, user: UserDto): Promise<any> {
		try {
			const {skip, take, currentPage, perPage} = queryHandler(request.query);
			const {
				id = '',
				status = '',
				startDate = '',
				endDate = '',
			} = request.query;

			const result = this.staffRepository
				.createQueryBuilder('staffs')
				// .leftJoinAndSelect('revenues.member', 'members')
				// .leftJoinAndSelect('revenues.payroll', 'payrolls')
				// .leftJoinAndSelect('revenues.stockHistory', 'stockHistorys')
				// .leftJoinAndSelect('revenues.order', 'orders')
				.where(`staffs.deletedAt IS NULL`)
				.andWhere(`staffs.accountId = :accountId`, {
					accountId: `${user.accountId}`,
				})
				.orderBy('staffs.createdAt', 'DESC')
				.skip(skip)
				.take(take);
			const count = await result.getCount();
			const staffs = await result.getMany();
			if (count == 0)
				return new HttpException('Not Found', HttpStatus.NOT_FOUND);

			return pagination(request, [staffs, count], currentPage, perPage);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async findOneAsync(id: string, user: UserDto): Promise<Staff | any> {
		try {
			const result = await this.staffRepository.findOne({
				where: {id, accountId: user.accountId},
			});
			if (!result)
				throw new NotFoundException('Staff Id ' + id + ' Not Found !');
			return result;
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async createAsync(
		createStaffDto: CreateStaffDto,
		user: UserDto
	): Promise<Staff> {
		try {
			const result = this.staffRepository.create(createStaffDto);
			return await this.staffRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async updateAsync(
		id: string,
		updateStaffDto: UpdateStaffDto,
		user: UserDto
	): Promise<Staff> {
		try {
			const result = await this.staffRepository.findOne({where: {id}});
			if (!result)
				throw new NotFoundException('Staff Id ' + id + ' Not Found !');

			_(updateStaffDto).forEach((val, key) => {
				if (val) result[key] = val;
			});
			return this.staffRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async removeAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.staffRepository.restore({
			id,
			accountId: user.accountId,
		});
		if (result.affected > 0)
			return 'Deleted Staff Id ' + id + ' successfully !';
		throw new NotFoundException('Staff Id ' + id + ' Not Found !');
	}

	async restoreAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.staffRepository.restore({
			id,
			accountId: user.accountId,
		});
		if (result.affected > 0)
			return 'Restore Staff Id ' + id + ' successfully !';
		throw new NotFoundException('Staff Id ' + id + ' Not Found !');
	}

	async deleteAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.staffRepository.delete(id);
		if (result.affected > 0)
			return 'Deleted Staff Id ' + id + ' successfully !';
		throw new NotFoundException('Staff Id ' + id + ' Not Found !');
	}
}
