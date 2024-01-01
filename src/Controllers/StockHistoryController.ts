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
import {
	RevenueService,
	StockHistoryService,
	StockService,
} from '../services/core';
import {
	CreateRevenueDto,
	CreateStockHistoryDto,
	UpdateStockDto,
	UpdateStockHistoryDto,
} from '../Entities/Dto/core';
import {StockHistory} from '../entities/StockHistory';

import {Request} from 'express';
import {ApiTags} from '@nestjs/swagger';
import {IStockHistoryController} from './Interfaces/IStockHistoryController';
import {User} from 'Shared/user.decorator';
import {UserDto} from 'Shared/user.dto';
import {JwtAuthGuard} from 'Services/JwtGuardService';
import {StockHistoryType} from '@entities/Types/StockHistoryType';
import {REVENUE_STATE, REVENUE_TYPE} from '@entities/Types/Revenue';

@Controller('stock-history')
@UseGuards(JwtAuthGuard)
@ApiTags('stock-history')
export class StockHistoryController implements IStockHistoryController {
	constructor(
		private stockHistoryService: StockHistoryService,
		private stockService: StockService,
		private revenueService: RevenueService
	) {}
	@Get('list')
	async getAllStockHistorys(
		@Req() request: Request,
		@User() user: UserDto
	): Promise<StockHistory[]> {
		return await this.stockHistoryService.findAllAsync(request, user);
	}

	@Get(':id/details')
	async getStockHistoryDetails(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<StockHistory> {
		return await this.stockHistoryService.findOneAsync(id, user);
	}

	// @Roles(ROLE.PARTNER)
	@Post('create')
	@HttpCode(HttpStatus.CREATED)
	async createStockHistory(
		@Body() createStockHistoryDto: CreateStockHistoryDto,
		@User() user: UserDto
	): Promise<StockHistory> {
		const result = await this.stockHistoryService.createAsync(
			createStockHistoryDto,
			user
		);
		const data = new CreateRevenueDto();
		data.amount = result.price;
		data.referenceId = result.id;
		data.referenceType = REVENUE_TYPE.STOCK;
		data.type =
			result.type == StockHistoryType.Import
				? REVENUE_STATE.EXPENSES
				: REVENUE_STATE.REVENUE;
		await this.revenueService.createAsync(data, user);
		return result;
	}

	@Put(':id/update')
	async updateStockHistory(
		@Body(ValidationPipe)
		updateStockHistoryDto: UpdateStockHistoryDto,
		@User() user: UserDto,
		@Param('id') id: string
	): Promise<StockHistory> {
		return await this.stockHistoryService.updateAsync(
			id,
			updateStockHistoryDto,
			user
		);
	}

	@Delete(':id/remove')
	// @Roles(ROLE.PARTNER, ROLE.ADMIN)
	async removeStockHistory(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.stockHistoryService.removeAsync(id, user);
	}

	@Delete(':id/restore')
	//
	async restoreStockHistory(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.stockHistoryService.restoreAsync(id, user);
	}

	@Delete(':id/delete')
	//
	async deleteStockHistory(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.stockHistoryService.deleteAsync(id, user);
	}

	@Get(':id/sum-total-import-export')
	//
	async getSumTotalImportExportStockHistory(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.stockHistoryService.getStockExportImportTotal(id, user);
	}
}
