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
import {ServiceOrderService} from '../services/core';
import {
	CreatedServiceOrderDto,
	UpdatedServiceOrderDto,
} from '../Entities/Dto/core';
import {ServiceOrder} from '../entities/core';

import {ROLE} from '@contants/role';
import {ApiTags} from '@nestjs/swagger';
import {Request} from 'express';
import {IServiceOrderController} from './Interfaces/IServiceOrderController';
import {UserDto} from 'Shared/user.dto';
import {User} from 'Shared/user.decorator';
import {JwtAuthGuard} from 'Services/JwtGuardService';

@Controller('serviceOrder')
@ApiTags('serviceOrder')
@UseGuards(JwtAuthGuard)
export class ServiceOrderController implements IServiceOrderController {
	constructor(private serviceOrderService: ServiceOrderService) {}
	@Get('list')
	async getAllServiceOrder(
		@Req() request: Request,
		@User() user: UserDto
	): Promise<ServiceOrder[]> {
		return await this.serviceOrderService.findAllAsync(request, user);
	}

	@Get(':id/details')
	async getServiceOrderDetails(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<ServiceOrder> {
		return await this.serviceOrderService.findOneAsync(id, user);
	}

	// @Roles(ROLE.PARTNER)
	@Post('create')
	@HttpCode(HttpStatus.CREATED)
	async createServiceOrder(
		@Body() createServiceOrderDto: CreatedServiceOrderDto[]
	): Promise<ServiceOrder[]> {
		return await this.serviceOrderService.createAsync(createServiceOrderDto);
	}

	@Put(':id/update')
	async updateServiceOrder(
		@Body(ValidationPipe)
		updateServiceOrderDto: UpdatedServiceOrderDto,
		@User() user: UserDto,
		@Param('id') id: string
	): Promise<ServiceOrder> {
		return await this.serviceOrderService.updateAsync(
			id,
			updateServiceOrderDto,
			user
		);
	}

	@Delete(':id/remove')
	async removeServiceOrder(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.serviceOrderService.removeAsync(id, user);
	}

	@Delete(':id/restore')
	async restoreServiceOrder(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.serviceOrderService.restoreAsync(id, user);
	}

	@Delete(':id/delete')
	async deleteServiceOrder(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.serviceOrderService.deleteAsync(id, user);
	}
}
