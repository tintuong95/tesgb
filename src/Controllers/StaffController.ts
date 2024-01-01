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
import {StaffService} from '../services/core';
import {CreateStaffDto, UpdateStaffDto} from '../Entities/Dto/core';
import {Staff} from '../entities/Staff';

import {ROLE} from '@contants/role';
import {ApiTags} from '@nestjs/swagger';
import {IStaffController} from './Interfaces/IStaffController';
import {UserDto} from 'Shared/user.dto';
import {User} from 'Shared/user.decorator';
import {Request} from 'express';
import {JwtAuthGuard} from 'Services/JwtGuardService';

@Controller('staff')
@UseGuards(JwtAuthGuard)
@ApiTags('staff')
export class StaffController implements IStaffController {
	constructor(private staffService: StaffService) {}
	@Get('list')
	async getAllStaffs(
		@Req() request: Request,
		@User() user: UserDto
	): Promise<Staff[]> {
		return await this.staffService.findAllAsync(request, user);
	}

	@Get(':id/details')
	async getStaffDetails(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<Staff> {
		return await this.staffService.findOneAsync(id, user);
	}

	// @Roles(ROLE.PARTNER)
	@Post('create')
	@HttpCode(HttpStatus.CREATED)
	async createStaff(
		@Body() createStaffDto: CreateStaffDto,
		@User() user: UserDto
	): Promise<Staff> {
		return await this.staffService.createAsync(createStaffDto, user);
	}

	@Put(':id/update')
	async updateStaff(
		@Body(ValidationPipe)
		updateStaffDto: UpdateStaffDto,
		@User() user: UserDto,
		@Param('id') id: string
	): Promise<Staff> {
		return await this.staffService.updateAsync(id, updateStaffDto, user);
	}

	@Delete(':id/remove')
	// @Roles(ROLE.PARTNER, ROLE.ADMIN)
	async removeStaff(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.staffService.removeAsync(id, user);
	}

	@Delete(':id/restore')
	//
	async restoreStaff(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.staffService.restoreAsync(id, user);
	}

	@Delete(':id/delete')
	//
	async deleteStaff(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.staffService.deleteAsync(id, user);
	}
}
