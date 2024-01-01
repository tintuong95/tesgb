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

import {CreateServiceDto, UpdateServiceDto} from '../Entities/Dto/core';
import {Service} from '../entities/Service';

import {ROLE} from '@contants/role';
import {ApiTags} from '@nestjs/swagger';
import {ServiceService} from '@services/ServiceService';
import {Request} from 'express';
import {IServiceController} from './Interfaces/IServiceController';
import {User} from 'Shared/user.decorator';
import {UserDto} from 'Shared/user.dto';
import {JwtAuthGuard} from 'Services/JwtGuardService';

@Controller('service')
@UseGuards(JwtAuthGuard)
@ApiTags('service')
export class ServiceController implements IServiceController {
	constructor(private serviceService: ServiceService) {}
	@Get('list')
	async getAllServices(
		@Req() request: Request,
		@User() user: UserDto
	): Promise<Service[]> {
		return await this.serviceService.findAllAsync(request, user);
	}

	@Get('list/:id/service-type')
	async getAllByServiceTypeId(
		@User() user: UserDto,
		@Param('id') id: string
	): Promise<Service[]> {
		return await this.serviceService.findByServiceTypeId(id, user);
	}

	@Get(':id/details')
	async getServiceDetails(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<Service> {
		return await this.serviceService.findOneAsync(id, user);
	}

	// @Roles(ROLE.PARTNER)
	@Post('create')
	@HttpCode(HttpStatus.CREATED)
	async createService(
		@Body() createServiceDto: CreateServiceDto,
		@User() user: UserDto
	): Promise<Service> {
		return await this.serviceService.createAsync(createServiceDto, user);
	}

	@Put(':id/update')
	async updateService(
		@Body(ValidationPipe)
		updateServiceDto: UpdateServiceDto,
		@User() user: UserDto,
		@Param('id') id: string
	): Promise<Service> {
		return await this.serviceService.updateAsync(id, updateServiceDto, user);
	}

	@Delete(':id/remove')
	// @Roles(ROLE.PARTNER, ROLE.ADMIN)
	async removeService(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.serviceService.removeAsync(id, user);
	}

	@Delete(':id/restore')
	async restoreService(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.serviceService.restoreAsync(id, user);
	}

	@Delete(':id/delete')
	async deleteService(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.serviceService.deleteAsync(id, user);
	}

	@Get('/count-service-by-status')
	async countEmployeeByStatus(
		@User() user: UserDto,
		@Req() request: Request
	): Promise<string> {
		return await this.serviceService.countServiceStatusCurrent(user, request);
	}
}
