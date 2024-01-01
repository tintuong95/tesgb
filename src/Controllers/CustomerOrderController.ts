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
import {CustomerOrderService} from '../services/core';
import {
	CreatedCustomerOrderDto,
	UpdatedCustomerOrderDto,
} from '../Entities/Dto/core';
import {CustomerOrder} from '../entities/CustomerOrder';

import {ROLE} from '@contants/role';
import {ApiTags} from '@nestjs/swagger';
import {ICustomerOrderController} from './Interfaces/core';
import {User} from 'Shared/user.decorator';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';
import {JwtAuthGuard} from 'Services/JwtGuardService';

@Controller('customer-order')
@ApiTags('customer-order')
@UseGuards(JwtAuthGuard)
export class CustomerOrderController implements ICustomerOrderController {
	constructor(private customerOrderService: CustomerOrderService) {}
	@Get('list')
	async getAllCustomerOrders(
		@Req() request: Request,
		@User() user: UserDto
	): Promise<CustomerOrder[]> {
		return await this.customerOrderService.findAllAsync(request, user);
	}

	@Get(':id/details')
	async getCustomerOrderDetails(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<CustomerOrder> {
		return await this.customerOrderService.findOneAsync(id, user);
	}

	// @Roles(ROLE.PARTNER)
	@Post('create')
	@HttpCode(HttpStatus.CREATED)
	async createCustomerOrder(
		@Body() createCustomerOrderDto: CreatedCustomerOrderDto[],
		@User() user: UserDto
	): Promise<CustomerOrder[]> {
		return await this.customerOrderService.createAsync(
			createCustomerOrderDto,
			user
		);
	}

	@Put(':id/update')
	async updateCustomerOrder(
		@Body(ValidationPipe)
		updateCustomerOrderDto: UpdatedCustomerOrderDto,
		@User() user: UserDto,
		@Param('id') id: string
	): Promise<CustomerOrder> {
		return await this.customerOrderService.updateAsync(
			id,
			user,
			updateCustomerOrderDto
		);
	}

	@Delete(':id/remove')
	async removeCustomerOrder(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.customerOrderService.removeAsync(id, user);
	}

	@Delete(':id/restore')
	async restoreCustomerOrder(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.customerOrderService.restoreAsync(id, user);
	}

	@Delete(':id/delete')
	async deleteCustomerOrder(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.customerOrderService.deleteAsync(id, user);
	}
}
