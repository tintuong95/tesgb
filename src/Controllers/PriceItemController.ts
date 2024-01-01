import {
	Body,
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Post,
	ValidationPipe,
	HttpStatus,
	HttpCode,
	UseGuards,
	UploadedFile,
	UseInterceptors,
	Query,
	Req,
	UsePipes,
	Put,
	Delete,
} from '@nestjs/common';
import {PriceItemService} from '../services/core';
import {CreatePriceItemDto, UpdatePriceItemDto} from '../Entities/Dto/core';
import {PriceItem} from '../entities/PriceItem';

import {ApiTags} from '@nestjs/swagger';
import {Request} from 'express';
import {IPriceItemController} from './Interfaces/IPriceItemController';
import {User} from 'Shared/user.decorator';
import {UserDto} from 'Shared/user.dto';
import {JwtAuthGuard} from 'Services/JwtGuardService';
import {PriceItemType} from '@entities/Types/PriceItem';

@Controller('priceItem')
@ApiTags('priceItem')
@UseGuards(JwtAuthGuard)
export class PriceItemController implements IPriceItemController {
	constructor(private priceItemService: PriceItemService) {}
	@Get('list')
	async getAllPriceItems(
		@Req() request: Request,
		@User() user: UserDto
	): Promise<PriceItem> {
		return await this.priceItemService.findAllAsync(request, user);
	}

	@Get(':id/details')
	async getPriceItemDetails(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<PriceItem> {
		return await this.priceItemService.findOneAsync(id, user);
	}

	// @Roles(ROLE.PARTNER)
	@Post('create')
	@HttpCode(HttpStatus.CREATED)
	async createPriceItem(
		@Body() createPriceItemDto: CreatePriceItemDto[]
	): Promise<PriceItem[]> {
		return await this.priceItemService.createAsync(createPriceItemDto);
	}

	@Put(':id/:type/update')
	async updatePriceItem(
		@Body(ValidationPipe)
		updatePriceItemDto: UpdatePriceItemDto,
		user: UserDto,
		@Param('id') id: string,
		@Param('type') type: PriceItemType
	): Promise<PriceItem> {
		return await this.priceItemService.updateAsync(
			id,
			type,
			updatePriceItemDto
		);
	}

	@Delete(':id/remove')
	async removePriceItem(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.priceItemService.removeAsync(id, user);
	}

	@Delete(':id/restore')
	async restorePriceItem(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.priceItemService.restoreAsync(id, user);
	}

	@Delete(':id/delete')
	async deletePriceItem(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.priceItemService.deleteAsync(id, user);
	}
}
