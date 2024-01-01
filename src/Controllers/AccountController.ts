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
	UseGuards,
	ValidationPipe,
} from '@nestjs/common';
import {CreateAccountDto, UpdateAccountDto} from '../Entities/Dto/core';
import {Account} from '../entities/Account';
import {AccountService} from '../services/core';

import {ApiTags} from '@nestjs/swagger';
import {IAccountController} from './Interfaces/core';
import {User} from 'Shared/user.decorator';
import {UserDto} from 'Shared/user.dto';
import crypto from 'crypto';
import {JwtAuthGuard} from 'Services/JwtGuardService';

@Controller('account')
@ApiTags('account')
@UseGuards(JwtAuthGuard)
export class AccountController implements IAccountController {
	constructor(private accountService: AccountService) {}
	@Get('list')
	async getAllAccounts(): Promise<any> {
		return Math.random().toString(36).slice(2, 36);
	}

	@Get('/details')
	async getAccountDetails(@User() user: UserDto): Promise<Account> {
		return await this.accountService.findOneAsync(user.accountId);
	}

	// @Roles(ROLE.PARTNER)
	@Post('create')
	@HttpCode(HttpStatus.CREATED)
	async createAccount(
		@Body() createAccountDto: CreateAccountDto
	): Promise<Account> {
		return await this.accountService.createAsync(createAccountDto);
	}

	@Put(':id/update')
	async updateAccount(
		@Body(ValidationPipe)
		updateAccountDto: UpdateAccountDto,
		@User() user: UserDto
	): Promise<Account> {
		return await this.accountService.updateAsync(
			user.accountId,
			updateAccountDto
		);
	}

	@Delete(':id/remove')
	async removeAccount(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.accountService.removeAsync(id, user);
	}

	@Delete(':id/restore')
	async restoreAccount(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.accountService.restoreAsync(id, user);
	}

	@Delete(':id/delete')
	async deleteAccount(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.accountService.deleteAsync(id, user);
	}
}
