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
	HttpException,
} from '@nestjs/common';
import {PriceItemService, PriceService} from '../services/core';
import {
	CreatePriceAllDto,
	CreatePriceDto,
	CreatePriceItemDto,
	UpdatePriceAllDto,
	UpdatePriceDto,
	UpdatePriceItemDto,
} from '../Entities/Dto/core';
import {Price} from '../entities/Price';

import {ApiTags} from '@nestjs/swagger';
import {Request} from 'express';
import {IPriceController} from './Interfaces/IPriceController';
import {User} from 'Shared/user.decorator';
import {UserDto} from 'Shared/user.dto';
import {JwtAuthGuard} from 'Services/JwtGuardService';
import {PriceItemType} from '@entities/Types/PriceItem';

@Controller('price')
@ApiTags('price')
@UseGuards(JwtAuthGuard)
export class PriceController implements IPriceController {
	constructor(
		private priceService: PriceService,
		private priceItemService: PriceItemService
	) {}
	@Get('list')
	async getAllPrices(
		@Req() request: Request,
		@User() user: UserDto
	): Promise<Price> {
		return await this.priceService.findAllAsync(request, user);
	}

	@Get(':id/details')
	async getPriceDetails(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<Price> {
		return await this.priceService.findOneAsync(id, user);
	}

	// @Roles(ROLE.PARTNER)
	@Post('create')
	@HttpCode(HttpStatus.CREATED)
	async createPrice(
		@Body() createPriceAllDto: CreatePriceAllDto,
		@User() user: UserDto
	): Promise<Price> {
		const newPrice = new CreatePriceDto();
		newPrice.name = createPriceAllDto.name;

		const createPrice = await this.priceService.createAsync(newPrice, user);

		const priceHours = new CreatePriceItemDto();
		priceHours.accountId = user.accountId;
		priceHours.priceId = createPrice.id;
		priceHours.priceRoom = createPriceAllDto.priceHour;
		priceHours.type = PriceItemType.HourPrice;

		const priceHourMore = new CreatePriceItemDto();
		priceHourMore.accountId = user.accountId;
		priceHourMore.priceId = createPrice.id;
		priceHourMore.priceRoom = createPriceAllDto.priceMore;
		priceHourMore.type = PriceItemType.MoreHoursPrice;

		const priceNight = new CreatePriceItemDto();
		priceNight.accountId = user.accountId;
		priceNight.priceId = createPrice.id;
		priceNight.priceRoom = createPriceAllDto.priceNight;
		priceNight.checkInAt = createPriceAllDto.checkInNight;
		priceNight.checkOutAt = createPriceAllDto.checkOutNight;
		priceNight.type = PriceItemType.NightPrice;

		const priceDay = new CreatePriceItemDto();
		priceDay.accountId = user.accountId;
		priceDay.priceId = createPrice.id;
		priceDay.priceRoom = createPriceAllDto.priceDay;
		priceDay.checkInAt = createPriceAllDto.checkInDay;
		priceDay.checkOutAt = createPriceAllDto.checkOutDay;
		priceDay.type = PriceItemType.DayPrice;

		await this.priceItemService.createAsync([
			priceHours,
			priceHourMore,
			priceNight,
			priceDay,
		]);

		return createPrice;
	}

	@Put(':id/update')
	async updatePrice(
		@Body(ValidationPipe)
		updatePriceDto: UpdatePriceAllDto,
		@User() user: UserDto,
		@Param('id') id: string
	): Promise<any> {
		try {
			if (updatePriceDto.name || updatePriceDto.status) {
				const update = new UpdatePriceDto();
				if (updatePriceDto.name) update.name = updatePriceDto.name;
				if (updatePriceDto.status) update.status = updatePriceDto.status;
				const rs = await this.priceService.updateAsync(id, update, user);
			}
			if (updatePriceDto.priceDay) {
				const update = new UpdatePriceItemDto();
				update.priceRoom = updatePriceDto.priceDay;
				await this.priceItemService.updateAsync(
					id,
					PriceItemType.DayPrice,
					update
				);
			}
			if (updatePriceDto.priceNight) {
				const update = new UpdatePriceItemDto();
				update.priceRoom = updatePriceDto.priceNight;
				await this.priceItemService.updateAsync(
					id,
					PriceItemType.NightPrice,
					update
				);
			}
			if (updatePriceDto.priceHour) {
				const update = new UpdatePriceItemDto();
				update.priceRoom = updatePriceDto.priceHour;
				await this.priceItemService.updateAsync(
					id,
					PriceItemType.HourPrice,
					update
				);
			}
			if (updatePriceDto.priceHour) {
				const update = new UpdatePriceItemDto();
				update.priceRoom = updatePriceDto.priceMore;
				await this.priceItemService.updateAsync(
					id,
					PriceItemType.MoreHoursPrice,
					update
				);
			}
			return HttpCode(HttpStatus.OK);
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Delete(':id/remove')
	async removePrice(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.priceService.removeAsync(id, user);
	}

	@Delete(':id/restore')
	async restorePrice(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.priceService.restoreAsync(id, user);
	}

	@Delete(':id/delete')
	async deletePrice(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.priceService.deleteAsync(id, user);
	}
}
