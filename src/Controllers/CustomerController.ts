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
import {CustomerService} from '../services/core';
import {CreateCustomerDto, UpdateCustomerDto} from '../Entities/Dto/core';
import {Customer} from '../entities/Customer';

import {ROLE} from '@contants/role';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {Request} from 'express';
import {JwtAuthGuard} from 'Services/JwtGuardService';
import {User} from 'Shared/user.decorator';
import {UserDto} from 'Shared/user.dto';
import {ICustomerController} from './Interfaces/core';

@Controller('customer')
@ApiTags('customer')
@UseGuards(JwtAuthGuard)
export class CustomerController implements ICustomerController {
	constructor(private customerService: CustomerService) {}
	@Get('list')
	async getAllCustomers(
		@Req() request: Request,
		@User() user: UserDto
	): Promise<Customer[]> {
		return await this.customerService.findAllAsync(user, request);
	}

	@Get(':id/details')
	async getCustomerDetails(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<Customer> {
		return await this.customerService.findOneAsync(id, user);
	}

	// @Roles(ROLE.PARTNER)
	@Post('create')
	@HttpCode(HttpStatus.CREATED)
	async createCustomer(
		@Body() createCustomerDto: CreateCustomerDto[]
	): Promise<Customer[]> {
		return await this.customerService.createAsync(createCustomerDto);
	}

	@Put(':id/update')
	async updateCustomer(
		@Body(ValidationPipe)
		updateCustomerDto: UpdateCustomerDto,
		@User() user: UserDto,
		@Param('id') id: string
	): Promise<Customer> {
		return await this.customerService.updateAsync(id, updateCustomerDto, user);
	}

	@Delete(':id/remove')
	async removeCustomer(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.customerService.removeAsync(id, user);
	}

	@Delete(':id/restore')
	async restoreCustomer(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.customerService.restoreAsync(id, user);
	}

	@Delete(':id/delete')
	async deleteCustomer(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.customerService.deleteAsync(id, user);
	}
}
