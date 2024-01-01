import {HttpStatus, Injectable} from '@nestjs/common';
import {NotFoundException, HttpException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Room} from '../entities/core';
import {Repository} from 'typeorm';
import {CreateRoomDto, UpdateRoomDto} from '../Entities/Dto/core';
import * as _ from 'lodash';
import {
	FLOOR_RELATION,
	ROOM_TYPE_PRICE_RELATION,
	ROOM_TYPE_RELATION,
} from '@contants/relation';
import {UserDto} from 'Shared/user.dto';
import {IRoomService} from './Interfaces/IRoomService';
import {Request} from 'express';
import {pagination, queryHandler} from '@util/pagination';
import * as TYPE from '../Entities/Types/core';
@Injectable()
export class RoomService implements IRoomService {
	constructor(
		@InjectRepository(Room)
		private roomRepository: Repository<Room>
	) {}

	async findAllAsync(
		request: Request,
		user: UserDto
	): Promise<{rooms: Room[]; count: number} | HttpException | any> {
		try {
			const {skip, take, currentPage, perPage} = queryHandler(request.query);

			const {name = '', roomTypeId = '', floorId = ''} = request.query;
			const result = this.roomRepository
				.createQueryBuilder('rooms')
				.leftJoinAndSelect(
					'rooms.roomType',
					'roomTypes',
					'rooms.roomTypeId = roomTypes.id'
				)
				.leftJoinAndSelect('rooms.floor', 'floors', 'rooms.floorId = floors.id')
				.leftJoinAndSelect(
					'roomTypes.price',
					'prices',
					'roomTypes.priceId = prices.id'
				)
				.leftJoinAndSelect(
					'prices.priceItem',
					'priceItems',
					'prices.id = priceItems.priceId'
				)
				.where(`rooms.deletedAt IS NULL`)
				.andWhere(`rooms.accountId = :accountId`, {
					accountId: `${user.accountId}`,
				})
				.orderBy('rooms.createdAt', 'DESC')
				.skip(skip)
				.take(take);

			name &&
				result.andWhere('rooms.name LIKE :name', {
					name: `%${name}%`,
				});

			floorId &&
				result.andWhere('rooms.floorId = :floorId', {
					floorId: `${floorId}`,
				});
			roomTypeId &&
				result.andWhere('rooms.roomTypeId = :roomTypeId', {
					roomTypeId: `${roomTypeId}`,
				});

			const count = await result.getCount();
			const rooms = await result.getMany();

			if (count == 0)
				return new HttpException('Not Found', HttpStatus.NOT_FOUND);
			return {rooms, count, currentPage, perPage};
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async findPriceRoomAllAsync(idList: string[], user: UserDto): Promise<any> {
		try {
			const result = this.roomRepository
				.createQueryBuilder('rooms')
				.leftJoinAndSelect(
					'rooms.roomType',
					'roomTypes',
					'rooms.roomTypeId = roomTypes.id'
				)
				.leftJoinAndSelect(
					'roomTypes.price',
					'prices',
					'roomTypes.priceId = prices.id'
				)
				.leftJoinAndSelect(
					'prices.priceItem',
					'priceItems',
					'prices.id = priceItems.priceId'
				)

				.where(`rooms.deletedAt IS NULL`)
				.andWhere(`rooms.accountId = :accountId`, {
					accountId: `${user.accountId}`,
				})
				.andWhere('rooms.id IN (:...idList)', {idList})
				.orderBy('rooms.createdAt', 'DESC');

			const count = await result.getCount();
			const rooms = await result.getMany();
			return rooms;
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async findOneAsync(id: string, user: UserDto): Promise<Room | any> {
		try {
			const result = await this.roomRepository
				.createQueryBuilder('rooms')
				.leftJoinAndSelect(
					'rooms.roomType',
					'roomTypes',
					'rooms.roomTypeId = roomTypes.id'
				)
				.leftJoinAndSelect(
					'roomTypes.price',
					'prices',
					'roomTypes.priceId = prices.id'
				)
				.leftJoinAndSelect(
					'prices.priceItem',
					'priceItems',
					'prices.id = priceItems.priceId'
				)

				.where(`rooms.deletedAt IS NULL`)
				.andWhere(`rooms.id = :id`, {
					id: `${id}`,
				})
				.andWhere(`rooms.accountId = :accountId`, {
					accountId: `${user.accountId}`,
				})
				.getOne();
			if (!result)
				throw new NotFoundException('Room Id ' + id + ' Not Found !');
			return result;
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async createAsync(
		createRoomDto: CreateRoomDto[],
		user: UserDto
	): Promise<Room[]> {
		try {
			const newRoomList = _(createRoomDto)
				.map((item) => ({
					...item,
					accountId: user.accountId,
				}))
				.value();
			const result = this.roomRepository.create(newRoomList);
			return await this.roomRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async updateAsync(
		id: string,
		updateRoomDto: UpdateRoomDto,
		user: UserDto
	): Promise<Room> {
		try {
			const result = await this.roomRepository.findOne({where: {id}});
			if (!result)
				throw new NotFoundException('Room Id ' + id + ' Not Found !');

			_(updateRoomDto).forEach((val, key) => {
				if (val) result[key] = val;
			});
			return this.roomRepository.save(result);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async updateStatusAsync(
		idList: string[],
		status: TYPE.RoomStatus
	): Promise<any> {
		try {
			const updateData = {
				// Define the fields you want to update
				status: status, // Replace fieldName and 'new value' with your actual field and value
			};

			const result = await this.roomRepository
				.createQueryBuilder()
				.update(Room) // Replace with your entity name
				.set(updateData)
				.whereInIds(idList) // Use whereInIds to specify the IDs to update
				.execute();
			return result;
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async removeAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.roomRepository.restore({
			id,
			accountId: user.accountId,
		});
		if (result.affected > 0) return 'Deleted Room Id ' + id + ' successfully !';
		throw new NotFoundException('Room Id ' + id + ' Not Found !');
	}

	async restoreAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.roomRepository.restore({
			id,
			accountId: user.accountId,
		});
		if (result.affected > 0) return 'Restore Room Id ' + id + ' successfully !';
		throw new NotFoundException('Room Id ' + id + ' Not Found !');
	}

	async deleteAsync(id: string, user: UserDto): Promise<string> {
		const result = await this.roomRepository.delete(id);
		if (result.affected > 0) return 'Deleted Room Id ' + id + ' successfully !';
		throw new NotFoundException('Room Id ' + id + ' Not Found !');
	}

	async countRoomStatusAsync(user: UserDto): Promise<any> {
		const result = await this.roomRepository.findAndCount({
			where: {accountId: user.accountId},
		});
		const counts = _.countBy(result[0], 'status');
		return counts;
	}
}
