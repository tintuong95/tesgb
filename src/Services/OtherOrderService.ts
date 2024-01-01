import {HttpStatus, Injectable} from '@nestjs/common';
import {NotFoundException, HttpException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {OtherOrder} from '../entities/core';
import {Repository} from 'typeorm';
import {CreatedOtherOrderDto, UpdatedOtherOrderDto} from '../Entities/Dto/core';
import * as _ from 'lodash';
import {IOtherOrderService} from './Interfaces/IOtherOrderService';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

@Injectable()
export class OtherOrderService implements IOtherOrderService {
	constructor(
		@InjectRepository(OtherOrder)
		private OtherOrderRepository: Repository<OtherOrder>
	) {}

	async findAllAsync(request: Request, user: UserDto): Promise<any> {
		try {
			return await this.OtherOrderRepository.find();
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async findOneAsync(id: string, user: UserDto): Promise<OtherOrder | any> {
		try {
			const result = await this.OtherOrderRepository.findOne({
				where: {id, accountId: user.accountId},
			});
			if (!result)
				throw new NotFoundException('OtherOrder Id ' + id + ' Not Found !');
			return result;
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async createAsync(
		createOtherOrderDto: CreatedOtherOrderDto[]
	): Promise<OtherOrder[]> {
		try {
			const result = this.OtherOrderRepository.create(createOtherOrderDto);
			return await this.OtherOrderRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async updateAsync(
		id: string,
		updateOtherOrderDto: UpdatedOtherOrderDto,
		user: UserDto
	): Promise<OtherOrder> {
		try {
			const result = await this.OtherOrderRepository.findOne({where: {id}});
			if (!result)
				throw new NotFoundException('OtherOrder Id ' + id + ' Not Found !');

			_(updateOtherOrderDto).forEach((val, key) => {
				if (val) result[key] = val;
			});
			return this.OtherOrderRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async removeAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.OtherOrderRepository.restore({
			id,
			accountId: user.accountId,
		});
		if (result.affected > 0)
			return 'Deleted OtherOrder Id ' + id + ' successfully !';
		throw new NotFoundException('OtherOrder Id ' + id + ' Not Found !');
	}

	async restoreAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.OtherOrderRepository.restore({
			id,
			accountId: user.accountId,
		});
		if (result.affected > 0)
			return 'Restore OtherOrder Id ' + id + ' successfully !';
		throw new NotFoundException('OtherOrder Id ' + id + ' Not Found !');
	}

	async deleteAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.OtherOrderRepository.delete(id);
		if (result.affected > 0)
			return 'Deleted OtherOrder Id ' + id + ' successfully !';
		throw new NotFoundException('OtherOrder Id ' + id + ' Not Found !');
	}
}
