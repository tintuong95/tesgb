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
import {RoleService} from '../services/core';

import {ROLE} from '@contants/role';
import {ApiTags} from '@nestjs/swagger';
import {Role} from '../Entities/core';
import {CreateRoleDto, UpdateRoleDto} from '@entities/DTO/core';
import {IRoleController} from './Interfaces/IRoleController';
import {User} from 'Shared/user.decorator';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';
import {JwtAuthGuard} from 'Services/JwtGuardService';

@Controller('access')
@ApiTags('access')
@UseGuards(JwtAuthGuard)
export class RoleController implements IRoleController {
	constructor(private accessService: RoleService) {}
	@Get('list')
	async getAllRoles(
		@Req() request: Request,
		@User() user: UserDto
	): Promise<Role[]> {
		return await this.accessService.findAllAsync(request, user);
	}

	@Get(':id/details')
	async getRoleDetails(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<Role> {
		return await this.accessService.findOneAsync(id, user);
	}

	// @Roles(ROLE.PARTNER)
	@Post('create')
	@HttpCode(HttpStatus.CREATED)
	async createRole(
		@Body() createRoleDto: CreateRoleDto,
		@User() user: UserDto
	): Promise<Role> {
		return await this.accessService.createAsync(createRoleDto, user);
	}

	@Put(':id/update')
	async updateRole(
		@Body(ValidationPipe)
		updateRoleDto: UpdateRoleDto,
		@User() user: UserDto,
		@Param('id') id: string
	): Promise<Role> {
		return await this.accessService.updateAsync(id, updateRoleDto, user);
	}

	@Delete(':id/remove')
	async removeRole(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.accessService.removeAsync(id, user);
	}

	@Delete(':id/restore')
	async restoreRole(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.accessService.restoreAsync(id, user);
	}

	@Delete(':id/delete')
	async deleteRole(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.accessService.deleteAsync(id, user);
	}
}
