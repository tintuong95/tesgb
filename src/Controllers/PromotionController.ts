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
import {PromotionService} from '../services/core';
import {CreatePromotionDto, UpdatePromotionDto} from '../Entities/Dto/core';
import {Promotion} from '../entities/Promotion';

import {ROLE} from '@contants/role';
import {ApiTags} from '@nestjs/swagger';
import {IPromotionController} from './Interfaces/IPromotionController';
import {User} from 'Shared/user.decorator';
import {UserDto} from 'Shared/user.dto';
import {Request} from 'express';
import {JwtAuthGuard} from 'Services/JwtGuardService';

@Controller('promotion')
@ApiTags('promotion')
@UseGuards(JwtAuthGuard)
export class PromotionController implements IPromotionController {
	constructor(private promotionService: PromotionService) {}
	@Get('list')
	async getAllPromotions(
		@Req() request: Request,
		@User() user: UserDto
	): Promise<Promotion[]> {
		return await this.promotionService.findAllAsync(request, user);
	}

	@Get(':id/details')
	async getPromotionDetails(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<Promotion> {
		return await this.promotionService.findOneAsync(id, user);
	}

	// @Roles(ROLE.PARTNER)
	@Post('create')
	@HttpCode(HttpStatus.CREATED)
	async createPromotion(
		@Body() createPromotionDto: CreatePromotionDto,
		@User() user: UserDto
	): Promise<Promotion> {
		return await this.promotionService.createAsync(createPromotionDto, user);
	}

	@Put(':id/update')
	async updatePromotion(
		@Body(ValidationPipe)
		updatePromotionDto: UpdatePromotionDto,
		@User() user: UserDto,
		@Param('id') id: string
	): Promise<Promotion> {
		return await this.promotionService.updateAsync(
			id,
			updatePromotionDto,
			user
		);
	}

	@Delete(':id/remove')
	async removePromotion(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.promotionService.removeAsync(id, user);
	}

	@Delete(':id/restore')
	async restorePromotion(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.promotionService.restoreAsync(id, user);
	}

	@Delete(':id/delete')
	async deletePromotion(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.promotionService.deleteAsync(id, user);
	}
}
