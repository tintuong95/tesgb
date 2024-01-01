import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Put,
	Req,
	UseGuards,
	ValidationPipe,
} from '@nestjs/common';
import {CreateFloorDto, UpdateFloorDto} from '../Entities/Dto/core';
import {Floor} from '../entities/Floor';
import {FloorService} from '../services/core';

import {ApiTags} from '@nestjs/swagger';
import {JwtAuthGuard} from 'Services/JwtGuardService';
import {User} from 'Shared/user.decorator';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';
import {IFloorController} from './Interfaces/IFloorController';

@Controller('floor')
@ApiTags('floor')
@UseGuards(JwtAuthGuard)
export class FloorController implements IFloorController {
	constructor(private floorService: FloorService) {}
	@Get('list')
	async getAllFloors(
		@Req() request: Request,
		@User() user: UserDto
	): Promise<Floor[]> {
		return await this.floorService.findAllAsync(request, user);
	}

	@Get(':id/details')
	async getFloorDetails(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<Floor> {
		return await this.floorService.findOneAsync(id, user);
	}

	// @Roles(ROLE.PARTNER)
	@Post('create')
	@HttpCode(HttpStatus.CREATED)
	async createFloor(
		@Body() createFloorDto: CreateFloorDto,
		@User() user: UserDto
	): Promise<Floor> {
		return await this.floorService.createAsync(createFloorDto, user);
	}

	@Put(':id/update')
	async updateFloor(
		@Body(ValidationPipe)
		updateFloorDto: UpdateFloorDto,
		@User() user: UserDto,
		@Param('id') id: string
	): Promise<Floor> {
		return await this.floorService.updateAsync(id, updateFloorDto, user);
	}

	@Delete(':id/remove')
	async removeFloor(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.floorService.removeAsync(id, user);
	}

	@Delete(':id/restore')
	async restoreFloor(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.floorService.restoreAsync(id, user);
	}

	@Delete(':id/delete')
	async deleteFloor(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.floorService.deleteAsync(id, user);
	}
}
