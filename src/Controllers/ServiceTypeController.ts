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

import {CreateServiceTypeDto, UpdateServiceTypeDto} from '../Entities/Dto/core';
import {ServiceType} from '../entities/ServiceType';

import {ROLE} from '@contants/role';
import {ApiTags} from '@nestjs/swagger';
import {ServiceTypeService} from '@services/ServiceTypeService';
import {IServiceTypeController} from './Interfaces/IServiceTypeController';
import {User} from 'Shared/user.decorator';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';
import {JwtAuthGuard} from 'Services/JwtGuardService';
@Controller('service-type')
@UseGuards(JwtAuthGuard)
@ApiTags('service-type')
export class ServiceTypeController implements IServiceTypeController {
	constructor(private serviceTypeService: ServiceTypeService) {}
	@Get('list')
	async getAllServiceTypes(
		@Req() request: Request,
		@User() user: UserDto
	): Promise<ServiceType[]> {
		return await this.serviceTypeService.findAllAsync(request, user);
	}

	@Get(':id/details')
	async getServiceTypeDetails(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<ServiceType> {
		return await this.serviceTypeService.findOneAsync(id, user);
	}

	// @Roles(ROLE.PARTNER)
	@Post('create')
	@HttpCode(HttpStatus.CREATED)
	async createServiceType(
		@Body() createServiceTypeDto: CreateServiceTypeDto,
		@User() user: UserDto
	): Promise<ServiceType> {
		return await this.serviceTypeService.createAsync(
			createServiceTypeDto,
			user
		);
	}

	@Put(':id/update')
	async updateServiceType(
		@Body(ValidationPipe)
		updateServiceTypeDto: UpdateServiceTypeDto,
		@User() user: UserDto,
		@Param('id') id: string
	): Promise<ServiceType> {
		return await this.serviceTypeService.updateAsync(
			id,
			updateServiceTypeDto,
			user
		);
	}

	@Delete(':id/remove')
	// @Roles(ROLE.PARTNER, ROLE.ADMIN)
	async removeServiceType(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.serviceTypeService.removeAsync(id, user);
	}

	@Delete(':id/restore')
	//
	async restoreServiceType(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.serviceTypeService.restoreAsync(id, user);
	}

	@Delete(':id/delete')
	//
	async deleteServiceType(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.serviceTypeService.deleteAsync(id, user);
	}
}
