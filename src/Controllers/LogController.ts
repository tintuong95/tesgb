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
import {LogService} from '../services/core';
import {CreateLogDto, UpdateLogDto} from '../Entities/Dto/core';
import {Log} from '../entities/Log';

import {ROLE} from '@contants/role';
import {ApiTags} from '@nestjs/swagger';
import {ILogController} from './Interfaces/ILogController';
import {UserDto} from 'Shared/user.dto';
import {User} from 'Shared/user.decorator';
import {Request} from 'express';
import {JwtAuthGuard} from 'Services/JwtGuardService';

@Controller('log')
@ApiTags('log')
@UseGuards(JwtAuthGuard)
export class LogController implements ILogController {
	constructor(private logService: LogService) {}
	@Get('list')
	async getAllLogs(
		@Req() request: Request,
		@User() user: UserDto
	): Promise<Log[]> {
		return await this.logService.findAllAsync(request, user);
	}

	@Get(':id/details')
	async getLogDetails(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<Log> {
		return await this.logService.findOneAsync(id, user);
	}

	// @Roles(ROLE.PARTNER)
	@Post('create')
	@HttpCode(HttpStatus.CREATED)
	async createLog(
		@Body() createLogDto: CreateLogDto,
		@User() user: UserDto
	): Promise<Log> {
		return await this.logService.createAsync(createLogDto, user);
	}

	@Put(':id/update')
	async updateLog(
		@Body(ValidationPipe)
		updateLogDto: UpdateLogDto,
		@User() user: UserDto,
		@Param('id') id: string
	): Promise<Log> {
		return await this.logService.updateAsync(id, updateLogDto, user);
	}

	@Delete(':id/remove')
	async removeLog(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.logService.removeAsync(id, user);
	}

	@Delete(':id/restore')
	async restoreLog(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.logService.restoreAsync(id, user);
	}

	@Delete(':id/delete')
	async deleteLog(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.logService.deleteAsync(id, user);
	}
}
