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

import {CreatedOtherOrderDto, UpdatedOtherOrderDto} from '../Entities/Dto/core';
import {OtherOrder} from '../entities/OtherOrder';

import {ROLE} from '@contants/role';
import {ApiTags} from '@nestjs/swagger';
import {OtherOrderService} from '@services/OtherOrderService';
import {IRoomController} from './Interfaces/IRoomController';
import {IOtherOrderController} from './Interfaces/IOtherOrderController';
import {User} from 'Shared/user.decorator';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';
import {JwtAuthGuard} from 'Services/JwtGuardService';
@Controller('room-order')
@UseGuards(JwtAuthGuard)
@ApiTags('other-order')
export class OtherOrderController implements IOtherOrderController {
	constructor(private OtherOrderService: OtherOrderService) {}
	@Get('list')
	async getAllOtherOrders(
		@Req() request: Request,
		@User() user: UserDto
	): Promise<OtherOrder[]> {
		return await this.OtherOrderService.findAllAsync(request, user);
	}

	@Get(':id/details')
	async getOtherOrderDetails(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<OtherOrder> {
		return await this.OtherOrderService.findOneAsync(id, user);
	}

	// @Roles(ROLE.PARTNER)
	@Post('create')
	@HttpCode(HttpStatus.CREATED)
	async createOtherOrder(
		@Body() createOtherOrderDto: CreatedOtherOrderDto[]
	): Promise<OtherOrder[]> {
		return await this.OtherOrderService.createAsync(createOtherOrderDto);
	}

	@Put(':id/update')
	async updateOtherOrder(
		@Body(ValidationPipe)
		updateOtherOrderDto: UpdatedOtherOrderDto,
		@User() user: UserDto,
		@Param('id') id: string
	): Promise<OtherOrder> {
		return await this.OtherOrderService.updateAsync(
			id,
			updateOtherOrderDto,
			user
		);
	}

	@Delete(':id/remove')
	// @Roles(ROLE.PARTNER, ROLE.ADMIN)
	async removeOtherOrder(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.OtherOrderService.removeAsync(id, user);
	}

	@Delete(':id/restore')
	//
	async restoreOtherOrder(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.OtherOrderService.restoreAsync(id, user);
	}

	@Delete(':id/delete')
	//
	async deleteOtherOrder(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.OtherOrderService.deleteAsync(id, user);
	}
}
