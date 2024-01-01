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
import {MemberService, ProductService, StockService} from '../services/core';
import {
	CreateProductDto,
	CreateStockDto,
	UpdateStockDto,
} from '../Entities/Dto/core';
import {Stock} from '../entities/Stock';

import {ROLE} from '@contants/role';
import {ApiTags} from '@nestjs/swagger';
import {Request} from 'express';
import {JwtAuthGuard} from 'Services/JwtGuardService';
import {IStockController} from './Interfaces/IStockController';
import {User} from 'Shared/user.decorator';
import {UserDto} from 'Shared/user.dto';

@Controller('stock')
@ApiTags('stock')
@UseGuards(JwtAuthGuard)
export class StockController implements IStockController {
	constructor(
		private readonly stockService: StockService,
		private readonly productService: ProductService
	) {}

	@Get('list')
	async getAllStocks(
		@Req() request: Request,
		@User() user: UserDto
	): Promise<Stock[]> {
		return await this.stockService.findAllAsync(request, user);
	}

	@Get(':id/details')
	async getStockDetails(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<Stock> {
		return await this.stockService.findOneAsync(id, user);
	}

	// @Roles(ROLE.PARTNER)
	@Post('create')
	@HttpCode(HttpStatus.CREATED)
	async createStock(
		@Body() createProductDto: CreateProductDto,
		@User() user: UserDto
	): Promise<Stock> {
		const product = await this.productService.createAsync(
			createProductDto,
			user
		);
		const stock = new CreateStockDto();
		stock.productId = product.id;
		return await this.stockService.createAsync(stock, user);
	}

	@Put(':id/update')
	async updateStock(
		@Body(ValidationPipe)
		updateStockDto: UpdateStockDto,
		@User() user: UserDto,
		@Param('id') id: string
	): Promise<Stock> {
		return await this.stockService.updateAsync(id, updateStockDto, user);
	}

	@Delete(':id/remove')
	// @Roles(ROLE.PARTNER, ROLE.ADMIN)
	async removeStock(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.stockService.removeAsync(id, user);
	}

	@Delete(':id/restore')
	//
	async restoreStock(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.stockService.restoreAsync(id, user);
	}

	@Delete(':id/delete')
	//
	async deleteStock(
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<string> {
		return await this.stockService.deleteAsync(id, user);
	}
}
