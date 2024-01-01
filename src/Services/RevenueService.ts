import {HttpStatus, Injectable} from '@nestjs/common';
import {NotFoundException, HttpException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Revenue} from '../entities/core';
import {Repository} from 'typeorm';
import * as DTO from '../Entities/Dto/core';
import * as _ from 'lodash';
import {IRevenueService} from './Interfaces/IRevenueService';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';
import {pagination, queryHandler} from '@util/pagination';
import {REVENUE_STATE, REVENUE_TYPE} from '@entities/Types/Revenue';

@Injectable()
export class RevenueService implements IRevenueService {
	constructor(
		@InjectRepository(Revenue)
		private revenueRepository: Repository<Revenue>
	) {}

	async findAllAsync(request: Request, user: UserDto): Promise<any> {
		try {
			const {skip, take, currentPage, perPage} = queryHandler(request.query);
			const {id = '', type = '', startDate = '', endDate = ''} = request.query;

			const result = this.revenueRepository
				.createQueryBuilder('revenues')
				.leftJoinAndSelect('revenues.member', 'members')
				// .leftJoinAndSelect('revenues.payroll', 'payrolls')
				// .leftJoinAndSelect('revenues.stockHistory', 'stockHistorys')
				// .leftJoinAndSelect('revenues.order', 'orders')
				.where(`revenues.deletedAt IS NULL`)

				.andWhere(`revenues.accountId = :accountId`, {
					accountId: `${user.accountId}`,
				});

			request.query?.type &&
				result.andWhere(`revenues.type = :type`, {
					type: `${request.query?.type}`,
				});
			request.query?.referenceType &&
				result.andWhere(`revenues.referenceType = :referenceType`, {
					referenceType: `${request.query?.referenceType}`,
				});
			result.orderBy('revenues.createdAt', 'DESC').skip(skip).take(take);
			startDate &&
				result.andWhere('revenues.createdAt >= :startDate', {
					startDate: new Date(startDate.toString()),
				});
			endDate &&
				result.andWhere('revenues.createdAt <= :endDate', {
					endDate: new Date(endDate.toString()),
				});
			const count = await result.getCount();
			const revenues = await result.getMany();
			if (count == 0)
				return new HttpException('Not Found', HttpStatus.NOT_FOUND);

			return pagination(request, [revenues, count], currentPage, perPage);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async findOneAsync(id: string, user: UserDto): Promise<Revenue | any> {
		try {
			const result = await this.revenueRepository.findOne({
				where: {id},
			});
			if (!result)
				throw new NotFoundException('Revenue Id ' + id + ' Not Found !');
			return result;
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async createAsync(
		createRevenueDto: DTO.CreateRevenueDto,
		user: UserDto
	): Promise<Revenue> {
		try {
			createRevenueDto.accountId = user.accountId;
			createRevenueDto.memberId = user.id;
			const result = this.revenueRepository.create(createRevenueDto);
			return await this.revenueRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async updateAsync(
		id: string,
		updateRevenueDto: DTO.UpdateRevenueDto,
		user: UserDto
	): Promise<Revenue> {
		try {
			const result = await this.revenueRepository.findOne({where: {id}});
			if (!result)
				throw new NotFoundException('Revenue Id ' + id + ' Not Found !');

			_(updateRevenueDto).forEach((val, key) => {
				if (val) result[key] = val;
			});
			return this.revenueRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async removeAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.revenueRepository.softDelete({
			id,
		});
		if (result.affected > 0)
			return 'Deleted Revenue Id ' + id + ' successfully !';
		throw new NotFoundException('Revenue Id ' + id + ' Not Found !');
	}

	async restoreAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.revenueRepository.restore({
			id,
		});
		if (result.affected > 0)
			return 'Restore Revenue Id ' + id + ' successfully !';
		throw new NotFoundException('Revenue Id ' + id + ' Not Found !');
	}

	async deleteAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.revenueRepository.delete(id);
		if (result.affected > 0)
			return 'Deleted Revenue Id ' + id + ' successfully !';
		throw new NotFoundException('Revenue Id ' + id + ' Not Found !');
	}

	async getRevenueAndExpendTotalByTime(
		request: Request,
		user: UserDto
	): Promise<any> {
		const {startDate = '10-10-1999', endDate = '10-10-2999'} = request.query;
		const result = await this.revenueRepository
			.createQueryBuilder('revenues')
			.where(`revenues.deletedAt IS NULL`)
			.andWhere(`revenues.accountId = :accountId`, {
				accountId: `${user.accountId}`,
			})
			.andWhere('revenues.createdAt >= :startDate', {
				startDate: new Date(startDate.toString()),
			})
			.andWhere('revenues.createdAt <= :endDate', {
				endDate: new Date(endDate.toString()),
			})
			.select('type')
			.addSelect('SUM(amount)', 'sumTotal')
			.groupBy('type')
			.getRawMany();
		const revenue =
			_.find(result, {type: String(REVENUE_STATE.REVENUE)})?.sumTotal || 0;
		const expenses =
			_.find(result, {type: String(REVENUE_STATE.EXPENSES)})?.sumTotal || 0;
		const total = +revenue + +expenses;

		const revenueRatio = Math.round((revenue / total) * 100);
		const expensesRatio = 100 - revenueRatio;
		return {
			revenue,
			expenses,
			revenueRatio,
			expensesRatio,
		};
	}

	async getRevenueAndExpendInDate(
		request: Request,
		user: UserDto
	): Promise<any> {
		const {
			startDate = '10-09-1999',
			endDate = '10-09-2999',
			referenceType = REVENUE_TYPE.ORDER,
		} = request.query;

		const result = await this.revenueRepository
			.createQueryBuilder('revenues')
			.where(`revenues.deletedAt IS NULL`)
			.andWhere(`revenues.accountId = :accountId`, {
				accountId: `${user.accountId}`,
			})
			.andWhere('revenues.createdAt >= :startDate', {
				startDate: new Date(startDate.toString()),
			})
			.andWhere('revenues.createdAt <= :endDate', {
				endDate: new Date(endDate.toString()),
			})
			.andWhere('revenues.referenceType = :referenceType', {
				referenceType: `${referenceType}`,
			})

			.select([
				'DATE_FORMAT(revenues.createdAt, "%d-%b-%Y") as formattedDate',
				'revenues.type as type',
				'SUM(revenues.amount) as totalAmount',
			])
			.groupBy('formattedDate, type')
			.orderBy('formattedDate', 'ASC')
			.addOrderBy('type', 'ASC')

			.getRawMany();
		return result;
	}

	async getRevenueAndExpendInDateByReferenceType(
		request: Request,
		user: UserDto
	): Promise<any> {
		const {
			startDate = '10-09-1999',
			endDate = '10-09-2999',
			referenceType = '',
		} = request.query;

		const result = await this.revenueRepository
			.createQueryBuilder('revenues')
			.where(`revenues.deletedAt IS NULL`)
			.andWhere(`revenues.accountId = :accountId`, {
				accountId: `${user.accountId}`,
			})
			.andWhere('revenues.createdAt >= :startDate', {
				startDate: new Date(startDate.toString()),
			})
			.andWhere('revenues.createdAt <= :endDate', {
				endDate: new Date(endDate.toString()),
			})
			.andWhere('revenues.referenceType = :referenceType', {
				referenceType: `${referenceType}`,
			})
			.andWhere('revenues.type = :type', {
				type: `${REVENUE_STATE.REVENUE}`,
			})

			.select([
				'DATE_FORMAT(revenues.createdAt, "%d-%b-%Y") as formattedDate',
				'revenues.type as type',
				'SUM(revenues.amount) as totalAmount',
			])
			.groupBy('formattedDate, type')
			.orderBy('formattedDate', 'ASC')
			.addOrderBy('type', 'ASC')

			.getRawMany();
		return result;
	}

	async getTotalRevenue(user: UserDto): Promise<any> {
		const result = await this.revenueRepository
			.createQueryBuilder('revenues')
			.where(`revenues.deletedAt IS NULL`)
			.andWhere(`revenues.accountId = :accountId`, {
				accountId: `${user.accountId}`,
			})
			.select('type')
			.addSelect('SUM(amount)', 'sumTotal')
			.groupBy('type')
			.getRawMany();
		const revenue =
			_.find(result, {type: String(REVENUE_STATE.REVENUE)})?.sumTotal || 0;
		const expenses =
			_.find(result, {type: String(REVENUE_STATE.EXPENSES)})?.sumTotal || 0;

		return {revenue, expenses};
	}
}
