import {HttpStatus, Injectable} from '@nestjs/common';
import {NotFoundException, HttpException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Room} from '../entities/core';
import {Repository} from 'typeorm';
import {CreateRoomDto, UpdateRoomDto} from '../Entities/Dto/core';
import * as _ from 'lodash';
import {RoomType} from '@entities/RoomType';
import {CreateRoomTypeDto, UpdateRoomTypeDto} from 'Entities/Dto/RoomType';
import {UserDto} from 'Shared/user.dto';
import {IRoomTypeService} from './Interfaces/IRoomTypeService';
import {Request} from 'express';
import {pagination, queryHandler} from '@util/pagination';

@Injectable()
export class RoomTypeService implements IRoomTypeService {
	constructor(
		@InjectRepository(RoomType)
		private roomTypesRepository: Repository<RoomType>
	) {}

	async findAllAsync(request: Request, user: UserDto): Promise<any> {
		try {
			const {skip, take, currentPage, perPage} = queryHandler(request.query);
			const {
				name = '',

				startDate = '',
				endDate = '',
			} = request.query;

			const result = this.roomTypesRepository
				.createQueryBuilder('roomTypes')
				.leftJoinAndSelect(
					'roomTypes.price',
					'prices',
					'roomTypes.priceId=prices.id'
				)
				.where(`roomTypes.deletedAt IS NULL`)
				.andWhere(`roomTypes.accountId = :accountId`, {
					accountId: `${user.accountId}`,
				})
				.orderBy('roomTypes.createdAt', 'DESC')
				.skip(skip)
				.take(take);

			name &&
				result.andWhere('roomTypes.name LIKE :name', {
					name: `%${name}%`,
				});

			startDate &&
				result.andWhere('roomTypes.createdAt >= :startDate', {
					startDate: new Date(startDate.toString()),
				});
			endDate &&
				result.andWhere('roomTypes.createdAt <= :endDate', {
					endDate: new Date(endDate.toString()),
				});

			const count = await result.getCount();
			const roomTypes = await result.getMany();
			if (count == 0)
				return new HttpException('Not Found', HttpStatus.NOT_FOUND);

			return pagination(request, [roomTypes, count], currentPage, perPage);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async findOneAsync(id: string, user: UserDto): Promise<RoomType | any> {
		try {
			const result = await this.roomTypesRepository.findOne({
				where: {id, accountId: user.accountId},
			});
			if (!result)
				throw new NotFoundException('RoomType Id ' + id + ' Not Found !');
			return result;
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async createAsync(
		createRoomDto: CreateRoomTypeDto,
		user: UserDto
	): Promise<RoomType> {
		try {
			createRoomDto.accountId = user.accountId;
			const result = this.roomTypesRepository.create(createRoomDto);
			return await this.roomTypesRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async updateAsync(
		id: string,
		updateRoomTypeDto: UpdateRoomTypeDto,
		user: UserDto
	): Promise<RoomType> {
		try {
			const result = await this.roomTypesRepository.findOne({where: {id}});
			if (!result)
				throw new NotFoundException('RoomType Id ' + id + ' Not Found !');

			_(updateRoomTypeDto).forEach((val, key) => {
				if (val) result[key] = val;
			});
			return this.roomTypesRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async removeAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.roomTypesRepository.softDelete({
			id,
			accountId: user.accountId,
		});
		if (result.affected > 0)
			return 'Deleted RoomType Id ' + id + ' successfully !';
		throw new NotFoundException('RoomType Id ' + id + ' Not Found !');
	}

	async restoreAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.roomTypesRepository.restore({
			id,
			accountId: user.accountId,
		});
		if (result.affected > 0)
			return 'Restore RoomType Id ' + id + ' successfully !';
		throw new NotFoundException('RoomType Id ' + id + ' Not Found !');
	}

	async deleteAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.roomTypesRepository.delete(id);
		if (result.affected > 0)
			return 'Deleted RoomType Id ' + id + ' successfully !';
		throw new NotFoundException('RoomType Id ' + id + ' Not Found !');
	}
}
