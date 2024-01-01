import {HttpStatus, Injectable} from '@nestjs/common';
import {NotFoundException, HttpException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {ServiceType} from '../entities/core';
import {Repository} from 'typeorm';
import {CreateServiceTypeDto, UpdateServiceTypeDto} from '../Entities/Dto/core';
import * as _ from 'lodash';
import {SERVICE_RELATION} from '@contants/relation';
import {IServiceTypeService} from './Interfaces/IServiceTypeService';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

@Injectable()
export class ServiceTypeService implements IServiceTypeService {
	constructor(
		@InjectRepository(ServiceType)
		private serviceRepository: Repository<ServiceType>
	) {}

	async findAllAsync(request: Request, user: UserDto): Promise<any> {
		try {
			return await this.serviceRepository.find({
				relations: [SERVICE_RELATION],
			});
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async findOneAsync(id: string, user: UserDto): Promise<ServiceType | any> {
		try {
			const result = await this.serviceRepository.findOne({
				where: {id, accountId: user.accountId},
			});
			if (!result)
				throw new NotFoundException('ServiceType Id ' + id + ' Not Found !');
			return result;
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async createAsync(
		createServiceTypeDto: CreateServiceTypeDto,
		user: UserDto
	): Promise<ServiceType> {
		try {
			createServiceTypeDto.accountId = user.accountId;
			const result = this.serviceRepository.create(createServiceTypeDto);
			return await this.serviceRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async updateAsync(
		id: string,
		updateServiceTypeDto: UpdateServiceTypeDto,
		user: UserDto
	): Promise<ServiceType> {
		try {
			const result = await this.serviceRepository.findOne({where: {id}});
			if (!result)
				throw new NotFoundException('ServiceType Id ' + id + ' Not Found !');

			_(updateServiceTypeDto).forEach((val, key) => {
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
			return 'Deleted ServiceType Id ' + id + ' successfully !';
		throw new NotFoundException('ServiceType Id ' + id + ' Not Found !');
	}

	async restoreAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.serviceRepository.restore({
			id,
			accountId: user.accountId,
		});
		if (result.affected > 0)
			return 'Restore ServiceType Id ' + id + ' successfully !';
		throw new NotFoundException('ServiceType Id ' + id + ' Not Found !');
	}

	async deleteAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.serviceRepository.delete(id);
		if (result.affected > 0)
			return 'Deleted ServiceType Id ' + id + ' successfully !';
		throw new NotFoundException('ServiceType Id ' + id + ' Not Found !');
	}
}
