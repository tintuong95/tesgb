import {HttpStatus, Injectable} from '@nestjs/common';
import {NotFoundException, HttpException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Floor} from '../entities/core';
import {Repository} from 'typeorm';
import {CreateFloorDto, UpdateFloorDto} from '../Entities/Dto/core';
import * as _ from 'lodash';
import {UserDto} from 'Shared/user.dto';
import {IFloorService} from './Interfaces/IFloorService';
import {Request} from 'express';

@Injectable()
export class FloorService implements IFloorService {
	constructor(
		@InjectRepository(Floor)
		private floorRepository: Repository<Floor>
	) {}

	async findAllAsync(request: Request, user: UserDto): Promise<any> {
		try {
			const result = await this.floorRepository.find({
				where: {accountId: user.accountId},
			});

			if (result.length == 0)
				throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
			return result;
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async findOneAsync(id: string, user: UserDto): Promise<Floor> {
		try {
			const result = await this.floorRepository.findOne({
				where: {id, accountId: user.accountId},
			});
			if (!result)
				throw new NotFoundException('Floor Id ' + id + ' Not Found !');
			return result;
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async createAsync(
		createFloorDto: CreateFloorDto,
		user: UserDto
	): Promise<Floor> {
		try {
			const newFloorDto = {...createFloorDto, accountId: user.accountId};
			const result = this.floorRepository.create(newFloorDto);
			return await this.floorRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async updateAsync(
		id: string,
		updateFloorDto: UpdateFloorDto,
		user: UserDto
	): Promise<Floor> {
		try {
			const result = await this.floorRepository.findOne({where: {id}});
			if (!result)
				throw new NotFoundException('Floor Id ' + id + ' Not Found !');

			_(updateFloorDto).forEach((val, key) => {
				if (val) result[key] = val;
			});
			return this.floorRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async removeAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.floorRepository.softDelete({
			id,
			accountId: user.accountId,
		});
		if (result.affected > 0)
			return 'Deleted Floor Id ' + id + ' successfully !';
		throw new NotFoundException('Floor Id ' + id + ' Not Found !');
	}

	async restoreAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.floorRepository.restore({
			id,
			accountId: user.accountId,
		});
		if (result.affected > 0)
			return 'Restore Floor Id ' + id + ' successfully !';
		throw new NotFoundException('Floor Id ' + id + ' Not Found !');
	}

	async deleteAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.floorRepository.delete(id);
		if (result.affected > 0)
			return 'Deleted Floor Id ' + id + ' successfully !';
		throw new NotFoundException('Floor Id ' + id + ' Not Found !');
	}
}
