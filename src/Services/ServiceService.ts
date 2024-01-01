import {HttpStatus, Injectable} from '@nestjs/common';
import {NotFoundException, HttpException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Service} from '../entities/core';
import {Repository} from 'typeorm';
import {CreateServiceDto, UpdateServiceDto} from '../Entities/Dto/core';
import * as _ from 'lodash';
import {Request} from 'express';
import {pagination, queryHandler} from '@util/pagination';
import {findOptionWhere} from '@util/query';
import {SERVICE_TYPE_RELATION, UNIT_RELATION} from '@contants/relation';
import {IServiceService} from './Interfaces/IServiceService';
import {UserDto} from 'Shared/user.dto';

@Injectable()
export class ServiceService implements IServiceService {
	constructor(
		@InjectRepository(Service)
		private serviceRepository: Repository<Service>
	) {}

	async findAllAsync(request: Request, user: UserDto): Promise<any> {
		try {
			const {skip, take, currentPage, perPage} = queryHandler(request.query);
			const {
				name = '',
				unitId = '',
				startDate = '',
				endDate = '',
				serviceTypeId = '',
			} = request.query;

			const result = this.serviceRepository
				.createQueryBuilder('services')
				.leftJoinAndSelect(
					'services.serviceType',
					'serviceTypes',
					'services.serviceTypeId=serviceTypes.id'
				)
				.leftJoinAndSelect(
					'services.unit',
					'units',
					'services.unitId = units.id'
				)
				.where(`services.deletedAt IS NULL`)
				.andWhere(`services.accountId = :accountId`, {
					accountId: `${user.accountId}`,
				})
				.orderBy('services.createdAt', 'DESC')
				.skip(skip)
				.take(take);

			unitId &&
				result.andWhere('services.unitId = :unitId', {
					unitId: `${unitId}`,
				});
			name &&
				result.andWhere('services.name LIKE :name', {
					name: `%${name}%`,
				});
			serviceTypeId &&
				result.andWhere('serviceTypes.id = :serviceTypeId', {
					serviceTypeId: `${serviceTypeId}`,
				});
			startDate &&
				result.andWhere('services.createdAt >= :startDate', {
					startDate: new Date(startDate.toString()),
				});
			endDate &&
				result.andWhere('services.createdAt <= :endDate', {
					endDate: new Date(endDate.toString()),
				});
			const count = await result.getCount();
			const services = await result.getMany();
			if (count == 0)
				return new HttpException('Not Found', HttpStatus.NOT_FOUND);

			return pagination(request, [services, count], currentPage, perPage);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async findOneAsync(id: string, user: UserDto): Promise<Service | any> {
		try {
			const result = await this.serviceRepository.findOne({
				where: {id, accountId: user.accountId},
			});
			if (!result)
				throw new NotFoundException('Service Id ' + id + ' Not Found !');
			return result;
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async findByServiceTypeId(
		serviceTypeId: string,
		user: UserDto
	): Promise<Service | any> {
		try {
			const result = await this.serviceRepository.find({
				where: {serviceTypeId, accountId: user.accountId},
				relations: [UNIT_RELATION],
			});
			if (!result)
				throw new NotFoundException(
					'Service Id ' + serviceTypeId + ' Not Found !'
				);
			return result;
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async createAsync(
		createServiceDto: CreateServiceDto,
		user: UserDto
	): Promise<Service> {
		try {
			createServiceDto.accountId = user.accountId;
			const result = this.serviceRepository.create(createServiceDto);
			return await this.serviceRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async updateAsync(
		id: string,
		updateServiceDto: UpdateServiceDto,
		user: UserDto
	): Promise<Service> {
		try {
			const result = await this.serviceRepository.findOne({where: {id}});
			if (!result)
				throw new NotFoundException('Service Id ' + id + ' Not Found !');

			_(updateServiceDto).forEach((val, key) => {
				if (val) result[key] = val;
			});
			return this.serviceRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async removeAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.serviceRepository.softDelete({
			id,
			accountId: user.accountId,
		});
		if (result.affected > 0)
			return 'Deleted Service Id ' + id + ' successfully !';
		throw new NotFoundException('Service Id ' + id + ' Not Found !');
	}

	async restoreAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.serviceRepository.restore({
			id,
			accountId: user.accountId,
		});
		if (result.affected > 0)
			return 'Restore Service Id ' + id + ' successfully !';
		throw new NotFoundException('Service Id ' + id + ' Not Found !');
	}

	async deleteAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.serviceRepository.delete(id);
		if (result.affected > 0)
			return 'Deleted Service Id ' + id + ' successfully !';
		throw new NotFoundException('Service Id ' + id + ' Not Found !');
	}

	async countServiceStatusCurrent(
		user: UserDto,
		request: Request
	): Promise<any> {
		const {status} = request.query;
		const rs = await this.serviceRepository
			.createQueryBuilder('services')
			.where(`services.deletedAt IS NULL`)
			.andWhere(`services.accountId = :accountId`, {
				accountId: `${user.accountId}`,
			})
			.andWhere(`services.status = :status`, {
				status: status,
			})
			.select('COUNT(*) AS count')
			.getRawOne();
		return rs;
	}
}
