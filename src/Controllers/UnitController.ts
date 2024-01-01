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
import {UnitService} from '../services/core';
import {CreateUnitDto, UpdateUnitDto} from '../Entities/Dto/core';
import {Unit} from '../entities/Unit';

import {Request} from 'express';
import {ApiTags} from '@nestjs/swagger';
import {IUnitController} from './Interfaces/IUnitController';
import {User} from 'Shared/user.decorator';
import {UserDto} from 'Shared/user.dto';
import {JwtAuthGuard} from 'Services/JwtGuardService';

@Controller('unit')
@UseGuards(JwtAuthGuard)
@ApiTags('unit')
export class UnitController implements IUnitController {
	constructor(private unitService: UnitService) {}
	@Get('list')
	async getAllUnits(
		@Req() request: Request,
		@User() user: UserDto
	): Promise<Unit[]> {
		return await this.unitService.findAllAsync(request, user);
	}

	@Get(':id/details')
	async getUnitDetails(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<Unit> {
		return await this.unitService.findOneAsync(id, user);
	}

	// @Roles(ROLE.PARTNER)
	@Post('create')
	@HttpCode(HttpStatus.CREATED)
	async createUnit(
		@Body() createUnitDto: CreateUnitDto[],
		@User() user: UserDto
	): Promise<Unit[]> {
		return await this.unitService.createAsync(createUnitDto, user);
	}

	@Put(':id/update')
	async updateUnit(
		@Body(ValidationPipe)
		updateUnitDto: UpdateUnitDto,
		@User() user: UserDto,
		@Param('id') id: string
	): Promise<Unit> {
		return await this.unitService.updateAsync(id, updateUnitDto, user);
	}

	@Delete(':id/remove')
	// @Roles(ROLE.PARTNER, ROLE.ADMIN)
	async removeUnit(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.unitService.removeAsync(id, user);
	}

	@Post('/remove')
	// @Roles(ROLE.PARTNER, ROLE.ADMIN)
	async removeListUnit(
		@Body() id: string[],
		@User() user: UserDto
	): Promise<string> {
		return await this.unitService.removeListAsync(id, user);
	}

	@Delete(':id/restore')
	//
	async restoreUnit(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.unitService.restoreAsync(id, user);
	}

	@Delete(':id/delete')
	//
	async deleteUnit(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.unitService.deleteAsync(id, user);
	}
}
