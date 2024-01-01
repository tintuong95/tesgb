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
	Req,
	UseGuards,
} from '@nestjs/common';

import {CreatedRoomOrderDto, UpdatedRoomOrderDto} from '../Entities/Dto/core';
import {RoomOrder} from '../entities/RoomOrder';

import {ROLE} from '@contants/role';
import {ApiTags} from '@nestjs/swagger';
import {RoomOrderService} from '@services/RoomOrderService';
import {IRoomController} from './Interfaces/IRoomController';
import {IRoomOrderController} from './Interfaces/IRoomOrderController';
import {User} from 'Shared/user.decorator';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';
import {JwtAuthGuard} from 'Services/JwtGuardService';
@Controller('room-order')
@UseGuards(JwtAuthGuard)
@ApiTags('room-order')
export class RoomOrderController implements IRoomOrderController {
	constructor(private roomOrderService: RoomOrderService) {}
	@Get('list')
	async getAllRoomOrders(
		@Req() request: Request,
		@User() user: UserDto
	): Promise<RoomOrder[]> {
		return await this.roomOrderService.findAllAsync(request, user);
	}

	@Get(':id/details')
	async getRoomOrderDetails(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<RoomOrder> {
		return await this.roomOrderService.findOneAsync(id, user);
	}

	// @Roles(ROLE.PARTNER)
	@Post('create')
	@HttpCode(HttpStatus.CREATED)
	async createRoomOrder(
		@Body() createRoomOrderDto: CreatedRoomOrderDto[]
	): Promise<RoomOrder[]> {
		return await this.roomOrderService.createAsync(createRoomOrderDto);
	}

	@Put(':id/update')
	async updateRoomOrder(
		@Body(ValidationPipe)
		updateRoomOrderDto: UpdatedRoomOrderDto,
		@User() user: UserDto,
		@Param('id') id: string
	): Promise<RoomOrder> {
		return await this.roomOrderService.updateAsync(
			id,
			updateRoomOrderDto,
			user
		);
	}

	@Delete(':id/remove')
	// @Roles(ROLE.PARTNER, ROLE.ADMIN)
	async removeRoomOrder(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.roomOrderService.removeAsync(id, user);
	}

	@Delete(':id/restore')
	//
	async restoreRoomOrder(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.roomOrderService.restoreAsync(id, user);
	}

	@Delete(':id/delete')
	//
	async deleteRoomOrder(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.roomOrderService.deleteAsync(id, user);
	}
}
