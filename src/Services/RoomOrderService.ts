import {HttpStatus, Injectable} from '@nestjs/common';
import {NotFoundException, HttpException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {RoomOrder} from '../entities/core';
import {Repository} from 'typeorm';
import {CreatedRoomOrderDto, UpdatedRoomOrderDto} from '../Entities/Dto/core';
import * as _ from 'lodash';
import {IRoomOrderService} from './Interfaces/IRoomOrderService';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';

@Injectable()
export class RoomOrderService implements IRoomOrderService {
	constructor(
		@InjectRepository(RoomOrder)
		private roomOrderRepository: Repository<RoomOrder>
	) {}

	async findAllAsync(request: Request, user: UserDto): Promise<any> {
		try {
			return await this.roomOrderRepository.find();
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async findOneAsync(id: string, user: UserDto): Promise<RoomOrder | any> {
		try {
			const result = await this.roomOrderRepository.findOne({
				where: {id, accountId: user.accountId},
			});
			if (!result)
				throw new NotFoundException('RoomOrder Id ' + id + ' Not Found !');
			return result;
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async createAsync(
		createRoomOrderDto: CreatedRoomOrderDto[]
	): Promise<RoomOrder[]> {
		try {
			const result = this.roomOrderRepository.create(createRoomOrderDto);
			return await this.roomOrderRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async updateAsync(
		id: string,
		updateRoomOrderDto: UpdatedRoomOrderDto,
		user: UserDto
	): Promise<RoomOrder> {
		try {
			const result = await this.roomOrderRepository.findOne({where: {id}});
			if (!result)
				throw new NotFoundException('RoomOrder Id ' + id + ' Not Found !');

			_(updateRoomOrderDto).forEach((val, key) => {
				if (val) result[key] = val;
			});
			return this.roomOrderRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async removeAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.roomOrderRepository.restore({
			id,
			accountId: user.accountId,
		});
		if (result.affected > 0)
			return 'Deleted RoomOrder Id ' + id + ' successfully !';
		throw new NotFoundException('RoomOrder Id ' + id + ' Not Found !');
	}

	async restoreAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.roomOrderRepository.restore({
			id,
			accountId: user.accountId,
		});
		if (result.affected > 0)
			return 'Restore RoomOrder Id ' + id + ' successfully !';
		throw new NotFoundException('RoomOrder Id ' + id + ' Not Found !');
	}

	async deleteAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.roomOrderRepository.delete(id);
		if (result.affected > 0)
			return 'Deleted RoomOrder Id ' + id + ' successfully !';
		throw new NotFoundException('RoomOrder Id ' + id + ' Not Found !');
	}
}
