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
	InternalServerErrorException,
	MethodNotAllowedException,
} from '@nestjs/common';
import {AccountService, PaymentService} from '../services/core';
import {
	CreatePaymentDto,
	CreatePaymentOptionDto,
	UpdateAccountDto,
	UpdatePaymentDto,
} from '../Entities/Dto/core';
import {Payment} from '../entities/Payment';

import {ROLE} from '@contants/role';
import {ApiTags} from '@nestjs/swagger';
import {request} from 'http';
import {Request} from 'express';
import {IPaymentController} from './Interfaces/IPaymentController';
import {UserDto} from 'Shared/user.dto';
import {User} from 'Shared/user.decorator';
import {JwtAuthGuard} from 'Services/JwtGuardService';

@Controller('payment')
@ApiTags('payment')
@UseGuards(JwtAuthGuard)
export class PaymentController implements IPaymentController {
	constructor(
		private paymentService: PaymentService,
		private accountService: AccountService
	) {}
	@Get('list')
	async getAllPayments(
		@Req() request: Request,
		@User() user: UserDto
	): Promise<Payment[]> {
		return await this.paymentService.findAllAsync(request, user);
	}

	@Get(':id/details')
	async getPaymentDetails(
		@Param('id') id: number,
		@User() user: UserDto
	): Promise<Payment> {
		return await this.paymentService.findOneAsync(id, user);
	}

	// @Roles(ROLE.PARTNER)
	@Post('create')
	@HttpCode(HttpStatus.CREATED)
	async createPayment(
		@Body() createPaymentOptionDto: CreatePaymentOptionDto,
		@User() user: UserDto
	): Promise<Payment> {
		return await this.paymentService.createAsync(createPaymentOptionDto, user);
	}

	@Put(':id/update')
	async updatePayment(
		@Body(ValidationPipe)
		updatePaymentDto: UpdatePaymentDto,
		@User() user: UserDto,
		@Param('id') id: number
	): Promise<Payment> {
		return await this.paymentService.updateAsync(id, updatePaymentDto, user);
	}

	@Delete(':id/remove')
	async removePayment(
		@Param('id') id: number,
		@User() user: UserDto
	): Promise<string> {
		return await this.paymentService.removeAsync(id, user);
	}

	@Delete(':id/restore')
	async restorePayment(
		@Param('id') id: number,
		@User() user: UserDto
	): Promise<string> {
		return await this.paymentService.restoreAsync(id, user);
	}

	@Delete(':id/delete')
	async deletePayment(
		@Param('id') id: number,
		@User() user: UserDto
	): Promise<string> {
		return await this.paymentService.deleteAsync(id, user);
	}

	@Get('/check-payment/:id')
	async checkPayment(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<any> {
		const payment = await this.paymentService.checkPaymentRequest(id, user);
		if (payment) {
			const updateAccountDto = new UpdateAccountDto();
			updateAccountDto.expiredAt = payment?.expiredAt;
			const account = await this.accountService.updateAsync(
				user.accountId,
				updateAccountDto
			);
			return account;
		}
		throw new MethodNotAllowedException();
	}
}
