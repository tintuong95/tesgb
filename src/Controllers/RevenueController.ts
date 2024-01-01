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
import {RevenueService} from '../services/core';

import {ROLE} from '@contants/role';
import {ApiTags} from '@nestjs/swagger';
import {Revenue} from '../Entities/core';
import {CreateRevenueDto, UpdateRevenueDto} from '@entities/DTO/core';
import {IRevenueController} from './Interfaces/IRevenueController';
import {User} from 'Shared/user.decorator';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';
import {JwtAuthGuard} from 'Services/JwtGuardService';

@Controller('revenue')
@ApiTags('revenue')
@UseGuards(JwtAuthGuard)
export class RevenueController implements IRevenueController {
	constructor(private revenueService: RevenueService) {}
	@Get('list')
	async getAllRevenues(
		@Req() request: Request,
		@User() user: UserDto
	): Promise<Revenue[]> {
		return await this.revenueService.findAllAsync(request, user);
	}

	@Get(':id/details')
	async getRevenueDetails(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<Revenue> {
		return await this.revenueService.findOneAsync(id, user);
	}

	// @Revenues(ROLE.PARTNER)
	@Post('create')
	@HttpCode(HttpStatus.CREATED)
	async createRevenue(
		@Body() createRevenueDto: CreateRevenueDto,
		@User() user: UserDto
	): Promise<Revenue> {
		return await this.revenueService.createAsync(createRevenueDto, user);
	}

	@Put(':id/update')
	async updateRevenue(
		@Body(ValidationPipe)
		updateRevenueDto: UpdateRevenueDto,
		@User() user: UserDto,
		@Param('id') id: string
	): Promise<Revenue> {
		return await this.revenueService.updateAsync(id, updateRevenueDto, user);
	}

	@Delete(':id/remove')
	async removeRevenue(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.revenueService.removeAsync(id, user);
	}

	@Delete(':id/restore')
	async restoreRevenue(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.revenueService.restoreAsync(id, user);
	}

	@Delete(':id/delete')
	async deleteRevenue(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.revenueService.deleteAsync(id, user);
	}

	@Get('/revenue-expend-total-month')
	async getRevenueAndExpendTotalByMonth(
		@Req() request: Request,
		@User() user: UserDto
	): Promise<string> {
		return await this.revenueService.getRevenueAndExpendTotalByTime(
			request,
			user
		);
	}

	@Get('/revenue-expend-in-date')
	async getRevenueAndExpendInDate(
		@Req() request: Request,
		@User() user: UserDto
	): Promise<string> {
		return await this.revenueService.getRevenueAndExpendInDate(request, user);
	}

	@Get('/revenue-expend-in-date-reference')
	async getRevenueAndExpendInDateReference(
		@Req() request: Request,
		@User() user: UserDto
	): Promise<string> {
		return await this.revenueService.getRevenueAndExpendInDateByReferenceType(
			request,
			user
		);
	}

	@Get('/revenue-expend-total')
	async getRevenueAndExpendTotal(
		@Req() request: Request,
		@User() user: UserDto
	): Promise<string> {
		return await this.revenueService.getTotalRevenue(user);
	}
}
