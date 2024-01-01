import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	ValidationPipe,
	HttpStatus,
	HttpCode,
	Put,
	Delete,
	Query,
	Req,
	UseGuards,
} from '@nestjs/common';
import {OrderService, RoomService} from '../services/core';
import {CreateRoomDto, UpdateRoomDto} from '../Entities/Dto/core';
import {Room} from '../Entities/Room';

import {ROLE} from '@contants/role';
import {ApiTags} from '@nestjs/swagger';
import {IRoomController} from './Interfaces/IRoomController';
import {User} from 'Shared/user.decorator';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';
import {JwtAuthGuard} from 'Services/JwtGuardService';
import * as _ from 'lodash';
import {pagination} from '@util/pagination';

@Controller('room')
@ApiTags('room')
@UseGuards(JwtAuthGuard)
export class RoomController implements IRoomController {
	constructor(
		private roomService: RoomService,
		private orderService: OrderService
	) {}
	@Get('list')
	async getAllRooms(
		@Req() request: Request,
		@User() user: UserDto
	): Promise<Room[] | any> {
		const roomList = await this.roomService.findAllAsync(request, user);
		const {rooms, count, currentPage, perPage} = roomList;
		console.log('roomList', roomList);
		const roomIds = _(rooms)
			.map((item: any) => item?.id)
			.value();
		const orders = await this.orderService.findOrderByListRoomId(roomIds, user);
		console.log('orders', orders);
		const orderRoomList = _(orders)
			.flatMap('roomOrder')
			.uniqBy('roomId')
			.map((item) => ({roomId: item.roomId, orderId: item.orderId}))
			.value();

		const mergedArray = _.merge(
			_.keyBy(rooms, 'id'),
			_.keyBy(orderRoomList, 'roomId')
		);

		return pagination(
			request,
			[_.values(mergedArray), count],
			currentPage,
			perPage
		);
	}

	@Get('price/list')
	async getAllPriceRooms(
		@Query('idList') idList: string[],
		@User() user: UserDto
	): Promise<Room[]> {
		console.log('idList', idList);
		return await this.roomService.findPriceRoomAllAsync(idList, user);
	}

	@Get(':id/details')
	async getRoomDetails(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<Room> {
		return await this.roomService.findOneAsync(id, user);
	}

	// @Roles(ROLE.PARTNER)
	@Post('create')
	@HttpCode(HttpStatus.CREATED)
	async createRoom(
		@Body() createRoomDto: CreateRoomDto[],
		@User() user: UserDto
	): Promise<Room[]> {
		return await this.roomService.createAsync(createRoomDto, user);
	}

	@Put(':id/update')
	async updateRoom(
		@Body(ValidationPipe)
		updateRoomDto: UpdateRoomDto,
		@User() user: UserDto,
		@Param('id') id: string
	): Promise<Room> {
		return await this.roomService.updateAsync(id, updateRoomDto, user);
	}

	@Delete(':id/remove')
	async removeRoom(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.roomService.removeAsync(id, user);
	}

	@Delete(':id/restore')
	async restoreRoom(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.roomService.restoreAsync(id, user);
	}

	@Delete(':id/delete')
	async deleteRoom(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.roomService.deleteAsync(id, user);
	}

	@Get('/count-room-status')
	async countRoomStatus(@User() user: UserDto): Promise<any> {
		return await this.roomService.countRoomStatusAsync(user);
	}
}
