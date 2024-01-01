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
import {RoomTypeService} from '../services/core';
import {CreateRoomTypeDto, UpdateRoomTypeDto} from '../Entities/Dto/core';
import {RoomType} from '../entities/RoomType';

import {ROLE} from '@contants/role';
import {ApiTags} from '@nestjs/swagger';
import {IRoomTypeController} from './Interfaces/IRoomTypeController';
import {UserDto} from 'Shared/user.dto';
import {User} from 'Shared/user.decorator';
import {Request} from 'express';
import {JwtAuthGuard} from 'Services/JwtGuardService';

@Controller('room-type')
@ApiTags('room-type')
@UseGuards(JwtAuthGuard)
export class RoomTypeController implements IRoomTypeController {
	constructor(private roomService: RoomTypeService) {}
	@Get('list')
	async getAllRoomTypes(
		@Req() request: Request,
		@User() user: UserDto
	): Promise<RoomType[]> {
		return await this.roomService.findAllAsync(request, user);
	}

	@Get(':id/details')
	async getRoomTypeDetails(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<RoomType> {
		return await this.roomService.findOneAsync(id, user);
	}

	// @Roles(ROLE.PARTNER)
	@Post('create')
	@HttpCode(HttpStatus.CREATED)
	async createRoomType(
		@Body() createRoomTypeDto: CreateRoomTypeDto,
		@User() user: UserDto
	): Promise<RoomType> {
		return await this.roomService.createAsync(createRoomTypeDto, user);
	}

	@Put(':id/update')
	async updateRoomType(
		@Body(ValidationPipe)
		updateRoomTypeDto: UpdateRoomTypeDto,
		@User() user: UserDto,
		@Param('id') id: string
	): Promise<RoomType> {
		return await this.roomService.updateAsync(id, updateRoomTypeDto, user);
	}

	@Delete(':id/remove')
	async removeRoomType(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.roomService.removeAsync(id, user);
	}

	@Delete(':id/restore')
	async restoreRoomType(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.roomService.restoreAsync(id, user);
	}

	@Delete(':id/delete')
	async deleteRoomType(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.roomService.deleteAsync(id, user);
	}
}
