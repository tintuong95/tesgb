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
import {PayrollsService, RevenueService} from '../services/core';
import {
	CreatePayrollDto,
	CreateRevenueDto,
	UpdatePayrollDto,
} from '../Entities/Dto/core';
import {Payroll} from '../entities/core';

import {ROLE} from '@contants/role';
import {ApiTags} from '@nestjs/swagger';
import {Request} from 'express';
import {IPayrollsController} from './Interfaces/IPayrollsController';
import {User} from 'Shared/user.decorator';
import {UserDto} from 'Shared/user.dto';
import {JwtAuthGuard} from 'Services/JwtGuardService';
import {REVENUE_STATE, REVENUE_TYPE} from '@entities/Types/Revenue';

@Controller('payroll')
@ApiTags('payroll')
@UseGuards(JwtAuthGuard)
export class PayrollController implements IPayrollsController {
	constructor(
		private payrollService: PayrollsService,
		private revenueService: RevenueService
	) {}
	@Get('list')
	async getAllPayrolls(
		@Req() request: Request,
		@User() user: UserDto
	): Promise<Payroll[]> {
		return await this.payrollService.findAllAsync(request, user);
	}

	@Get(':id/details')
	async getPayrollDetails(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<Payroll> {
		return await this.payrollService.findOneAsync(id, user);
	}

	// @Roles(ROLE.PARTNER)
	@Post('create')
	@HttpCode(HttpStatus.CREATED)
	async createPayroll(
		@Body() createPayrollDto: CreatePayrollDto,
		@User() user: UserDto
	): Promise<Payroll> {
		const newPayroll = await this.payrollService.createAsync(
			createPayrollDto,
			user
		);
		const data = new CreateRevenueDto();
		data.amount = newPayroll.amount;
		data.referenceId = newPayroll.id;
		data.referenceType = REVENUE_TYPE.EMPLOYEE;
		data.type = REVENUE_STATE.EXPENSES;
		await this.revenueService.createAsync(data, user);
		return newPayroll;
	}

	@Put(':id/update')
	async updatePayroll(
		@Body(ValidationPipe)
		updatePayrollDto: UpdatePayrollDto,
		@User() user: UserDto,
		@Param('id') id: string
	): Promise<Payroll> {
		return await this.payrollService.updateAsync(id, updatePayrollDto, user);
	}

	@Delete(':id/remove')
	async removePayroll(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.payrollService.removeAsync(id, user);
	}

	@Delete(':id/restore')
	async restorePayroll(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.payrollService.restoreAsync(id, user);
	}

	@Delete(':id/delete')
	async deletePayroll(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.payrollService.deleteAsync(id, user);
	}
}
