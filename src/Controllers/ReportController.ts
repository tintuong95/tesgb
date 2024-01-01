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
import {ReportService} from '../services/core';
import {CreateReportDto, UpdateReportDto} from '../Entities/Dto/core';
import {Report} from '../entities/Report';

import {ROLE} from '@contants/role';
import {ApiTags} from '@nestjs/swagger';
import {IReportController} from './Interfaces/IReportController';
import {User} from 'Shared/user.decorator';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';
import {JwtAuthGuard} from 'Services/JwtGuardService';

@Controller('report')
@ApiTags('report')
@UseGuards(JwtAuthGuard)
export class ReportController implements IReportController {
	constructor(private reportService: ReportService) {}
	@Get('list')
	async getAllReports(
		@Req() request: Request,
		@User() user: UserDto
	): Promise<Report[]> {
		return await this.reportService.findAllAsync(request, user);
	}

	@Get(':id/details')
	async getReportDetails(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<Report> {
		return await this.reportService.findOneAsync(id, user);
	}

	// @Roles(ROLE.PARTNER)
	@Post('create')
	@HttpCode(HttpStatus.CREATED)
	async createReport(
		@Body() createReportDto: CreateReportDto,
		@User() user: UserDto
	): Promise<Report> {
		return await this.reportService.createAsync(createReportDto, user);
	}

	@Put(':id/update')
	async updateReport(
		@Body(ValidationPipe)
		updateReportDto: UpdateReportDto,
		@User() user: UserDto,
		@Param('id') id: string
	): Promise<Report> {
		return await this.reportService.updateAsync(id, updateReportDto, user);
	}

	@Delete(':id/remove')
	async removeReport(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.reportService.removeAsync(id, user);
	}

	@Delete(':id/restore')
	async restoreReport(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.reportService.restoreAsync(id, user);
	}

	@Delete(':id/delete')
	async deleteReport(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.reportService.deleteAsync(id, user);
	}
}
